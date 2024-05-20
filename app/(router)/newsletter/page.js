"use client"

import GlobalApi from '@/app/_services/GlobalApi'
import { IsmemberContext } from '@/app/context/IsmemberContext'
import { NewsletterContext } from '@/app/context/NewsletterContext'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'

const Page = () => {
  const{Ismember,SetIsmember}=useContext(IsmemberContext);

  

const date= new Date();
const{news,Setnews}=useContext(NewsletterContext);

const data=[
  {
    id:1,
    name:'vinay jadaun',
    description:'my name is vinay jadaun hello there this is vinay ',
    date:'2024-05-19T00:09:00+00:00',
    topic:'todays session',
    image:'/chapter.png'
  },
  {
    id:2,
    name:'vinay ',
    description:'my name is vinay jadaun hello there this is vinay ',
    date:'2024-05-19T00:09:00+00:00'
    ,
    topic:'todays session'
    ,
    image:'/chapter.png'
  },
  {
    id:2,
    name:' jadaun',
    description:'my name is vinay jadaun hello there this is vinay ',
    date:'2024-05-19T00:09:00+00:00',
    topic:'todays session',
    image:'/chapter.png'
  }
]

  return(
 <div  >
  {news?.map((item,index)=>(
      <div className={`sm:p-7 p-3 ${Ismember?'bg-primary border-white':'bg-white'} m-2 flex-col rounded-xl`} key={index}>
         <div className={`font-semibold ${Ismember?'text-white':'text-gray-500'} text-[15px] flex flex-row gap-10 justify-between`}>{item.author} <div className='text-[12px] float-end'>{item.date}</div></div>
        <div className={`p-5 border-[1px] ${Ismember?'text-white':'text-gray-500'} rounded-xl mt-5`}> <h2 className='font-semibold text-[17px]'>{item.topic}</h2>
         <h2 className='mt-2 text-[13px]'>{item.description}</h2>
        
         {item.image?  <div className=' mt-5 flex items-center  justify-center ' > <Image className='border rounded-lg' src={item.image.url} height={600} width={700}/></div>:null}
         <div className='flex items-center justify-center rounded-lg'> <a className=' rounded-lg bg-white text-black text-center p-3 mt-5 h-[40px] w-[100px] font-bold text-[10px]' href={item.meeting}>MEETING LINK</a></div>
       </div>
         </div>
  ))}
 
 </div>
  )
}

export default Page