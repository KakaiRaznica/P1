from Models.models import *

class Roles(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, unique=True, nullable=False)
    description = Column(Text, nullable=True)

    users = relationship("UserRoles", back_populates="role")