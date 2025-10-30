from Models.models import *

class RewardTypes(Base):
    __tablename__ = "reward_types"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(Text, unique=True, nullable=False)
    name = Column(Text, nullable=False)
    description = Column(Text, nullable=True)

    rewards = relationship("Rewards", back_populates="type")