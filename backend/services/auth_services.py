from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.User import User
from configs.security import crypt_context, require_env
from schemas.auth_schemas import CreateUser, Login
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt

class auth_services():
    ACESS_TOKEN_EXPIRE_MINUTES = int(require_env("ACCESS_TOKEN_EXPIRE_MINUTES"))

    @staticmethod
    def generate_jwt_token(user, acess_token_expire_minutes = timedelta(minutes=30)):
        SECRET_KEY = require_env("SECRET_KEY")
        ALGORITHM = require_env("ALGORITHM")
        expire = datetime.now(timezone.utc) + acess_token_expire_minutes

        data = {
            "sub": user.user_email,
            "name": user.user_name,
            "admin": user.admin,
            "exp": expire
        }

        encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

        return encoded_jwt
    
    @staticmethod
    def create_user(session: Session, user: CreateUser): 
        exists_user = session.query(User).filter(User.user_email == user.user_email).first()

        if exists_user:
            raise HTTPException(status_code=400, detail="Já existe um usuário com esse e-mail cadastrado.")     
           
        encrypted_password = crypt_context.hash(user.user_password)
        
        new_user= User(
            user_name = user.user_name,
            user_password = encrypted_password,
            user_email = user.user_email
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        return {
            "message": "Usuário cadastrada com sucesso",
            "user": new_user
        }

    @staticmethod
    def login(session: Session, user: Login):
        query = session.query(User).filter(User.user_email == user.user_email).first()

        if not query:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")

        password_is_valid = crypt_context.verify(user.user_password, query.user_password)

        if not password_is_valid:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")
        
        access_token = auth_services.generate_jwt_token(query)
        refresh_token = auth_services.generate_jwt_token(query, acess_token_expire_minutes=timedelta(days=7))
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    
    @staticmethod
    def refresh_token(session: Session, token: str):
        SECRET_KEY = require_env("SECRET_KEY")
        ALGORITHM = require_env("ALGORITHM")

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        except JWTError:
            raise HTTPException(status_code=401, detail="Refresh token inválido ou expirado")
        
        user = session.query(User).filter(User.user_email == payload["sub"]).first()

        if not user:
            raise HTTPException(status_code=401, detail="Usuário não contrado")
        
        new_token = auth_services.generate_jwt_token(user)
        return {"access_token": new_token, "token_type": "bearer"}