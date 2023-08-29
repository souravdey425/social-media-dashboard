import { UserButton, useClerk } from '@clerk/clerk-react';
import React,{useEffect, useState} from 'react';
import TopUpModal from './TopUpModal';
import axios from 'axios';



const Home = () => {
   
    const [walletBalance, setWalletBalance] = useState(5000);
    const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const { user } = useClerk();
    const userData = {
        name: user.fullName,
        email: user.emailAddresses[0].emailAddress,
      };

    const handleTopUp = (amount) => {
        setWalletBalance(walletBalance + amount);
    };
    
const email=userData.email
  useEffect(()=>{
    const fetchPaymentData = async () => {
        try {
            const response = await axios.post('http://localhost:3001/send-email',{email:email});
            
            setPaymentData(response.data);
        } catch (error) {
          console.error('Error fetching payment data:', error);
        }
      };
  fetchPaymentData()   
 
   
  },[email])
  
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white p-4 shadow-md flex justify-between items-center">
                <div className="flex items-center">
                    <UserButton className="w-10 h-10" />
                    
                </div>
             
                

<TopUpModal
    isOpen={isTopUpModalOpen}
    onClose={() => setIsTopUpModalOpen(false)}
    onTopUp={handleTopUp}
  
/>

            </header>

           
                <div className="bg-white rounded-lg p-6 shadow-md flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-semibold mb-4">Your Wallet Balance</h1>
                    <div className="text-4xl font-bold text-indigo-600">{paymentData?paymentData.amount:0}</div>
                    <button onClick={() => setIsTopUpModalOpen(true)} className=' border-2 border-black p-3 rounded-lg mt-5 hover:bg-white/10'>Top Up</button>
                </div>
                

                
        </div>
    );
};

export default Home;
