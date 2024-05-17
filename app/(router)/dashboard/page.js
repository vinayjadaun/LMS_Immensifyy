"use client"
import { useUser } from '@clerk/nextjs'
import React, { useContext, useEffect, useState } from 'react'
// import Banner from '../cources/_components/Banner'

import DashboardBanner from '../Live/_components/DashboardBanner.js'
import SideBanners from '../cources/_components/SideBanners.js'
import InProgressCourceList from '../Live/_components/InProgressCourceList.js'
import GlobalApi from '@/app/_services/GlobalApi.js'
import { User } from 'lucide-react'
import { IsmemberContext } from '@/app/context/IsmemberContext.js'

const Dashboard = () => {
  const {Ismember,SetIsmember}=useContext(IsmemberContext);
  const[UserAllEnrolledCources,setUserAllEnrolledCources]=useState();
  useEffect(()=>{
    setUserAllEnrolledCources(UserAllEnrolledCources)
    console.log(UserAllEnrolledCources)
  },[UserAllEnrolledCources])
  const {user}=useUser()
  useEffect(()=>{
   user&&getUserEnrolledCources();
  //  user&&checkmemberships();
  },[user])
  const getUserEnrolledCources=()=>{
    GlobalApi.getAllUserEnrolledCources(user?.primaryEmailAddress?.emailAddress).then(resp=>{
     
      setUserAllEnrolledCources(resp.userEnrollCources)
     
    })
  }
  // const checkmemberships=()=>{
  //   GlobalApi.Checkformembership(user?.primaryEmailAddress?.emailAddress).then(resp=>{
  //        if(resp){
  //         SetIsmember(true);
  //         console.log(resp.memberships[0]);
         
  //        }else{
  //         console.log("setting to false")
  //        }
         
  //   })
  // }
  return getUserEnrolledCources&&(
    <div className='grid sm:grid-cols-4 grid-cols-1 sm:p-5 p-2 gap-5'>
    {/* left section */}
     <div className='col-span-3'>
      <DashboardBanner/>
      <InProgressCourceList UserAllEnrolledCources={UserAllEnrolledCources}/>
      
     </div>
     {/* right section */}
     <div className='col-span-1 w-[320px] p-5 bg-white rounded-xl'>
      <SideBanners/>
     </div>
   </div>
  )
}

export default Dashboard