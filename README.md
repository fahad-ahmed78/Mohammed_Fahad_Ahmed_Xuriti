# CRUD Website

This is a CRUD (Create, Read, Update, Delete) website built using React for the frontend, Node.js with Express for the backend, and MongoDB as the database. The project includes features like user authentication, admin functionality, and a responsive design using Material-UI.

## Features

1. **User Registration and Login**:
   - Users can register with a username and password.
   - Registered users can log in to the system.
   - Password validation and hashing are implemented.

2. **Admin Dashboard**:
   - Admins can view a list of all registered users.
   - Admins can update or delete any user's account.

3. **User Dashboard**:
   - Regular users can update their own username and password.
   - Regular users can delete their own account.

4. **Logout Functionality**:
   - Both admins and regular users can log out of the system.

5. **JWT-based Authentication**:
   - JSON Web Tokens (JWT) are used for authentication and authorization.
   - A secret key is used to sign and verify the tokens.

6. **Responsive Design**:
   - The website is designed using Material-UI, providing a consistent and modern user interface.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB database running on your local machine or a MongoDB Atlas account.

### Installation
1. SetUp
  - Extract the zip file and open the project in VS Code or any other    
    development environment.
  - open the terminal and split it one for backend and another for   
    frontend.

2. Install the dependencies:

   ```
   cd backend
   npm install
   cd frontend
   npm install
   ```

3. Set up the environment variables:

   - .env file is already included in the backend folder.

4. Start the development servers:

   ```
   cd backend
   nodemon server.js
   cd frontend
   npm start
   ```

5. To Login as a Admin
   ```
   Username: admin
   Password: admin123
   ```


   The backend server will start running on `http://localhost:5000`, and the frontend development server will start on `http://localhost:3000`.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Register a new user or log in with an existing account.
3. Explore the admin and user dashboards based on your account type.
4. Perform CRUD operations on user accounts as an admin.
5. Update your own account details as a regular user.
6. Log out of the system when you're done.

## Developed by Mohammed Fahad Ahmed