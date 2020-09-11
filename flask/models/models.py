from sqlalchemy import Column, Integer, String, Text, DateTime
from models.database import Base
from datetime import datetime
from sqlalchemy import func


# kajiura
class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    name = Column(String, unique=True)
    password = Column(String)
    total_badges = Column(Integer)
    total_points = Column(Integer)

    def __init__(self, email=None, name=None, password=None, total_badges=None, total_points=None):
        self.email = email
        self.name = name
        self.password = password
        self.total_badges = total_badges
        self.total_points = total_points

    def __repr__(self):
        return "User<{}, {}, {}, {}, {}, {}>".format(self.user_id, self.email, self.name, self.password, self.total_badges, self.total_points)


# masui
class Meal_content(Base):
    __tablename__ = 'meal_content'
    meal_id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True)
    point = Column(Integer)

    def __init__(self, name=None, point=None):
        self.name = name
        self.point = point

    def __repr__(self):
        return 'Meal_content<{}, {}, {}>'.format(self.meal_id, self.name, self.point)


# kajiura
class Cook_history(Base):
    __tablename__ = 'cook_histories'
    cook_history_id = Column(Integer, primary_key=True)
    meal_id = Column(Integer)
    user_id = Column(Integer)
    post_id = Column(Integer)

    def __init__(self, meal_id=None, user_id=None, post_id=None):
        self.meal_id = meal_id
        self.user_id = user_id
        self.post_id = post_id

    def __repr__(self):
        return "Cook_history<{}, {}, {}, {}>".format(self.cook_history_id, self.meal_id, self.user_id, self.post_id)


# kajiura
class Point_user(Base):
    __tablename__ = 'point_users'
    point_user_id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    point = Column(Integer)
    get_date = Column(String)

    def __init__(self, user_id=None, point=None, get_date=None):
        self.user_id=user_id
        self.point=point
        self.get_date=get_date

    def __repr__(self):
        return "Point_user<{}, {}, {}, {}>".format(self.point_user_id, self.user_id, self.point, self.get_date)


# kajiura
class Post(Base):
    __tablename__ = 'posts'
    post_id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    meal_id1 = Column(Integer)
    meal_id2 = Column(Integer)
    meal_id3 = Column(Integer)
    meal_id4 = Column(Integer)
    meal_id5 = Column(Integer)
    image_url = Column(String)
    recipe_url = Column(String)
    post_comment = Column(String)
    create_at = Column(String)

    def __init__(self, user_id=None, meal_id1=None, meal_id2=None, meal_id3=None, meal_id4=None, meal_id5=None, image_url=None, recipe_url=None, post_comment=None, create_at=None):
        self.user_id = user_id
        self.meal_id1 = meal_id1
        self.meal_id2 = meal_id2
        self.meal_id3 = meal_id3
        self.meal_id4 = meal_id4
        self.meal_id5 = meal_id5
        self.image_url = image_url
        self.recipe_url = recipe_url
        self.post_comment = post_comment
        self.create_at = create_at

    def __repr__(self):
        return "Post<{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}>".format(self.post_id, self.user_id, self.meal_id1, self.meal_id2, self.meal_id3, self.meal_id4, self.meal_id5, self.image_url, self.recipe_url, self.post_comment, self.create_at)


# kajiura
class User_relation(Base):
    __tablename__ = 'user_relations'
    user_relation_id = Column(Integer, primary_key=True)
    follower_id = Column(Integer)
    followed_id = Column(Integer)

    def __init__(self, follower_id=None,followed_id=None):
        self.follower_id = follower_id
        self.followed_id = followed_id

    def __repr__(self):
        return "User_relation<{}, {}, {}>".format(self.user_relation_id, self.follower_id, self.followed_id)

# kajiura
class Badges(Base):
    __tablename__ = 'badges'
    badges_id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    meal_id = Column(Integer)
    level = Column(Integer)

    def __init__(self, user_id=None, meal_id=None, level=None):
        self.user_id = user_id
        self.meal_id = meal_id
        self.level = level

    def __repr__(self):
        return "Badges<{}, {}, {}>".format(self.user_id, self.meal_id, self.level)

# sqliteから以下でテーブル作成
# create table User(user_id integer primary key autoincrement, name string);
# create table cook_history(meal_id integer primary key autoincrement, user_id integer);
# create table meal(meal_id integer primary key autoincrement, name sring);
# create table point_user(post_id integer primary key autoincrement, name sring);
# create table post(post_id integer primary key autoincrement, user_id integer, meal_id integer,image_url string,post_comment text,recipe_url string);
# create table user_relations(follower_id string autoincrement, followed_id string);