"use client"

import GlobalApi from '@/app/_services/GlobalApi'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const page = () => {

   const[news,setnews]=useState();
  const getnewletterupdates=()=>{
    GlobalApi.NewletterUpdates().then((resp)=>{
        console.log(resp);
        setnews(resp?.newsletters);
       
       
    })
}
useEffect(()=>{
  setnews(news);
  console.log(news)
},[news])
useEffect(()=>{
  getnewletterupdates();
},[])

const date= new Date();


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
    {news?.map((item)=>(
      <div className='sm:p-7 p-3 bg-white m-2 flex-col rounded-xl'>
         <div className='font-semibold text-gray-500 text-[15px] flex flex-row gap-10 justify-between'>{item.author} <div className='text-[12px] float-end'>{item.date}</div></div>
        <div className='p-5 border-[1px] rounded-xl mt-5'> <h2 className='font-semibold text-[17px]'>{item.topic}</h2>
         <h2 className='mt-2 text-[13px]'>{item.description}</h2>
       <div className=' mt-5 flex items-center  justify-center ' >  <Image className='border rounded-lg' src={item.image.url} height={600} width={700}/></div>
       
       </div>
         </div>
  ))}
 
 </div>
  )
}

export default page