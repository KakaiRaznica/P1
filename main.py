import datetime
from Models import *

import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated, List, Optional
from datetime import datetime

from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database_connection import get_session
from Models.users import Users

app = FastAPI(title="Async FastAPI with PostgreSQL")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # или ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    password_hash: Optional[str] = None
    total_points: Optional[int] = 0

class UserResponse(UserCreate):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = {
        "from_attributes": True
    }

@app.post("/users", response_model=UserResponse)
async def create_user(data: UserCreate, session: Annotated[AsyncSession, Depends(get_session)]):
    new_user = Users(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        password_hash=data.password_hash,
        total_points=data.total_points,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return new_user

@app.get("/users", response_model=List[UserResponse])
async def get_users(session: Annotated[AsyncSession, Depends(get_session)]):
    result = await session.execute(select(Users))
    users = result.scalars().all()
    return users

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    user = await session.get(Users, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
