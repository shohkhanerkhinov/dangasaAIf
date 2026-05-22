from sqlalchemy import Column, Integer, String, DateTime, Boolean, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from .database import Base


class InstitutionType(str, enum.Enum):
    school = "school"
    college = "college"
    institute = "institute"
    university = "university"


class UserRole(str, enum.Enum):
    teacher = "teacher"
    student = "student"
    admin = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.student)
    institution_type = Column(Enum(InstitutionType), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    quizzes = relationship("Quiz", back_populates="creator", foreign_keys="Quiz.creator_id")


class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    subject = Column(String(100), nullable=True)
    difficulty = Column(String(20), default="medium")  # easy, medium, hard
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    creator = relationship("User", back_populates="quizzes", foreign_keys=[creator_id])
    questions = relationship("Question", back_populates="quiz", cascade="all, delete-orphan")


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=False)
    text = Column(Text, nullable=False)
    option_a = Column(String(500), nullable=False)
    option_b = Column(String(500), nullable=False)
    option_c = Column(String(500), nullable=True)
    option_d = Column(String(500), nullable=True)
    correct_answer = Column(String(1), nullable=False)  # A, B, C, D
    difficulty = Column(String(20), default="medium")
    order = Column(Integer, default=0)

    quiz = relationship("Quiz", back_populates="questions")


class SiteStats(Base):
    __tablename__ = "site_stats"

    id = Column(Integer, primary_key=True, index=True)
    total_visitors = Column(Integer, default=0)
    date = Column(DateTime(timezone=True), server_default=func.now())
