from sqlalchemy.orm import Session
from app import models

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_transaction(db: Session, user_id: int, amount: int, method: str):
    txn = models.Transaction(user_id=user_id, amount=amount, method=method)
    db.add(txn)
    db.commit()
    db.refresh(txn)
    return txn

def get_user_transactions(db: Session, user_id: int):
    return db.query(models.Transaction).filter(models.Transaction.user_id == user_id).order_by(models.Transaction.timestamp.desc()).all()
