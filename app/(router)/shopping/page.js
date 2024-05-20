"use client"
import { ColorContext } from '@/app/context/ColorContext'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'

const shop = () => {
  const{Color,SetColor}=useContext(ColorContext);
  const hel='#7efd11'

  return (
    <div className='grid sm:grid-cols-4 grid-cols-1 bg-white p-5 gap-1'>
    {/* left section */}
     <div className='col-span-2'>
     <Image src='/panda1_prev_ui.png' alt="any" height={600} width={600}/>
     </div>
     {/* right section */}
     
     <div className='col-span-2 p-5  text-center items-center bg-white rounded-xl'>
     <h2 className={`font-bold sm:mr-[100px] mr-0 ${Color===0?'text-[#28fffb]':Color==1?'text-[#ff1414]':Color==2?'text-[#d8ff2d]':Color==3?'text-[#143bff]':Color==4?'text-[#4aff86]':null} sm:mt-[150px] mt-0 sm:text-[70px] text-[50px]`}>Comming Soon</h2>
     <div onClick={()=>SetColor(1)}><Button >Change Color</Button></div>
     <div onClick={()=>SetColor(2)}><Button >Change Color</Button></div>
     <div onClick={()=>SetColor(3)}><Button >Change Color</Button></div>
     <div onClick={()=>SetColor(4)}><Button >Change Color</Button></div>

     </div>
   </div>
  )
}

export default shop