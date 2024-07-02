"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';

const InterviewList = () => {
    const {user}=useUser();
    const[interviewlist,setinterviewlist]=useState();
    useEffect(()=>{
        user&&GetInterviewList()
    },[user])
    useEffect(()=>{
        console.log(interviewlist)
    },[interviewlist])


    const GetInterviewList=async()=>{
           const result = await db.select()
           .from(MockInterview)
           .where(eq(MockInterview.createdBy,user?.primaryEmailAddress.emailAddress))
           .orderBy(desc(MockInterview.id))
            
           
                setinterviewlist(result)
                
            
    }

  return (
    <div>
        <h2 className='font-bold text-2xl my-5 mt-5 '>Previous Interviews</h2>
        <div  className='grid grid-col grid-cols-1 gap-5 my-3 md:grid-cols-2 lg:grid-cols-3'>
            {interviewlist&&interviewlist.map((item,index)=>(
              
                <InterviewCard key={index} item={item}/>
                

                
            ))}
        </div>
    </div>
  )
}

export default InterviewList