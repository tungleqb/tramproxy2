from fastapi import APIRouter, Depends, HTTPException, Security
from sqlalchemy.orm import Session
from app import database, models, schemas, crud
from app.routers.users_router import get_current_user

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/deposit")
def deposit_money(request: schemas.DepositRequest, current_user: models.User = Security(get_current_user), db: Session = Depends(get_db)):
    if request.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")
    txn = crud.create_transaction(db, user_id=current_user.id, amount=request.amount, method=request.method)
    return {"message": "Deposit successful", "transaction_id": txn.id}

@router.get("/transaction/history", response_model=list[schemas.TransactionResponse])
def transaction_history(current_user: models.User = Security(get_current_user), db: Session = Depends(get_db)):
    return crud.get_user_transactions(db, user_id=current_user.id)
