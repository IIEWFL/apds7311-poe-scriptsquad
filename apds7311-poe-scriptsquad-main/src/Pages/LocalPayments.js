import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';

const LocalPayment = () => {
    // Navigate to redirect users
    const navigate = useNavigate();

    // Cancel function redirects back to the dashboard
    const handleCancel = () => {
        navigate('/dashboard');  
    };

    // State variables to capture user input for the form fields
    const [enteredRecipientsName, setEnteredRecipientsName] = useState('');
    const [enteredRecipientsBank, setEnteredRecipientsBank] = useState('');
    const [enteredRecipientsAccountNumber, setEnteredRecipientsAccountNumber] = useState('');
    const [enteredAmountToTransfer, setEnteredAmountToTransfer] = useState('');
    const [enteredSWIFTCode, setEnteredSWIFTCode] = useState('');
    const [transactionType, setTransactionType] = useState('Local');  // Set transaction type to "Local"
    const [status, setStatus] = useState('Pending');  // Default status of "Pending"

    // Handle form submission for local payment processing
    const handleLocalPayment = async (e) => {
        e.preventDefault();  // Prevent default form submission
        
        const token = localStorage.getItem('jwt_token');  // Retrieve token from local storage

        const paymentData = {
            recipientName: enteredRecipientsName,
            recipientsBank: enteredRecipientsBank,
            recipientsAccountNumber: enteredRecipientsAccountNumber,
            amountToTransfer: parseFloat(enteredAmountToTransfer),  // Convert to float
            swiftCode: enteredSWIFTCode,
            transactionType: transactionType,
            status: status
        };

        try {
            const response = await fetch('https://localhost:3001/payment/localpayment', {  // Updated endpoint for local payment
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Attach token for authentication
                },
                body: JSON.stringify(paymentData)
            });

            const data = await response.json();  // Parse JSON response
            if (response.ok) {
                console.log('Payment successful:', data);
                navigate('/dashboard');  // Redirect to dashboard on success
            } else {
                console.error('Error processing payment:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div
            className='bgDashboard'
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/alt_background.png'})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                height: '100vh',  // Full viewport height
                width: '100vw',   // Full viewport width
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',  // Center the form horizontally and vertically
                margin: '0',
                padding: '0',
                boxSizing: 'border-box',
            }}
        >
            {/* Navbar section */}
            <div className="TopNavbar">
                <img src={Logo} className="logo" alt="Logo" />
                <h1>Local Payment</h1>
            </div>

            <div className='local-payment-container'>
                <div className='form-container'>
                    <h1>Initiate Local Payment</h1>
                    <form onSubmit={handleLocalPayment}>
                        {/* Recipient Name */}
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='Recipient Name'
                                value={enteredRecipientsName}
                                onChange={(e) => setEnteredRecipientsName(e.target.value)}
                                required
                            />
                        </div>
                        {/* Recipient's Bank */}
                        <div className='input-group'>
                            <input
                                type="text"
                                placeholder='Recipient Bank'
                                value={enteredRecipientsBank}
                                onChange={(e) => setEnteredRecipientsBank(e.target.value)}
                                required
                            />
                        </div>
                        {/* Recipient's Account Number */}
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='Recipient Account Number'
                                value={enteredRecipientsAccountNumber}
                                onChange={(e) => setEnteredRecipientsAccountNumber(e.target.value)}
                                required
                            />
                        </div>
                        {/* Amount to Transfer */}
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='Amount to Transfer'
                                value={enteredAmountToTransfer}
                                onChange={(e) => setEnteredAmountToTransfer(e.target.value)}
                                required
                            />
                        </div>
                        {/* SWIFT Code */}
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='SWIFT Code (optional)'
                                value={enteredSWIFTCode}
                                onChange={(e) => setEnteredSWIFTCode(e.target.value)}
                            />
                        </div>
                        
                        {/* Submit and Cancel buttons */}
                        <div className="action-buttons">
                            <button type="submit" className="button">Submit Payment</button>
                            <button type="button" className="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LocalPayment;
