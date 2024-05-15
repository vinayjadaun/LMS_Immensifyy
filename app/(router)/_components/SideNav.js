"use client"
import { useUser } from '@clerk/nextjs'
import { BadgeIcon, BookOpen, GraduationCap, LayoutGrid, Mail, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SideNav = () => {
    const path=usePathname();
    useEffect(()=>{
        console.log("path",path)
    },[path])
    const {user}=useUser();
    const menu=[ 
        {
            id:0,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard',
            auth:user,
        },{
            id:1,
            name:'All Cources',
            icon:BookOpen,
            path:'/cources',
            auth:true,
        },
        {
            id:2,
            name:'Store',
            icon:ShoppingBag,
            path:'/shopping',
            auth:true,
        }
        ,
        {
            id:3,
            name:'Membership',
            icon:BadgeIcon,
            path:'/premium',
            auth:true,
        }
        ,
        {
            id:4,
            name:'Be instructor',
            icon:GraduationCap,
            path:'/instructor',
            auth:true,
        },
        {
            id:5,
            name:'Newletter',
            icon:Mail,
            path:'/newsletter',
            auth:true,
        }
        
    ]
  return (
    <div className='p-5 bg-white shadow-lg border h-screen'>
        <Image src='/Screenshot 2024-05-15 212404.png' alt="next.svg" height={200} width={300}/>
       <hr className='mt-7'></hr>
        <div className='mt-5'>
            {menu.map((item,index)=>item.auth&&(
               
               <Link key={index} href={item.path}> <div className={`flex gap-3 mt-2 p-3 rounded-sm text-[20px] items-center text-gray-500 
                cursor-pointer hover:bg-primary group hover:text-white transition-all ease-in-out duration-200 ${path.includes(item.path)&&'bg-primary rounded-md text-white'}`}>
                     
                    <item.icon  className='group-hover:animate-bounce'/>
                    <h2 >{item.name}</h2>
                    </div></Link>
            ))}
        </div>
    </div>
  )
}

export default SideNav