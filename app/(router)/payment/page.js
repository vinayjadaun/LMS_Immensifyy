"use client";
import React,{useContext} from 'react'
// import { SelectedCarAmount } from '../context/SelectedCarAmount';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { useSearchParams } from 'next/navigation';
import CheckOutForm from '../premium/checkout';
const Payment = () => {
  const searchParams=useSearchParams();
  console.log(searchParams.get('amount'));
  // const{caramount,setCarAmount}=useContext(SelectedCarAmount);
  const StripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
   const options={
    mode:'payment',
    amount:(searchParams.get('amount')*100),
    currency:'usd'
   }
  return (
    <Elements stripe={StripePromise} options={options}>

      <CheckOutForm amount={searchParams.get('amount')}/>
    </Elements>
  )
}

export default Payment