# Frontend Hiring Task - Flask Backend

## Overview

This is a mock backend server for a frontend developer hiring task. It provides API endpoints demonstrating role-based access control (admin vs regular user) using a simple in-memory database.

**Features**:

- Role-based access control (admin/user)
- Swagger documentation
- Mock authentication using static tokens
- CRUD operations for users and houses
- In-memory "database" (no persistence)

## Requirements

- Python 3.8+
- Dependencies from `requirements.txt`

## Installation

```bash
# Clone repository
git clone https://github.com/your-repo/hiring-task-backend.git
cd hiring-task-backend

# Set up virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Running the Server

```bash
# Start development server
python app.py

# Server runs on:
# http://localhost:5000
# Swagger UI: http://localhost:5000/api/docs
```

## API Usage

### Authentication

Use these mock tokens in request headers:

```bash
# Admin token
Authorization: mocked_admin_token

# Regular user token
Authorization: mocked_user_token
```

#### Example Requests

Login (get token):

```bash
curl -X POST -H "Content-Type: application/json" \
-d '{"role": "admin"}' \
http://localhost:5000/api/login
```

curl -X POST -H "Content-Type: application/json" \
-d '{"role": "admin"}' \
https://architecture-453906.ew.r.appspot.com/api/login

Create User (Admin only):

```bash
curl -X POST -H "Authorization: mocked_admin_token" \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "role": "user"}' \
http://localhost:5000/api/user
```

Create House (Any user) :

```bash
curl -X POST -H "Authorization: mocked_user_token" \
-H "Content-Type: application/json" \
-d '{"address": "456 Oak St", "num_rooms": 4, "price": 300000}' \
http://localhost:5000/api/house
```

## How to run the tests

You can run the tests with

```python
python -m unittest test_app.py
```