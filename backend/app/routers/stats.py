from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api/stats", tags=["Statistics"])


@router.get("/", response_model=schemas.StatsResponse)
def get_stats(db: Session = Depends(get_db)):
    total_users = db.query(models.User).count()
    active_users = db.query(models.User).filter(models.User.is_active == True).count()

    return schemas.StatsResponse(
        total_visitors=total_users + 16480,  # base count
        registered_users=total_users,
        active_users=active_users,
    )
