import secrets
from warnings import deprecated
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from passlib.context import CryptContext
import os
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt

load_dotenv()

def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Váriavel de ambiente {name} não definida")
    return value

security = HTTPBasic()

meu_usuario = require_env("API_USER")
minha_senha = require_env("API_PASSWORD")


def autenticar_usuario(credentials: HTTPBasicCredentials = Depends(security)):
    is_username_correct = secrets.compare_digest(credentials.username, meu_usuario)
    is_password_correct = secrets.compare_digest(credentials.password, minha_senha)

    if not(is_username_correct and is_password_correct):
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha incorretos!",
            headers={"WWW-Authenticate": "Basic"}
        )
    
crypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

bearer_scheme = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    SECRET_KEY = require_env("SECRET_KEY")
    ALGORITHM = require_env("ALGORITHM")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception as e:
        print(f"Erro ao validar token: {e}")
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")
    
def verify_admin(payload: dict = Depends(verify_token)):
    if not payload.get("admin"):
        raise HTTPException(status_code=403, detail="Acesso restrito a administradores")
    return payload
