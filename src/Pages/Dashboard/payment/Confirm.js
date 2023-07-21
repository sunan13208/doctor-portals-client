import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './common.css'


const Confirm = ({data}) => {
    const stripe = useStripe();
    const {price,PatientName,EmailAddress,_id}=data
    const [clientSecret, setClientSecret] = useState("");
    const [Carderror,setCardError]=useState('')
    const [processing,setProcessing]=useState(false)
    const elements = useElements();
    const [success,setSuccess]=useState('')
    const [transactionId,setTransactionId]=useState('')
    useEffect(() => {
        
        fetch("https://doctor-portal-server-lyart.vercel.app/create-payment-intent", {
          method: "POST",
          headers:
           {
             "Content-Type": "application/json" 
            },
          body: JSON.stringify({ price }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, [price]);
    
    const handleSubmit = async (event) => {

        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            console.log(Carderror)
            setCardError(error.message)
          } else {
           setCardError('')
          }
          setSuccess('')
          setProcessing(true)
        const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method:{
                    card:card,
                    billing_details:{
                        name:PatientName,
                        email:EmailAddress
                    }
                }
            }
            )
            if(confirmError){
                setCardError(confirmError.message)
                setProcessing(false)
                return
            }
            if(paymentIntent.status ==='succeeded'){
                const details={
                    bookingID:_id,
                    price,
                    EmailAddress,
                    transactionId:paymentIntent.id
                }
                const res= await fetch('https://doctor-portal-server-lyart.vercel.app/payments',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json',
                    },
                    body:JSON.stringify(details)
                })
                const data=await res.json()
                if(data.acknowledged){
                    setSuccess('Congrats! Your payment completed')
                    setTransactionId(paymentIntent.id)
                }
               
            }
            setProcessing(false)
        };
    return (
        <>
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm mt-5 btn-accent' type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
        </form>
        <p className='text-red-500'>{Carderror}</p>
        {
            success && <div>
                <p className='text-green-500'>{success}</p>
                <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
            </div>
        }
        </>
    );
};

export default Confirm;