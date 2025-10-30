from Models.models import *

class Tasks(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    board_id = Column(Integer, ForeignKey("boards.id"))
    status_id = Column(Integer, ForeignKey("task_status.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))

    title = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    ai_analysis_metadata = Column(JSON, nullable=True)
    estimated_points = Column(Integer, nullable=True)
    awarded_points = Column(Integer, nullable=True)
    due_date = Column(TIMESTAMP, nullable=True)
    completed_at = Column(TIMESTAMP, nullable=True)
    created_at = Column(TIMESTAMP, nullable=True)
    updated_at = Column(TIMESTAMP, nullable=True)

    user = relationship("Users", back_populates="tasks")
    board = relationship("Boards", back_populates="tasks")
    status = relationship("TaskStatus", back_populates="tasks")
    category = relationship("Categories", back_populates="tasks")
    tags = relationship("TaskTags", back_populates="task")