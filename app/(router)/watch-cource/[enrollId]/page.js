"use client"
import GlobalApi from '@/app/_services/GlobalApi'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CourceVideoDescription from '../../cource-preview/[courceId]/_components/CourceVideoDescription'
import CourceContentSection from '../../cource-preview/[courceId]/_components/CourceContentSection'
import { toast } from 'sonner'

const page = ({params}) => {
  const {user}=useUser();
  const [activeChapter,setActivechapter]=useState(0);
  const[completedChapter,setCompletedChapter]=useState();
  const[enrolldata,setenrolldata]=useState();
  useEffect(()=>{
     params&&user&&getUserenrolledCources();
  },[params,user])
  useEffect(()=>{
     setenrolldata(enrolldata);
     console.log(enrolldata)
  },[enrolldata])
  useEffect(()=>{
    setCompletedChapter(completedChapter);
    console.log(completedChapter)
 },[completedChapter])
  const getUserenrolledCources=()=>{
    GlobalApi.getUserEnrollCource(params.enrollId,user?.primaryEmailAddress?.emailAddress).then(resp=>{
   
      setenrolldata(resp.userEnrollCources[0].courceList);
      setCompletedChapter(resp.userEnrollCources[0].completedChapter)
    })
  }

  const completedChapters=(chapterId)=>{
    GlobalApi.markcompletedchapter(params.enrollId,chapterId).then(resp=>{
      console.log(resp)
      if(resp){
        toast('chapter compled');
        getUserenrolledCources();
      }
    })
  }
  return enrolldata&& (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
          {/* video title and description */}
          <div className='col-span-2 bg-white p-3'>
           <CourceVideoDescription courceinfo={enrolldata} activeChapter={activeChapter} watchMode={true}  setChapterCompleted={(chapterId)=>completedChapters(chapterId)}  />
          </div>
          {/* courcecontent */}
          <div>
          
          <CourceContentSection courceinfo={enrolldata} isUserEnrolled={true} watchMode={true}  activeChapterIndex={(index)=>{console.log(index),setActivechapter(index)}} completedChapter={completedChapter}/>
          
          </div>
    </div>
  )
}

export default page