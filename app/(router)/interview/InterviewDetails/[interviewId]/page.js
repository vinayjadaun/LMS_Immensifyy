"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

const InterviewDetails= ({params}) => {
    const[interviewdata,setinterviewdata]=useState();
    const[webenable,setwebenable]=useState();
    useEffect(()=>{
        console.log(params.interviewId);
        GetInterviewDetails();
    },[])
    useEffect(()=>{
        console.log(interviewdata)
    },[interviewdata])

    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        console.log(result);
        setinterviewdata(result[0]);
    }
  return (
    <div className='bg-white my-0 mt-2 py-2 flex justify-center min-h-[660px] flex-col items-center'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-[150px]'>

        <div className='flex flex-col gap-8 my-5 '>
            <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className='text-lg'><strong>Job Role/Job Position :</strong> {interviewdata?.jobPosition}</h2>
            <h2 className='text-lg'><strong>Job Description/Tech Stack :</strong> {interviewdata?.jobDesc}</h2>
            <h2 className='text-lg'><strong>Job Experience:</strong> {interviewdata?.jobExperience}</h2>
        </div>
        <div className='p-5 mt-[70px] border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-300'><Lightbulb/><strong>Information</strong></h2>
            <h2 className='text-[10px] mt-3 text-yellow-700'>Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview, It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want
            </h2>
        </div>
        </div>

        <div>
            {webenable?
            <Webcam onUserMedia={()=>setwebenable(true)}
            onUserMediaError={()=>setwebenable(false)}
            style={{height:300,width:300}}/>
            :
            <><div className='flex items-center justify-center'>
            <WebcamIcon className='h-72 w-full my-7 bg-gray-100 p-20 rounded-lg border'/>
            </div>
            <div className='flex border rounded-lg items-center justify-center'>
            <Button variant="ghost" className='text-gray-400' onClick={()=>setwebenable(true)}>Enable Web Cam and Microphone</Button></div>
            </>
            }
              <div className='flex mt-8 rounded-lg text-white justify-end items-end'>
                <Link href={params.interviewId+'/start'}>
            <Button>Start</Button>
            </Link>
        </div>
        </div>
       
        </div>
      
    </div>
  )
}

export default InterviewDetails
