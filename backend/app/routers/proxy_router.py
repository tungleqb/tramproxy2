from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import database, models, schemas

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.ProxyResponse])
def get_proxies(db: Session = Depends(get_db)):
    return db.query(models.Proxy).all()
