"use client"
import { Button } from '@/components/ui/button'
import { Mic, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';

const Record = () => {
    const[userAnswer,setuseranswer]=useState("");
    const {
        error,
        interimResult,
        isRecording,
        results,
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
      const saveUserAnswer=()=>{
        if(isRecording){
            stopSpeechToText();
        }else{
            startSpeechToText();
        }
      }
  return (
    <div className='items-end'>
    <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <WebcamIcon className='w-[200px] h-[200px] absolute'/>
        <Webcam style={{
            height:300,
            width:'100%',
            zIndex:8
        }}/>

    </div>
   <div className='flex flex-col-reverse w-full'>
    <div className='flex items-center justify-center'>
    <Button className='my-10' variant='outline' onClick={()=>saveUserAnswer()}>
        {isRecording?
        <h2 className='text-red-600 flex flex-row gap-2'>
            <Mic/> Recording...
        </h2>
    :'Record Answer'}</Button>
    <Button className='text-white' onClick={()=>console.log(userAnswer)}>Show User Answer</Button>
    </div>
    </div>
  

    </div>
  )
}

export default Record