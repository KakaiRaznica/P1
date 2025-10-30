from Models.models import *

class Rewards(Base):
    __tablename__ = "rewards"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type_id = Column(Integer, ForeignKey("reward_types.id"))
    points_amount = Column(Integer, nullable=True)
    awarded_at = Column(TIMESTAMP, nullable=True)
    reason = Column(Text, nullable=True)

    user = relationship("Users", back_populates="rewards")
    type = relationship("RewardTypes", back_populates="rewards")