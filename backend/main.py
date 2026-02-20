from fastapi import FastAPI
from configs.base import Base
from configs.db_config import engine
import models
from routers import auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API para sistema de gestão de tarefas",
    description="API criada para alimentar um sistema de gestão de tarefas",
    version="1.0.0",
    contact={
        "name": "Igor Augusto",
        "email": "igoraf.dev33@hotmail.com"
    }
)

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost",
        "http://72.60.255.112"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from models import Task
from routers.task_router import task_router
from routers.auth_router import auth_router

app.include_router(task_router)
app.include_router(auth_router)

