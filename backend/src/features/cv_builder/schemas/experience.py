import uuid
from typing import List

from pydantic import BaseModel


class ExperienceRead(BaseModel):
    id: uuid.UUID
    company: str
    position: str
    location: str | None = None
    start_date: str
    end_date: str | None = None
    is_current: bool
    description: str | None = None
    bullets: List[str] = []

    model_config = {"from_attributes": True}


class ExperienceCreate(BaseModel):
    company: str
    position: str
    location: str | None = None
    start_date: str
    end_date: str | None = None
    is_current: bool = False
    description: str | None = None
    bullets: List[str] = []


class ExperienceUpdate(BaseModel):
    company: str | None = None
    position: str | None = None
    location: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    is_current: bool | None = None
    description: str | None = None
    bullets: List[str] = []
