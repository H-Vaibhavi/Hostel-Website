import React, { useState, useEffect } from 'react';
import './MessReview.css';
import Navbar from './Navbar';
import Footer from './Footer';

const menu = [
  "Monday: Breakfast, Rice, Dal, Vegetable Curry, Chapati",
  "Tuesday: Breakfast, Rice, Dal, Vegetable Curry, Chapati",
  "Wednesday: Breakfast, Chicken/Eggs, Chapati, Rice, Curry, Sweets",
  "Thursday: Breakfast, Rice, Dal, Vegetable Curry, Chapati",
  "Friday: Breakfast, Rice, Dal, Vegetable Curry, Chapati",
  "Saturday: Breakfast, Rice, Dal, Vegetable Curry, Chapatiy",
  "Sunday: OFF"
];

const MessReview = () => {
  const [message, setMessage] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);  // Set state to true once the script is loaded
    script.onerror = () => console.error('Failed to load Razorpay script');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);  // Cleanup the script when the component unmounts
    };
  }, []);

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded) {
      console.error('Razorpay script not loaded yet');
      return;
    }

    const amount = 2000; // Amount in INR

    try {
      // Make a request to the backend to create an order
      const response = await fetch('http://localhost:3001/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount })
      });

      const data = await response.json();
      if (data.id) {
        // Proceed with Razorpay payment initiation
        const options = {
          key: 'rzp_test_TtA2LqaIHN7X2I', // Your Razorpay Key ID
          amount: data.amount, // Amount in the smallest currency unit (e.g. paise)
          currency: 'INR',
          name: 'Mess Payment',
          description: 'Monthly mess charges',
          order_id: data.id,
          handler: function (response) {
            setMessage('Payment Successful! Transaction ID: ' + response.razorpay_payment_id);
          },
          prefill: {
            name: 'User',
            email: 'user@example.com',
          },
          theme: {
            color: '#F37254',
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <div>
    <div className="mess-review-page">
      <Navbar />
      <h2>Weekly Mess Menu</h2>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3>Monthly Mess Charges: ₹2000</h3>
      <button onClick={handleRazorpayPayment}>Pay Monthly Charges with Razorpay</button>
      {message && <p>{message}</p>}
    </div>
     <Footer />
   </div>
  );
};

export default MessReview;
