from flask import Flask, request, send_file, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus

# Load environment variables from .env (if present)
load_dotenv()

app = Flask(__name__)

# MongoDB connection setup
MONGO_URI = os.environ.get("MONGO_URI")
if MONGO_URI:
    client = MongoClient(MONGO_URI)
else:
    # Fallback to hardcoded credentials (not recommended for production)
    username = quote_plus("sony-01user")
    password = quote_plus("ajitshinde.4may2007")
    cluster_url = "sony-01cloud.u6y3eqh.mongodb.net"
    connection_string = f"mongodb+srv://{username}:{password}@{cluster_url}/?retryWrites=true&w=majority"
    client = MongoClient(connection_string)

db = client["portfolio_db"]
collection = db["contacts"]

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Example: Save form data to MongoDB
    data = request.form.to_dict()
    if data:
        collection.insert_one(data)
        return jsonify({"status": "success", "message": "Data saved!"})
    return jsonify({"status": "error", "message": "No data received."}), 400

if __name__ == "__main__":
    app.run(debug=True)
