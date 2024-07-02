"use client"
import { Button } from '@/components/ui/button'
import { Disc, Mic, RemoveFormattingIcon, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Toaster, toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { UserAnswer } from '@/utils/schema'
import Link from 'next/link'


const Record = ({mockinterviewquestion,activeindex,interviewdata}) => {
    const {user}=useUser();
    const[userAnswer,setuseranswer]=useState("");
    const [loading,setloading]=useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        setResults,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
      useEffect(()=>{
        results.map((result)=>(
            setuseranswer(prevAns=>prevAns+result?.transcript)
        ))
      },[results])

      useEffect(()=>{
        if(!isRecording&&userAnswer.length>10){
          UpdateUserAnswerInDb();
        }
      },[userAnswer])

      const StartStopRecording=async()=>{
        if(isRecording){
            stopSpeechToText();
           
           
            // if(userAnswer?.length<10){
            //   toast('something went wrong');
            //   setloading(false);
            //   return;
            // }

        
          }else{
            startSpeechToText();
        }
      }

      const UpdateUserAnswerInDb=async()=>{
        console.log(userAnswer)
       setloading(true)
        const feedbackPrompt="Question:" + mockinterviewquestion[activeindex]?.question + ",User Answer:" + userAnswer + "Depends on question and user answer for given interview question,"+" please give us rating from 0 to 5 and feedback on area of improvement if any,"+" in just 3 to 5 lines to improve it in JSON format with rating field and feedback field"
        const result=await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
        console.log(mockJsonResp);
        const JsonFeedbackResp=JSON.parse(mockJsonResp);
       
        const resp=await db.insert(UserAnswer)
        .values({
          mockIdRef:interviewdata?.mockId,
          question:mockinterviewquestion[activeindex]?.question,
          correctAns:mockinterviewquestion[activeindex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-YYYY')
        })
       if(resp){
        toast('user answer record successfully')
        setResults([])
        setuseranswer('')
       }
       setResults([])
       setloading(false)
       setuseranswer('')

      }
  return (
    <div className='items-end'>
    <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <WebcamIcon className='w-[200px] h-[200px] absolute'/>
       {<Webcam style={{
            height:300,
            width:'100%',
            zIndex:8
        }}/>}

    </div>
   <div className='flex flex-col-reverse w-full'>
    <div className='flex items-center justify-center'>
    <Button className='my-10' variant='outline' onClick={()=>StartStopRecording()}>
        {isRecording?
        <h2 className='text-red-600 flex flex-row gap-2'>
            <Disc/> Recording...
        </h2>
    :<h2 className='text-primary flex flex-row gap-2'>
    <Mic/> Record Answer
    </h2>}</Button>
  
    <Button className='text-white' onClick={()=>console.log(userAnswer)}>Show User Answer</Button>
    </div>
    </div>
  

    </div>
  )
}

export default Record