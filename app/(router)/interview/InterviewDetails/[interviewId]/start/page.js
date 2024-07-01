"use client"
import React, { useEffect, useState } from 'react'
import InterviewDetails from '../page';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Question from './_components/Question';
import Record from './_components/Record';

const Start = ({params}) => {
    const[interviewdata,setinterviewdata]=useState();
    const[mockinterviewquestion,setmockinterviewquestion]=useState();
    useEffect(()=>{
        console.log(params.interviewId);
        GetInterviewDetails();
    },[])
    useEffect(()=>{
         console.log(interviewdata);
         console.log(mockinterviewquestion);
    },[mockinterviewquestion,interviewdata])

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        setmockinterviewquestion(jsonMockResp)
        setinterviewdata(result[0]);
    }
  return mockinterviewquestion && (
    <div className='bg-white'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-2 '>
            <Question mockinterviewquestion={mockinterviewquestion}/>
            <Record/>
        </div>
        </div>
  )
}

export default Start