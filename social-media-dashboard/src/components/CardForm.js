import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function CardForm  ({amount})  {
  const stripe = useStripe();
  const elements = useElements();
  const { user } =  useClerk();
  const navigate = useNavigate();
 console.log(user);
  const userData = {
    name: user?.fullName,
    email: user?.emailAddresses[0].emailAddress,
  };
  console.log(userData);
  const handlePayment = async (e) => {
   e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log(amount);
    
    const { data } = await axios.post('http://localhost:3001/create-payment-intent', {
      amount:amount?.topUpAmount ,
      name:userData.name,
      email:userData.email,
    });

  
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
    

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log('Payment successful:', result.paymentIntent);
      navigate('/home');
    }
    
  };

  return (
    <form onSubmit={handlePayment} className="max-w-sm mx-auto">
    <div className="p-4 bg-white rounded shadow-md flex flex-col">
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-gray-700 font-bold mb-2">
          Card Information
        </label>
        <CardElement options={{ style: cardStyle }} id="card-element" />
      </div>
      <button
        type="submit"
        className="self-end mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  </form>
);
};
const cardStyle = {
  // Customize the appearance of the card element
  base: {
    fontSize: '16px',
    color: '#32325d',
    
  },
};

export default CardForm;
