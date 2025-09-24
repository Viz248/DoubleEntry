from typing import Optional
from datetime import datetime
from sqlmodel import SQLModel, Field


class UserBase(SQLModel):
    display_name: Optional[str]=None
    age: Optional[int]=None
    gender: Optional[str]=None


class User(UserBase, table=True):
    uid: str=Field(primary_key=True, index=True)
    email: str=Field(index=True)


class UserCreate(UserBase):
    pass


class UserRead(User):
    pass


class UserUpdate(UserBase):
    pass

