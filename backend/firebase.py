import firebase_admin
from firebase_admin import credentials, auth
import os
import json
from typing import Optional
from fastapi import HTTPException, Header, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv

load_dotenv()
service_account_json=os.getenv("SERVICE_ACC_PATH")
if not service_account_json:
    raise Exception("SERVICE_ACC_PATH env variable not set")

cred=credentials.Certificate(service_account_json)
firebase_admin.initialize_app(cred)

def verify_firebase_token(id_token: str):
    try:
        decoded_token=auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        print(e)
        return None


class FirebaseTokenBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(FirebaseTokenBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request) -> dict:
        credentials: HTTPAuthorizationCredentials = await super(
            FirebaseTokenBearer, self
        ).__call__(request)

        if not credentials:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid authentication credentials",
            )

        if credentials.scheme != "Bearer":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid authentication scheme. Use Bearer token.",
            )

        try:
            decoded_token = verify_firebase_token(credentials.credentials)
            return decoded_token
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=str(e),
            )

firebase_auth=FirebaseTokenBearer()