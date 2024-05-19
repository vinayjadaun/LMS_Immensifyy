"use client"
import { IsmemberContext } from '@/app/context/IsmemberContext';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

const Pagr = () => {
  const{Ismember,SetIsmember}=useContext(IsmemberContext);
  const[name,setname]=useState();
  const[email,setemail]=useState();
  const[num,setnum]=useState();
  const router=useRouter();
  async function onSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: "acafae5b-3064-4754-b1fa-f1a1b6a1e3f8",
            name: name,
            email: email,
            message: num,
        }),
    });
    const result = await response.json();
    if (result.success) {
        console.log(result);
        toast(
          "✔ Submitted"
        )
        router.push('/cources')
    }
}

  return (

<div className='bg-gray-300'>
 

 {/*
  Heads up! 👋

  Plugins:
    - @tailwindcss/forms
*/}

<section className="relative flex flex-wrap lg:h-screen lg:items-center">
  <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-5">
    <div className="mx-auto max-w-lg text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">Became Instructor of Immensifyy</h1>

      <p className="mt-4 text-gray-500">
        Fill the required details, Out executives will contact you soon..!
      </p>
    </div>

    <form action="#" onSubmit={onSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
    <div>
        <label htmlFor="name" className="sr-only">Name</label>

        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg outline:none border:none p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Name"
            onChange={(e)=>setname(e.target.value)}
            value={name}
          />

   
        </div>
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="w-full rounded-lg outline:none border:none p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter email"
            onChange={(e)=>setemail(e.target.value)}
            value={email}
          />

       
        </div>
      </div>

      <div>
        <label htmlFor="number" className="sr-only">Contact No.</label>

        <div className="relative">
          <input
            type="number"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Contact No."
            onChange={(e)=>setnum(e.target.value)}
            value={num}
          />

         
        </div>
      </div>

      <div className="flex items-center justify-between">
    

        <button
          type="submit"
          className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
        >
          Submit
        </button>
      </div>
    </form>
  </div>

  <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
    <img
      alt=""
      src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      className="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</section>
    </div>

    

  )
}

export default Pagr