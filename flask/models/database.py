#masui
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

database_file = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'db.sqlite3')
engine = create_engine('sqlite:///' + database_file, convert_unicode=True, connect_args={"check_same_thread": False})
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
    #ユーザ　{email,名前、パスワード、トータルバッチ、トータルポイント}
    db_session.add(models.User("a.com","木村太郎","hoge",2,50))
    db_session.add(models.User("b.com","木村花子","hoge",2,100))
    db_session.add(models.User("c.com","木本一郎","hoge",8,400))
    db_session.add(models.User("rakuten.com","楽天熊猫","hoge",10,2000))
    db_session.add(models.User("panda.com","Rakuten Panda","hoge",0,0))
    db_session.add(models.User("cardman.com","楽天カードマン","hoge",128,80000))
    db_session.add(models.User("kimura.com","木村友祐","password",0,0))
    db_session.add(models.User("niimi.com","新見由佳","password",0,0))
    db_session.add(models.User("masui.com","増井哲史","password",0,0))
    db_session.add(models.User("oomura.com","大村俊也","password",0,0))
    db_session.add(models.User("kudo.com","工藤大地","password",0,0))
    db_session.add(models.User("kajiura.com","梶浦信勝","password",0,0))
    #料理名　{料理名、ポイント数}
    db_session.add(models.Meal_content("カレー",50))
    db_session.add(models.Meal_content("餃子",150))
    db_session.add(models.Meal_content("チャーハン",100))
    db_session.add(models.Meal_content("ビーフストロガノフ",200))
    db_session.add(models.Meal_content("味噌汁",50))
    db_session.add(models.Meal_content("ゴーヤチャンプル",100))
    db_session.add(models.Meal_content("親子丼",50))
    db_session.add(models.Meal_content("そば",50))
    db_session.add(models.Meal_content("うどん",50))
    db_session.add(models.Meal_content("卵焼き",50))
    db_session.add(models.Meal_content("ラーメン",50))
    db_session.add(models.Meal_content("サラダ",50))
    db_session.add(models.Meal_content("お茶漬け",50))
    db_session.add(models.Meal_content("たけのこご飯",50))
    db_session.add(models.Meal_content("オムライス",50))
    #ポイント獲得　{ユーザid、獲得ポイント、日付}
    db_session.add(models.Point_user(1,50,'2020-09-07'))
    db_session.add(models.Point_user(1,100,'2020-09-09'))
    #ポスト　{ユーザid、mealid1~5、画像保存先URL、レシピURL、コメント、投稿時間}
    #カレー
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/d5e4d49c509fc535570a5757133353ed195ce795.32.1.1.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1730000030/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/3afca6116d09b0fbea3205036a15501ccf702099.46.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1050010613/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    db_session.add(models.Post(6,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/fa3117b7037beaf99e2576983ddfce2fc6772063.94.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1080009668/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    db_session.add(models.Post(6,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/0f2ac2514732d18ee5761e44c157d65f6be80723.32.1.1.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1730000014/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    db_session.add(models.Post(6,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/cdc775f860420a48e44a9888acada13a93031b25.81.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1200010691/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/b954be62b6060d6fc88800bbc23b24a9fb77a8b5.84.1.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1800000034/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/d63aee84c9a1bfd1342a301da776bd2480b3b9b3.83.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1810004197/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    db_session.add(models.Post(6,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/143e054b129be9e7a615dffe2cad48933e13ff4a.78.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1740010600/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    
    db_session.add(models.Post(6,2,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","おいしかった","2020-09-02 19:08:24"))
    db_session.add(models.Post(6,3,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","まずかった","2020-09-03 19:08:24"))
    db_session.add(models.Post(6,4,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","まずかった","2020-09-04 19:08:24"))
    db_session.add(models.Post(6,5,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","まずかった","2020-09-05 19:08:24"))
    db_session.add(models.Post(6,6,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","まずかった","2020-09-06 19:08:24"))
    db_session.add(models.Post(6,7,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","まずかった","2020-09-07 19:08:24"))
    db_session.add(models.Post(6,8,None,None,None,None,"https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/1/2020-09-09-04%3A46%3A03","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","まずかった","2020-09-08 19:08:24"))
    #料理履歴 {meal_id、ユーザid、ポストid}
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
    #フォローフォロワー関係　{フォローid、フォロワーid}
    db_session.add(models.User_relation(1,2))
    db_session.add(models.User_relation(1,6))
    db_session.add(models.User_relation(6,1))
    db_session.add(models.User_relation(1,3))
    db_session.add(models.User_relation(2,1))
    db_session.add(models.User_relation(4,1))
    #バッジ数　{ユーザid、料理id、レベル}
    db_session.add(models.Badges(1,1,1))
    db_session.add(models.Badges(1,2,2))
    db_session.add(models.Badges(1,3,1))
    db_session.add(models.Badges(6,1,3))
    db_session.add(models.Badges(6,2,3))
    db_session.add(models.Badges(6,3,3))
    db_session.add(models.Badges(6,4,3))
    db_session.add(models.Badges(6,5,3))
    db_session.add(models.Badges(6,6,3))
    db_session.add(models.Badges(6,7,3))
    db_session.add(models.Badges(6,8,3))
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