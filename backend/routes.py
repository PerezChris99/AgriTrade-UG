from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User, Product, Category, Review, Order, Transaction, db

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = User(
        username=data['username'],
        password=data['password'],
        email=data['email']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully"), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.password == data['password']:
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify(message="Invalid credentials"), 401

@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify(message="User logged out successfully"), 200

@api.route('/products', methods=['GET', 'POST'])
@jwt_required()
def manage_products():
    # ...existing code...
    return jsonify(products=products), 200

@api.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product=product.serialize())

@api.route('/users/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_profile(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user=user.serialize())

@api.route('/transactions', methods=['POST'])
@jwt_required()
def create_transaction():
    # ...existing code...
    return jsonify(message="Transaction successful"), 201

@api.route('/orders', methods=['POST'])
@jwt_required()
def create_order():
    # ...existing code...
    return jsonify(message="Order created successfully"), 201

@api.route('/categories', methods=['GET', 'POST'])
@jwt_required()
def manage_categories():
    if request.method == 'POST':
        data = request.get_json()
        new_category = Category(name=data['name'])
        db.session.add(new_category)
        db.session.commit()
        return jsonify(message="Category created successfully"), 201
    else:
        categories = Category.query.all()
        return jsonify(categories=[category.serialize() for category in categories]), 200

@api.route('/reviews', methods=['POST'])
@jwt_required()
def create_review():
    data = request.get_json()
    new_review = Review(
        product_id=data['product_id'],
        user_id=data['user_id'],
        rating=data['rating'],
        comment=data['comment']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(message="Review created successfully"), 201

@api.route('/admin/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if not current_user.is_admin:
        return jsonify(message="Access forbidden"), 403

    users = User.query.all()
    products = Product.query.all()
    orders = Order.query.all()
    return jsonify(
        users=[user.serialize() for user in users],
        products=[product.serialize() for product in products],
        orders=[order.serialize() for order in orders]
    ), 200
