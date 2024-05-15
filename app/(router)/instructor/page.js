import Image from 'next/image'
import React from 'react'

const page = () => {
  return (

 <div className='grid sm:grid-cols-4 grid-cols-1 bg-white p-5 gap-1'>
     {/* left section */}
      <div className='col-span-2'>
      <Image src='/panda1_prev_ui.png' alt="any" height={600} width={600}/>
      </div>
      {/* right section */}
      
      <div className='col-span-2 p-5  text-center items-center bg-white rounded-xl'>
      <h2 className='font-bold sm:mr-[100px] mr-0 text-primary sm:mt-[150px] mt-0 sm:text-[70px] text-[50px]'>Comming Soon</h2>
      </div>
    </div>

  )
}

export default page