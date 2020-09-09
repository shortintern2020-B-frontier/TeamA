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

'''
db.sqlite3を削除
How to use in terminal

from models.database import init_db
init_db()
'''

def init_db():
    from models import models
    Base.metadata.create_all(bind=engine)

    # 初期データ登録
    db_session.add(models.User("a.com","木村太郎","hoge",2,50))
    db_session.add(models.User("b.com","木村花子","hoge",2,100))
    db_session.add(models.User("c.com","木本一郎","hoge",8,400))
    db_session.add(models.User("rakuten.com","楽天熊猫","hoge",10,2000))
    db_session.add(models.User("panda.com","Rakuten Panda","hoge",0,0))
    db_session.add(models.User("cardman.com","楽天カードマン","hoge",128,80000))
    db_session.add(models.Meal_content("カレー",50))
    db_session.add(models.Meal_content("餃子",50))
    db_session.add(models.Meal_content("チャーハン",50))
    db_session.add(models.Meal_content("ビーフストロガノフ",50))
    db_session.add(models.Meal_content("味噌汁",50))
    db_session.add(models.Point_user(1,50,'2020-09-07'))
    db_session.add(models.Point_user(1,100,'2020-09-09'))
    db_session.add(models.Post(1,1,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","おいしかった","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","2020-09-01 19:08:24"))
    db_session.add(models.Post(1,1,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","まずかった",None,"2020-09-01 20:08:24"))
    db_session.add(models.Post(2,2,3,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","おいしかった","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","2020-09-02 19:08:24"))
    db_session.add(models.Post(2,3,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","まずかった",None,"2020-09-03 19:08:24"))
    db_session.add(models.Post(3,3,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","まずかった",None,"2020-09-04 19:08:24"))
    db_session.add(models.Post(3,3,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","まずかった",None,"2020-09-05 19:08:24"))
    db_session.add(models.Post(2,3,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","まずかった",None,"2020-09-06 19:08:24"))
    db_session.add(models.Post(4,3,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","まずかった",None,"2020-09-07 19:08:24"))
    db_session.add(models.Post(1,3,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","まずかった",None,"2020-09-08 19:08:24"))
    db_session.add(models.Cook_history(1,1,1))
    db_session.add(models.Cook_history(1,1,2))
    db_session.add(models.Cook_history(2,2,3))
    db_session.add(models.Cook_history(3,2,3))
    db_session.add(models.Cook_history(3,2.4))
    db_session.add(models.Cook_history(3,3.5))
    db_session.add(models.Cook_history(3,3.6))
    db_session.add(models.Cook_history(3,2.7))
    db_session.add(models.Cook_history(3,4.8))
    db_session.add(models.Cook_history(3,1.9))
    db_session.add(models.User_relation(1,2))
    db_session.add(models.User_relation(1,3))
    db_session.add(models.User_relation(2,1))
    db_session.add(models.User_relation(4,1))
    db_session.add(models.Badges(1,1,1))
    db_session.add(models.Badges(1,2,2))
    db_session.add(models.Badges(1,3,1))
    db_session.add(models.Badges(2,1,2))
    db_session.add(models.Badges(2,2,3))
    db_session.commit()

    # 初期料理登録
    # TODO: Meal_contentの料理とポイントだけちゃんと考えて実装する必要あり



# from models import *
# Base.metadata.create_all(engine)
# SessionMaker = sessionmaker(bind=engine)
# session = SessionMaker()

# meal1 = Meal_content(meal_id=0, name="rice")
# session.add(meal1)
# session.commit()