# MongoDB REST API Project - Complete Beginner's Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Complete Setup Guide](#complete-setup-guide)
3. [Using the API](#using-the-api)
4. [Testing Guide](#testing-guide)
5. [Troubleshooting Guide](#troubleshooting-guide)

## Introduction

This project is a REST API built with:
- Node.js (Backend runtime)
- Express.js (Web framework)
- MongoDB (Database)
- Swagger (API documentation)

### What You Can Do With This API
- Manage users (create, view)
- Handle data records (create, view, search)
- Test API endpoints
- View interactive API documentation

## Complete Setup Guide

### Step 1: Installing Required Software

#### 1.1 Node.js Installation
1. Go to [Node.js website](https://nodejs.org/)
2. Download the LTS version
3. Run the installer
4. Verify installation:
```bash
node --version
npm --version
```

#### 1.2 MongoDB Installation

##### Windows:
1. Download MongoDB Community Server:
   - Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select "Windows"
   - Click Download
2. Run the installer:
   - Double click the .msi file
   - Click "Next"
   - Choose "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Install MongoDB Compass" (optional but helpful)
   - Click "Install"
3. Verify installation:
   - Open Command Prompt
   ```bash
   mongod --version
   ```

##### Mac:
```bash
# Install Homebrew if you haven't:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

##### Linux (Ubuntu):
```bash
# Add MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
```

### Step 2: Project Setup

#### 2.1 Get the Code
```bash
# Clone repository
git clone https://github.com/yourusername/mongodb-rest-api.git

# Move into project directory
cd mongodb-rest-api

# Install dependencies
npm install
```

#### 2.2 Environment Setup
Create a file named `.env` in the project root:

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/myapp
PORT=3000
NODE_ENV=development
```

### Step 3: Starting the Project

#### Development Mode (Recommended for beginners)
```bash
npm run dev
```
This will:
- Start the server
- Auto-restart when you make changes
- Show detailed error messages

#### Production Mode
```bash
npm start
```

## Using the API

### 1. Users API

#### Create a New User
```bash
# Using curl
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "secure123"}'

# Using Postman
POST http://localhost:3000/users
Body (JSON):
{
  "username": "john_doe",
  "password": "secure123"
}
```

#### Get All Users
```bash
# Using curl
curl http://localhost:3000/users

# Using Postman
GET http://localhost:3000/users
```

### 2. Data API

#### Create New Data
```bash
# Using curl
curl -X POST http://localhost:3000/data \
  -H "Content-Type: application/json" \
  -d '{
    "id": "1",
    "Firstname": "John",
    "Surname": "Doe",
    "userid": "123"
  }'

# Using Postman
POST http://localhost:3000/data
Body (JSON):
{
  "id": "1",
  "Firstname": "John",
  "Surname": "Doe",
  "userid": "123"
}
```

#### Get Data by ID
```bash
# Using curl
curl http://localhost:3000/data/1

# Using Postman
GET http://localhost:3000/data/1
```

#### Get All Data
```bash
# Using curl
curl http://localhost:3000/data

# Using Postman
GET http://localhost:3000/data
```

### 3. Using Swagger UI

1. Start the server (`npm run dev`)
2. Open your browser
3. Go to: `http://localhost:3000/api-docs`
4. You'll see all available endpoints
5. Try endpoints directly:
   - Click on an endpoint
   - Click "Try it out"
   - Fill in required data
   - Click "Execute"

## Testing Guide

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage
```

### Creating Your Own Tests
Example test file (`tests/custom.test.js`):
```javascript
import request from 'supertest';
import app from '../src/app.js';

describe('My Custom Tests', () => {
  test('should create new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        password: 'password123'
      });
    expect(response.status).toBe(201);
  });
});
```

## Troubleshooting Guide

### Common Error 1: MongoDB Connection Failed
```
Error: MongoDB connection error
```
Solutions:
1. Check if MongoDB is running:
```bash
# Windows
net start MongoDB

# Mac
brew services list

# Linux
sudo systemctl status mongod
```
2. Verify your MongoDB URI in `.env`
3. Make sure MongoDB port (27017) is not blocked

### Common Error 2: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
Solutions:
1. Change port in `.env` file
2. Or kill the process:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Common Error 3: Module Not Found
```
Error: Cannot find module 'xyz'
```
Solutions:
1. Reinstall dependencies:
```bash
rm -rf node_modules
npm install
```
2. Check if the module is listed in package.json
3. Make sure you're in the correct directory

## Project Structure Explained

```
mongodb-rest-api/
├── src/                    # Source code
│   ├── config/            # Configuration files
│   │   └── mongodb.js     # Database setup
│   ├── models/            # Database models
│   │   └── mongodb.js     # MongoDB operations
│   ├── swagger.js         # API documentation
│   ├── app.js            # Express application
│   └── server.js         # Server entry point
├── tests/                 # Test files
├── .env                   # Environment variables
└── package.json          # Project dependencies
```

## Additional Tips

### Working with MongoDB Compass
1. Install MongoDB Compass (GUI tool)
2. Connect to: `mongodb://localhost:27017`
3. You can:
   - View databases
   - Create collections
   - Query data
   - Update records
   - Delete data

### Useful Commands
```bash
# Check MongoDB status
mongod --version

# Start MongoDB shell
mongosh

# List databases
show dbs

# Use specific database
use myapp

# Show collections
show collections

# Find all records in a collection
db.users.find()
```

### Best Practices
1. Always check MongoDB connection before running the app
2. Use meaningful names for databases and collections
3. Keep password and sensitive data in .env file
4. Run tests before deploying changes
5. Use development mode when making changes

## Contributing

Want to help improve this project?

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/new-feature
```
3. Make your changes
4. Commit:
```bash
git commit -m "Add new feature"
```
5. Push:
```bash
git push origin feature/new-feature
```
6. Create Pull Request

## Support and Resources

- MongoDB Docs: [https://docs.mongodb.com/](https://docs.mongodb.com/)
- Express.js Docs: [https://expressjs.com/](https://expressjs.com/)
- Node.js Docs: [https://nodejs.org/docs/](https://nodejs.org/docs/)
- Swagger Docs: [https://swagger.io/docs/](https://swagger.io/docs/)

## License

This project is licensed under the MIT License.