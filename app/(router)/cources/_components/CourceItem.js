import Image from 'next/image'
import React from 'react'

const CourceItem = ({cource}) => {
  return (
    <div className='border rounded-xl hover:shadow-md hover:shadow-purple-300 cursor-pointer'>
        <Image src={cource?.banner?.url} height={150} width={500} alt='banner' className='rounded-t-xl'/>
        <div className='flex flex-col gap-1 p-2'>
            <h2 className='font-medium sm:text-[17px] text-[14px]'>{cource.name}</h2>
            <h2 className='text-[12px] text-gray-400'>{cource.auther}</h2>
            { cource.chapter.length==0?
            <div className='flex gap-2'>
                <Image src='/youtube.png' alt='youtube' height={20} width={20}/>
                <h2 className='text-[14px] text-gray-400'>Watch On Youtube</h2>
            </div>:<div className='flex gap-2'>
                <Image src='/chapter.png' alt='youtube' height={20} width={20}/>
                <h2 className='text-[14px] text-gray-400'>Chapters</h2>
            </div>}
         
                <h2 className='text-[15px]'>{cource.free?'Free':'Paid'}</h2>
           
        </div>
    </div>
  )
}

export default CourceItem