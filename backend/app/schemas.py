from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    display_name: str
    referral_code: str = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    display_name: str

    model_config = {
        "from_attributes": True  # Thay vì orm_mode = True
    }

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    username: str
    password: str
    
class ProxyResponse(BaseModel):
    id: int
    ip: str
    port: str
    type: str
    status: str

    model_config = {
        "from_attributes": True
    }

