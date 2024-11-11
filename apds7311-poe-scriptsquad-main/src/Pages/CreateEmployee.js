import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import './styles/Register.css';

const CreateEmployee = () => {
    // State hooks to manage form fields
    const [enteredFirstNameEmployee, setEnteredFirstNameEmployee] = useState('');
    const [enteredLastNameEmployee, setEnteredLastNameEmployee] = useState('');
    const [enteredEmailAddressEmployee, setEnteredEmailAddressEmployee] = useState('');
    const [enteredUsernameEmployee, setEnteredUsernameEmployee] = useState('');
    const [enteredPasswordEmployee, setEnteredPasswordEmployee] = useState('');
    const [enteredConfirmPasswordEmployee, setEnteredConfirmPasswordEmployee] = useState('');
    const [enteredIDNumberEmployee, setIDNumberEmployee] = useState('');
    
    // State hooks for error and success messages
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // State to track whether the user has admin privileges
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    // React Router's navigate hook for redirecting users
    const navigate = useNavigate();

    // useEffect hook to check if the user has admin privileges when the component mounts
    useEffect(() => {
        const checkAdminRole = async () => {
            // Retrieve the token from local storage
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if no token exists
                return;
            }

            try {
                // Fetch the role check API to validate if the user is an admin
                const response = await fetch('https://localhost:3001/auths/checkAdmin', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setIsAuthorized(true); // Set as authorized if the response is ok
                } else {
                    navigate('/not-authorized'); // Redirect to unauthorized page if not admin
                }
            } catch (error) {
                console.error('Authorization error:', error);
                navigate('/login'); // Redirect to login if error occurs while fetching
            }
        };

        // Call the function to check the admin role
        checkAdminRole();
    }, [navigate]); // Dependency array ensures this runs only once on mount

    // Handler function for creating a new employee
    const handleEmployeeCreation = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Prepare the employee data to send to the backend
        const employeeData = {
            firstName: enteredFirstNameEmployee,
            lastName: enteredLastNameEmployee,
            email: enteredEmailAddressEmployee,
            username: enteredUsernameEmployee,
            password: enteredPasswordEmployee,
            idNumber: enteredIDNumberEmployee,
        };

        // Retrieve the token from local storage to authenticate the request
        const token = localStorage.getItem('token');

        try {
            // Send the request to the backend to create the employee
            const response = await fetch('https://localhost:3001/user/createEmployee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include token in authorization header
                },
                body: JSON.stringify(employeeData), // Send employee data as JSON in the request body
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage('Employee account created successfully!'); // Set success message
                navigate('/dashboard'); // Redirect to dashboard on success

                // Reset all form fields after successful submission
                setEnteredFirstNameEmployee('');
                setEnteredLastNameEmployee('');
                setEnteredEmailAddressEmployee('');
                setEnteredUsernameEmployee('');
                setEnteredPasswordEmployee('');
                setEnteredConfirmPasswordEmployee('');
                setIDNumberEmployee('');
                setError('');
            } else {
                // Handle failed employee creation
                const errorData = await response.json();
                setError(errorData.error || 'Employee account creation failed');
            }
        } catch (error) {
            console.error('Error during employee creation:', error);
            setError('An error occurred while creating the employee account.');
        }
    };

    // If the user is not authorized, show a message instead of the form
    if (!isAuthorized) {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>You do not have permission to access this page.</h1>
            </div>
        );
    }

    // JSX rendering the form for creating a new employee account
    return (
        <div
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/background.jpg'})`,
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
            <div className="register-container">
                <div className="form-container">
                    <h1>Employee Creation</h1>
                    <form onSubmit={handleEmployeeCreation}>
                        {/* Form fields for employee data */}
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={enteredFirstNameEmployee}
                                onChange={(e) => setEnteredFirstNameEmployee(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={enteredLastNameEmployee}
                                onChange={(e) => setEnteredLastNameEmployee(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={enteredEmailAddressEmployee}
                                onChange={(e) => setEnteredEmailAddressEmployee(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={enteredUsernameEmployee}
                                onChange={(e) => setEnteredUsernameEmployee(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={enteredPasswordEmployee}
                                onChange={(e) => setEnteredPasswordEmployee(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={enteredConfirmPasswordEmployee}
                                onChange={(e) => setEnteredConfirmPasswordEmployee(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="ID Number"
                                value={enteredIDNumberEmployee}
                                onChange={(e) => setIDNumberEmployee(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit button for the form */}
                        <button type="submit" className="register-btn">Create Employee Account</button>
                    </form>
                    {/* Display error or success messages */}
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
