import uuid
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from src.features.auth.models import User


class Experience(SQLModel, table=True):
    __tablename__ = "experiences"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)

    company: str = Field(nullable=False)
    position: str = Field(nullable=False)
    location: str | None = Field(default=None, nullable=True)
    start_date: str = Field(nullable=False)
    end_date: str | None = Field(default=None, nullable=True)
    is_current: bool = Field(default=False, nullable=False)
    description: str | None = Field(default=None, nullable=True)

    user: "User" = Relationship(back_populates="experiences")
