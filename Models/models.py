from sqlalchemy import Column, Integer, Text, TIMESTAMP, ForeignKey, JSON
from sqlalchemy.orm import DeclarativeBase, relationship

class Base(DeclarativeBase):
    pass