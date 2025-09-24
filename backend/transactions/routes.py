from fastapi import APIRouter, Depends, HTTPException
from .models import Transaction, TransactionCreate, TransactionRead, UpdateTransaction
from sqlmodel import Session, select
from typing import List
from .database import transac_engine, get_transac_session

transac_router=APIRouter()


@transac_router.post("/")
def create_transaction(transaction: TransactionCreate, session: Session=Depends(get_transac_session)):
    transaction=Transaction(**transaction.model_dump())
    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


@transac_router.get("/", response_model=List[TransactionRead])
def read_transactions(session: Session = Depends(get_transac_session)):
    transactions=session.exec(select(Transaction).order_by(Transaction.time.desc())).all()
    return transactions


@transac_router.get("/{id}", response_model=TransactionRead)
def read_transaction(id: int, session: Session = Depends(get_transac_session)):
    transaction=session.get(Transaction, id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction


@transac_router.put("/{id}", response_model=TransactionRead)
def update_transaction(id: int, updates: UpdateTransaction, session: Session = Depends(get_transac_session)):
    transaction=session.get(Transaction, id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    update_data = updates.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(transaction, key, value)

    session.add(transaction)
    session.commit()
    session.refresh(transaction)
    return transaction


@transac_router.delete("/{id}")
def delete_transaction(id: int, session: Session = Depends(get_transac_session)):
    transaction=session.get(Transaction, id)
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")

    session.delete(transaction)
    session.commit()
    return {"detail": "Transaction deleted successfully"}
