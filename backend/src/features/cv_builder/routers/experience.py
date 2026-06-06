import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.database.session import get_db
from src.features.auth.models import User
from src.features.auth.router import current_active_user

from src.features.cv_builder.models.experience import Experience
from src.features.cv_builder.schemas.experience import ExperienceCreate, ExperienceRead, ExperienceUpdate

router = APIRouter(prefix="/experience", tags=["experience"])

@router.get("", response_model=List[ExperienceRead])
async def list_experience(
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    statement = select(Experience).where(Experience.user_id == user.id)
    result = await session.exec(statement)
    return result.all()

@router.post("", response_model=ExperienceRead, status_code=status.HTTP_201_CREATED)
async def create_experience(
    experience_in: ExperienceCreate,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    db_experience = Experience(**experience_in.model_dump(), user_id=user.id)
    session.add(db_experience)
    await session.commit()
    await session.refresh(db_experience)
    return db_experience

@router.patch("/{experience_id}", response_model=ExperienceRead)
async def update_experience(
    experience_id: uuid.UUID,
    experience_in: ExperienceUpdate,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    statement = select(Experience).where(Experience.id == experience_id, Experience.user_id == user.id)
    result = await session.exec(statement)
    db_experience = result.first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    update_data = experience_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_experience, key, value)
    
    session.add(db_experience)
    await session.commit()
    await session.refresh(db_experience)
    return db_experience

@router.delete("/{experience_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_experience(
    experience_id: uuid.UUID,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    statement = select(Experience).where(Experience.id == experience_id, Experience.user_id == user.id)
    result = await session.exec(statement)
    db_experience = result.first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    
    await session.delete(db_experience)
    await session.commit()
    return None
