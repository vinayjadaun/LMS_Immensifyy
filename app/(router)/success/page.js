"use client";
import React from 'react'
import Link from 'next/link';
import "./style.css"


const page = () => {
   
    // const handleSubmit=async()=>{
       
    //     router.push('/');

    // }
  return (
    <div className='h-screen w-full bg-white'>
    <div className='flex items-center h-screen justify-center'>
    <div className="container  h-full md:h-auto">
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="message-box _success">
          <i className="fa fa-check-circle" aria-hidden="true" />
          <h2> Your payment was successful </h2>
          <p>
            {" "}
            Thank you for your payment. we will <br />
            be in contact with more details shortly{" "}
          </p>
          <div  className='flex items-center justify-center w-full mt-[100px] md:mt-7 '>
          <Link href="/" className='w-[200px] p-2  bg-green-500 font-sans text-[20px] rounded-lg font-weight-800'>Back to Home</Link>
          </div>
          </div>  
      </div>
     
    </div>
    <hr />
  </div></div></div>
  )
}

export default page