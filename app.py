from flask import Flask, request, send_from_directory, redirect
from pymongo import MongoClient
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='static', static_url_path='')

# MongoDB credentials from environment or hardcoded (safer to use .env)
username = quote_plus(os.getenv("DB_USER", "sony-01user"))
password = quote_plus(os.getenv("DB_PASS", "ajitshinde.4may2007"))
cluster_url = os.getenv("DB_CLUSTER", "sony-01cloud.u6y3eqh.mongodb.net")

connection_string = f"mongodb+srv://sony-01user:<ajitshinde.4may2007>@sony-01cloud.u6y3eqh.mongodb.net/?retryWrites=true&w=majority&appName=sony-01cloud"

client = MongoClient(connection_string)
db = client['portfolio_db']
collection = db['contacts']

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/submit', methods=['POST'])
def submit():
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')

    if not name or not email or not subject or not message:
        return "❌ All fields are required.", 400

    collection.insert_one({
        'name': name,
        'email': email,
        'subject': subject,
        'message': message
    })

    return "✅ Thank you! Your message has been received."

if __name__ == '__main__':
    app.run(debug=True)