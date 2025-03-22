from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TransactionResponse(BaseModel):
    id: int
    amount: int
    method: str
    timestamp: datetime

    model_config = {
        "from_attributes": True
    }

# ... các schema khác như UserCreate, ProxyBuyRequest, v.v.
