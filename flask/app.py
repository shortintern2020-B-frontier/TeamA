from flask import Flask
from flask_cors import CORS, cross_origin
app = Flask(__name__)

@app.route('/mypage', methods=['GET'])
@cross_origin()
def mypage_json():
    user_dic = {
        'image_url': 'test'
        'followers': x
        'followees': y
        'total_badge': z
        'total_point': p
    }
    return jsonify(user_dic)





# stage1-3
@app.route('/status', methods=['GET'])
def statuspage_json():
    badges_dic = {
        # hoge
    }
    return jsonify(badges_dic)

if __name__ == "__main__":
    app.run(debug=True)