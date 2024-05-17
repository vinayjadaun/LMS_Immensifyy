import Image from 'next/image'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'


const ProgressItem = ({cource}) => {
    const getTotalCompletedChapterPercentage=(item)=>{
                  
        const perc=(item.completedChapter?.length/item.courceList?.chapter?.length)*100;
        return perc
    }
  return (
    <Link href={"/cource-preview/"+cource.courceList.slug}>
    <div className='border rounded-xl hover:shadow-md hover:shadow-purple-300 cursor-pointer'>
    <Image src={cource?.courceList?.banner?.url} height={150} width={500} alt='banner' className='rounded-t-xl'/>
    <div className='flex flex-col gap-1 p-2'>
        <h2 className='font-medium'>{cource?.courceList?.name}</h2>
        <h2 className='text-[12px] text-gray-400'>{cource?.courceList?.auther}</h2>
        <h2 className='text-[12px] text-gray-400'>{getTotalCompletedChapterPercentage(cource)}%<span className='float-right'>{cource?.completedChapter?.length}/{cource?.courceList?.chapter?.length} Chapters</span></h2>
        <Progress value={getTotalCompletedChapterPercentage(cource)} className='h-[7px]'/>

    </div>
</div></Link>
  )
}

export default ProgressItem