from Models.models import *

class Categories(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(Text, nullable=False)
    color = Column(Text, nullable=True)

    user = relationship("Users", back_populates="categories")
    tasks = relationship("Tasks", back_populates="category")