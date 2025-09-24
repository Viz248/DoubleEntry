from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from .models import User, UserCreate, UserRead, UserUpdate
from .database import get_user_session
from firebase import firebase_auth

user_router=APIRouter()

@user_router.get("/me", response_model=UserRead)
async def get_user(decoded_token: dict=Depends(firebase_auth),
    session: Session=Depends(get_user_session)
):
    uid=decoded_token["uid"]

    filtered_user=session.exec(select(User).where(User.uid==uid)).first()
    if not filtered_user:
        raise HTTPException(status_code=404, detail="User not found")
    return filtered_user


@user_router.post("/")
async def create_user(user:UserCreate,
    decoded_token: dict=Depends(firebase_auth), 
    session: Session=Depends(get_user_session)
):
    uid=decoded_token["uid"]
    email=decoded_token.get("email")

    filtered_user=session.exec(select(User).where(User.uid==uid)).first()
    if filtered_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    new_user=User(uid=uid, email=email, **user.model_dump())
    session.add(new_user)    # stages
    session.commit()
    session.refresh(new_user)
    return new_user


@user_router.patch("/me", response_model=UserRead)
async def update_user(
    updated_user: UserUpdate,
    decoded_token: dict=Depends(firebase_auth),
    session: Session=Depends(get_user_session)
):

    uid=decoded_token["uid"]

    filtered_user=session.exec(select(User).where(User.uid==uid)).first()
    if not filtered_user:
        raise HTTPException(status_code=404, detail="User not found")   
    updates=updated_user.model_dump(exclude_unset=True)
    for key,value in updates.items():
        setattr(filtered_user,key,value)
        
    session.add(filtered_user)
    session.commit()
    session.refresh(filtered_user)
    return filtered_user 
