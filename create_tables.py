from Models import *
from Models.models import Base
from database_connection import engine
import asyncio

from Models.users import Users
from Models.boards import Boards
from Models.tasks import Tasks
from Models.task_status import TaskStatus
from Models.categories import Categories
from Models.tags import Tags
from Models.task_tags import TaskTags
from Models.rewards import Rewards
from Models.reward_types import RewardTypes
from Models.roles import Roles
from Models.user_roles import UserRoles

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

asyncio.run(create_tables())
