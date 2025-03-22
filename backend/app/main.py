from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from app.routers import auth_router, users_router

app = FastAPI()

# Cấu hình OpenAPI để hiển thị OAuth2
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="TramProxy API",
        version="1.0.0",
        description="API backend cho dự án proxy",
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            method.setdefault("security", [{"BearerAuth": []}])
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# Đăng ký các router
app.include_router(auth_router.router, prefix="/auth", tags=["Auth"])
app.include_router(users_router.router, prefix="/users", tags=["Users"])

@app.get("/")
def root():
    return {"message": "Welcome to TramProxy Backend"}

