from fastapi import FastAPI, APIRouter, Depends
from transactions.routes import transac_router
from transactions.database import init_transac_db
from users.routes import user_router
from users.database import init_user_db
from firebase import firebase_auth
import os


app=FastAPI()

wow=APIRouter()
app.include_router(transac_router, prefix="/transaction")
app.include_router(user_router, prefix="/user")

init_user_db()
init_transac_db()

@wow.get("/")
def read_root():
    return {"message":"Hello World!"}


@wow.post("/verify-token")
async def verify_token(user: dict=Depends(firebase_auth)):
    return {"uid": user["uid"], "email": user.get("email")}


app.include_router(wow, prefix="/wow")

# Testing Firebase  (NOTE: Remember to comment this out later)

async def fake_firebase_auth():
    return {
         "uid": "test-uid-123",
         "email": "test@example.com"
     }

if os.getenv("ENV", "dev")=="dev":
    app.dependency_overrides[firebase_auth]=fake_firebase_auth