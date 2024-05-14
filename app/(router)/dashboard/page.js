"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
// import Banner from '../cources/_components/Banner'

import DashboardBanner from './_components/DashboardBanner.js'
import SideBanners from '../cources/_components/SideBanners.js'
import InProgressCourceList from './_components/InProgressCourceList.js'
import GlobalApi from '@/app/_services/GlobalApi.js'
import { User } from 'lucide-react'

const Dashboard = () => {
  const[UserAllEnrolledCources,setUserAllEnrolledCources]=useState();
  useEffect(()=>{
    setUserAllEnrolledCources(UserAllEnrolledCources)
    console.log(UserAllEnrolledCources)
  },[UserAllEnrolledCources])
  const {user}=useUser()
  useEffect(()=>{
   user&&getUserEnrolledCources();
  },[user])
  const getUserEnrolledCources=()=>{
    GlobalApi.getAllUserEnrolledCources(user?.primaryEmailAddress?.emailAddress).then(resp=>{
     
      setUserAllEnrolledCources(resp.userEnrollCources)
     
    })
  }
  return getUserEnrolledCources&&(
    <div className='grid sm:grid-cols-4 grid-cols-1 p-5 gap-5'>
    {/* left section */}
     <div className='col-span-3'>
      <DashboardBanner/>
      <InProgressCourceList UserAllEnrolledCources={UserAllEnrolledCources}/>
      
     </div>
     {/* right section */}
     <div className='col-span-1 p-5 bg-white rounded-xl'>
      <SideBanners/>
     </div>
   </div>
  )
}

export default Dashboard