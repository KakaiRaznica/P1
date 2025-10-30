from Models.models import *

class UserRoles(Base):
    __tablename__ = "user_roles"

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    role_id = Column(Integer, ForeignKey("roles.id"), primary_key=True)

    user = relationship("Users", back_populates="roles")
    role = relationship("Roles", back_populates="users")