import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';

const InternationalPayments = () => {
    // React Router's navigate hook to redirect after successful payment or cancellation
    const navigate = useNavigate();

    // State to handle form input fields for the payment process
    const [enteredRecipientsName, setEnteredRecipientsName] = useState('');
    const [enteredRecipientsBank, setEnteredRecipientsBank] = useState('');
    const [enteredRecipientsAccountNumber, setEnteredRecipientsAccountNumber] = useState('');
    const [enteredAmountToTransfer, setEnteredAmountToTransfer] = useState('');
    const [enteredSWIFTCode, setEnteredSWIFTCode] = useState('');
    const [transactionType, setTransactionType] = useState('International');  // Static value for international payment type
    const [status, setStatus] = useState('Pending');  // Default status set to "Pending"

    // Handle the cancel button: Navigate back to dashboard
    const handleCancel = () => {
        navigate('/dashboard');  
    };

    // Handle the form submission for making the international payment
    const handleInternationalPayment = async (e) => {
        e.preventDefault(); // Prevent the default form submission action
        
        const token = localStorage.getItem('jwt_token');  // Retrieve token from local storage for authentication

        // Data to be sent in the payment request
        const paymentData = {
            recipientName: enteredRecipientsName,
            recipientsBank: enteredRecipientsBank,
            recipientsAccountNumber: enteredRecipientsAccountNumber,
            amountToTransfer: parseFloat(enteredAmountToTransfer),  // Parse to ensure it's a float
            swiftCode: enteredSWIFTCode,
            transactionType: transactionType,
            status: status
        };

        try {
            // Make a POST request to the server for payment processing
            const response = await fetch('https://localhost:3001/payment/internationalpayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Authorization header with the token
                },
                body: JSON.stringify(paymentData)  // Send payment data as JSON
            });

            const data = await response.json();  // Parse response

            // Handle the response based on the status
            if (response.ok) {
                console.log('Payment successful:', data);
                navigate('/dashboard');  // Redirect to the dashboard on success
            } else {
                console.error('Error processing payment:', data);  // Log error if payment fails
            }
        } catch (error) {
            console.error('Error:', error);  // Log any errors that occur during fetch
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
                display: 'flex',  // Flexbox for centering content
                alignItems: 'center',  // Center vertically
                justifyContent: 'center',  // Center horizontally
                margin: '0', 
                padding: '0',
                boxSizing: 'border-box',
            }}>
            
            {/* Top Navbar */}
            <div className="TopNavbar">
                <img src={Logo} className="logo" alt="Logo" />
                <h1>International Payment</h1>
            </div>

            <div className='international-payment-container'>
                <div className='form-container'>
                    {/* Heading */}
                    <h1>Initiate International Payment</h1>
                    
                    {/* Payment Form */}
                    <form onSubmit={handleInternationalPayment}>
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='Recipient Name'
                                value={enteredRecipientsName}
                                onChange={(e) => setEnteredRecipientsName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type="text"
                                placeholder='Recipient Bank'
                                value={enteredRecipientsBank}
                                onChange={(e) => setEnteredRecipientsBank(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='Recipient Account Number'
                                value={enteredRecipientsAccountNumber}
                                onChange={(e) => setEnteredRecipientsAccountNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='Amount to Transfer'
                                value={enteredAmountToTransfer}
                                onChange={(e) => setEnteredAmountToTransfer(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='SWIFT Code'
                                value={enteredSWIFTCode}
                                onChange={(e) => setEnteredSWIFTCode(e.target.value)}
                                required
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button type="submit" className="button">Transfer Funds</button>
                            <button type="button" className="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InternationalPayments;
