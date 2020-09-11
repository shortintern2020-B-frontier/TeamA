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

# kimura kajiura masui
def init_db():
    from models import models
    Base.metadata.create_all(bind=engine)

    # 初期データ登録 
    # ユーザ　{email,名前、パスワード、トータルバッチ、トータルポイント}
    db_session.add(models.User("rakuten.com","楽天パンダ","hoge",8,1100))
    db_session.add(models.User("a.com","木村太郎","hoge",3,200))
    db_session.add(models.User("b.com","木村花子","hoge",2,200))
    db_session.add(models.User("c.com","木本一郎","hoge",2,200))
    db_session.add(models.User("panda.com","お買い物パンダ","hoge",2,200))
    db_session.add(models.User("cardman.com","楽天カードマン","hoge",8,1100))

    # 料理名　{料理名、ポイント数}
    db_session.add(models.Meal_content("カレー",100))
    db_session.add(models.Meal_content("餃子",100))
    db_session.add(models.Meal_content("チャーハン",100))
    db_session.add(models.Meal_content("ビーフストロガノフ",100))
    db_session.add(models.Meal_content("味噌汁",100))
    db_session.add(models.Meal_content("ゴーヤチャンプル",100))
    db_session.add(models.Meal_content("親子丼",100))
    db_session.add(models.Meal_content("そば",100))
    db_session.add(models.Meal_content("うどん",100))
    db_session.add(models.Meal_content("卵焼き",100))
    db_session.add(models.Meal_content("ラーメン",100))
    db_session.add(models.Meal_content("サラダ",100))
    db_session.add(models.Meal_content("お茶漬け",100))
    db_session.add(models.Meal_content("たけのこご飯",100))
    db_session.add(models.Meal_content("オムライス",100))
    
    # ポイント獲得　{ユーザid、獲得ポイント、日付}
    db_session.add(models.Point_user(1,100,'2020-09-01'))
    db_session.add(models.Point_user(1,100,'2020-09-02'))
    db_session.add(models.Point_user(1,100,'2020-09-02'))
    db_session.add(models.Point_user(6,100,'2020-09-02'))
    db_session.add(models.Point_user(6,100,'2020-09-03'))
    db_session.add(models.Point_user(6,100,'2020-09-04'))
    db_session.add(models.Point_user(1,100,'2020-09-04'))
    db_session.add(models.Point_user(1,100,'2020-09-05'))
    db_session.add(models.Point_user(6,100,'2020-09-05'))
    db_session.add(models.Point_user(6,100,'2020-09-05'))
    db_session.add(models.Point_user(6,100,'2020-09-06'))
    db_session.add(models.Point_user(6,100,'2020-09-06'))
    db_session.add(models.Point_user(6,100,'2020-09-07'))
    db_session.add(models.Point_user(6,100,'2020-09-07'))
    db_session.add(models.Point_user(6,100,'2020-09-07'))
    db_session.add(models.Point_user(6,100,'2020-09-08'))
    db_session.add(models.Point_user(2,100,'2020-09-08'))
    db_session.add(models.Point_user(3,100,'2020-09-08'))
    db_session.add(models.Point_user(4,100,'2020-09-08'))
    db_session.add(models.Point_user(5,100,'2020-09-08'))
    db_session.add(models.Point_user(1,100,'2020-09-08'))
    db_session.add(models.Point_user(1,100,'2020-09-08'))
    db_session.add(models.Point_user(1,100,'2020-09-08'))
    db_session.add(models.Point_user(1,100,'2020-09-09'))
    db_session.add(models.Point_user(1,100,'2020-09-09'))
    db_session.add(models.Point_user(1,100,'2020-09-09'))
    db_session.add(models.Point_user(2,100,'2020-09-09'))
    db_session.add(models.Point_user(3,100,'2020-09-09'))
    db_session.add(models.Point_user(4,100,'2020-09-09'))
    db_session.add(models.Point_user(5,100,'2020-09-09'))
    
    # ポスト　{ユーザid、mealid1~5、画像保存先URL、レシピURL、コメント、投稿時間}
    # カレー
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/00909f7aad976843392a084534cefa02933ac089.53.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1730000030/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-01 19:08:24"))
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/d5e4d49c509fc535570a5757133353ed195ce795.32.1.1.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1730000030/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-02 18:12:44"))
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/fa3117b7037beaf99e2576983ddfce2fc6772063.94.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1050010613/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-02 15:28:34"))
    db_session.add(models.Post(6,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/3afca6116d09b0fbea3205036a15501ccf702099.46.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1730000014/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-02 21:05:28"))
    db_session.add(models.Post(6,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/0f2ac2514732d18ee5761e44c157d65f6be80723.32.1.1.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1050010613/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-03 10:08:24"))
    db_session.add(models.Post(6,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/cdc775f860420a48e44a9888acada13a93031b25.81.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1200010691/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-04 12:43:12"))
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/b954be62b6060d6fc88800bbc23b24a9fb77a8b5.84.1.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1800000034/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-04 19:57:51"))
    db_session.add(models.Post(1,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/d63aee84c9a1bfd1342a301da776bd2480b3b9b3.83.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1810004197/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-05 17:39:27"))
    db_session.add(models.Post(6,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/143e054b129be9e7a615dffe2cad48933e13ff4a.78.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1740010600/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-05 22:01:21"))
    
    db_session.add(models.Post(6,2,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/8f1149dce961d89981efc54d3aea0911853c69c4.46.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1050005813/","おいしかった","2020-09-05 12:43:12"))
    db_session.add(models.Post(6,3,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/d91df891dd7723749e0e8ef520af3960d899ef15.12.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1240018924/","まずかった","2020-09-06 19:57:51"))
    db_session.add(models.Post(6,4,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/66e9e6a54c7015b255ba8b34b6b37aa349b3c15d.45.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1030011769/","まずかった","2020-09-06 19:08:24"))
    db_session.add(models.Post(6,5,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/bf49fbc90f4523eb8943c540f34e94a4b6d816f7.36.2.3.2.jpg?thum=58","https://www.kurashiru.com/recipes/7ebf6849-4961-48e4-8fd1-3ff54ad1d5f5","まずかった","2020-09-07 17:39:27"))
    db_session.add(models.Post(6,6,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/a5fe503e18f2f5abfe27357997b9dd67ceab4db2.74.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1310001611/","まずかった","2020-09-07 22:01:21"))
    db_session.add(models.Post(6,7,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/a381a1be986ee90661a4a9de3ba9abd8dede698c.08.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1190004346/","まずかった","2020-09-07 15:28:34"))
    db_session.add(models.Post(6,8,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/49b7e752f7fb56f4abf96bcf2bd21f174ffa5576.11.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1560003298/?l-id=recipe_list_detail_recipe","まずかった","2020-09-08 19:08:24"))

    db_session.add(models.Post(2,9,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/ae8230dcc14750ad02bda59d3b042ec9d4fa74d0.91.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1380004305/?l-id=recipe_list_detail_recipe","まずかった","2020-09-08 22:01:21"))
    db_session.add(models.Post(3,10,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/8ba3daadf08faa47e4606e49efb5b0373e5ba166.29.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1270005906/","まずかった","2020-09-08 17:39:27"))
    db_session.add(models.Post(4,11,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/10c8b5fa25a31a189f4b7f959332879ded3c0a03.53.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1870009550/","まずかった","2020-09-08 15:28:34"))
    db_session.add(models.Post(5,12,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/68e298e01d968acfc0d70e03ca0e8773f674777e.97.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1540011747/?l-id=recipe_list_detail_recipe","まずかった","2020-09-08 19:08:24"))
    
    #TODO 楽天パンダ用に6つ
    db_session.add(models.Post(1,2,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/cec263837c9c6768cf2a0681d5821560c9004983.86.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1890007735/","まずかった","2020-09-07 22:01:21"))
    db_session.add(models.Post(1,3,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/c25e04a0972d9a0645800dfe7384c710674f9616.01.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1600005392/","まずかった","2020-09-08 22:01:21"))
    db_session.add(models.Post(1,4,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/1eca7aceac0c663e71f55123772d2307741256f0.00.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1450013465/","まずかった","2020-09-07 22:01:21"))
    db_session.add(models.Post(1,5,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/15fd04051637c8010813fd95c1a512e24e10ea2c.82.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1310000340/?l-id=recipe_list_detail_recipe","まずかった","2020-09-07 22:01:21"))
    db_session.add(models.Post(1,6,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/67ddf46d928560336de1891de6b822a87e7b60cb.91.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1390023051/?l-id=recipe_list_detail_recipe","まずかった","2020-09-08 22:01:21"))
    db_session.add(models.Post(1,7,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/8034f7003601936adb77ac83859b6a11fb672110.02.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1800022074/?l-id=recipe_list_detail_recipe","まずかった","2020-09-07 22:01:21"))
    #TODO その他の4人が餃子を作る
    db_session.add(models.Post(2,2,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/a10fe08c1956a12082a04885c032bcbaef127021.18.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1970005448/","まずかった","2020-09-08 22:01:21"))
    db_session.add(models.Post(3,2,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/c60304f1db698d6a98f29cd6fec74bd9f75a46f1.83.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1620000309/?l-id=recipe_list_detail_recipe","まずかった","2020-09-08 22:01:21"))
    db_session.add(models.Post(4,2,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/5f143bd45e4552b55ceb47a5302ab315f697d029.02.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1230000935/?l-id=recipe_list_detail_recipe","まずかった","2020-09-08 22:01:21"))
    db_session.add(models.Post(5,2,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/97f528bc5501754bce0045aa94752be2e280d2d3.40.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1150003162/?l-id=recipe_list_detail_recipe","まずかった","2020-09-08 22:01:21"))
    #カレーを別の人が作る
    db_session.add(models.Post(2,1,None,None,None,None,"https://jp.rakuten-static.com/recipe-space/d/strg/ctrl/3/fa3117b7037beaf99e2576983ddfce2fc6772063.94.2.3.2.jpg?thum=58","https://recipe.rakuten.co.jp/recipe/1080009668/?l-id=recipe_list_detail_recipe","おいしかった","2020-09-09 11:28:34"))

    # 料理履歴 {meal_id、ユーザid、ポストid}
    #TODO つじつま合わせ
    db_session.add(models.Cook_history(1,1,1))
    db_session.add(models.Cook_history(1,1,2))
    db_session.add(models.Cook_history(1,1,3))
    db_session.add(models.Cook_history(1,6,4))
    db_session.add(models.Cook_history(1,6,5))
    db_session.add(models.Cook_history(1,6,6))
    db_session.add(models.Cook_history(1,1,7))
    db_session.add(models.Cook_history(1,1,8))
    db_session.add(models.Cook_history(1,6,9))
    db_session.add(models.Cook_history(2,6,10))
    db_session.add(models.Cook_history(3,6,11))
    db_session.add(models.Cook_history(4,6,12))
    db_session.add(models.Cook_history(5,6,13))
    db_session.add(models.Cook_history(6,6,14))
    db_session.add(models.Cook_history(7,6,15))
    db_session.add(models.Cook_history(8,6,16))
    db_session.add(models.Cook_history(9,2,17))
    db_session.add(models.Cook_history(10,3,18))
    db_session.add(models.Cook_history(11,4,19))
    db_session.add(models.Cook_history(12,5,20))
   
    #TODO つじつま合わせ
    db_session.add(models.Cook_history(2,1,21))
    db_session.add(models.Cook_history(3,1,22))
    db_session.add(models.Cook_history(4,1,23))
    db_session.add(models.Cook_history(5,1,24))
    db_session.add(models.Cook_history(6,1,25))
    db_session.add(models.Cook_history(7,1,26))

    db_session.add(models.Cook_history(2,2,27))
    db_session.add(models.Cook_history(2,3,28))
    db_session.add(models.Cook_history(2,4,29))
    db_session.add(models.Cook_history(2,5,30))

    db_session.add(models.Cook_history(1,2,31))
    # フォローフォロワー関係　{フォローid、フォロワーid}
    db_session.add(models.User_relation(2,6))
    db_session.add(models.User_relation(6,2))
    db_session.add(models.User_relation(6,3))
    db_session.add(models.User_relation(6,4))
    db_session.add(models.User_relation(1,3))
    db_session.add(models.User_relation(2,1))
    db_session.add(models.User_relation(4,1))

    # バッジ数　{ユーザid、料理id、レベル}
    db_session.add(models.Badges(1,1,2))
    db_session.add(models.Badges(1,2,1))
    db_session.add(models.Badges(1,3,1))
    db_session.add(models.Badges(1,4,1))
    db_session.add(models.Badges(1,5,1))
    db_session.add(models.Badges(1,6,1))
    db_session.add(models.Badges(1,7,1))
    db_session.add(models.Badges(6,1,1))
    db_session.add(models.Badges(6,2,1))
    db_session.add(models.Badges(6,3,1))
    db_session.add(models.Badges(6,4,1))
    db_session.add(models.Badges(6,5,1))
    db_session.add(models.Badges(6,6,1))
    db_session.add(models.Badges(6,7,1))
    db_session.add(models.Badges(6,8,1))
    db_session.add(models.Badges(2,9,1))
    db_session.add(models.Badges(3,10,1))
    db_session.add(models.Badges(4,11,1))
    db_session.add(models.Badges(5,12,1))
    db_session.add(models.Badges(2,2,1))
    db_session.add(models.Badges(3,2,1))
    db_session.add(models.Badges(4,2,1))
    db_session.add(models.Badges(5,2,1))
    db_session.add(models.Badges(2,1,1))

    db_session.commit()
