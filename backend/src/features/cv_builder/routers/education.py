import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.database.session import get_db
from src.features.auth.models import User
from src.features.auth.router import current_active_user

from src.features.cv_builder.models.education import Education
from src.features.cv_builder.schemas.education import EducationCreate, EducationRead, EducationUpdate

router = APIRouter(prefix="/education", tags=["education"])

@router.get("", response_model=List[EducationRead])
async def list_education(
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    statement = select(Education).where(Education.user_id == user.id)
    result = await session.exec(statement)
    return result.all()

@router.post("", response_model=EducationRead, status_code=status.HTTP_201_CREATED)
async def create_education(
    education_in: EducationCreate,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    db_education = Education(**education_in.model_dump(), user_id=user.id)
    session.add(db_education)
    await session.commit()
    await session.refresh(db_education)
    return db_education

@router.patch("/{education_id}", response_model=EducationRead)
async def update_education(
    education_id: uuid.UUID,
    education_in: EducationUpdate,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    statement = select(Education).where(Education.id == education_id, Education.user_id == user.id)
    result = await session.exec(statement)
    db_education = result.first()
    if not db_education:
        raise HTTPException(status_code=404, detail="Education not found")
    
    update_data = education_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_education, key, value)
    
    session.add(db_education)
    await session.commit()
    await session.refresh(db_education)
    return db_education

@router.delete("/{education_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_education(
    education_id: uuid.UUID,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    statement = select(Education).where(Education.id == education_id, Education.user_id == user.id)
    result = await session.exec(statement)
    db_education = result.first()
    if not db_education:
        raise HTTPException(status_code=404, detail="Education not found")
    
    await session.delete(db_education)
    await session.commit()
    return None
