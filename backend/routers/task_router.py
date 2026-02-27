from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

import schemas

from configs.session import get_db
from configs.security import verify_token
from services.task_services import task_services

task_router = APIRouter(prefix="/tasks", tags=["Tasks"], dependencies=[Depends(verify_token)])

@task_router.get("/")
def get_tasks(db:Session = Depends(get_db), page:int = 1, limit:int=12):
    response = task_services.get_all_tasks(db, page, limit)
    return response

@task_router.post("/", status_code=status.HTTP_201_CREATED)
def create_task(task:schemas.Create_task, db:Session = Depends(get_db)):
    response = task_services.create_task(db, task)
    return response

@task_router.patch("/{task_id}")
def complete_task(task_id:int,task_solution: schemas.CompleteTask, db: Session = Depends(get_db)):
    response = task_services.complete_task(db, task_id, task_solution)
    return response
    
    