from fastapi import APIRouter
from .routers import profile_router, experience_router, education_router

router = APIRouter()

router.include_router(profile_router)
router.include_router(experience_router)
router.include_router(education_router)
