from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime
from .models import UserRole, InstitutionType


# ─── Auth Schemas ────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    role: UserRole
    institution_type: InstitutionType

    @field_validator("first_name", "last_name")
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name cannot be empty")
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters")
        return v

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    role: UserRole
    institution_type: InstitutionType
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class TokenData(BaseModel):
    user_id: Optional[int] = None


# ─── Stats Schemas ────────────────────────────────────────────────────────────

class StatsResponse(BaseModel):
    total_visitors: int
    registered_users: int
    active_users: int
