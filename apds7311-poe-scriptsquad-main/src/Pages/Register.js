import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';
import { Link } from 'react-router-dom';


const Register = () => {
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmailAddress, setEnteredEmailAddress] = useState('');
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
    const [enteredAccountNumber, setEnteredAccountNumber] = useState(''); // Account number state
    const [enteredIDNumber, setEnteredIDNumber] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        // Password confirmation check
        if (enteredPassword !== enteredConfirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    
        // Constructing the user data object
        const userData = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: enteredEmailAddress,
            username: enteredUsername,
            password: enteredPassword,
            accountNumber: enteredAccountNumber, // Adding account number to userData
            idNumber: enteredIDNumber,
        };
    
        try {
            // Sending the POST request to register the user
            const response = await fetch('https://localhost:3001/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            // Check if the response is successful
            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('User registered successfully!');
                console.log('User registered successfully:', result);
                setError(''); // Clear previous errors if successful
    
                // Redirect after a brief delay
                setTimeout(() => navigate('/login'), 1000);
    
                // Reset form fields
                setEnteredFirstName('');
                setEnteredLastName('');
                setEnteredEmailAddress('');
                setEnteredUsername('');
                setEnteredPassword('');
                setEnteredConfirmPassword('');
                setEnteredAccountNumber('');
                setEnteredIDNumber('');
            } else {
                // If the response is not successful, handle errors
                const errorData = await response.json();
                console.error('Error Data:', errorData); // Log the error data for debugging
                if (response.status === 400) {
                    setError(errorData.message || 'Please fill in all required fields correctly.');
                } else if (response.status === 409) {
                    setError(errorData.message || 'Email or username is already taken.');
                } else if (response.status === 500) {
                    setError('Server error. Please try again later.');
                } else if (response.status === 422) {
                    setError(errorData.message || 'There was an issue with your form data.');
                } else {
                    setError(errorData.error || 'Registration failed. Please try again.');
                }
            }
        } catch (error) {
            // Log the error and show a more detailed message
            console.error('Fetch Error:', error);  // Log the actual error to the console
            if (error.name === 'TypeError' && error.message.includes('NetworkError')) {
                setError('Network error. Please check your connection and try again.');
            } else if (error.message.includes('Failed to fetch')) {
                setError('Failed to reach the server. Please try again later.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };
    

    return (
        <div
            className="register-background"
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/background.png'})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className="register-container">
                <div className="form-container">
                    <h1>Customer Registration</h1>
                    <form onSubmit={handleRegister}> {/* Ensure this is here */}
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={enteredFirstName}
                                onChange={(e) => setEnteredFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={enteredLastName}
                                onChange={(e) => setEnteredLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={enteredEmailAddress}
                                onChange={(e) => setEnteredEmailAddress(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={enteredUsername}
                                onChange={(e) => setEnteredUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={enteredPassword}
                                onChange={(e) => setEnteredPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={enteredConfirmPassword}
                                onChange={(e) => setEnteredConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Account Number"
                                value={enteredAccountNumber}
                                onChange={(e) => setEnteredAccountNumber(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="ID Number"
                                value={enteredIDNumber}
                                onChange={(e) => setEnteredIDNumber(e.target.value)}
                                required
                            />
                        </div>
                        
                        <button type="submit" className="register-btn">Register</button>
                    </form>
                    
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <p className="login-message">
                        Already have an account? <Link to="/login" className="login-link">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
