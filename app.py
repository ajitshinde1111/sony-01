from flask import Flask, request, send_from_directory, jsonify
from pymongo import MongoClient
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os
from werkzeug.utils import secure_filename

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

# MongoDB Authentication & Connection
username = quote_plus("sony-01user")
password = quote_plus("ajitshinde.4may2007")
cluster_url = "sony-01cloud.u6y3eqh.mongodb.net"
connection_string = f"mongodb+srv://{username}:{password}@{cluster_url}/?retryWrites=true&w=majority"

client = MongoClient(connection_string)
db = client['portfolio_db']
collection = db['contacts']

# Configure upload folder
UPLOAD_FOLDER = 'uploaded_images'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Serve main HTML page
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Serve CSS, JS, Images
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

# Submit contact form
@app.route('/submit', methods=['POST'])
def submit():
    name = request.form['name']
    email = request.form['email']
    subject = request.form['subject']
    message = request.form['message']

    collection.insert_one({
        'name': name,
        'email': email,
        'subject': subject,
        'message': message
    })

    return jsonify({"status": "success", "message": "Thank you! Your message has been received."})

# Upload image from device
@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"status": "error", "message": "No file part in request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"status": "error", "message": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return jsonify({"status": "success", "message": "Image uploaded successfully", "filename": filename})

# Serve uploaded images
@app.route('/uploaded_images/<filename>')
def uploaded_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
