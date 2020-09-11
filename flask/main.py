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
import plotly.graph_objects as go
import numpy as np

app = Flask(__name__)
# 文字化け防止
app.config['JSON_AS_ASCII'] = False

######################
######################

# corsの設定はこれでOK、関数についてる@cross_origin()はいらない commented by kudo
CORS(app)

# CORS(app,support_credentials=True, resources={"/test-post": {"origins": "*"}},
#             headers="Content-Type"
# )

######################
######################

# Flask-JWT-extendedのセットアップ
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
# 認証トークンの期限の有無
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
jwt = JWTManager(app)

# kajiura
# dataはmodels.modelsの形式に合うように指定 ex) add_data() Meal_content("オムライス", 50)とか add_data(User("a.com", "A", "hoge", 3, 150)) とか add_data(Cook_history(100, 200)) とか！！
def add_data(data):
    db_session.add(data)
    db_session.commit()



# masui
def hash_password(password):
    return password

# masui
@app.route('/signup', methods=["POST"])
def signup():
    try:
        email = request.json.get('email', None)
        username = request.json.get('name', None)
        password = request.json.get('password', None)
        if not username:
            return jsonify({"msg": "Missing username parameter"}), 500
        if not password:
            return jsonify({"msg": "Missing password parameter"}), 500
        if not email:
            return jsonify({"msg": "Missing email parameter"}), 500
        # 同じemailでregisterできない仕様
        if User.query.filter(User.email==email).first() != None:
            return jsonify({"msg": "Already registered email"}), 500
        if User.query.filter(User.name==username).first() != None:
            return jsonify({"msg": "Already registered name"}), 500

        password = hash_password(password)
        add_data(User(email,username,password,0,0))

        return jsonify({"msg": "User created"}), 200
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# masui
@app.route('/login', methods=['POST'])
def login():
    try:
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 401

        email = request.json.get('email', None)
        password = request.json.get('password', None)
        if not email:
            return jsonify({"msg": "Missing email parameter"}), 401
        if not password:
            return jsonify({"msg": "Missing password parameter"}), 401

        user = User.query.filter(User.email==email).first()
        if user == None or user.password != hash_password(password):
            return jsonify({"msg": "Invalid email or password"}), 401

        # Identity can be any data that is json serializable
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})   

# masui
def get_user_id():
    current_user_email = get_jwt_identity()
    return User.query.filter(User.email==current_user_email).first().user_id

# masui
@app.route('/<user_id>/follow',methods=['GET'])
@jwt_required
def follow_user(user_id=None):
    try:
        own_user_id = get_user_id()
        #own_user_id = 1
        user_id = int(user_id)

        # <user_id>が登録されていない，無効な番号を指定した場合
        if User.query.filter(User.user_id==user_id).first() == None:
            return jsonify({"msg":"Invalid user_id"}), 404

        # すでにフォローしている場合
        own_follow_list = User_relation.query.filter(User_relation.follower_id == own_user_id).all()
        for o in own_follow_list:
            if o.followed_id == user_id:
                return jsonify({"msg":"Already followed user"}), 500

        add_data(User_relation(own_user_id,user_id))

        return jsonify({"msg":"follows"}) ,200
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})
    
# masui
@app.route('/<user_id>/unfollow',methods=['GET'])
@jwt_required
def unfollow_user(user_id=None):
    try:
        own_user_id = get_user_id()
        #own_user_id = 1
        user_id = int(user_id)

        # <user_id>が登録されていない，無効な番号を指定した場合
        if User.query.filter(User.user_id==user_id).first() == None:
            return jsonify({"msg":"Invalid user_id"}), 404

        # フォローしてない場合
        own_follow_list = User_relation.query.filter(User_relation.follower_id == own_user_id).all()
        for o in own_follow_list:
            if o.followed_id == user_id:
                User_relation.query.filter(User_relation.follower_id == own_user_id,User_relation.followed_id==user_id).delete()
                db_session.commit()
                return jsonify({"msg":"unfollows"}), 200

        return jsonify({"msg":"User_id is not following user"}) ,500
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# masui
@app.route('/timeline', methods=['GET'])
@jwt_required
def user_timeline():
    try:
        user_id = get_user_id()
        # user_id = 4

        posts = []
        # Get own posts
        own_posts = Post.query.filter(Post.user_id==user_id).all()
        name = User.query.filter(User.user_id==user_id).first().name
        for o in own_posts:
            posts.append({'post_id':o.post_id,'user_id':user_id,'name':name,'meal_url':o.recipe_url,'image_url':o.image_url,'create_at':o.create_at})
        # Get followee's posts
        flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
        for f in flwee_raw:
            f_posts = Post.query.filter(Post.user_id==f.followed_id).all()
            f_name = User.query.filter(User.user_id==f.followed_id).first().name
            for f_p in f_posts:
                posts.append({'post_id':f_p.post_id,'user_id':f.followed_id,'name':f_name,'meal_url':f_p.recipe_url,'image_url':f_p.image_url,'create_at':f_p.create_at})

        posts.sort(key=lambda x: x['post_id'], reverse=True)   

        return jsonify(results=posts)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# masui
@app.route('/mypage', methods=['GET'])
@jwt_required
def mypage_json():
    try:
        user_id = get_user_id()
        #user_id = 1

        # dbから取得
        name = User.query.filter(User.user_id==user_id).first().name
        posts = []
        post_raw = Post.query.filter(Post.user_id==user_id).all()
        for p in post_raw:
            posts.append({'post_id':p.post_id,'meal_url':p.recipe_url,'image_url':p.image_url})
        posts.sort(key=lambda x: x['post_id'], reverse=True)  
        flwer = []
        flwer_raw = User_relation.query.filter(User_relation.followed_id==user_id).all()
        for f in flwer_raw:
            flwer.append(f.follower_id)
        n_flwer = len(flwer)
        flwee = []
        flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
        for f in flwee_raw:
            flwee.append(f.followed_id)
        n_flwee = len(flwee)
        n_badge = User.query.filter(User.user_id==user_id).first().total_badges
        n_point = User.query.filter(User.user_id==user_id).first().total_points

        return jsonify(name=name, post_id=posts, followers=n_flwer, followees=n_flwee, total_badge=n_badge, total_point=n_point)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})


# masui
@app.route('/<user_id>/mypage')
def others_mypage_json(user_id=None):
    try:
        # dbから取得
        posts = []
        user_id = int(user_id)

        # <user_id>が登録されていない，無効な番号を指定した場合
        if User.query.filter(User.user_id==user_id).first() == None:
            return jsonify({"msg":"Invalid user_id"}), 404

        name = User.query.filter(User.user_id==user_id).first().name
        post_raw = Post.query.filter(Post.user_id==user_id).all()
        for p in post_raw:
            posts.append({'post_id':p.post_id,'meal_url':p.recipe_url,'image_url':p.image_url})
        flwer = []
        flwer_raw = User_relation.query.filter(User_relation.followed_id==user_id).all()
        for f in flwer_raw:
            flwer.append(f.follower_id)
        n_flwer = len(flwer)
        flwee = []
        flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
        for f in flwee_raw:
            flwee.append(f.followed_id)
        n_flwee = len(flwee)
        n_badge = User.query.filter(User.user_id==user_id).first().total_badges
        n_point = User.query.filter(User.user_id==user_id).first().total_points

        return jsonify(name=name,post_id=posts, follwers=n_flwer, followees=n_flwee, total_badge=n_badge, total_point=n_point)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# masui
@app.route('/relation', methods=['GET'])
@jwt_required
def relation_json():
    try:
        user_id = get_user_id()
        #user_id = 1

        flwer = []
        flwer_raw = User_relation.query.filter(User_relation.followed_id==user_id).all()
        for f in flwer_raw:
            #flwer.append(f.follower_id)
            user_name = User.query.filter(User.user_id==f.follower_id).first().name
            flwer.append({'user_id':f.follower_id,'name':user_name})
            print(flwer)
        flwee = []
        flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
        for f in flwee_raw:
            user_name = User.query.filter(User.user_id==f.followed_id).first().name
            flwee.append({'user_id':f.followed_id,'name':user_name})

        return jsonify(follower=flwer,followee=flwee)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# masui
@app.route('/<user_id>/relation', methods=['GET'])
#@jwt_required
def other_relation_json(user_id=None):
    try:
        user_id = int(user_id)
        #user_id = 1

        flwer = []
        flwer_raw = User_relation.query.filter(User_relation.followed_id==user_id).all()
        for f in flwer_raw:
            #flwer.append(f.follower_id)
            user_name = User.query.filter(User.user_id==f.follower_id).first().name
            flwer.append({'user_id':f.follower_id,'name':user_name})
            print(flwer)
        flwee = []
        flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
        for f in flwee_raw:
            user_name = User.query.filter(User.user_id==f.followed_id).first().name
            flwee.append({'user_id':f.followed_id,'name':user_name})

        return jsonify(follower=flwer,followee=flwee)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# masui
@app.route('/graph_status', methods=['GET'])
@jwt_required
def graph_status_json():
    user_id = get_user_id()
    #user_id = 1
    graph_url="https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/graph/{}".format(user_id)

    return jsonify(graph_url=graph_url)

#kimura
@app.route('/post',methods=['POST'])
@jwt_required
#@cross_origin()
def upload():
    try:
        # kimura 
        # 投稿のpostリクエストが来たらS3に画像を保存し、
        # データベースへの追記、更新を行う。
        user_id=get_user_id()
        #user_id=1
        dt_now = datetime.datetime.now()
        payload = request.json
        # アップロードファイルを取得
        image = payload.get('image')
        with urlopen(image) as response:
                data = response.read()
        uploaded_file = data
        file_name=dt_now.strftime('%Y-%m-%d-%H:%M:%S')
        # S3アップロード処理
        ##アップロード先URL{https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/{user_id}/{file_name}}
        s3 = boto3.resource('s3')
        response = s3.Bucket('rakuten.intern2020').put_object(Key="img/{}/{}".format(user_id,file_name), Body=uploaded_file,ContentType="image/jpeg")
        #URL生成
        image_url="https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/img/{}/{}".format(user_id,file_name)
        # データベースへ追記する為に必要なものを取ってくる
        # 料理名
        meal_name=[]
        for i in range(1,6):
            if payload.get('meal_name{}'.format(i))!='':
                meal_name.append(payload.get('meal_name{}'.format(i)))
            else:
                break
        recipe_url = payload.get('meal_url')
        post_comment = payload.get('post_comment')

        #日付、日時を取ってくるget_date,created_at
        get_date=dt_now.strftime('%Y-%m-%d')
        #ボーナス料理名を取ってくる
        created_at=dt_now.strftime('%Y-%m-%d %H:%M:%S')
        date=int(dt_now.strftime('%d'))
        bonus_id=date%15+1
        bonus_name=Meal_content.query.filter(Meal_content.meal_id==bonus_id).all()[0].name
        #meal_nameの情報を元にデータベースからmeal_idとmeal_pointを取ってくる
        meal_id,meal_point=[],[]
        print(meal_name)
        for meal in meal_name:
            if meal==bonus_name:
                meal_point.append(Meal_content.query.filter(Meal_content.name==meal).all()[0].point*2)
            else:
                meal_point.append(Meal_content.query.filter(Meal_content.name==meal).all()[0].point)
            meal_id.append(Meal_content.query.filter(Meal_content.name==meal).all()[0].meal_id)
        meal_num=len(meal_id)
        for i in range(5-meal_num):
            meal_id.append(None)
        #Point_userに送る為にpointの合計を計算する
        total_points=sum(meal_point)
        #postにuser_id,meal_id{1,2,3,4,5},image_url,post_comment,recipe_url追記
        print(meal_id)
        add_data(Post(user_id, meal_id[0] , meal_id[1] , meal_id[2] , meal_id[3] , meal_id[4] , image_url , recipe_url , post_comment , created_at))
        # postidを取ってくる
        post_id=Meal_content.query.all()[-1].meal_id
        #cook_historyにmeal_id,user_id,post_id追記
        for i in range(meal_num):
            add_data(Cook_history(meal_id[i],user_id,post_id))
        # userテーブルから現在のポイントを取ってくる+ポイントの上書き
        user = User.query.filter(User.user_id == user_id).first()
        user.total_points += total_points
        db_session.commit()

        #point_userにuser_id,point,get_date追記
        add_data(Point_user(user_id,total_points,get_date))

        ### masui
        ### push users' graph
        def push_graph():
            point_list = Point_user.query.filter(Point_user.user_id==user_id).all()
            graph_dic = {}
            # 同じ日に獲得したポイントは加算
            for p in point_list:
                graph_dic[p.get_date] = 0
            for p in point_list:
                graph_dic[p.get_date] += p.point

            # グラフ定義
            graph_list = list(graph_dic.values())
            for i in range(len(graph_list)-1):
                graph_list[i+1] += graph_list[i]
            xs = list(graph_dic.keys())
            # グラフ描画
            y_one = np.ones(len(xs))
            d_l = 200
            fig = go.Figure()
            fig.add_trace(go.Scatter(
                x=xs, y=d_l*y_one,
                hoverinfo='x+y',
                mode='lines',
                line=dict(width=0.5, color='rgb(217, 217, 217)'),
                stackgroup='one'
            ))
            fig.add_trace(go.Scatter(
                x=xs, y=d_l*y_one,
                hoverinfo='x+y',
                mode='lines',
                line=dict(width=0.5, color='rgb(217, 197, 178)'),
                stackgroup='one'
            ))
            fig.add_trace(go.Scatter(
                x=xs, y=d_l*y_one,
                hoverinfo='x+y',
                mode='lines',
                line=dict(width=0.5, color='rgb(178, 217, 178)'),
                stackgroup='one' 
            ))
            fig.add_trace(go.Scatter(
                x=xs, y=d_l*y_one,
                hoverinfo='x+y',
                mode='lines',
                line=dict(width=0.5, color='rgb(178, 236, 236)'),
                stackgroup='one' 
            ))

            fig.add_trace(go.Scatter(
                x=xs, y=d_l*y_one,
                hoverinfo='x+y',
                mode='lines',
                line=dict(width=0.5, color='rgb(236, 236, 178)'),
                stackgroup='one' 
            ))
            fig.add_trace(go.Scatter(
                x=xs, y=d_l*y_one,
                hoverinfo='x+y',
                mode='lines',
                line=dict(width=0.5, color='rgb(255, 217, 178)'),
                stackgroup='one' 
            ))
            fig.add_trace(go.Scatter(
                x=xs, y=d_l*y_one,
                hoverinfo='x+y',
                mode='lines',
                line=dict(width=0.5, color='rgb(255, 178, 178)'),
                stackgroup='one' 
            ))
            fig.add_trace(go.Scatter(
                x=xs, y=graph_list,
                name="point",
                line=dict(color='rgb(3,16,252)')
            ))

            # 現状はグラフのy軸最大を1400固定
            fig.update_layout(
                showlegend=False,
                #yaxis_range=(0,graph_list[-1]+100),
                yaxis_range=(0,1400),
                xaxis_range=(xs[0],xs[-1])
            )

            fig.write_html("point_graph.html")

            with open("point_graph.html",'rb') as f:
                # S3アップロード処理
                ##アップロード先URL{https://s3-ap-northeast-1.amazonaws.com/rakuten.intern2020/graph/{user_id}}
                s3 = boto3.resource('s3')
                response = s3.Bucket('rakuten.intern2020').put_object(Key="graph/{}".format(user_id), Body=f,ContentType="text/html")
                #URL生成

        push_graph()

        print("バッチ処理開始")
        # return jsonify(status=0, message=''), 200


        # niimi
        # データベース内容変更　judge_budges関数内で使用
        def change_badges(user,meal,level):
            # Userテーブルのtotal_badgesを変更
            user_table = User.query.filter(User.user_id==user).first()
            user_table.total_badges += 1
            # Badgesテーブルにカラム追加
            badges_table = Badges.query.filter(Badges.user_id==user,Badges.meal_id==meal).all()
            if len(badges_table) == 0:
                add_data(Badges(user,meal,level))
            else:
                print("level",level)
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
            if meal_count==1:
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
                
        # meal_id_list=[meal_id1,meal_id2,meal_id3,meal_id4,meal_id5]
        post=[]
        for m_id in meal_id:
            print(m_id) # back確認用
            if m_id == None:
                pass
            else:
                b = judge_budges(m_id)
                if b['badge_level'] == None:
                    pass
                else:
                    post.append(b)
        print(post) # back確認用
        return jsonify(get_badges=post)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

#kimura
#POSTページに来た時に存在する料理名を返す
@app.route('/post',methods=['GET'])
def return_meal_name():
    #meal_nameを取ってくる
    #jsonにして送り返す
    meal_name_list=[]
    for i in range(len(Meal_content.query.all())):
        name_json={
            'meal_name' : Meal_content.query.all()[i].name
        }
        meal_name_list.append(name_json)
    dt_now = datetime.datetime.now()
    date=int(dt_now.strftime('%d'))
    bonus_id=date%15+1
    bonus_name=Meal_content.query.filter(Meal_content.meal_id==bonus_id).all()[0].name
    return jsonify(results = meal_name_list, bonus=bonus_name)

# niimi
# 役割：料理検索
# 引数：meal_id
# 返り値：meal_name, user_id,image_url,post_id
# curl http://localhost:5000/search/meal -X POST -H "Content-Type: application/json" --data '{"meal_name":"カレー"}'
@app.route('/search/meal', methods=['POST'])
# @jwt_required
@cross_origin()
def search_meal():
    try:
        payload = request.json
        meal_name = payload.get('meal_name')
        meal_name=str(meal_name).split("'")[-2]
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
                    'post_id':users_post[0].post_id,
                    'meal_url':users_post[0].recipe_url
                    } 
                post_list.append(post_dic)
        return jsonify(meal_name=meal_name,post=post_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# niimi
@app.route('/search/user', methods=['POST'])
# @jwt_required
def search_user():
    try:
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
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})


# kajiura
# stage2-4 ステータスページ
@app.route('/badge-status', methods=['GET'])
@jwt_required
def badge_status_json():
    try:
        # user_idを指定してmeal_idとmeal_nameとlevelを返す
        # user_id = 1 # とりあえず固定
        user_id = get_user_id()
        badges_raw = Badges.query.filter(Badges.user_id==user_id).all()
        badge_list = []
        for data in badges_raw:
            meal_name = Meal_content.query.filter(Meal_content.meal_id==data.meal_id).all()[0].name
            badge_dic = {
                'meal_id' : data.meal_id,
                'meal_name' : meal_name,
                'level' : data.level,
            }
            badge_list.append(badge_dic)
        return jsonify(results = badge_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# masui
@app.route('/<user_id>/badge-status', methods=['GET'])
@jwt_required
def other_badge_status_json(user_id=None):
    try:
        # user_idを指定してmeal_idとmeal_nameとlevelを返す
        # user_id = 1 # とりあえず固定
        user_id = int(user_id)
        badges_raw = Badges.query.filter(Badges.user_id==user_id).all()
        badge_list = []
        for data in badges_raw:
            meal_name = Meal_content.query.filter(Meal_content.meal_id==data.meal_id).all()[0].name
            badge_dic = {
                'meal_id' : data.meal_id,
                'meal_name' : meal_name,
                'level' : data.level,
            }
            badge_list.append(badge_dic)
        return jsonify(results = badge_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# kajiura
# total_badgeのランキングページ
@app.route('/total-badge-ranking', methods=['GET'])
@jwt_required
# curl http://localhost:5000/total-badge-ranking
def total_badge_ranking_json():
    try:
        # とりあえず全ユーザー送る
        # total_badgesの降順でソート
        users = db_session.query(User.user_id, User.name, User.total_badges, User.total_points).all()
        users.sort(key=lambda x: x[2], reverse=True)
        user_list = []
        for user in users:
            user_id, name, total_badges, total_points = user
            user_dic = {
                'user_id': user_id,
                'name': name,
                'badge': total_badges,
                'point': total_points,
            }
            #  [{user_id, name, badge, point}, {user_id, name, badge, point}, {…}]のようにレスポンス
            user_list.append(user_dic)
        return jsonify(results = user_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# kajiura
# total_pointのランキングページ
@app.route('/total-point-ranking', methods=['GET'])
@jwt_required
# curl http://localhost:5000/total-point-ranking
def total_point_ranking_json():
    try:
        # とりあえず全ユーザー送る
        # total_pointsの降順でソート
        users = db_session.query(User.user_id, User.name, User.total_badges, User.total_points).all()
        users.sort(key=lambda x: x[3], reverse=True)
        user_list = []
        for user in users:
            user_id, name, total_badges, total_points = user
            user_dic = {
                'user_id': user_id,
                'name': name,
                'badge': total_badges,
                'point': total_points,
            }
            #  [{user_id, name, badge, point}, {user_id, name, badge, point}, {…}]のようにレスポンス
            user_list.append(user_dic)
        return jsonify(results = user_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# kajiura
# フォロー内のtotal_badgeのランキングページ
@app.route('/followee-total-badge-ranking', methods=['GET'])
@jwt_required
# curl http://localhost:5000/followee-total-badge-ranking
def followee_total_badge_ranking_json():
    try:
        # total_badgesの降順でソート
        # user_id = 2 # とりあえず2
        user_id = get_user_id()
        flwee = [user_id]
        flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
        for f in flwee_raw:
            flwee.append(f.followed_id)
        # この時点でflwee = [2,1]
        flwee = db_session.query(User).filter(User.user_id.in_(flwee)).all()
        flwee_users = []
        for user in flwee:
            flwee_users.append((user.user_id, user.name, user.total_badges, user.total_points))
        flwee_users.sort(key=lambda x: x[2], reverse=True)

        user_list = []
        for user in flwee_users:
            user_id, name, total_badges, total_points = user
            user_dic = {
                'user_id': user_id,
                'name': name,
                'badge': total_badges,
                'point': total_points,
            }
            #  [{user_id, name, badge, point}, {user_id, name, badge, point}, {…}]のようにレスポンス
            user_list.append(user_dic)
        return jsonify(results = user_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# kajiura
# フォロー内のtotal_pointのランキングページ
@app.route('/followee-total-point-ranking', methods=['GET'])
@jwt_required
# curl http://localhost:5000/followee-total-point-ranking
def followee_total_point_ranking_json():
    try:
        # total_pointsの降順でソート
        # user_id = 2 # とりあえず2
        user_id = get_user_id()
        flwee = [user_id]
        flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
        for f in flwee_raw:
            flwee.append(f.followed_id)
        # この時点でflwee = [2,1]
        flwee = db_session.query(User).filter(User.user_id.in_(flwee)).all()
        flwee_users = []
        for user in flwee:
            flwee_users.append((user.user_id, user.name, user.total_badges, user.total_points))
        flwee_users.sort(key=lambda x: x[3], reverse=True)

        user_list = []
        for user in flwee_users:
            user_id, name, total_badges, total_points = user
            user_dic = {
                'user_id': user_id,
                'name': name,
                'badge': total_badges,
                'point': total_points,
            }
            #  [{user_id, name, badge, point}, {user_id, name, badge, point}, {…}]のようにレスポンス
            user_list.append(user_dic)
        return jsonify(results = user_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})


# kajiura
# monthly_pointのランキングページ
@app.route('/monthly-point-ranking', methods=['GET'])
@jwt_required
# curl http://localhost:5000/monthly-point-ranking
def monthly_point_ranking_json():
    try:
        # とりあえず全ユーザー送る
        # monthly_pointsの降順でソート
        users = db_session.query(User.user_id, User.name, User.total_badges).all()
        user_list = []
        for user in users:
            user_id, name, total_badges = user
            user_point_history = Point_user.query.filter(Point_user.user_id==user_id).all()
            points = 0
            for data in user_point_history:
                if(int(data.get_date[5:7]) == datetime.datetime.now().month):
                    points += data.point
            user_list.append((user_id, name, total_badges, points))

        user_list.sort(key=lambda x: x[3], reverse=True)

        result_list = []
        for user in user_list:
            user_id, name, total_badges, monthly_points = user
            user_dic = {
                'user_id': user_id,
                'name': name,
                'badge': total_badges,
                'point': monthly_points,
            }
            #  [{user_id, name, badge, point}, {user_id, name, badge, point}, {…}]のようにレスポンス
            result_list.append(user_dic)
        return jsonify(results = result_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})


# kajiura
# フォロー内のmonthly_pointのランキングページ
@app.route('/followee-monthly-point-ranking', methods=['GET'])
@jwt_required
# curl http://localhost:5000/followee-monthly-point-ranking
def followee_monthly_point_ranking_json():
    try:
        # とりあえず全ユーザー送る
        # monthly_pointsの降順でソート
        # user_id = 2 # とりあえず2
        user_id = get_user_id()
        flwee = [user_id]
        flwee_raw = User_relation.query.filter(User_relation.follower_id==user_id).all()
        for f in flwee_raw:
            flwee.append(f.followed_id)
        # この時点でflwee = [2,1]
        flwee = db_session.query(User).filter(User.user_id.in_(flwee)).all()
        flwee_users = []
        for user in flwee:
            flwee_users.append((user.user_id, user.name, user.total_badges))

        user_list = []
        for user in flwee_users:
            user_id, name, total_badges = user
            user_point_history = Point_user.query.filter(Point_user.user_id==user_id).all()
            points = 0
            for data in user_point_history:
                if(int(data.get_date[5:7]) == datetime.datetime.now().month):
                    points += data.point
            user_list.append((user_id, name, total_badges, points))

        user_list.sort(key=lambda x: x[3], reverse=True)

        result_list = []
        for user in user_list:
            user_id, name, total_badges, monthly_points = user
            user_dic = {
                'user_id': user_id,
                'name': name,
                'badge': total_badges,
                'point': monthly_points,
            }
            #  [{user_id, name, badge, point}, {user_id, name, badge, point}, {…}]のようにレスポンス
            result_list.append(user_dic)
        return jsonify(results = result_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})


# kajiura
# stage1-4 レシピのランキングページ
@app.route('/meal-ranking', methods=['GET'])
@jwt_required
# curl http://localhost:5000/meal-ranking
def meal_ranking_json():
    try:
        # Cook_historyから人気料理ランキングを取得
        # 各meal_idをcountして個数の降順でソート
        # meal_idからmeal_nameを取得
        import collections
        hists = db_session.query(Cook_history.meal_id).all()
        hists = list(collections.Counter(hists).items())
        hists.sort(key=lambda x: x[1], reverse=True)
        count_list = []
        for hist in hists:
            meal_id, count = hist
            meal_id = meal_id[0]
            if meal_id is None:
                continue
            meal_name = Meal_content.query.filter(Meal_content.meal_id==meal_id).all()[0].name
            count_dic = {
                'meal_id': meal_id,
                'meal_name': meal_name,
                'count': count,
            }
            count_list.append(count_dic)
        return jsonify(results = count_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# kajiura
# レシピの週間ランキングページ
@app.route('/weekly-meal-ranking', methods=['GET'])
@jwt_required
# curl http://localhost:5000/weekly-meal-ranking
def weekly_meal_ranking_json():
    try:
        # Cook_historyから人気料理ランキングを取得
        # 各meal_idをcountして個数の降順でソート
        # meal_idからmeal_nameを取得
        import collections
        hists = db_session.query(Cook_history.meal_id, Cook_history.post_id).all()
        meal_list = []
        for hist in hists:
            meal_id, post_id = hist
            if post_id is None or meal_id is None:
                continue
            create_at = Post.query.filter(Post.post_id==post_id).all()[0].create_at
            d_create_at = datetime.date(year=int(create_at[:4]), month=int(create_at[5:7]), day=int(create_at[8:10]))
            if abs(datetime.date.today() - d_create_at).days < 7:
                meal_list.append(meal_id)

        hists = list(collections.Counter(meal_list).items())
        hists.sort(key=lambda x: x[1], reverse=True)
        count_list = []
        for hist in hists:
            meal_id, count = hist
            meal_name = Meal_content.query.filter(Meal_content.meal_id==meal_id).all()[0].name
            count_dic = {
                'meal_id': meal_id,
                'meal_name': meal_name,
                'count': count,
            }
            count_list.append(count_dic)
        return jsonify(results = count_list)
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})


# niimi
# POSTのテスト
@app.route('/test-post', methods=['POST'])
@cross_origin(support_credentials=True)
def test_post():
    try:
        payload = request.json
        print("payload : ",payload)
        name = payload.get('name')
        return jsonify({'name-response': name+"1"})
    except Exception as e:
        abort(404, {'code': 'Not found', 'message': str(e)})

# niimi
# エラーのハンドリング
@app.errorhandler(400)
@app.errorhandler(401)
@app.errorhandler(404)
@app.errorhandler(405)
def error_handler(error):
    # error.code: HTTPステータスコード
    # error.description: abortで設定したdict型
    print(error)
    return jsonify({'error': {
        'code': error.description['code'],
        'message': error.description['message']
    }}), error.code

## おまじない
if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0")
    # app.run(debug=True, host="localhost", port=5001)