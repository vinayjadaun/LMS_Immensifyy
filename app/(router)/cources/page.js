"use client"
import React from 'react'
import Banner from './_components/Banner'
import CourceList from './_components/CourceList'
import SideBanners from './_components/SideBanners'

const Cources = () => {
  return (
    <div className='grid sm:grid-cols-4 grid-cols-1 sm:p-5 p-2 gap-5'>
     {/* left section */}
      <div className='col-span-3'>
       <Banner/>
       <CourceList/>
      </div>
      {/* right section */}
      
      <div className='col-span-1 p-5 sm:w-[320px] w-[345px] items-center bg-white rounded-xl'>
       <SideBanners/>
      </div>
    </div>
  )
}

export default Cources