// const express = require('express');
// const app = express();
// const stripe = require('stripe')('sk_test_51NaIoySIheEy0JinD7wWHvDhTQ9cBvNTacoKBgOrQgnT6Pud2ls4IcSXzlNa6fBn9q1jHmexBphgm0X3FIKwtAPI00yyKLMSC2');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');


// const corsOptions = {
//     origin: 'http://localhost:3000', // Allow requests from this origin
//   };
  
//   app.use(cors(corsOptions));

// mongoose.connect('mongodb://127.0.0.1:27017/paymentApp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const paymentSchema = new mongoose.Schema({
//   amount: Number,
//   description: String,
// });

// const Payment = mongoose.model('Payment', paymentSchema);

// app.use(bodyParser.json());

// app.post('/create-payment-intent', async (req, res) => {
//   try {
    
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: req.body.amount,
     
//       currency: 'usd', // Change to your desired currency
//     });
//     console.log(await req.body.amount);
//     res.status(200).send({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// app.post('/save-payment', async (req, res) => {
//   try {
//     const paymentData = req.body;
//     const newPayment = new Payment(paymentData);
//     await newPayment.save();
//     res.status(201).send(newPayment);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// app.listen(3001, () => {
//   console.log('Server is running on port 3001');
// });
const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')("sk_test_51NaIoySIheEy0JinD7wWHvDhTQ9cBvNTacoKBgOrQgnT6Pud2ls4IcSXzlNa6fBn9q1jHmexBphgm0X3FIKwtAPI00yyKLMSC2"); // Replace with your Stripe secret key
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());


app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/paymentApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const paymentSchema = new mongoose.Schema({
    name: String,
    email: String,
    amount: Number,
    paymentIntentId: String,
    // ... other fields
  });
  const Payment = mongoose.model('Payment', paymentSchema);
      
// Create a payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount,name,email } = req.body;
  const cash = parseInt(amount)
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: cash,
        currency: 'inr',
        description: 'Export transaction for XYZ product',
      });
      
    const existingPayment = await Payment.findOne({ email });
    
    if (existingPayment) {
        // If the email exists, update the existing amount
        existingPayment.amount +=cash ;
        existingPayment.paymentIntentId = paymentIntent.id;
        await existingPayment.save();
  
        console.log('Updated payment data:', existingPayment);
      } else {
      const payment = new Payment({
        name:name,
        email:email,
        amount:cash,
        paymentIntentId: paymentIntent.id,
        
      });
    
      
      console.log(  await payment.save());
      }
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
app.post('/send-email', async (req, res) => {
    const { email } = req.body;
  
    try {
      const paymentData = await Payment.findOne({ email });
  
      if (paymentData) {
        res.json(paymentData);
      } else {
        res.status(404).json({ error: 'Payment data not found for the provided email' });
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

