from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    display_name: str
    referral_code: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    display_name: str

    model_config = {
        "from_attributes": True
    }

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    username: str
    password: str

class ProxyBuyRequest(BaseModel):
    type: str
    duration_days: int

class ProxyRenewRequest(BaseModel):
    proxy_id: int
    duration_days: int

class DepositRequest(BaseModel):
    amount: int
    method: str

class TransactionResponse(BaseModel):
    id: int
    amount: int
    method: str
    timestamp: datetime

    model_config = {
        "from_attributes": True
    }
class ProxyResponse(BaseModel):
    id: int
    ip: str
    port: str
    type: str
    status: str

    model_config = {
        "from_attributes": True
    }