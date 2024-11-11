import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../index.css';
import bannerImage from '../images/alt_background.png';
import Logo from '../images/logo.png';
import card from '../images/card_bg.png'; 
import './styles/Navbar.css';

import { jwtDecode } from 'jwt-decode';
const Dashboard = () => {
    // State variables to manage user data and dashboard content
    const [customerName, setCustomerName] = useState(''); // Store the customer's full name
    const [accountNumber, setAccountNumber] = useState(''); // Store the account number
    const [availableBalance, setAvailableBalance] = useState(''); // Store available balance
    const [userRole, setUserRole] = useState(''); // Store the role of the user (admin, employee, user)
    const [loading, setLoading] = useState(true); // Track loading state for API calls
    const [transactions, setTransactions] = useState([]); // Store a list of transactions
    const [allUsers, setAllUsers] = useState([]); // Store all users for admin (filtered by role)
    const [selectedRole, setSelectedRole] = useState(''); // Store selected role for filtering users

    const navigate = useNavigate(); // React Router's navigate hook for page redirection

    // useEffect hook to fetch user-specific transactions and details when the component loads
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Fetch transactions from the backend API
                const response = await fetch('https://localhost:3001/payment/transactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data); // Set the transactions in state
                } else {
                    console.error("Failed to fetch transactions"); // Log error if fetching fails
                }
            } catch (error) {
                console.error("Error fetching transactions:", error); // Log any error that occurs during the fetch
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchTransactions();
        fetchUserByUsername(); // Fetch the user details by username
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Function to fetch users based on their role (admin, employee, user)
    const fetchUsers = async (role) => {
        if (!role) return; // Return if no role is selected
        setLoading(true); // Set loading to true while fetching users
        try {
            // Fetch users of a specific role
            const response = await fetch(`https://localhost:3001/user/allUsers?role=${role}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in request header
                },
            });

            if (response.ok) {
                const data = await response.json(); // Parse the response data

                // If the response is an array, filter users by the selected role
                if (Array.isArray(data)) {
                    const filteredUsers = data.filter(user => user.role === role);
                    setAllUsers(prevState => ({ ...prevState, [role]: filteredUsers }));
                } else if (data[role]) {
                    // If response is an object, set the users array for the role
                    setAllUsers(prevState => ({ ...prevState, [role]: data[role] || [] }));
                } else {
                    console.error(`Role "${role}" not found in response`);
                    setAllUsers(prevState => ({ ...prevState, [role]: [] }));
                }
            }
        } catch (error) {
            console.error("Error fetching users:", error); // Log error if fetching users fails
        } finally {
            setLoading(false); // Set loading to false after the fetch completes
        }
    };

    // Function to delete a user from the system
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`https://localhost:3001/user/deleteUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
                },
            });
            if (response.ok) {
                alert('User successfully deleted'); // Show success message
                fetchUsers(selectedRole); // Refresh the users list after deletion
            } else {
                console.error("Failed to delete user"); // Log error if delete fails
            }
        } catch (error) {
            console.error("Error deleting user:", error); // Log error if deletion fails
        }
    };

    // Fetch user details (name, account number, balance, and role) based on the token
    const fetchUserByUsername = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // If no token, redirect to login page
            return;
        }

        try {
            const decodedToken = jwtDecode(token); // Decode the token to get the username
            const username = decodedToken.username;

            // Fetch user data based on the decoded username
            const response = await fetch(`https://localhost:3001/user/getUserByUsername?username=${username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json(); // Parse the response data

                // Check the user schema to set relevant user data (customer, admin, or employee)
                if (result.schema === 'User') {
                    setCustomerName(`${result.user.firstName} ${result.user.lastName}`);
                    setAccountNumber(result.user.accountNumber);
                    setAvailableBalance(result.user.balance ?? 0);
                    setUserRole(result.user.role);
                } else if (result.schema === 'Admin') {
                    setCustomerName(`${result.admin.firstName} ${result.admin.lastName}`);
                    setAvailableBalance(result.admin.balance ? `$${result.admin.balance.toFixed(2)}` : '$0.00');
                    setUserRole(result.admin.role);
                } else if (result.schema === 'Employee') {
                    setCustomerName(`${result.employee.firstName} ${result.employee.lastName}`);
                    setAccountNumber(result.employee.accountNumber);
                    setUserRole(result.employee.role);
                }
            } else {
                console.error('Failed to fetch user data'); // Log error if fetching user data fails
            }
        } catch (error) {
            console.error('Error:', error); // Log any errors during the fetch
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    // Logout function to remove the token and navigate to the login page
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/'); // Redirect to login page
    };

    // Navigation handlers for different dashboard sections
    const handleLocalPayment = () => navigate('/localpayments');
    const handleAddFunds = () => navigate('/addfunds');
    const handleTransactions = () => navigate('/Transactions');
    const handleStaffTransactions = () => navigate('/StaffTransactions');
    const handleInternationalPayment = () => navigate('/InternationalPayments');

    // useEffect hook to fetch users based on selected role
    useEffect(() => {
        if (selectedRole) {
            fetchUsers(selectedRole); // Fetch users based on the selected role
        }
    }, [selectedRole]); // Re-run when selectedRole changes

    // Show loading message while waiting for data
    if (loading) {
        return <div>Loading...</div>;
    }

    // Determine the dashboard heading based on user role
    const dashboardHeading = userRole === 'admin' ? 'Admin Dashboard' :
        userRole === 'employee' ? 'Employee Dashboard' : 'Customer Dashboard';

    return (
        <div className="bgDashboard">
            <div className="TopNavbar">
                <img src={Logo} className="logo" alt="Logo" />
                <h1>{dashboardHeading}</h1>
            </div>

            <div className="Image-Banner">
                <img src={bannerImage} style={{ width: '100%', height: 'auto' }} alt="Banner" />
            </div>

            <div className="dashboard-container">
                <div className="navbar">
                    {/* Conditional rendering of navigation buttons based on user role */}
                    {userRole === 'user' && (
                        <>
                            <button className="nav-button" onClick={handleTransactions}>Transactions</button>
                            <button className="nav-button" onClick={handleLocalPayment}>Local Payments</button>
                            <button className="nav-button" onClick={handleAddFunds}>Deposit</button>
                            <button className="nav-button" onClick={handleInternationalPayment}>International Payments</button>
                        </>
                    )}

                    {/* Redirect employee to staff transactions */}
                    {userRole === 'employee' && (
                        navigate('/StaffTransactions')
                    )}

                    {/* Admin-specific navigation */}
                    {userRole === 'admin' && (
                        <>
                            <button className="nav-button" onClick={handleStaffTransactions}>Manage Transactions</button>
                            <button className="nav-button" onClick={() => navigate('/CreateAdmin')}>Admin Creation</button>
                            <button className="nav-button" onClick={() => navigate('/CreateEmployee')}>Create Employee</button>
                        </>
                    )}

                    <button className="deny-button" onClick={handleLogout}>Logout</button> {/* Logout Button */}
                </div>

                {/* User dashboard content */}
                {userRole === 'user' && (
                    <div className="main-content">
                        <h2 className="textBlack">Hello, {customerName}</h2>

                        <h2 className="textBlack">Payments</h2>
                        <div>
                            <button className="button" onClick={handleLocalPayment}>Make Local Payment</button>
                            <button className="button" onClick={handleInternationalPayment}>Make International Payment</button>
                        </div>

                        <h2 className="textBlack">Banking Details</h2>
                        <div>
                            <strong>Current Account</strong>
                            <div><span>Acc No: {accountNumber}</span></div>
                            <div><span>Available Balance: {availableBalance}</span></div>
                        </div>

                        <h2 className="textBlack">My Cards</h2>
                        <div className="banking-details-container">
                            <img src={card} alt="Safe Transact" className="banking-logo" />
                            <div className="banking-details">
                                <strong>Current Account</strong>
                                <div><span>Name: {customerName}</span></div>
                                <div><span>Acc No: {accountNumber}</span></div>
                                <div><span>Available Balance: {availableBalance}</span></div>
                            </div>
                        </div>

                        <h2 className="textBlack">Payment Receipts</h2>
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Recipient Name</th>
                                    <th>Recipient Bank</th>
                                    <th>Amount</th>
                                    <th>SWIFT Code</th>
                                    <th>Transaction Status</th>
                                    <th>Transaction Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td>{transaction.recipientName}</td>
                                        <td>{transaction.recipientsBank}</td>
                                        <td>{transaction.amountToTransfer}</td>
                                        <td>{transaction.swiftCode}</td>
                                        <td>{transaction.status ? transaction.status : 'No status'}</td>
                                        <td>{transaction.transactionType || 'Unknown'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Admin dashboard content */}
                {userRole === 'admin' && (
                    <div className="user-content">
                        <h2>Select Role to View Users</h2>
                        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            <option value="">Select Role</option>
                            <option value="users">Users</option>
                            <option value="admins">Admins</option>
                            <option value="employees">Employees</option>
                        </select>

                        <h2>All Users</h2>
                        {selectedRole && allUsers[selectedRole]?.length > 0 ? (
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>ID Number</th>
                                        <th>Role</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {allUsers[selectedRole]?.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                            <td>{user.idNumber}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        deleteUser(user._id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No users available for this role.</p>
                        )}
                    </div>
                )}
            </div>
            <div className="Footer">
                <h3>Help: 084 649 8231 or help@scriptsquad.com</h3>
            </div>
        </div>
    );
};

export default Dashboard;