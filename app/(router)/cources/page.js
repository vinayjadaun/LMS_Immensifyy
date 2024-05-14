"use client"
import React from 'react'
import Banner from './_components/Banner'
import CourceList from './_components/CourceList'
import SideBanners from './_components/SideBanners'

const Cources = () => {
  return (
    <div className='grid sm:grid-cols-4 grid-cols-1 p-5 gap-5'>
     {/* left section */}
      <div className='col-span-3'>
       <Banner/>
       <CourceList/>
      </div>
      {/* right section */}
      <div className='col-span-1 p-5 sm:w-full w-[350px] bg-white rounded-xl'>
       <SideBanners/>
      </div>
    </div>
  )
}

export default Cources