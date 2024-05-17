import { IsmemberContext } from '@/app/context/IsmemberContext';
import { Membership } from '@/app/context/MembershipContext';
import { useStripe,useElements,Elements,PaymentElement } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

// import { SelectedCarAmount } from "@/app/context/SelectedCarAmount";
const CheckOutForm = ({amount}) => {
  const{membershipid,SetMembershipid}=useContext(Membership);
  const{Ismember,SetIsmember}=useContext(IsmemberContext);
  useEffect(()=>{
   SetMembershipid(membershipid)
    console.log(membershipid)
    SetIsmember(Ismember)
    console.log(Ismember);
  },[membershipid,Ismember])
  const router=useRouter();
  // const{caramount,setCarAmount}=useContext(SelectedCarAmount);
  const stripe=useStripe();
  const elements=useElements();
 const handleSubmit=async(event)=>{
  // const router=useRouter();
         event.preventDefault();
         if(elements==null){
          return;
         }
         const {error:submitError} = await elements.submit();
         if(submitError){
          return;
         }

        //  api/create-intent


        const res=await fetch("/Api/create-intent",{
          method:"POST",
          body:JSON.stringify({
            amount:amount,
          }),
        });

        const sec=await res.json();
        console.log(sec);
        console.log(amount);
        const result =await stripe.confirmPayment(
          {
            clientSecret:sec,
            elements,
            confirmParams:{
              // return_url:"https://v-taxi.vercel.app/",
              
              return_url:"https://localhost:3000/",
            },

          }
        )
        console.log(result)





        //  const result = await stripe.confirmPayment({
        //   //`Elements` instance that was used to create the Payment Element
        //   elements,
        //   clientSecret:sec,
        //   confirmParams: {
        //     return_url: "http://localhost:3000/",
        //   },
        // });
    
        if (result.data) {
          // Show error to your customer (for example, payment details incomplete)
          console.log(result.error.message);
          router.push('/success');
          
        } else {
          router.push('/success');
          console.log(result.error.payment_intent.id)
          SetMembershipid(result.error.payment_intent.id);
          SetIsmember(true);
         
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
          // return_url:"https://localhost:3000/"
        }
      };
 
  return (
    <div className='flex flex-col items-center bg-white justify-center h-[620px] w-full  '>
    <form onSubmit={handleSubmit} className='max-w-md p-10 border-[2px] border-gray-300 rounded-lg'>
      <PaymentElement/>
      <button type="submit" disabled={!stripe||!elements} className='w-full bg-primary p-2 text-white rounded-lg mt-2'>
        Pay
      </button>
    </form>
    </div>
  );
}


export default CheckOutForm;