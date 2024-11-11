import React, { useState } from 'react';

const CreateAdmin = () => {
    // State hooks for form fields
    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');
    const [enteredIDNumber, setEnteredIDNumber] = useState('');
    const [error, setError] = useState('');  // Error message state
    const [successMessage, setSuccessMessage] = useState('');  // Success message state

    // Function to handle form submission
    const handleRegister = async (e) => {
        e.preventDefault();
        if (enteredPassword !== enteredConfirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Placeholder for API request (this can be replaced with actual backend logic)
            const response = await fetch('https://example.com/api/create-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: enteredFirstName,
                    lastName: enteredLastName,
                    email: enteredEmail,
                    username: enteredUsername,
                    password: enteredPassword,
                    idNumber: enteredIDNumber,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create admin account');
            }

            const data = await response.json();
            setSuccessMessage('Admin account created successfully!');
            setError('');
        } catch (error) {
            setError(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/background.png'})`,  // Background image for the page
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                height: '100vh',  // Full viewport height
                width: '100vw',   // Full viewport width
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0',
                padding: '0',
                boxSizing: 'border-box',
            }}
        >
            <div className="register-container">
                <div className="form-container">
                    <h1>Create New Admin Account</h1>  {/* Updated form heading */}
                    <form onSubmit={handleRegister}>
                        {/* Grouped input fields for first and last name */}
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

                        {/* Grouped input fields for email and username */}
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={enteredEmail}
                                onChange={(e) => setEnteredEmail(e.target.value)}
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

                        {/* Grouped input fields for password and confirm password */}
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

                        {/* ID number input field */}
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="ID Number"
                                value={enteredIDNumber}
                                onChange={(e) => setEnteredIDNumber(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="register-btn">Create Admin Account</button>
                    </form>

                    {/* Display error or success message */}
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default CreateAdmin;
