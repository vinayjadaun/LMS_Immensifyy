import React, { act, useEffect } from 'react'
import VideoPlayer from './VideoPlayer'
import Markdown from 'react-markdown'
import { Button } from '@/components/ui/button'

const CourceVideoDescription = ({courceinfo,activeChapter,watchMode=false,setChapterCompleted}) => {
 useEffect(()=>{
      console.log(activeChapter);
 },[activeChapter])
  return (
    <div>
        <h2 className='text-[20px] font-semibold'>{courceinfo.name}</h2>
        <h2 className='text-gray-500 my-3 text-[14px]'>{courceinfo.auther}</h2>
        <VideoPlayer videourl={courceinfo?.chapter[activeChapter]?.video?.url} banner={!watchMode?courceinfo.banner.url:null}/>
        <h2 className='mt-5 text-[17px] font-semibold'>{watchMode?<span className='flex sm:flex-row flex-col justify-between items-center'>{courceinfo?.chapter[activeChapter]?.name}
        <Button className='text-white' onClick={()=>setChapterCompleted(courceinfo?.chapter[activeChapter]?.id)}>Mark Completed</Button>
        </span>:<span>About This Cource</span>}</h2>
        <div className='overflow-hidden'>
          {!watchMode?<Markdown className='text-[13px] font-light mt-2 leading-6'>{courceinfo.description}</Markdown>:
          <Markdown className='text-[13px] font-light mt-2 leading-6'>{courceinfo.chapter[activeChapter].shortDesc}</Markdown>}
            
        </div>
    </div>
  )
}

export default CourceVideoDescription