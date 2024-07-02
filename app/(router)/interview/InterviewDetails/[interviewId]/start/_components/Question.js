import { Lightbulb, Volume2Icon } from 'lucide-react';
import React, { useState } from 'react'

const Question = ({mockinterviewquestion,activeindex,setactiveindex}) => {
  
    const texttospeech=(text)=>{
      if('speechSynthesis' in window){
        const speech=new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
      }else{
        alert("Your Browser does'nt have this feature")
      }
    }
  return (
    <div className='p-5 border-[2px] rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 mb-5 lg:grid-cols-4 gap-5'>
            {mockinterviewquestion.map((Ques,index)=>(
              <h2 key={index} onClick={()=>setactiveindex(index)} className={`p-2 rounded-[20px] text-xs md:text-sm text-center cursor-pointer ${activeindex==index?'bg-primary text-white':'bg-gray-300 text-black'}`}>Question #{index+1}</h2>
           ) )}
        </div>
        <h2 className='my-7 text-sm md:text-md'>Q.{activeindex+1} : {mockinterviewquestion[activeindex].question}</h2>
        <Volume2Icon className='cursor-pointer' onClick={()=>texttospeech(mockinterviewquestion[activeindex].question)}/>
        <div className='border rounded-lg p-5 bg-blue-100 mt-5'>
          <h2 className='flex gap-2 items-center text-blue-700'>
          <Lightbulb/>
          <strong>NOTE:</strong>
          </h2>
          <h2 className='text-sm text-primary my-2'>Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview, It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want</h2>
        </div>
    </div>
  )
}

export default Question