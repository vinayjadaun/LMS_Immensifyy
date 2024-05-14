"use client"
import React, { useEffect } from 'react'
import ProgressItem from './ProgressItem'

const InProgressCourceList = ({UserAllEnrolledCources}) => {
    useEffect(()=>{
        console.log(UserAllEnrolledCources)
    },[UserAllEnrolledCources])

  return UserAllEnrolledCources&& (
    <div className='bg-white p-5 mt-3 rounded-sm'>
        <h2 className='text-primary text-[18px] font-semibold'>Recent Enrolled Cources</h2>
        <div className='grid grid-cols-1 mt-3 md:grid-cols-3 gap-5'>
           {UserAllEnrolledCources.map((item,index)=>(
            <ProgressItem key={index} cource={item}/>
           ))}
        </div>
    </div>
  )
}

export default InProgressCourceList