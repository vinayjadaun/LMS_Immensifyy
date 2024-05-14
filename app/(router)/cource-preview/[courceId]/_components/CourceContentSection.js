import { Lock, PlayIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CourceContentSection = ({courceinfo,isUserEnrolled,watchMode=false,activeChapterIndex,completedChapter}) => {
    const[activeIndex,setActiveIndex]=useState(0);
  useEffect(()=>{
    console.log(completedChapter)
  },[completedChapter])

    const checkIsChapterCompleted=(chapterId)=>{
      return completedChapter.find(item=>item.chapterId==chapterId)
      
    }
  return (
    <div className='p-3 bg-white rounded-sm mt-3'><h2>
        Contents
        </h2>
        {courceinfo.chapter.map((item,index)=>(
            <div key={index}>
                <h2 className={`p-2 m-2 text-[14px] flex justify-between items-center
                border rounded-sm px-4 cursor-pointer hover:bg-gray-200 hover:text-gray-500 ${activeIndex==index&&'bg-primary text-white'}
                ${isUserEnrolled&&'hover:bg-primary hover:text-white'}
                ${watchMode&&checkIsChapterCompleted(item.id)&&'border-green-600 bg-green-500 text-white'}
                `}
                onClick={()=>{watchMode&&activeChapterIndex(index),watchMode&&setActiveIndex(index)}}>{index+1}. {item.name} 
                {activeIndex==index||isUserEnrolled?<PlayIcon className='h-4 w-4'/> :<Lock className='h-4 w-4'/>}</h2>
                </div>
        ))}</div>
  )
}

export default CourceContentSection