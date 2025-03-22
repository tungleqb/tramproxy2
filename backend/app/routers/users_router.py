from fastapi import APIRouter, Depends, HTTPException, Security, Body
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from app import models, schemas, database
from app.auth import get_password_hash, SECRET_KEY, ALGORITHM

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=True)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> models.User:
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/profile", response_model=schemas.UserResponse)
def get_profile(current_user: models.User = Security(get_current_user)):
    return current_user

@router.put("/update", response_model=schemas.UserResponse)
def update_profile(display_name: str = Body(...), email: str = Body(...), current_user: models.User = Security(get_current_user), db: Session = Depends(get_db)):
    current_user.display_name = display_name
    current_user.email = email
    db.commit()
    db.refresh(current_user)
    return current_user
