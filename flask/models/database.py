#masui
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

databese_file = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'db.sqlite3')
engine = create_engine('sqlite:///' + databese_file, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,autoflush=False,bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import models.models
    Base.metadata.create_all(bind=engine)

    db_session.add(User("a.com","A","hoge",2,50))
    db_session.add(User("b.com","B","hoge",2,100))
    db_session.add(User("c.com","C","hoge",8,400))
    db_session.add(Cook_history(1,1))
    db_session.add(Cook_history(2,2))
    db_session.add(Cook_history(1,2))
    db_session.add(Cook_history(1,1))
    db_session.add(Cook_history(2,3))
    db_session.add(Meal_content("カレー",50))
    db_session.add(Meal_content("餃子",50))
    db_session.add(Meal_content(1,50,'2020-09-07'))
    db_session.add(Meal_content(1,100,'2020-09-09'))
    db_session.add(Post(1,1,None,None,None,None,"curry.jpg","おいしかった","curry.html","2020-09-07 19:08:24"))
    db_session.add(Post(2,1,None,None,None,None,"gyoza.jpg","まずかった","gyoza.html","2020-09-09 19:08:24"))
    db_session.add(User_relation(1,2))
    db_session.add(User_relation(1,3))
    db_session.add(User_relation(2,1))
    db_session.commit()

# 9/7 init_dbをすると次のエラーがでる．
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "/home/rakuten_intern2020/back1/flask/models/database.py", line 17, in init_db
#     db_session.add(User("a.com","A","hoge",2,50))
# NameError: name 'User' is not defined

# from models import *
# Base.metadata.create_all(engine)
# SessionMaker = sessionmaker(bind=engine)
# session = SessionMaker()

# meal1 = Meal_content(meal_id=0, name="rice")
# session.add(meal1)
# session.commit()