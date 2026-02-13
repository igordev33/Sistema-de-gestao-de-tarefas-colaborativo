from datetime import date
from configs.base import Base
from sqlalchemy import String, Date
from sqlalchemy.orm import Mapped, mapped_column

class Task(Base):
    __tablename__ = "tasks"

    task_id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True) 
    task_title: Mapped[str] = mapped_column(String(50), nullable=False)
    task_description: Mapped[str] = mapped_column(String(500), nullable=False)
    task_priority: Mapped[str] = mapped_column(String(10), nullable=False)
    task_status: Mapped[str] = mapped_column(String(15), nullable=False)
    task_created_by: Mapped[str] = mapped_column(String(20), nullable=False)
    task_solution: Mapped[str] = mapped_column(String(500), nullable=True)
    task_creation_date = mapped_column(Date, default=date.today)
    