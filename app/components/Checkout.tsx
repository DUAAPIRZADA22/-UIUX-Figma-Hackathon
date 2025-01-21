// components/CheckoutForm.js
"use client";
import React, { useState } from 'react'; 

const Checkout = ({ cart }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBillingChange = (e) => {
    setBillingAddress(e.target.value);
  };

  const handleShippingChange = (e) => {
    setShippingAddress(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
    } else {
      setIsOrderPlaced(true);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Checkout Form</h2>

      {isOrderPlaced ? (
        // Order Summary Page
        <div>
          <h3 className="text-lg mb-2">Order Summary</h3>
          <div className="mb-4">
            <h4 className="font-semibold">Customer Name:</h4>
            <p>{name}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Billing Address:</h4>
            <p>{billingAddress}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Shipping Address:</h4>
            <p>{shippingAddress}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Payment Information:</h4>
            <p>{paymentInfo}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Payment Method:</h4>
            <p>{paymentMethod}</p>
          </div>

          <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Confirm Order
          </button>
        </div>
      ) : (
        // Checkout Steps
        <>
          {step === 1 && (
            <div>
              <h3 className="text-lg mb-2">Name</h3>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="w-full p-2 border mb-4"
              />
              <button onClick={handleNext} className="bg-blue-500 text-white p-2">
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg mb-2">Billing Address</h3>
              <input
                type="text"
                value={billingAddress}
                onChange={handleBillingChange}
                placeholder="Enter billing address"
                className="w-full p-2 border mb-4"
              />
              <div className="flex justify-between">
                <button onClick={handlePrevious} className="bg-gray-500 text-white p-2">
                  Previous
                </button>
                <button onClick={handleNext} className="bg-blue-500 text-white p-2">
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg mb-2">Shipping Address</h3>
              <input
                type="text"
                value={shippingAddress}
                onChange={handleShippingChange}
                placeholder="Enter shipping address"
                className="w-full p-2 border mb-4"
              />
              <div className="flex justify-between">
                <button onClick={handlePrevious} className="bg-gray-500 text-white p-2">
                  Previous
                </button>
                <button onClick={handleNext} className="bg-blue-500 text-white p-2">
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-lg mb-2">Payment Information</h3>
              <input
                type="text"
                value={paymentInfo}
                onChange={handlePaymentChange}
                placeholder="Enter payment info (Mock)"
                className="w-full p-2 border mb-4"
              />
              <h3 className="text-lg mb-2">Payment Method</h3>
              <div className="space-y-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    value="Credit/Debit Card"
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  Credit/Debit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    value="PayPal"
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  PayPal
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    value="Bank Transfer"
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  Bank Transfer
                </label>
              </div>
              <div className="flex justify-between">
                <button onClick={handlePrevious} className="bg-gray-500 text-white p-2">
                  Previous
                </button>
                <button onClick={handleSubmit} className="bg-green-500 text-white p-2">
                  Submit Order
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Checkout;



