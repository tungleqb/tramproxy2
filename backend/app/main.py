from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.routers import auth_router, users_router
from app.database import Base, engine
from app.routers import proxy_router

# Khởi tạo app
app = FastAPI()

# Tạo bảng trong DB (nếu chưa có)
Base.metadata.create_all(bind=engine)

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Sau này nên giới hạn domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Reset OpenAPI cache để cập nhật schema mỗi lần khởi động
@app.on_event("startup")
def reset_openapi_cache():
    app.openapi_schema = None

# Cấu hình OAuth2 cho Swagger
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
            "type": "oauth2",
            "flows": {
                "password": {
                    "tokenUrl": "/auth/login",
                    "scopes": {}
                }
            }
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method.setdefault("security", [{"OAuth2PasswordBearer": []}])
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# Router
app.include_router(auth_router.router, prefix="/auth", tags=["Auth"])
app.include_router(users_router.router, prefix="/users", tags=["Users"])
app.include_router(proxy_router.router, prefix="/proxies", tags=["Proxies"])

@app.get("/")
def root():
    return {"message": "Welcome to TramProxy API"}
