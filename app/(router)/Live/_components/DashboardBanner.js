import Image from 'next/image'
import React from 'react'

const dashboardbanner = () => {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5 '>
        <Image src='/panda1_prev_ui.png' alt="any" height={100} width={100}/>
        <div>
            <h2 className='text-[27px] font-bold'>Welcome to <span className='text-primary'>Immensifyy</span></h2>
            <h2 className='text-gray-400'>Explore, Learn and Code</h2>
        </div>
    </div>
  )
}

export default dashboardbanner