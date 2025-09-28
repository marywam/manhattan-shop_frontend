// Payment.js (or wherever you render MpesaForm)
import React from 'react';
import { useLocation } from 'react-router-dom';
import MpesaForm from './Mpesa';

function Payment() {
  const location = useLocation();
  const { subtotal, address, order } = location.state || {};

  // Debugging
  console.log("Payment component state:", { subtotal, address, order });

  if (!order) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>No order found</h2>
        <p>Please go back and complete the checkout process.</p>
      </div>
    );
  }

  return (
    <div>
      {/* You can show order summary here */}
      <div style={{ padding: '20px' }}>
        <h2>Order Summary</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Total Amount:</strong> KSh {order.total_price}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>
      
      {/* Pass order to MpesaForm */}
      <MpesaForm order={order} address={address} />
    </div>
  );
}

export default Payment;