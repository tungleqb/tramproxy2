from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import List
from jose import JWTError, jwt

from app import models, schemas, database, crud
from app.auth import get_password_hash, SECRET_KEY, ALGORITHM

router = APIRouter()

# ✅ Sửa tokenUrl không có dấu / phía trước để Swagger hiểu đúng
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=True)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = crud.get_user_by_username(db, username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# ✅ GET /users/me (trả về thông tin user hiện tại), Swagger sẽ hiển thị 🔒 nếu get_current_user có Depends(oauth2_scheme)
@router.get("/me", response_model=schemas.UserResponse, tags=["Users"])
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# ✅ GET /users/ (admin dùng - trả danh sách toàn bộ user)
@router.get("/", response_model=List[schemas.UserResponse], tags=["Users"])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

# ✅ GET /users/{username}
@router.get("/{username}", response_model=schemas.UserResponse, tags=["Users"])
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# ✅ POST /users/ - tạo user mới
@router.post("/", response_model=schemas.UserResponse, tags=["Users"])
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
