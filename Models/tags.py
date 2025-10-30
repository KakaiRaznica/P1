from Models.models import *

class Tags(Base):
    __tablename__ = "tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Text, unique=True, nullable=False)

    task_links = relationship("TaskTags", back_populates="tag")