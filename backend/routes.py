from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from models import User, Product, Transaction, db

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    # ...existing code...
    return jsonify(message="User registered successfully"), 201

@api.route('/login', methods=['POST'])
def login():
    # ...existing code...
    return jsonify(access_token=access_token), 200

@api.route('/products', methods=['GET', 'POST'])
@jwt_required()
def manage_products():
    # ...existing code...
    return jsonify(products=products), 200

@api.route('/transactions', methods=['POST'])
@jwt_required()
def create_transaction():
    # ...existing code...
    return jsonify(message="Transaction successful"), 201
