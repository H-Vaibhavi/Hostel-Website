import React, { useState, useEffect } from 'react';
import './MessReview.css';
import Navbar from './Navbar';
import Footer from './Footer';

const menu = [
  { day: "Monday", breakfast: "Bread & Tea", lunch: "Rice, Dal, Vegetable Curry, Chapati", dinner: "Rice, Chicken Curry, Chapati" },
  { day: "Tuesday", breakfast: "Poha & Tea", lunch: "Rice, Dal, Vegetable Curry, Chapati", dinner: "Rice, Paneer Curry, Chapati" },
  { day: "Wednesday", breakfast: "Idli & Sambar", lunch: "Rice, Dal, Vegetable Curry, Chapati", dinner: "Rice, Chicken/Eggs, Chapati" },
  { day: "Thursday", breakfast: "Upma & Tea", lunch: "Rice, Dal, Vegetable Curry, Chapati", dinner: "Rice, Mix Veg Curry, Chapati" },
  { day: "Friday", breakfast: "Aloo Paratha & Yogurt", lunch: "Rice, Dal, Vegetable Curry, Chapati", dinner: "Rice, Fish Curry, Chapati" },
  { day: "Saturday", breakfast: "Dosa & Chutney", lunch: "Rice, Dal, Vegetable Curry, Chapati", dinner: "Rice, Meat Curry, Chapati" },
  { day: "Sunday", breakfast: "OFF", lunch: "OFF", dinner: "OFF" }
];

const MessReview = () => {
  const [message, setMessage] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error('Failed to load Razorpay script');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded) {
      console.error('Razorpay script not loaded yet');
      return;
    }

    const amount = 2000;

    try {
      const response = await fetch('http://localhost:3001/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount })
      });

      const data = await response.json();
      if (data.id) {
        const options = {
          key: 'rzp_test_TtA2LqaIHN7X2I',
          amount: data.amount,
          currency: 'INR',
          name: 'Mess Payment',
          description: 'Monthly mess charges',
          order_id: data.id,
          handler: (response) => setMessage('Payment Successful! Transaction ID: ' + response.razorpay_payment_id),
          prefill: { name: 'User', email: 'user@example.com' },
          theme: { color: '#F37254' },
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
        <div className="menu-card">
          <div className="menu-header">
            <div>Day</div>
            <div>Breakfast</div>
            <div>Lunch</div>
            <div>Dinner</div>
          </div>
          {menu.map((item, index) => (
            <div className="menu-row" key={index}>
              <div>{item.day}</div>
              <div>{item.breakfast}</div>
              <div>{item.lunch}</div>
              <div>{item.dinner}</div>
            </div>
          ))}
        </div>
        <h3>Monthly Mess Charges: ₹2000</h3>
        <button onClick={handleRazorpayPayment}>Pay Monthly Charges with Razorpay</button>
        {message && <p>{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default MessReview;
