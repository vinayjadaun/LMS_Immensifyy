"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourceVideoDescription from './_components/CourceVideoDescription'
import GlobalApi from '@/app/_services/GlobalApi'
import CourceEnrollSection from './_components/CourceEnrollSection'
import CourceContentSection from './_components/CourceContentSection'
import { useUser } from '@clerk/nextjs'

const CourcePreview = ({params}) => {
  const [courceVideo,setCourceVideo]=useState();
  const {user}=useUser();
  const [isUserEnrolled,setIsUserEnrolled]=useState();

  useEffect(()=>{
      params&&getCourceInfoById();
  },[params]);

    useEffect(()=>{
      courceVideo&&user&&checkUserEnrolledCource()
},[courceVideo,user])

  useEffect(()=>{
       setCourceVideo(courceVideo);
      //  setVideoUrl(VideoUrl);
       console.log(courceVideo);
  },[courceVideo]);

useEffect(()=>{
  console.log(isUserEnrolled);
},[isUserEnrolled])

  const getCourceInfoById=()=>{
      GlobalApi.getCourceById(params?.courceId).then(resp=>{
        console.log(resp);
       
        setCourceVideo(resp.courceLists[0])
        // setVideoUrl(resp.courceLists[0].chapter[0].video.url)
        // console.log(courceVideo)
       
      })
  }
  const checkUserEnrolledCource=()=>{
    GlobalApi.checkEnrolledtoCource(courceVideo?.slug,user.primaryEmailAddress.emailAddress).then(resp=>{
         if(resp?.userEnrollCources[0]?.id){
          console.log(resp)
          console.log("setting to true");
          console.log(resp?.userEnrollCources[0]?.id)
          setIsUserEnrolled(resp?.userEnrollCources[0]?.id);
         
         }else{
          console.log("setting to false")
         }
         
    })
  }

  return courceVideo&&(
    <div className='grid grid-cols-1 md:grid-cols-3 sm:p-5 p-2 sm:gap-3 gap-2'>
          {/* video title and description */}
          <div className='col-span-2 bg-white p-3'>
           <CourceVideoDescription courceinfo={courceVideo} />
          </div>
          {/* courcecontent */}
          <div className='col-span-1 min-w-[345px] bg-white sm:p-3 p-2'>
          <CourceEnrollSection courceinfo={courceVideo} isUserEnrolled={isUserEnrolled}/>
          <CourceContentSection courceinfo={courceVideo} isUserEnrolled={isUserEnrolled}/>
          
          </div>
    </div>
  )
}

export default CourcePreview