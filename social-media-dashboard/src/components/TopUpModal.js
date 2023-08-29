import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


Modal.setAppElement('#root'); // Set the root element for accessibility

const TopUpModal = ({ isOpen, onClose, onTopUp}) => {
    const [topUpAmount, setTopUpAmount] = useState('');
    const navigate = useNavigate();
  
    const handleTopUp = (e) => {
        e.preventDefault();
        if (topUpAmount) {
            onTopUp(parseFloat(topUpAmount));
            console.log(topUpAmount);
            
            navigate('/pay',{ state: { from: 'topup', data: {topUpAmount} } });

           
           
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2 className='text-xl font-bold text-center'>Top Up Your Wallet</h2>
            <div className=' flex flex-col md:flex-row md:min-w-full md:items-center md:justify-center'>
            <input
                type="number"
                placeholder="Enter amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                className=' border-2 border-black rounded-lg p-3 mt-6 mb-4 md:w-1/3 md:mt-10'
            />
            <div className=' flex gap-4 ml-10 md:w-1/3 md:items-center md:justify-center md:mt-6'> 
            <button className=" hover:bg-primary hover:border-none  hover:text-white p-3 rounded-lg border-2 border-black md:w-max md:h-12" onClick={handleTopUp}>Top Up</button>
            <button className=" hover:bg-primary hover:border-none  hover:text-white p-3 rounded-lg border-2 border-black md:w-max md:h-12" onClick={onClose}>Cancel</button>
            </div>
            </div>
        </Modal>
    );
};

export default TopUpModal;
