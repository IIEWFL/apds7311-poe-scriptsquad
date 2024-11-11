Changes and Sonar, Circle.ci, Snyk results under Updates To The App.docx.

# International Payments Portal

## Table of Contents
1. [Group Members](#group-members)
2. [Project Overview](#project-overview)
3. [Technologies Used](#technologies-used)
4. [Features](#features)
5. [Security Measures](#security-measures)
6. [Getting Started](#getting-started)
7. [Installation Instructions](#installation-instructions)
8. [Troubleshooting](#troubleshooting)
9. [Additional Resources](#additional-resources)

---

## 1. Group Members
- **Katalika Lalla** (ST: ST10030992)
- **Kelisha Naidoo** (ST: ST10100775)
- **Aariya Singh** (ST: ST10029788)

---

## 2. Project Overview
The **International Payments Portal** is a secure and user-friendly platform for processing international bank transactions. It allows customers to register, log in, and complete cross-border payments, while bank employees can review and approve transactions before they are securely processed via the SWIFT network. The system prioritizes ease of use while ensuring robust security for reliable international payments.

---

## 3. Technologies Used
- **Frontend**: React
- **Backend**: Node.js with Express
- **Database**: MongoDB

---

## 4. Features

### Customer Portal
- **User Registration**: Customers can register with necessary details (full name, ID number, account number, and password).
- **Login**: Customers authenticate using their username, account number, and password.

### International Payment
- **Transaction Options**: Customers can select payment amount, currency, and provider (e.g., SWIFT).
- **Payee Details**: Required fields for payee's account information and SWIFT code.
- **Payment Finalization**: Customers review and finalize payment details before initiating a secure transaction.

### Employee Portal
- **Payment Verification**: Bank employees verify international payments to ensure compliance and security.
- **Transaction Management**: Employees can review, validate, and process transactions.

---

## 5. Security Measures
Security is a core priority in the portal, which includes:

- **Password Hashing**: Secure hashing and salting of passwords for safe storage.
- **Brute-Force Protection**: Protection against unauthorized access using Express Brute to limit failed login attempts.
- **Input Validation**: Input validation through RegEx-based whitelisting to prevent SQL injection and XSS attacks.
- **SSL Encryption**: SSL-encrypted communications to secure data in transit.
- **Session Management**: Secure session handling to prevent session hijacking and unauthorized access.

---

## 6. Getting Started with the SafeTransact App

Follow these steps to set up and run the application locally:

### 1. Set Up the Frontend
1. Open a terminal in the `apds7311-poe-scriptsquad-main` folder.
2. Install the required dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Set Up the Backend
1. Navigate to the `apds7311-poe-scriptsquad-main/Backend` folder.
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

---

## Admin Account

To log in as an admin and manage transactions (confirm, deny, or flag), use the following credentials:

- **Username**: `AariyaS`
- **Password**: `AariyaS.123`

---

### Browser Configuration for HTTPS Testing
To bypass SSL warnings during local development, configure your browser as follows:

1. Open **Google Chrome**.
2. Navigate to `chrome://flags/#allow-insecure-localhost`.
3. Enable **"Allow invalid certificates for resources loaded from localhost"**.

---

### Required Tools
- **Visual Studio Code**: IDE for editing and managing code.
- **Node.js**: Ensure Node.js is installed for backend server functionality.
- **MongoDB**: Set up MongoDB locally or use MongoDB Atlas for cloud storage.

---

## 7. Installation Instructions

### Step-by-Step Guide

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/IIEWFL/apds7311-poe-scriptsquad.git
   ```

2. **Install Dependencies**  
   Navigate to both the frontend and backend directories and install the required dependencies:
   ```bash
   cd apds7311-poe-scriptsquad-main
   npm install  # for frontend
   cd Backend
   npm install  # for backend
   ```

3. **Configure Environment Variables**  
   - In the backend directory, create a `.env` file with necessary environment variables, such as database URIs and API keys.

4. **Start MongoDB**  
   - If using a local MongoDB instance, make sure it's running. Alternatively, configure your MongoDB Atlas connection.

5. **Access the Application**  
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:3001](http://localhost:3001)

---

## 8. Troubleshooting

### Common Issues

- **Invalid Port**: Ensure the backend runs on port 3001 and the frontend on port 3000.
- **MongoDB Connection Errors**: Verify MongoDB is active locally or check the connection string for MongoDB Atlas.
- **JWT Authentication Issues**: Ensure the token is included in the `Authorization` header (`Bearer <token>`).
- **CORS Errors**: If there are issues with frontend-backend communication, check CORS settings in `server.js`.
- **Environment Variables Not Set**: Ensure that the `.env` file is properly configured and loaded in the backend.

---

## 9. Additional Resources

- **Demo Video**: [Google Drive Link](https://drive.google.com/drive/folders/11AD3YWT0dndtYNnAnZRbUBEXp8TcqOZE?usp=sharing)
- **React Documentation**: [React](https://reactjs.org/docs/getting-started.html)
- **Node.js Documentation**: [Node.js](https://nodejs.org/en/docs/)
- **MongoDB Documentation**: [MongoDB](https://docs.mongodb.com/)

For further assistance, please reach out to any of the group members listed in the [Group Members](#group-members) section.

---

This version improves readability, consistency, and structure. Let me know if there are any other adjustments you'd like!
