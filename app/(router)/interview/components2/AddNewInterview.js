"use client"
import React,{useEffect, useState} from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { uuid } from 'uuidv4';
import { sql } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { chatSession } from '@/utils/GeminiAIModel'
import { Loader, LoaderCircle } from 'lucide-react'

import { useUser } from '@clerk/nextjs';

import moment from 'moment/moment';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import Router from 'next/router';
  
const AddNewInterview = () => {
    const router=useRouter();
    const{user}=useUser();
    const[open,setopen]=useState(false);
    const[loading,setloading]=useState(false);
    const[jobtitle,setjobtitle]=useState();
    const[jobdiscription,setjobdescription]=useState();
    const[jobyear,setjobyear]=useState();
    const[resp,setresp]=useState();
    useEffect(()=>{
      console.log(jobdiscription,jobtitle,jobyear)
    },[jobyear,jobtitle,jobdiscription])
    useEffect(()=>{
        console.log(resp);
        callneondb();
    },[resp]);
    const onsubmit=async(e)=>{
        e.preventDefault();
        setloading(true);
        console.log(jobtitle,jobdiscription,jobyear)
        const InputPrompt="job role:"+jobtitle+", job description:"+jobdiscription+",year of experience:"+jobyear+", based on the given information generate 5 question and answer of interview nothing else in json format response";
        const result=await chatSession.sendMessage(InputPrompt);
        const jsonres=(result.response.text()).replace('```json','').replace('```','');
        setresp(jsonres);
        
        if(result.response ){
          console.log("calling neaon");
         const res=await db.insert(MockInterview)
          .values({
                mockId:uuid(),
                jsonMockResp:jsonres,
                jobPosition:jobtitle,
                jobDesc:jobdiscription,
                jobExperience:jobyear,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-YYYY')
          }).returning({mockId:MockInterview.mockId});
          console.log("inserted id",res)
          setopen(false);
          router.push('/interview/InterviewDetails/'+res[0]?.mockId);
    }else{
        console.log(
            "error occured"
        )
    }
        setloading(false);
    }
    const callneondb=async()=>{
     
     
    }
  return (
    <div>
        <div className='p-10 border rounded-lg bg-gray-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>setopen(true)}>
            <h2 className='text-lg text-center'>+Add New</h2>
            
        </div>
        <Dialog open={(open)} >
  <DialogContent className='bg-white max-w-2xl'>
    <DialogHeader>
      <DialogTitle>     <h2 className='font-2xl'>Tell us more about your job interviewing</h2></DialogTitle>
      <DialogDescription>
        <form onSubmit={onsubmit}>
           <div>
       
            <h2>Add Details about your job position/role, job description and year of experience.</h2>
           </div>
           <div className='mt-7 my-3'>
            <label>Job Role/Job Position</label>
            <Input required placeholder='Ex-Full Stack Developer' onChange={(e)=>setjobtitle(e.target.value)}/>
           </div>

           <div className='my-3'>
            <label>Job Description/Tech Stack in short.</label>
            <Textarea required placeholder='Ex-React,Angular,Node,mongo etc' onChange={(e)=>setjobdescription(e.target.value)}/>
           </div>
           <div className='mt-7 my-3'>
            <label>Year of Experience</label>
            <Input required type='number' max='100' placeholder='Ex-5' onChange={(e)=>setjobyear(e.target.value)}/>
           </div>

        <div className='flex gap-5 justify-end'>
            <Button variant="ghost" onClick={()=>setopen(false)}>Cancel</Button>
            <Button type='submit' disabled={loading} className='text-white border rounded-e-lg'>
                {loading?<><LoaderCircle className='animate-spin'/>Generating from AI</>: 
                'Start Interview'}
            </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview