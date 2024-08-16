import React from 'react';

const Payment = () => {
  return (
    <div className='bg-black text-white p-40'>
      <h2 className='text-3xl mb-4'>Payment Page</h2>
      <p className='mb-4'>Here you can process your payment.</p>
      {/* Add your payment form or integration here */}
      <form>
        {/* Example payment form */}
        <div className='mb-4'>
          <label htmlFor='cardNumber' className='block text-xl mb-2 text-left'>Card Number</label>
          <input
            type='text'
            id='cardNumber'
            className='p-2 bg-gray-800 text-white rounded-lg w-full '
            placeholder='1234 5678 9012 3456'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='expiryDate' className='block text-xl mb-2 text-left'>Expiry Date</label>
          <input
            type='text'
            id='expiryDate'
            className='p-2 bg-gray-800 text-white rounded-lg w-full'
            placeholder='MM/YY'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='cvv' className='block text-xl mb-2 text-left'>CVV</label>
          <input
            type='text'
            id='cvv'
            className='p-2 bg-gray-800 text-white rounded-lg w-full'
            placeholder='123'
          />
        </div>
        <button type='submit' className='bg-[#EC3642] text-white p-2 rounded-lg hover:bg-white hover:text-black transition'>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
