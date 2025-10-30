from Models.models import *

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(Text, nullable=False)
    last_name = Column(Text, nullable=False)
    email = Column(Text, unique=True, nullable=False)
    password_hash = Column(Text, nullable=True)
    total_points = Column(Integer, default=0)
    created_at = Column(TIMESTAMP, nullable=True)
    updated_at = Column(TIMESTAMP, nullable=True)

    boards = relationship("Boards", back_populates="user")
    tasks = relationship("Tasks", back_populates="user")
    categories = relationship("Categories", back_populates="user")
    rewards = relationship("Rewards", back_populates="user")
    roles = relationship("UserRoles", back_populates="user")