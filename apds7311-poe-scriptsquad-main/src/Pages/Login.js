import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
    // State variables to manage user input, error, and success messages
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
    
        const loginData = {
            username: enteredUsername,
            password: enteredPassword,
        };
    
        try {
            const response = await fetch('https://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
    
            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('Login successful! Redirecting...');
                localStorage.setItem('token', result.token);  // Store the token for authenticated sessions
                setError('');  // Clear any previous error message
                setTimeout(() => navigate('/dashboard'), 1000);  // Delay to allow user to see the success message
            } else {
                const errorData = await response.json();
                setError(typeof errorData.error === 'string' ? errorData.error : 'Invalid login credentials');
            }
        } catch (error) {
            setError('An error occurred while logging in. Please try again.');
        }
    };

    return (
        <div
            className="login-background"
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
                margin: '0',
                padding: '0',
                boxSizing: 'border-box',
            }}
        >
            <div className="form-container">
                <h1>Customer Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder='Username'
                            value={enteredUsername}
                            onChange={(e) => setEnteredUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder='Password'
                            value={enteredPassword}
                            onChange={(e) => setEnteredPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                
                {/* Display error or success messages */}
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <p className="login-message">
                    Don’t have an account? <Link to="/" className="login-link">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
