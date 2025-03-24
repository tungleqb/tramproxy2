from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.routers import auth_router, users_router, proxy_router, payment_router
from app.database import Base, engine

# Khởi tạo app
app = FastAPI()

# Tạo bảng trong DB (nếu chưa có)
Base.metadata.create_all(bind=engine)

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Reset OpenAPI cache để cập nhật schema mỗi lần khởi động
@app.on_event("startup")
def reset_openapi_cache():
    app.openapi_schema = None

# Cấu hình OAuth2 cho Swagger sử dụng token trực tiếp
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="TramProxy API",
        version="1.0.0",
        description="Backend API for TramProxy",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "OAuth2PasswordBearer": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method.setdefault("security", [{"OAuth2PasswordBearer": []}])
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# ✅ Chuẩn hóa prefix API
app.include_router(auth_router.router, prefix="/api/auth", tags=["Auth"])
app.include_router(users_router.router, prefix="/api/user", tags=["User"])
app.include_router(proxy_router.router, prefix="/api/proxy", tags=["Proxy"])
app.include_router(payment_router.router, prefix="/api/payment", tags=["Payment"])

@app.get("/")
def root():
    return {"message": "Welcome to TramProxy API"}
