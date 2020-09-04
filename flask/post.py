from flask import Flask
app = Flask(__name__)

@app.route('/post')
def good():
    name = "Good"
    return name

## おまじない
if __name__ == "__main__":
    app.run(debug=True)