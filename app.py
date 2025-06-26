from flask import Flask, request, send_file
from pymongo import MongoClient
from urllib.parse import quote_plus

app = Flask(__name__)

# MongoDB Username and Password (Encoded)
username = quote_plus("sony-01user")
password = quote_plus("ajitshinde.4may2007")

# Cluster URL
cluster_url = "sony-01cloud.u6y3eqh.mongodb.net"

# ✅ Correct Connection String using variables
connection_string = f"mongodb+srv://{username}:{password}@{cluster_url}/?retryWrites=true&w=majority"

# Connect to MongoDB
client = MongoClient(connection_string)
db = client['portfolio_db']
collection = db['contacts']

@app.route('/')
def index():
    return send_file('index.html')  # Make sure index.html is in same folder

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    subject = request.form['subject']  # ✅ Added subject
    message = request.form['message']

    collection.insert_one({
        'name': name,
        'email': email,
        'subject': subject,  # ✅ Save subject to DB
        'message': message
    })

    return "✅ Thank you! Your message has been received."

if __name__ == '__main__':
    app.run(debug=True)
