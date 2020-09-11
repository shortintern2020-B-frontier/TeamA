#masui
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

database_file = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'db.sqlite3')
engine = create_engine('sqlite:///' + database_file, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,autoflush=False,bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    from models import models
    Base.metadata.create_all(bind=engine)

    # 初期データ登録
    db_session.add(models.User("a.com","A","hoge",2,50))
    db_session.add(models.User("b.com","B","hoge",2,100))
    db_session.add(models.User("c.com","C","hoge",8,400))
    db_session.add(models.Cook_history(1,1))
    db_session.add(models.Cook_history(2,2))
    db_session.add(models.Cook_history(1,2))
    db_session.add(models.Cook_history(1,1))
    db_session.add(models.Cook_history(2,3))
    db_session.add(models.Meal_content("カレー",50))
    db_session.add(models.Meal_content("餃子",50))
    db_session.add(models.Meal_content("チャーハン",50))
    db_session.add(models.Meal_content("ビーフストロガノフ",50))
    db_session.add(models.Meal_content("味噌汁",50))
    db_session.add(models.Point_user(1,50,'2020-09-07'))
    db_session.add(models.Point_user(1,100,'2020-09-09'))
    db_session.add(models.Post(1,1,None,None,None,None,"curry.jpg","おいしかった","curry.html","2020-09-07 19:08:24"))
    db_session.add(models.Post(2,1,None,None,None,None,"gyoza.jpg","まずかった","gyoza.html","2020-09-09 19:08:24"))
    db_session.add(models.User_relation(1,2))
    db_session.add(models.User_relation(1,3))
    db_session.add(models.User_relation(2,1))
    db_session.commit()

# from models import *
# Base.metadata.create_all(engine)
# SessionMaker = sessionmaker(bind=engine)
# session = SessionMaker()

# meal1 = Meal_content(meal_id=0, name="rice")
# session.add(meal1)
# session.commit()