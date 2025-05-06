https://youtu.be/lg2q53PYrjw
For video instructions!

# Education system assessment
This is a backend API for managing teachers and classes in an education system. It allows administrators to:
- Add teachers
- List teachers
- Add classes with assigned form teachers
- List all classes

The API uses a PostgreSQL database and is built with Node.js and Express.

## Prerequisites

- **Node.js** 
- **PostgreSQL** (for local database setup) 
- **Postman** (or any API testing tool) for testing the API endpoints

## Getting Started

Clone the repository using the following command:

1. git clone https://github.com/hjlg/education-system.git
2. Navigate to the project folder and run the following command to install the dependencies:


- **cd education-system**
- **cd backend**
- **npm install**

## Step 1. Set Up the Database

1. Install and set up PostgreSQL locally if you haven’t already.
2. Create a new database for the project:

- **psql -U postgres**
- **CREATE DATABASE education_system;**
- **\c education_system**

### Run SQL commands to create necessary tables for backend

CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  contactNumber VARCHAR(20) NOT NULL
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  level VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  teacherId INT REFERENCES teachers(id) ON DELETE SET NULL
);

## Step 2. Set up environment variables

1. Create .env file in backend folder.
2. Add this to .env file
DB_HOST=localhost
DB_PORT=5432 
DB_USER=postgres
DB_PASSWORD=1234 
DB_NAME=education_system

Make sure DB_PASSWORD is same as the password when you installed Postgresql

## Step 3. Run the backend

1. Compile typescript code, while in backend folder, run "npx tsc" in terminal
2. Run the server using "npm run start"

Backend should now be running at http://localhost:5000

## Step 4. Testing the API

Use Postman or other API tool to test the API

GET /api/teachers: Retrieve the list of teachers by sending a GET request to http://localhost:5000/api/teachers.

OR

POST /api/teachers: Add a new teacher by sending a POST request to http://localhost:5000/api/teachers with a JSON body like:
{
  "name": "John Doe",
  "subject": "Math",
  "email": "john.doe@example.com",
  "contactNumber": "1234567890"
}


## Step 5. Front end
1. Open another terminal and cd frontend
2. Npm install
3. npm run start

