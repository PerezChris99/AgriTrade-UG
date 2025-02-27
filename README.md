# AgriTrade UG - Economic Diversification & Employment System

## Overview
AgriTrade UG is a web-based digital marketplace designed to tackle reliance on agriculture, youth unemployment, and small business management in Uganda. The system consists of a frontend built with JavaScript and a backend built with Python-Flask.

## Features
### Frontend (JavaScript)
- User-friendly marketplace for local producers to list and sell products
- Secure buyer-seller messaging system
- Real-time inventory updates and sales tracking
- Online payment integration (Mobile Money, PayPal, Bank Transfers)
- AI-powered product recommendations

### Backend (Python-Flask)
- RESTful API for marketplace operations (user management, product listings, transactions)
- Secure authentication (JWT-based) for sellers and buyers
- Automated tax and commission calculations for platform revenue
- Database (PostgreSQL/MongoDB) to store products, transactions, and user data

## Installation

### Prerequisites
- Python 3.x
- Node.js
- PostgreSQL or MongoDB

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/agrimarket.git
    cd agrimarket/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up the database and environment variables:
    ```bash
    cp .env.example .env
    # Update .env with your database credentials and JWT secret key
    ```

5. Run the Flask application:
    ```bash
    flask run
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Usage
- Access the frontend at `http://localhost:3000`
- Access the backend API at `http://localhost:5000/api`

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

