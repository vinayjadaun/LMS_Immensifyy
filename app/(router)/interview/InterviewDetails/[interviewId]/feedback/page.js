"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
  
const Feedback = ({params}) => {
    const router=useRouter();
    const [feedbacklist,setfeedbacklist]=useState();

    useEffect(()=>{
        console.log(feedbacklist)
       
    },[feedbacklist])

    useEffect(()=>{
     GetFeedback();
    },[])

      
   const gettotal =(feedbacklist)=>{
        let total = 0;
       for(let i=0;i<feedbacklist.length;i++){
       total += parseInt(feedbacklist[i].rating);
       }
       return total;
   }
    const GetFeedback=async()=>{
         const result=await db.select()
         .from(UserAnswer)
         .where(eq(UserAnswer.mockIdRef,params.interviewId))
         .orderBy(UserAnswer.id);
         setfeedbacklist(result);
    }
  
  return (
    
    <div className='p-10 bg-white'> 
    {feedbacklist?.length==0?
    <h2 className='font-bold text-xl'>No Interview Details found</h2>:
    <>
        <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
        <h2 className='font-bold text-2xl'>Here is your Interview Feedback</h2>
        <h2 className='text-primary text-lg my-3'>Your overall interview rating <strong>{feedbacklist&&gettotal(feedbacklist)}/{feedbacklist&&(feedbacklist.length)*5}</strong></h2>
        <h2>Find below Interview Question with correct Answer, Your answer and the feedback for improvement.</h2>

         {feedbacklist&&feedbacklist.map((item,index)=>(
            
                      <Collapsible key={index} className='mt-7'>
                  <CollapsibleTrigger className='p-2 bg-gray-200 rounded-xl flex my-2 text-left justify-between w-full gap-7'>{item.question} <ChevronsUpDownIcon className='h-5 w-5'/></CollapsibleTrigger>
          <CollapsibleContent>
         <div className='flex flex-col gap-5'>
            <h2 className='text-red-500 p-2 border rounded-xl '><strong>Rating:{item.rating}</strong></h2>
            <h2 className='p-2 border rounded-xl bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
            <h2 className='p-2 border rounded-xl bg-green-50 text-sm text-green-700'><strong>Correct Answer: </strong>{item.correctAns}</h2>
            <h2 className='p-2 border rounded-xl bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item.feedback}</h2>
         </div>
          </CollapsibleContent>
          </Collapsible>
                
         ))}</>}
         
         <Button className='text-white flex justify-end my-5 rounded-xl' onClick={()=>router.replace('/interview')}>Go Home</Button>
    </div>
  )
}

export default Feedback