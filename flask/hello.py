from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import boto3  #AWS SDK for Python

from models.database import db_session
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    name = "Hello World"
    return name

# @app.route('/good')
# def good():
#     name = "Good"
#     return name


# kajiura
'''
dataはmodels.modelsの形式に合うように指定 ex) add_data() Meal_content("オムライス", 50)とか add_data(User("a.com", "A", "hoge", 3, 150)) とか add_data(Cook_history(100, 200)) とか！！
'''
def add_data(data):
    db_session.add(data)
    db_session.commit()


@app.route('/post',methods=['POST'])
@cross_origin()
def upload():
    #Kimura
    def img_upload():
        try:
            if request.method == 'POST':
                # アップロードファイルを取得
                if not request.files or request.files['file'].filename == '':
                    return jsonify(status=1, message='ファイルを指定してください'), 400
                uploaded_file = request.files['file']
                # S3アップロード処理
                s3 = boto3.resource('s3')
                response = s3.Bucket('rakuten.intern2020').put_object(Key="img/"+uploaded_file.filename, Body=uploaded_file,ContentType="image/jpeg")
                ##アップロードURL{https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/file_name}
                if response['ResponseMetadata']['HTTPStatusCode'] != 200:
                    return jsonify(status=1, message='S3へのアップロードでエラーが発生しました'), 400
                return jsonify(status=0, message=''), 200
        except Exception as e:
            logger.error(e)
            return jsonify(status=1, message=str(e)), 400
    def insert():
        user_id=1
        ##mealが5個ある前提
        file_name=request.files['file'].filename
        meal_name1 = request.args.get("meal_name1")
        meal_name2 = request.args.get("meal_name2")
        meal_name3 = request.args.get("meal_name3")
        meal_name4 = request.args.get("meal_name4")
        meal_name5 = request.args.get("meal_name5")
        recipe_url = request.args.get("recipe_url")
        post_comment = request.args.get("post_comment")
        meal = Meal_content.query.all()
        #日付、日時を取ってくるget_date,created_at
        dt_now = datetime.datetime.now()
        get_date=dt_now.strftime('%Y/%m/%d')
        created_at=dt_now.strftime('%Y年%m月%d日 %H:%M:%S')
        #meal_nameからpointをとってくる
        point1 = Meal_content.query.filter(Meal_content.name==meal_name).all()[0].point
        point2 = Meal_content.query.filter(Meal_content.name==meal_name2).all()[0].point
        point3 = Meal_content.query.filter(Meal_content.name==meal_name3).all()[0].point
        point4 = Meal_content.query.filter(Meal_content.name==meal_name4).all()[0].point
        point5 = Meal_content.query.filter(Meal_content.name==meal_name5).all()[0].point

        #Point_userに送る為にpointの合計を計算する
        point=point1+point2+point3+point4+point5
        #meal_nameからmeal_idを取ってくる
        meal_id1=Meal_content.query.filter(Meal_content.name==meal_name).all()[0].meal_id
        meal_id2=Meal_content.query.filter(Meal_content.name==meal_name2).all()[0].meal_id
        meal_id3=Meal_content.query.filter(Meal_content.name==meal_name3).all()[0].meal_id
        meal_id4=Meal_content.query.filter(Meal_content.name==meal_name4).all()[0].meal_id
        meal_id5=Meal_content.query.filter(Meal_content.name==meal_name5).all()[0].meal_id
        #cook_historyにmeal_id,user_id追記
        add_data(Cook_history(meal_id1,user_id))
        add_data(Cook_history(meal_id2,user_id))
        add_data(Cook_history(meal_id3,user_id))
        add_data(Cook_history(meal_id4,user_id))
        add_data(Cook_history(meal_id5,user_id))
        #point_userにuser_id(1固定),point,get_date追記
        add_data(Point_user(1,point,get_date))
        #URL生成
        image_url="https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/{}".format(file_name)
        #postにuser_id,meal_id{1,2,3,4,5},image_url,post_comment,recipe_url追記
        add_data(Post(user_id, meal_id1 , meal_id2 , meal_id3 , meal_id4 , meal_id5 , image_url , post_comment, recipe_url,created_at))

@app.route('/post',methods=['GET'])
@cross_origin()
    # niimi
    # 関数の役割：バッチを付与するか判定する
    # 引数：user_id、meal_id
    # 返り値：meal_name, badge_level
    def judge_badges(user,meal):
        user = request.args.get("user_id")
        meal = request.args.get("meal_id")
        user = 1 #仮 user_id
        meal = 2 #仮 meal_id
        # 料理nameを取得　meal_name
        meal_content = Meal_content.query.filter(Meal_content.meal_id==meal).all()
        meal_name = meal_content[0].name
        #料理を過去何回作ったかを取ってくる　meal_count
        user_cook = Cook_history.query.filter(
            Cook_history.user_id==user,
            Cook_history.meal_id==meal
        ).all()
        meal_count = len(user_cook)
        # 閾値を超えたか判定し、badge_levelを取得　badge_level
        badge_level = 0
        # badge_level 1 バッチ1個(仮)
        if meal_count==0:
            badge_level+=1
            change_total_budge()
        # badge_level 2　バッチ5個(仮)
        elif meal_count == 4:
            badge_level+=1
            change_total_budge()
        # # badge_level 3　バッチ10個(仮)
        elif meal_count >= 10:
            badge_level+=1
            change_total_budge()
        else:
            pass
        return jsonify({'meal_name': meal_name,'badge_level': badge_level})

        #Userテーブルのtotal_badgeを変更
        def change_total_badge():
            user_table = User.query.filter(User.user_id==user).first()
            user_table.total_budge += 1
            db_session.commit()



# masui
@app.route('/mypage', methods=['GET'])
@cross_origin()
def mypage_json():
    # とりあえず固定
    user_id = 1

    # dbから取得
    posts = []
    post_raw = Post.query.filter(Post.user_id==user_id).all()
    for p in post_raw:
        posts.append({'post_id':p.post_id,'image_url':p.image_url})
    flwer = []
    flwer_raw = User_relation.query.filter(User_relation.followed_id==user_id).all()
    for f in flwer_raw:
        flwer.append(flwer_raw.follower_id)
    n_flwer = len(flwer)
    flwee = []
    flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
    for f in flwee_raw:
        flwee.append(flwee_raw.followed_id)
    n_flwee = len(flwee)
    n_badge = User.query.filter(User.user_id==user_id).first().total_badges
    n_point = User.query.filter(User.user_id==user_id).first().total_points

    # user_dic = {
    #     'post_id': posts,       # [{'post_id':post_id,'image_url':image_url},{},...]
    #     'followers': n_flwer,   # userのフォロワー数: int
    #     'followees': n_flwee,   # userのフォロー数: int
    #     'total_badge': n_badge, # userの獲得バッジ数: int
    #     'total_point': n_point  # userの獲得ポイント数: int
    # }

    return jsonify(post_id=posts, follwers=n_flwer, followees=n_flwee, total_badge=n_badge, total_point=n_point)

# # ステータスページ (stage2-4でした。。)
# @app.route('/status', methods=['GET'])
# @cross_origin()
# def statuspage_json():
#     cook = Cook_history.query(cook_history).all()
#     user_id = 1 # とりあえず固定
#     badges_dic = {
#         # hoge
#     }
#     return jsonify(badges_dic)

# stage1-4
# ランキングページ
@app.route('/ranking', methods=['GET'])
@cross_origin()
# kajiura
def world_total_badge_ranking_json():
    # とりあえず全ユーザー送る
    # total_badgesの降順でソート
    users = db_session.query(User.user_id, User.name, User.total_badges, User.total_points).all().sort(key=lambda x: x[2], reverse=True)
    user_lists = []
    for user in users:
        user_id, name, total_badges, total_points = user
        # user_dic = {
        #     'user_id': user_id,
        #     'name': name,
        #     'total_badge': total_badges,
        #     'total_point': total_points,
        # }

        #  [{user_id, name, total_badge, total_point}, {user_id, name, total_badge, total_point}, {…}]のようにレスポンス
        user_lists.append(jsonify(user_id=user_id, name=name, total_badge=total_badges, total_point=total_points))
    return user_lists


@app.route('/test', methods=['GET'])
@cross_origin()
def get_json_from_dictionary():
    test_dic = {
        'cuisine': 'cuisine',
        'recipe': 'recipe'
    }
    return jsonify(test_dic)

## おまじない
if __name__ == "__main__":
    app.run(debug=True)