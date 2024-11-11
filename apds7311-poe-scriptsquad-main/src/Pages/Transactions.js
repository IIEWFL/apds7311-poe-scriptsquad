import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../index.css';
import bannerImage from '../images/transact_bg.png';
import Logo from '../images/logo.png';
import './styles/TransactionTable.css';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]); // Holds all transactions fetched from the server
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState('');

    // Fetches transaction data from the API when the component mounts
    useEffect(() => {

        const fetchUserByUsername = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const decodedToken = jwtDecode(token);
                const username = decodedToken.username;

                const response = await fetch(`https://localhost:3001/user/getUserByUsername?username=${username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                        setCustomerName(`${result.user.firstName} ${result.user.lastName}`);

                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const fetchTransactions = async () => {
            try {
                const response = await fetch('https://localhost:3001/payment/transactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Authorization token for API access
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data); // Update state with the fetched transaction data
                } else {
                    console.error("Failed to fetch transactions.");
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
        fetchUserByUsername();

    }, []); // Empty dependency array means this runs only once on component mount

    return (
        <div className="bgDashboard">
            {/* Top Navbar with logo and page title */}
            <div className="TopNavbar">
                <img src={Logo} className="logo" alt="Company Logo" />
                <h1>Transactions</h1>
            </div>

            {/* Banner image for visual appeal */}
            <div className="Image-Banner">
                <img src={bannerImage} style={{ width: '100%', height: 'auto' }} alt="Transaction Banner" />
            </div>

            {/* Dashboard container with side menu and main content */}
            <div className="dashboard-container">
                {/* Side Navigation Menu */}
                <div className="navbar">
                    <button className="nav-button" onClick={() => navigate('/Dashboard')}>
                        Dashboard
                    </button>
                    <button className="nav-button" onClick={() => navigate('/LocalPayments')}>
                        Local Payments
                    </button>
                    <button className="nav-button" onClick={() => navigate('/AddFunds')}>
                        Add Funds
                    </button>
                    <button className="nav-button" onClick={() => navigate('/InternationalPayments')}>
                        International Payments
                    </button>
                </div>

                {/* Main content area displaying transaction history */}
                <div className="main-table-content">
                    <h2>Welcome {customerName}</h2>
                    <h2>Transaction History</h2>

                    {/* Table displaying transaction details */}
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Recipient Name</th>
                                <th>Recipient Bank</th>
                                <th>Amount</th>
                                <th>SWIFT Code</th>
                                <th>Status</th>
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
                                    <td>{transaction.status}</td>
                                    <td>{transaction.transactionType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

//-------------------------------------END OF FILE-----------------------------------//
