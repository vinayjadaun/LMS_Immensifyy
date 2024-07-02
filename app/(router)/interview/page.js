"use client"
import React, { useContext } from 'react'
import Headerr from './components2/headerr'
import AddNewInterview from './components2/AddNewInterview'
import InterviewList from './components2/InterviewList'
import { IsmemberContext } from '@/app/context/IsmemberContext'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const interview = () => {
  const{Ismember,SetIsmember}=useContext(IsmemberContext);
  const router=useRouter();
  return (
    <div className='bg-white p-1'>
       <Headerr/>
    {Ismember?
    <>
   
    <div className='p-10'>
      <h2 className='font-bold text-2xl text-primary'>Welcome to AI Mockup Interview</h2>
      <h2 className='text-gray-500  my-5'>Create and Start your AI MockUp Interview with Immensifyy AI Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      {/* previous interview details */}
        <InterviewList/>

    </div> </>:<div className='flex flex-col gap-8 border-[2px] min-h-[500px] m-[40px] lg:m-[80px] mt-1 rounded-xl justify-center items-center'>
      <h2 className='font-bold text-3xl text-center'>Sorry ! No Active Premium MemberShip found</h2>
                    <Button onClick={()=>router.replace('/premium')} className='text-white rounded-xl'>Get Premium Membership</Button>
      </div>}
    </div>
  )
}

export default interview