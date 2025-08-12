
// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { toast } from 'react-toastify';
// import axiosInstance from '../Utils/axiosInstance';

// const SubscriptionModal = ({ show, onClose }) => {
//   const [selectedPlan, setSelectedPlan] = useState('');
//   const [paymentDetails, setPaymentDetails] = useState({
//     cardHolder: '',
//     cardNumber: '',
//     expiry: '',
//     cvc: ''
//   });

//   const handlePlanChange = (e) => setSelectedPlan(e.target.value);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const isFormComplete = selectedPlan &&
//     paymentDetails.cardHolder &&
//     paymentDetails.cardNumber &&
//     paymentDetails.expiry &&
//     paymentDetails.cvc;

//   if (!show) return null;

//   const handleStripeCheckout = async () => {
//     // Get the user registration data stored from RegisterModal
//     const registrationData = JSON.parse(localStorage.getItem('registration_data'));
//     const userId = registrationData?.userId;  // adapt based on your actual storage


//     if (!registrationData) {
//       toast.error('User registration data missing. Please register first.');
//       return;
//     }

//     if (!selectedPlan) {
//       toast.error('Please select a subscription plan.');
//       return;
//     }

//     try {
//       // Save all info temporarily for processing after payment
//       localStorage.setItem('pending_registration', JSON.stringify({
//         formData: registrationData,
//         selectedPlan,
//         paymentDetails
//       }));

//       const res = await axiosInstance.post('/stripe/checkout', {
//         plan: selectedPlan,
//           userId,

//       });

//       if (res.data?.url) {
//         toast.success('Redirecting to payment...');
//         window.location.href = res.data.url;
//       } else {
//         toast.error('Stripe session creation failed.');
//       }
//     } catch (err) {
//       console.error('Stripe Checkout Error:', err);
//       toast.error(err?.response?.data?.message || 'Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//       <div className="modal-dialog modal-lg modal-dialog-centered">
//         <div className="modal-content shadow-lg rounded">
//           <div className="modal-header bg-primary text-white">
//             <h5 className="modal-title">Select The Best Plan for Your Needs</h5>
//             <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
//           </div>

//           <div className="modal-body">
//             <p className="text-muted text-center mb-4">
//               Choose a plan that suits your water delivery and usage requirements.
//             </p>

//             {/* Plan Options */}
//             <div className="d-flex flex-column flex-md-row justify-content-center align-items-stretch subscription-cards gap-3">
//               {[
//                 {
//                   id: 'basic',
//                   title: 'Basic Monthly Plan',
//                   subtitle: 'Perfect for individuals or small households',
//                   features: ['4 Water Requests Monthly', '1 emergency delivery', 'Email support']
//                 },
//                 {
//                   id: 'standard',
//                   title: 'Standard Monthly Plan',
//                   subtitle: 'Ideal for families with regular water needs',
//                   features: ['6 Water Requests Monthly', '2 emergency requests', 'Phone & Email support']
//                 },
//                 {
//                   id: 'premium',
//                   title: 'Premium Monthly Plan',
//                   subtitle: 'Best for commercial or high-demand users',
//                   features: ['12 Water Requests Monthly', '10 emergency requests', 'Priority Delivery', 'Phone & Email support']
//                 }
//               ].map((plan) => (
//                 <div key={plan.id} className={`plan-box border p-3 ${selectedPlan === plan.id ? 'border-dark' : ''}`}>
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="subscriptionPlan"
//                       id={`${plan.id}Plan`}
//                       value={plan.id}
//                       onChange={handlePlanChange}
//                       checked={selectedPlan === plan.id}
//                       style={{ display: 'none' }}
//                     />
//                     <label className="form-check-label w-100" htmlFor={`${plan.id}Plan`}>
//                       <h6 className="fw-bold mb-1 text-center">{plan.title}</h6>
//                       <hr style={{ width: '50%', margin: 'auto', backgroundColor: 'black' }} />
//                       <div className="text-center mt-2">
//                         <span className="plan-subtitle">{plan.subtitle}</span>
//                         <span className="plan-price d-block mt-2">
//                           LKR {plan.id === 'basic' ? '1,000' : plan.id === 'standard' ? '3,000' : '5,000'}
//                         </span>
//                       </div>
//                       <hr />
//                       <ul className="small ps-3 text-start">
//                         {plan.features.map((f, i) => <li key={i}>{f}</li>)}
//                       </ul>
//                     </label>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Payment Form */}
//             <div className="mt-5">
//               <h6 className="fw-bold mb-3">Enter Payment Details</h6>
//               <form className="row g-3">
//                 <div className="col-md-12">
//                   <label className="form-label">Cardholder Name</label>
//                   <input type="text" className="form-control" name="cardHolder" value={paymentDetails.cardHolder} onChange={handleChange} />
//                 </div>
//                 <div className="col-md-12">
//                   <label className="form-label">Card Number</label>
//                   <input type="text" className="form-control" name="cardNumber" maxLength="16" placeholder="1234 5678 9012 3456" value={paymentDetails.cardNumber} onChange={handleChange} />
//                 </div>
//                 <div className="col-6">
//                   <label className="form-label">Expiry</label>
//                   <input type="text" className="form-control" name="expiry" placeholder="MM/YY" value={paymentDetails.expiry} onChange={handleChange} />
//                 </div>
//                 <div className="col-6">
//                   <label className="form-label">CVC</label>
//                   <input type="text" className="form-control" name="cvc" maxLength="4" placeholder="123" value={paymentDetails.cvc} onChange={handleChange} />
//                 </div>
//               </form>
//             </div>
//           </div>

//           <div className="modal-footer">
//             <button className="btn btn-danger" onClick={onClose} style={{backgroundColor: "#000428"}}>Cancel</button>
//             <button className="btn btn-dark" onClick={handleStripeCheckout} disabled={!isFormComplete} style={{backgroundColor: "#000428"}}>Confirm Plan</button>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .subscription-cards {
//           flex-wrap: wrap;
//           gap: 1rem;
//           justify-content: center;
//         }
//         .plan-box {
//           width: 100%;
//           max-width: 300px;
//           border-radius: 15px;
//           transition: 0.3s;
//           background: linear-gradient(to right, #c6c6c6, #a1c5e6);
//           cursor: pointer;
//         }
//         .plan-box:hover {
//           transform: translateY(-5px);
//           background-color: #004e92;
//         }
//         .plan-price {
//           font-size: 1.5rem;
//           font-weight: bold;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SubscriptionModal;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const SubscriptionModal = ({ show, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);

  if (!show) return null;

const handleCheckout = async () => {
  const user = JSON.parse(localStorage.getItem('tempUser'));

  if (!user || !selectedPlan) {
    toast.error('User info or subscription plan is missing');
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', {
  email: user.email,
  plan: selectedPlan,
});
    console.log('Stripe session response:', res.data);

    if (res.data?.url) {
      window.location.href = res.data.url;
    } else {
      toast.error('Stripe session creation failed');
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || 'Stripe error occurred');
  } finally {
    setLoading(false);
  }
};


  const plans = [
    { id: 'basic', title: 'Basic', price: '1,000', features: ['4 Requests', '1 Emergency'] },
    { id: 'standard', title: 'Standard', price: '3,000', features: ['6 Requests', '2 Emergencies'] },
    { id: 'premium', title: 'Premium', price: '5,000', features: ['12 Requests', '10 Emergencies'] },
  ];

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow-lg rounded">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Choose a Subscription Plan</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="text-muted text-center mb-4">Choose the best plan for your needs.</p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-stretch gap-3 flex-wrap">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  className={`card p-3 ${selectedPlan === plan.id ? 'border-primary border-3' : 'border'}`}
                  style={{ cursor: 'pointer', minWidth: '250px' }}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <h6 className="text-center">{plan.title}</h6>
                  <p className="text-center fw-bold">LKR {plan.price}</p>
                  <ul className="small ps-3">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
