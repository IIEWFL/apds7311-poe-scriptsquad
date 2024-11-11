// Import mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the Transaction model
const transactionSchema = new mongoose.Schema({
    // Reference to the 'User' model (the user initiating the transaction)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Recipient's information for the transaction
    recipientName: String, // Name of the recipient
    recipientsBank: String, // Name of the recipient's bank
    recipientsAccountNumber: String, // Account number of the recipient
    amountToTransfer: Number, // Amount to be transferred in the transaction
    swiftCode: String, // SWIFT code for international transfers
    transactionType: String, // Type of transaction (e.g., deposit, withdrawal)
    status: String, // Status of the transaction (e.g., pending, completed)
    
    // Date of the transaction (defaults to the current date if not provided)
    date: { type: Date, default: Date.now }
});

// Create the 'Transaction' model using the transaction schema
const Transaction = mongoose.model('Transaction', transactionSchema);


// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // User's first name
    lastName: { type: String, required: true }, // User's last name
    email: { type: String, required: true, unique: true }, // User's email (must be unique)
    username: { type: String, required: true, unique: true }, // Username (must be unique)
    password: { type: String, required: true }, // User's password
    accountNumber: { type: String }, // User's account number (optional)
    idNumber: { type: String, required: true }, // User's ID number (required)
    
    // Role of the user, default is "user" but can be "employee" or "admin"
    role: { type: String, enum: ["user", "employee", "admin"], default: "user" } 
});

// Create the 'User' model using the User schema
const User = mongoose.model('User', UserSchema);


// Define the schema for the Employee model
const EmployeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // Employee's first name
    lastName: { type: String, required: true }, // Employee's last name
    email: { type: String, required: true, unique: true }, // Employee's email (must be unique)
    username: { type: String, required: true, unique: true }, // Username (must be unique)
    password: { type: String, required: true }, // Employee's password
    idNumber: { type: String, required: true }, // Employee's ID number
    role: { 
        type: String, 
        enum: ["employee", "manager"], // Defines allowed roles for employees
        default: "employee" // Default role is 'employee'
    }
});

// Create the 'Employee' model using the Employee schema
const Employee = mongoose.model('Employee', EmployeeSchema);


// Define the schema for the Account model
const AccountSchema = new mongoose.Schema({
    // Reference to the User model (each account is associated with a user)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
    // Balance of the user's account, defaults to 0.0
    balance: { type: Number, default: 0.0 }, 
    
    // Account number, must be unique for each user
    accountNumber: { type: String, required: true },
});

// Create the 'Account' model using the Account schema
const Account = mongoose.model('Account', AccountSchema);


// Define the schema for the Admin model
const AdminSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // Admin's first name
    lastName: { type: String, required: true }, // Admin's last name
    email: { type: String, required: true, unique: true }, // Admin's email (must be unique)
    username: { type: String, required: true, unique: true }, // Username (must be unique)
    password: { type: String, required: true }, // Admin's password
    idNumber: { type: String, required: true }, // Admin's ID number
    role: { type: String, default: "admin" }  // Fixed role as "admin"
});

// Create the 'Admin' model using the Admin schema
const Admin = mongoose.model('Admin', AdminSchema);


// Define the schema for the Manager model
const ManagerSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // Manager's first name
    lastName: { type: String, required: true }, // Manager's last name
    email: { type: String, required: true, unique: true }, // Manager's email (must be unique)
    username: { type: String, required: true, unique: true }, // Username (must be unique)
    password: { type: String, required: true }, // Manager's password
    idNumber: { type: String, required: true }, // Manager's ID number
    role: { type: String, default: "manager" }  // Fixed role as "manager"
});

// Create the 'Manager' model using the Manager schema
const Manager = mongoose.model('Manager', ManagerSchema);


// Export all models to be used in other parts of the application
module.exports = { User, Account ,Transaction, Employee, Admin, Manager };

//-------------------------------END OF FILE--------------------//
