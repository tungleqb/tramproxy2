from fastapi import FastAPI
from app.routers import auth_router, users_router  # 👈 import cả users_router
from app.database import Base, engine
from fastapi.openapi.utils import get_openapi

app = FastAPI()

# Tạo bảng nếu chưa có
Base.metadata.create_all(bind=engine)

# Custom OpenAPI để Swagger hiện nút "Authorize"
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="TramProxy API",
        version="1.0.0",
        description="API backend for TramProxy project",
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

@app.get("/")
def root():
    return {"message": "Welcome to TramProxy"}

