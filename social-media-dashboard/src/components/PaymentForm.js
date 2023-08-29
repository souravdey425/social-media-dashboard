import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CardForm from './CardForm'; 
import { useLocation } from 'react-router-dom';

console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function  PaymentForm (){
    const location = useLocation();
    const {  data } = location.state || {};
    console.log(data);
   
  return (
    <div className=' bg-white min-h-screen'>
    <Elements stripe={stripePromise}>
    
      <CardForm  amount={data}/>
    
    </Elements>
    </div>
  );
}

export default PaymentForm;