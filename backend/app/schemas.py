from datetime import datetime
class TransactionResponse(BaseModel):
    id: int
    amount: int
    method: str
    timestamp: datetime

    model_config = {
        "from_attributes": True
    }
