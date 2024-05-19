
import Image from 'next/image'
import React from 'react'

const Live = () => {
  return (
    <div className='bg-gray-200 h-screen'>
     <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <img
          alt=""
          src="/man.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Welcome to Live Sessions</h2>

        <p className="mt-4 text-gray-600">
         In Order to Join the Live session , Please Enter the Room Id provied by the Instructor.
        </p>

        <a
          href="https://chatting-meeting.vercel.app/"
          className="mt-8 inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary focus:outline-none focus:ring focus:ring-primary"
        >
          Join Session Now
        </a>
      </div>
    </div>
  </div>
</section>
   </div>
   
  )
}

export default Live