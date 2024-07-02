"use client"
import React, { useEffect, useState } from 'react'
import InterviewDetails from '../page';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Question from './_components/Question';
import Record from './_components/Record';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const Start = ({params}) => {
    const[activeindex,setactiveindex]=useState(0);
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
            <Question mockinterviewquestion={mockinterviewquestion} activeindex={activeindex} setactiveindex={setactiveindex}/>
            <Record mockinterviewquestion={mockinterviewquestion} activeindex={activeindex} interviewdata={interviewdata} />
        </div>
        <div className='flex justify-center text-white md:justify-end px-[100px] py-5 gap-6'>
            {activeindex>0&&<Button onClick={()=>setactiveindex(activeindex-1)}>Prev Question</Button>}
            {activeindex!=mockinterviewquestion?.length-1&&<Button onClick={()=>setactiveindex(activeindex+1)}>Next Question</Button>}
           { activeindex==mockinterviewquestion?.length-1&&
             <Link href={'/interview/InterviewDetails/'+interviewdata?.mockId+"/feedback"}>
           <Button onClick={()=>console.log('interview ended')}>End Interview</Button></Link>}
        </div>
        </div>
  )
}

export default Start