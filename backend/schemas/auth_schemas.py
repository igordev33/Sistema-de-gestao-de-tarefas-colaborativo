from pydantic import BaseModel

class CreateUser(BaseModel):
    user_name: str
    user_email: str
    user_password: str

class Login(BaseModel):
    user_email: str
    user_password: str

class RefreshToken(BaseModel):
    refresh_token: str