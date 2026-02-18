from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from configs.security import verify_admin
from schemas.auth_schemas import CreateUser, Login, RefreshToken

from configs.session import get_db
from services.auth_services import auth_services

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/create_user", status_code=status.HTTP_201_CREATED)
def create_user(user: CreateUser, session: Session = Depends(get_db), credentials: dict = Depends(verify_admin)):
    return auth_services.create_user(session, user)

@auth_router.post("/login")
def login(user: Login, session: Session = Depends(get_db)):
    return auth_services.login(session, user)

@auth_router.post("/refresh")
def refresh_token(token: RefreshToken, session: Session = Depends(get_db)):
    return auth_services.refresh_token(session, token.refresh_token)