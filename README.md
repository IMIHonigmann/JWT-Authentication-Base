# README.md

# Auth Node App

This project is a Node.js application that implements JSON Web Token (JWT) authentication using Passport.js and PostgreSQL. It provides a simple way to register and log in users, securing routes with JWT.

## Features

- User registration and login
- JWT authentication
- PostgreSQL database integration
- Middleware for protecting routes

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd auth-node-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and configure your database connection and JWT secret.

## Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Use the following endpoints for authentication:

   - **POST** `/register` - Register a new user
   - **POST** `/login` - Log in an existing user

## Contributing

Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License.