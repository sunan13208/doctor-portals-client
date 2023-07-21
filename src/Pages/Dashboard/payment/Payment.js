import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Confirm from './Confirm';

const stripePromise = loadStripe(process.env.REACT_APP_pk);
const Payment = () => {
    const data = useLoaderData()
    const navigation = useNavigation();
    if(navigation.state==="loading"){
        <span className="loading loading-spinner loading-lg"></span>
    }
    const { SelectedDate, SelectedTime, TreatmentName, price } = data
    return (
        <div>
            <h3 className="text-3xl mb-3">Payment for {TreatmentName}</h3>
            <p className='text-xl'>please pay <strong>${price}</strong> for your appointment on {SelectedDate} at {SelectedTime}</p>
            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <Confirm  data={data}/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;