import uuid

from pydantic import BaseModel


class EducationRead(BaseModel):
    id: uuid.UUID
    institution: str
    degree: str
    field_of_study: str
    location: str | None = None
    start_date: str
    end_date: str | None = None
    is_current: bool
    description: str | None = None

    model_config = {"from_attributes": True}


class EducationCreate(BaseModel):
    institution: str
    degree: str
    field_of_study: str
    location: str | None = None
    start_date: str
    end_date: str | None = None
    is_current: bool = False
    description: str | None = None


class EducationUpdate(BaseModel):
    institution: str | None = None
    degree: str | None = None
    field_of_study: str | None = None
    location: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    is_current: bool | None = None
    description: str | None = None
