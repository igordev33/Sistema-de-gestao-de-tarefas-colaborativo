from configs.base import Base
from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

class User(Base):
    __tablename__="users"

    user_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    user_name: Mapped[str] = mapped_column(String(20), nullable=False)
    user_email: Mapped[str] = mapped_column(String(254), unique=True, nullable=False)
    user_password: Mapped[str] = mapped_column(String(255), nullable=False)
    admin: Mapped[bool] = mapped_column(Boolean, default=False)