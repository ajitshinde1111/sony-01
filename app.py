from flask import Flask, request, send_file
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client['portfolio_db']
collection = db['contacts']

@app.route('/')
def index():
    return send_file('index.html')   # ← इथे बदल

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    collection.insert_one({
        'name': name,
        'email': email,
        'message': message
    })

    return "✅ Thank you! Your message has been received."

if __name__ == '__main__':
    app.run(debug=True)
