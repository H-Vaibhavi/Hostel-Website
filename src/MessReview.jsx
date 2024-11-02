import React, { useState } from 'react';
import './MessReview.css';
import Navbar from './Navbar';

const menu = [
  "Monday: Rice, Dal, Vegetable Curry, Chapati",
  "Tuesday: Biryani, Raita, Salad",
  "Wednesday: Paratha, Paneer Butter Masala",
  "Thursday: Fried Rice, Manchurian",
  "Friday: Pulao, Dal Fry, Roti",
  "Saturday: Idli, Sambar, Coconut Chutney",
  "Sunday: Chole Bhature, Lassi"
];

const MessReview = () => {
  const [message, setMessage] = useState('');

  const handlePaytmPayment = async () => {
    const amount = 100; // Amount in INR
    const paytmParams = {
      MID: 'YourMerchantID', // Your Paytm Merchant ID
      ORDER_ID: `ORDER_${new Date().getTime()}`, // Unique order ID
      CUST_ID: 'CustomerID', // Unique customer ID
      TXN_AMOUNT: amount.toString(),
      CHANNEL_ID: 'WEB',
      INDUSTRY_TYPE_ID: 'Retail',
      WEBSITE: 'WEBSTAGING', // Use "WEBSTAGING" for testing and "DEFAULT" for production
      CALLBACK_URL: 'https://your-server.com/callback',
    };

    // Send these details to your backend to get the checksum hash from Paytm's server

    // After getting checksum and transaction token, redirect to Paytm for payment
    window.location.href = `https://securegw-stage.paytm.in/theia/processTransaction?${new URLSearchParams(paytmParams)}`;
  };

  return (
    <div className="mess-review-page">
      <Navbar />
      <h2>Weekly Mess Menu</h2>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Monthly Mess Charges: ₹100</h3>
      <button onClick={handlePaytmPayment}>Pay Monthly Charges with Paytm</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MessReview;
