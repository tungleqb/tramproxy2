from fastapi import APIRouter, Depends, HTTPException, Security
from sqlalchemy.orm import Session
from typing import List
from app import database, models, schemas
from app.routers.users_router import get_current_user

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/list", response_model=List[schemas.ProxyResponse])
def list_user_proxies(current_user: models.User = Security(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Proxy).filter(models.Proxy.status == "active").all()

@router.post("/buy")
def buy_proxy(request: schemas.ProxyBuyRequest, current_user: models.User = Security(get_current_user), db: Session = Depends(get_db)):
    if request.type not in ["HTTP", "SOCKS5"]:
        raise HTTPException(status_code=400, detail="Invalid proxy type")

    new_proxy = models.Proxy(ip="127.0.0.1", port="8080", type=request.type, status="active")
    db.add(new_proxy)
    db.commit()
    db.refresh(new_proxy)
    return {"message": "Proxy purchased successfully", "proxy_id": new_proxy.id}

@router.post("/renew")
def renew_proxy(request: schemas.ProxyRenewRequest, current_user: models.User = Security(get_current_user), db: Session = Depends(get_db)):
    proxy = db.query(models.Proxy).filter(models.Proxy.id == request.proxy_id).first()
    if not proxy:
        raise HTTPException(status_code=404, detail="Proxy not found")
    return {"message": "Proxy renewed for {} days".format(request.duration_days)}
