from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timedelta, timezone

IST=timezone(timedelta(hours=5, minutes=30))

class TransactionBase(SQLModel):
    title: str
    amount: float
    category: str
    
class Transaction(TransactionBase, table=True):
    id: Optional[int]=Field(default=None, primary_key=True)
    time: datetime=Field(default_factory=lambda: datetime.now(IST))

class TransactionCreate(TransactionBase):
    pass

class TransactionRead(SQLModel):
    id: int
    title: str
    amount: float
    category: str

class UpdateTransaction(SQLModel):
    title: Optional[str]=None
    amount: Optional[float]=None
    category: Optional[str]=None
