# Tree View:
```
backend
├── .env
├── Dockerfile
├── requirements.txt
└── src
    ├── __pycache__
    │   └── main.cpython-311.pyc
    ├── config
    │   ├── __pycache__
    │   │   └── settings.cpython-311.pyc
    │   └── settings.py
    ├── database
    │   ├── __pycache__
    │   │   └── session.cpython-311.pyc
    │   ├── base.py
    │   └── session.py
    ├── features
    │   ├── auth
    │   │   ├── __pycache__
    │   │   │   ├── manager.cpython-311.pyc
    │   │   │   ├── models.cpython-311.pyc
    │   │   │   ├── router.cpython-311.pyc
    │   │   │   └── schemas.cpython-311.pyc
    │   │   ├── manager.py
    │   │   ├── models.py
    │   │   ├── router.py
    │   │   └── schemas.py
    │   └── cv_builder
    │       ├── __pycache__
    │       │   └── router.cpython-311.pyc
    │       ├── models
    │       │   ├── __init__.py
    │       │   ├── __pycache__
    │       │   │   ├── __init__.cpython-311.pyc
    │       │   │   ├── education.cpython-311.pyc
    │       │   │   ├── experience.cpython-311.pyc
    │       │   │   └── profile.cpython-311.pyc
    │       │   ├── education.py
    │       │   ├── experience.py
    │       │   └── profile.py
    │       ├── router.py
    │       ├── routers
    │       │   ├── __init__.py
    │       │   ├── __pycache__
    │       │   │   ├── __init__.cpython-311.pyc
    │       │   │   ├── education.cpython-311.pyc
    │       │   │   ├── experience.cpython-311.pyc
    │       │   │   └── profile.cpython-311.pyc
    │       │   ├── education.py
    │       │   ├── experience.py
    │       │   └── profile.py
    │       └── schemas
    │           ├── __init__.py
    │           ├── __pycache__
    │           │   ├── __init__.cpython-311.pyc
    │           │   ├── education.cpython-311.pyc
    │           │   ├── experience.cpython-311.pyc
    │           │   └── profile.cpython-311.pyc
    │           ├── education.py
    │           ├── experience.py
    │           └── profile.py
    └── main.py

```

# Content:

## .env

```env
DATABASE_URL=postgresql+asyncpg://user:password@db:5432/cvmaker
SECRET_KEY=super-secret-key-change-me
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=cvmaker

```


## Dockerfile

```
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```


## requirements.txt

```txt
fastapi
uvicorn[standard]
sqlmodel
asyncpg
pydantic-settings
python-dotenv
fastapi-users[sqlalchemy]
```


## src/config/settings.py

```py
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()

```


## src/database/base.py

```py
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

```


## src/database/session.py

```py
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import AsyncGenerator
from src.config.settings import settings

engine = create_async_engine(settings.DATABASE_URL, echo=False, future=True)

async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

```


## src/features/auth/manager.py

```py
import uuid
from typing import Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    CookieTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase
from sqlmodel.ext.asyncio.session import AsyncSession
from src.config.settings import settings
from src.database.session import get_db
from src.features.auth.models import User


async def get_user_db(session: AsyncSession = Depends(get_db)):
    yield SQLAlchemyUserDatabase(session, User)


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = settings.SECRET_KEY
    verification_token_secret = settings.SECRET_KEY

    username_field = "email"

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} registered successfully.")


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)


cookie_transport = CookieTransport(
    cookie_name="auth_token",
    cookie_max_age=3600,
    cookie_samesite="lax",
    cookie_secure=False,
    cookie_path="/",
)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=settings.SECRET_KEY,
        lifetime_seconds=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

```


## src/features/auth/models.py

```py
import uuid
from typing import Optional, List, TYPE_CHECKING

from sqlmodel import Field, SQLModel, Relationship

if TYPE_CHECKING:
    from src.features.cv_builder.models.education import Education
    from src.features.cv_builder.models.experience import Experience
    from src.features.cv_builder.models.profile import Profile


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: uuid.UUID = Field(
        default_factory=uuid.uuid4, primary_key=True, index=True, nullable=False
    )
    email: str = Field(unique=True, index=True, nullable=False)
    hashed_password: str = Field(nullable=False)
    is_active: bool = Field(default=True, nullable=False)
    is_superuser: bool = Field(default=False, nullable=False)
    is_verified: bool = Field(default=False, nullable=False)

    first_name: Optional[str] = Field(default=None, nullable=True)
    last_name: Optional[str] = Field(default=None, nullable=True)

    profile: Optional["Profile"] = Relationship(back_populates="user")
    educations: List["Education"] = Relationship(back_populates="user")
    experiences: List["Experience"] = Relationship(back_populates="user")

```


## src/features/auth/router.py

```py
import uuid

from fastapi import APIRouter
from fastapi_users import FastAPIUsers
from src.features.auth.manager import auth_backend, get_user_manager
from src.features.auth.models import User
from src.features.auth.schemas import UserCreate, UserRead, UserUpdate

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

router = APIRouter()

# Auto-generates /login and /logout
router.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/jwt")

# Auto-generates /register
router.include_router(fastapi_users.get_register_router(UserRead, UserCreate))

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
)

current_active_user = fastapi_users.current_user(active=True)

```


## src/features/auth/schemas.py

```py
import uuid

from fastapi_users import schemas
from pydantic import EmailStr


class UserRead(schemas.BaseUser[uuid.UUID]):
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr


class UserCreate(schemas.BaseUserCreate):
    email: EmailStr
    password: str


class UserUpdate(schemas.BaseUserUpdate):
    pass

```


## src/features/cv_builder/models/__init__.py

```py
from .education import Education
from .experience import Experience
from .profile import Profile

__all__ = ["Profile", "Experience", "Education"]

```


## src/features/cv_builder/models/education.py

```py
import uuid
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from src.features.auth.models import User


class Education(SQLModel, table=True):
    __tablename__ = "educations"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", nullable=False)

    institution: str = Field(nullable=False)
    degree: str = Field(nullable=False)
    field_of_study: str = Field(nullable=False)
    location: str | None = Field(default=None, nullable=True)
    start_date: str = Field(nullable=False)
    end_date: str | None = Field(default=None, nullable=True)
    is_current: bool = Field(default=False, nullable=False)
    description: str | None = Field(default=None, nullable=True)

    user: "User" = Relationship(back_populates="educations")

```


## src/features/cv_builder/models/experience.py

```py
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

```


## src/features/cv_builder/models/profile.py

```py
import uuid
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from src.features.auth.models import User


class Profile(SQLModel, table=True):
    __tablename__ = "profiles"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id", unique=True, nullable=False)

    headline: str | None = Field(default=None, nullable=True)
    bio: str | None = Field(default=None, nullable=True)
    picture_url: str | None = Field(default=None, nullable=True)
    phone_number: str | None = Field(default=None, nullable=True)
    location: str | None = Field(default=None, nullable=True)
    driving_license: str | None = Field(default=None, nullable=True)
    linkedin_url: str | None = Field(default=None, nullable=True)
    github_url: str | None = Field(default=None, nullable=True)
    website_url: str | None = Field(default=None, nullable=True)
    tier: str = Field(default="Free", nullable=False)

    user: "User" = Relationship(back_populates="profile")

```


## src/features/cv_builder/router.py

```py
from fastapi import APIRouter
from .routers import profile_router, experience_router, education_router

router = APIRouter()

router.include_router(profile_router)
router.include_router(experience_router)
router.include_router(education_router)

```


## src/features/cv_builder/routers/__init__.py

```py
from .profile import router as profile_router
from .experience import router as experience_router
from .education import router as education_router

__all__ = ["profile_router", "experience_router", "education_router"]

```


## src/features/cv_builder/routers/education.py

```py
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

```


## src/features/cv_builder/routers/experience.py

```py
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

```


## src/features/cv_builder/routers/profile.py

```py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from src.database.session import get_db
from src.features.auth.models import User
from src.features.auth.router import current_active_user

from src.features.cv_builder.models.profile import Profile
from src.features.cv_builder.schemas.profile import ProfileCreate, ProfileRead, ProfileUpdate

router = APIRouter(prefix="/profile", tags=["profile"])

@router.get("", response_model=ProfileRead)
async def get_profile(
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    statement = select(Profile).where(Profile.user_id == user.id)
    result = await session.exec(statement)
    profile = result.first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("", response_model=ProfileRead, status_code=status.HTTP_201_CREATED)
async def create_profile(
    profile_in: ProfileCreate,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    # Check if profile already exists
    statement = select(Profile).where(Profile.user_id == user.id)
    result = await session.exec(statement)
    if result.first():
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    db_profile = Profile(**profile_in.model_dump(), user_id=user.id)
    session.add(db_profile)
    await session.commit()
    await session.refresh(db_profile)
    return db_profile

@router.patch("", response_model=ProfileRead)
async def update_profile(
    profile_in: ProfileUpdate,
    session: AsyncSession = Depends(get_db),
    user: User = Depends(current_active_user)
):
    statement = select(Profile).where(Profile.user_id == user.id)
    result = await session.exec(statement)
    db_profile = result.first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    update_data = profile_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_profile, key, value)
    
    session.add(db_profile)
    await session.commit()
    await session.refresh(db_profile)
    return db_profile

```


## src/features/cv_builder/schemas/__init__.py

```py
from .education import EducationCreate, EducationRead, EducationUpdate
from .experience import ExperienceCreate, ExperienceRead, ExperienceUpdate
from .profile import ProfileRead, ProfileUpdate, ProfileCreate

__all__ = [
    "ProfileRead",
    "ProfileUpdate",
    "ProfileCreate",
    "ExperienceRead",
    "ExperienceCreate",
    "ExperienceUpdate",
    "EducationRead",
    "EducationCreate",
    "EducationUpdate",
]

```


## src/features/cv_builder/schemas/education.py

```py
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

```


## src/features/cv_builder/schemas/experience.py

```py
import uuid

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

    model_config = {"from_attributes": True}


class ExperienceCreate(BaseModel):
    company: str
    position: str
    location: str | None = None
    start_date: str
    end_date: str | None = None
    is_current: bool = False
    description: str | None = None


class ExperienceUpdate(BaseModel):
    company: str | None = None
    position: str | None = None
    location: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    is_current: bool | None = None
    description: str | None = None

```


## src/features/cv_builder/schemas/profile.py

```py
from pydantic import BaseModel


class ProfileRead(BaseModel):
    headline: str | None = None
    bio: str | None = None
    picture_url: str | None = None
    phone_number: str | None = None
    location: str | None = None
    driving_license: str | None = None
    linkedin_url: str | None = None
    github_url: str | None = None
    website_url: str | None = None
    tier: str

    model_config = {"from_attributes": True}


class ProfileCreate(BaseModel):
    headline: str | None = None
    bio: str | None = None
    picture_url: str | None = None
    phone_number: str | None = None
    location: str | None = None
    driving_license: str | None = None
    linkedin_url: str | None = None
    github_url: str | None = None
    website_url: str | None = None
    tier: str = "Free"


class ProfileUpdate(BaseModel):
    headline: str | None = None
    bio: str | None = None
    picture_url: str | None = None
    phone_number: str | None = None
    location: str | None = None
    driving_license: str | None = None
    linkedin_url: str | None = None
    github_url: str | None = None
    website_url: str | None = None

```


## src/main.py

```py
from contextlib import asynccontextmanager
from typing import List

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, select
from sqlmodel.ext.asyncio.session import AsyncSession
from src.database.session import engine, get_db
from src.features.auth.models import User
from src.features.auth.router import current_active_user
from src.features.auth.router import router as auth_router

# Import models to ensure they are registered with SQLModel.metadata
from src.features.cv_builder.models import Education, Experience, Profile
from src.features.cv_builder.router import router as cv_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Dynamic table generation on startup to avoid initial migration steps
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    yield


app = FastAPI(title="CV Maker API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(cv_router, prefix="/api/cv", tags=["cv"])


@app.get("/")
async def root():
    return {"status": "healthy", "service": "CV Maker API"}


@app.get("/api/users", response_model=List[User], tags=["users"])
async def list_users(
    session: AsyncSession = Depends(get_db),
):
    statement = select(User)
    result = await session.exec(statement)
    users = result.all()
    return users


# Example protected route to extend into your future CV Builder modules
@app.get("/api/protected-route", tags=["secure"])
async def protected_endpoint(user: User = Depends(current_active_user)):
    return {"message": "Access granted via fastapi-users!", "user_email": user.email}

```

