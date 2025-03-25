from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) to allow frontend apps from different origins to interact with this API
CORS(app)

# Configure the SQLite database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"  # Path to SQLite database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Disables modification tracking to improve performance

# Initialize the SQLAlchemy database extension
db = SQLAlchemy(app)
