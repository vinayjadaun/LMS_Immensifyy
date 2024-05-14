import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5 '>
        <Image src='vercel.svg' alt="any" height={100} width={100}/>
        <div>
            <h2 className='text-[27px] font-bold'>Welcome to <span className='text-primary'>V-Glory Platform</span></h2>
            <h2 className='text-gray-400'>Explore,Build and Learn</h2>
        </div>
    </div>
  )
}

export default Banner