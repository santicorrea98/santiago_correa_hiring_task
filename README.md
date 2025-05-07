# Project Overview

It is deployed live [here](https://santiago-correa-hiring-task.vercel.app/), check it out!

This repo contains two main services:

- **./frontend**: A Next.js app running on `localhost:3000`
- **./backend**: A Flask app running on `localhost:5000`

This is a guide to run it locally.

## Prerequisites

Include the follwing file `./frontend/.env.local` with these values:

```
API_URL=http://localhost:5000
KEY=secret-key
```

Before running the application, make sure you have the following installed:

### For Frontend:

- **Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0"**
- **npm** (comes bundled with Node.js)

### For Backend:

- **Python 3.9=+**
- **pip** (Python's package manager)

## Getting Started

Follow these steps to run both the frontend and backend locally:

### 1. **Running the backend locally**

#### Step 1: Install dependencies

Navigate to the `backend` folder and install the dependencies.

```bash
cd backend

python3 -m venv venv      # Your choice to use a virtual environment, recommended
source venv/bin/activate  # On Windows, use: venv\Scripts\activate

pip install -r requirements.txt
```

#### Step 2: Running the app

```bash
python3 app.py
```

### 2. **Running the frontend locally**

#### Step 1: Install dependencies

Navigate to the `frontend` folder and install the dependencies.

```bash
cd frontend
npm install
```

#### Step 2: Running the app

```bash
npm run dev
```

### 3. Done!

Navigate to `localhost:3000` in your browser!
