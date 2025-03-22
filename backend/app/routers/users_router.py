from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, database, crud
from app.auth import get_password_hash
from typing import List

router = APIRouter()

# Dependency để inject session DB
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Lấy danh sách toàn bộ người dùng (admin dùng)
@router.get("/", response_model=List[schemas.UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

# ✅ Lấy thông tin 1 user theo username
@router.get("/{username}", response_model=schemas.UserResponse)
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# ✅ Tạo 1 user mới (chỉ dùng nội bộ, không qua `/auth/register`)
@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = crud.get_user_by_username(db, user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_pw = get_password_hash(user.password)
    new_user = models.User(
        username=user.username,
        email=user.email,
        display_name=user.display_name,
        hashed_password=hashed_pw,
        referral_code=user.referral_code
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user