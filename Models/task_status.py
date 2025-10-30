from Models.models import *

class TaskStatus(Base):
    __tablename__ = "task_status"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(Text, unique=True, nullable=False)
    name = Column(Text, nullable=False)

    tasks = relationship("Tasks", back_populates="status")