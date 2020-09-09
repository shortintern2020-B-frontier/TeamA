from flask import Flask, request, abort,jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity
)
import boto3  #AWS SDK for Python
from models.models import User, Meal_content, Cook_history, Point_user, Post, User_relation, Badges
from models.database import db_session
import datetime
from urllib.request import urlopen

app = Flask(__name__)
# 文字化け防止
app.config['JSON_AS_ASCII'] = False
CORS(app,support_credentials=True, resources={"/test-post": {"origins": "*"}},
            headers="Content-Type"
)

# Flask-JWT-extendedのセットアップ
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)

# 認証トークンの期限の有無
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False

def add_data(data):
    db_session.add(data)
    db_session.commit()


# curl http://localhost:5023/search/meal -X POST -H "Content-Type: application/json" --data '{"meal_name":"カレー"}'
# niimi
# 関数の役割：料理検索
# 引数：meal_id
# 返り値：meal_name, badge_level
@app.route('/search/meal', methods=['POST'])
# @jwt_required
@cross_origin()
def search_meal():
    payload = request.json
    meal_name = payload.get('meal_name')
    meal_id = Meal_content.query.filter(Meal_content.name==meal_name).all()[0].meal_id
    total_post = Cook_history.query.filter(Cook_history.meal_id==meal_id).all()
    post_id = []
    # meal_idが一致するものをCook_historyテーブルから取り出して、付随するpost_idを取得する
    for p in total_post:
        post_id.append(p.post_id)
    post_list = []
    for p_id in post_id:
        users_post = Post.query.filter(Post.post_id==p_id).all()
        for user in users_post:
            post_dic = {
                'user_id':users_post[0].user_id,
                'image_url': users_post[0].image_url,
                'post_id':users_post[0].post_id
                } 
            post_list.append(post_dic)
    return jsonify(meal_name=meal_name,post=post_list)


# curl http://localhost:5023/search/user -X POST -H "Content-Type: application/json" --data '{"user_name":"木村太郎"}'
# niimi
# 関数の役割：ユーザー検索
# 引数：user_name
# 返り値：meal_name, badge_level
import re
    # result = re.match(, User.name
@app.route('/search/user', methods=['POST'])
# @jwt_required
def search_user():
    payload = request.json
    user_name = payload.get('user_name')
    # return str(user_name)
    # like節使えないから(SQLite対応してない?)　ここだけSQL直書きでも良いかも
    user = User.query.filter(User.name==user_name).all()[0]
    # total_user_id = User.query.filter(user_name in User.name).all()
    # user_search = "%{}%".format(user_name)
    # total_user_id = User.query.filter(User.name.like(user_search))
    # total_user_id = User.query.filter(User.name.like('%user_name%'))
    return jsonify(name=user.name,user_id=user.user_id,total_badges=user.total_badges,total_points=user.total_points)



# 関数のテスト
# curl http://localhost:5023/test -X POST -H "Content-Type: application/json" --data '{"name": 5}'
@app.route('/test', methods=['GET'])
def def_test():
    try:
        # jsonリクエストから値取得
        # payload = request.json
        # name = payload.get('name')
        # test_message = '反映できてる'
        return jsonify({'name': test_message})
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# curl http://localhost:5023/post'
@app.route('/post', methods=['GET'])
@cross_origin()
def badges():
    # niimi
    # データベース内容変更
    def change_badges(user,meal,level):
        # Userテーブルのtotal_badgesを変更
        user_table = User.query.filter(User.user_id==user).first()
        user_table.total_badges += 1
        # Badgesテーブルにカラム追加
        badges_table = Badges.query.filter(Badges.user_id==user,Badges.meal_id==meal).all()
        if len(badges_table)==0:
            add_data(Badges(user,meal,level))
        else:
            badges_table[0].level = level
        db_session.commit()

    # バッチを付与するか判定
    def  judge_budges(meal_id):
        # 料理nameを取得　meal_name
        meal_name = Meal_content.query.filter(Meal_content.meal_id==meal_id).all()[0].name
        #料理を過去何回作ったかを取ってくる　meal_count
        user_cook = Cook_history.query.filter(
            Cook_history.user_id==user_id,
            Cook_history.meal_id==meal_id
        ).all()
        meal_count = len(user_cook)
        # 閾値を超えたか判定し、badge_levelを取得　badge_level
        # badge_level 1 バッチ1個(仮)
        if meal_count==0:
            change_badges(user_id,meal_id,1)
            return {'meal_name':meal_name,'badge_level':1}
        # badge_level 2　バッチ5個(仮)
        elif meal_count == 5:
            change_badges(user_id,meal_id,2)
            return {'meal_name':meal_name,'badge_level':2}
        # badge_level 3　バッチ10個(仮)
        elif meal_count >= 10:
            change_badges(user_id,meal_id,3)
            return {'meal_name':meal_name,'badge_level':3}
        else:
            return {'meal_name':meal_name,'badge_level':None}

    user_id=1
    meal_id1=1
    meal_id2=2
    meal_id3=3
    meal_id4=4
    meal_id5=5
    meal_id_list=[meal_id1,meal_id2,meal_id3,meal_id4,meal_id5]
    post=[]

    for meal_id in meal_id_list:
        b = judge_budges(meal_id)
        if b['badge_level'] == None:
            # return 'aa'
            pass
        else:
            post.append(b)

    return jsonify(get_badges=post)


if __name__ == "__main__":
    app.run(debug=True,host='localhost', port=5023)