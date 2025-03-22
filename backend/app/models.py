from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    display_name = Column(String)
    hashed_password = Column(String)
    referral_code = Column(String, unique=True)
    is_active = Column(Boolean, default=True)

class Proxy(Base):
    __tablename__ = "proxies"
    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String, index=True)
    port = Column(String)
    type = Column(String)  # HTTP, SOCKS5, v.v.
    status = Column(String, default="active")


