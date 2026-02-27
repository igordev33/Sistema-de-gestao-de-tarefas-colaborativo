from math import ceil
from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session
from models import Task
from schemas import Create_task
from schemas.task_schemas import CompleteTask

class task_services():

    @staticmethod
    def get_all_tasks(session: Session, page:int, limit:int):
        query = session.query(Task).order_by(Task.task_id.desc())
        tasks = query.offset((page -1) * limit).limit(limit).all()
        if page < 1 or limit < 1:
            raise HTTPException(
                status_code=400,
                detail="Página ou limite inválidos!"
            )
        total_tasks = session.query(func.count(Task.task_id)).scalar()
        return {
            "page": page,
            "limit": limit,
            "total_tasks": total_tasks,
            "total_pages": ceil(total_tasks / limit),
            "tasks": [{
                "task_id": task.task_id, 
                "task_title": task.task_title, 
                "task_description": task.task_description, 
                "task_priority": task.task_priority, 
                "task_status": task.task_status, 
                "task_created_by": task.task_created_by,
                "task_solution": task.task_solution,
                "task_creation_date": task.task_creation_date
            } for task in tasks]}

    @staticmethod
    def create_task(session: Session, task: Create_task):
        new_task = Task(
                task_title = task.task_title, 
                task_description = task.task_description,
                task_priority = task.task_priority,
                task_status = task.task_status,
                task_created_by = task.task_created_by
            )
        session.add(new_task)
        session.commit()
        session.refresh(new_task)
        return {
            "message": "Task created successfully",
            "task": new_task
        }

    @staticmethod
    def complete_task(session: Session, task_id: int, task_solution: CompleteTask):
        task = session.query(Task).filter(Task.task_id == task_id).first()
        if not task:
            raise HTTPException(status_code=404, detail="Task not found.")
        task.task_status = "done"
        task.task_solution = task_solution.task_solution
        session.commit()
        session.refresh(task)
        return {"message": "Task completed successfully."}
