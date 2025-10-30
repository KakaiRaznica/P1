from Models.models import *

class TaskTags(Base):
    __tablename__ = "task_tags"

    task_id = Column(Integer, ForeignKey("tasks.id"), primary_key=True)
    tag_id = Column(Integer, ForeignKey("tags.id"), primary_key=True)

    task = relationship("Tasks", back_populates="tags")
    tag = relationship("Tags", back_populates="task_links")