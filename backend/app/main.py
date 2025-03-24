
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth_router import router as auth_router
from app.users_router import router as users_router
from app.proxy_router import router as proxy_router
from app.payment_router import router as payment_router
from app.transaction_router import router as transaction_router

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký các router đúng chuẩn roadmap
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(users_router, prefix="/api/user", tags=["User"])
app.include_router(proxy_router, prefix="/api/proxy", tags=["Proxy"])
app.include_router(payment_router, prefix="/api/payment", tags=["Payment"])
app.include_router(transaction_router, prefix="/api/transaction", tags=["Transaction"])  # NEW
