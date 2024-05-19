"use client"
import { BadgeIcon, Bell, BellDot, BookOpen, GraduationCap, LayoutGrid, ListVideo, Mail, Menu, Option, Search, ShoppingBag } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SearchContext } from '@/app/context/SearchContext'
import GlobalApi from '@/app/_services/GlobalApi'
import { IsmemberContext } from '@/app/context/IsmemberContext'
import { NewsletterContext } from '@/app/context/NewsletterContext'



const Header = () => {
  const[mobileTrue,setMobileTrue]=useState(false);
  const {user,isLoaded}=useUser();
  const {searchValue,SetSearchValue}=useContext(SearchContext);
  const {Ismember,SetIsmember}=useContext(IsmemberContext);
  useEffect(()=>{
    console.log(mobileTrue);
  },[mobileTrue])
  useEffect(()=>{
    console.log(searchValue)
  },[searchValue])

  // **addition in order to make navlink**
  useEffect(()=>{
    user&&checkmemberships();
  },[user])
  const path=usePathname();
  useEffect(()=>{
      console.log("path",path)
  },[path])
  const router=useRouter();

  const checkmemberships=()=>{
    GlobalApi.Checkformembership(user?.primaryEmailAddress?.emailAddress).then(resp=>{
         if(resp.memberships[0]){
          SetIsmember(true);
          console.log(resp.memberships[0]);
         
         }else{
          console.log("setting to false")
         }
         
    })
  }

  const{news,
    Setnews}=useContext(NewsletterContext);
  const getnewletterupdates=()=>{
    GlobalApi.NewletterUpdates().then((resp)=>{
        console.log(resp);
        Setnews(resp?.newsletters);
       
       
    })
}
useEffect(()=>{
  Setnews(news);
  console.log(news)
},[news])
useEffect(()=>{
  getnewletterupdates();
},[])
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
      },
      {
          id:6,
          name:'Live Session',
          icon:ListVideo,
          path:'/Live',
          auth:true,
      }
      
  ]
 
  return (
    <div className='p-4 bg-white gap-2 flex justify-between '>
        {/* Search bar */}
        <div className='flex gap-2 border min-w-[50px]  rounded-md p-2'>
        <Search className='sm:h-4 h-4 sm:w-4 w-4'/>
        <input className='outline-none min-w-[50px]' 
        onChange={(e)=>SetSearchValue(e.target.value.toLowerCase())}
        value={searchValue}
        type='text' placeholder='search cources'/>
        </div>
            
            {/* Get started and bell icon */}
         <div className='flex items-center sm:gap-4 gap-1'>    
         <div  onClick={()=>router.push('/newsletter')} className='sm:block hidden relative hover:cursor-pointer'>
            <Bell className='text-gray-500 sm:p-0 p-0.5 h-7 w-7 sm:block hidden md:lg:xl:xxl:absolute'></Bell>
            <div className='absolute rounded-[6px] h-3 w-3 bg-red-600 right-0 top-0 text-[8px] text-white text-center' >{news?.length}</div>
            </div>
            {isLoaded&&user? <UserButton afterSignOutUrl='/'/>: <Link href={'/sign-in'}><Button  className='sm:text-[15px] rounded-md text-white text-[8px] sm:py-3 py-1 sm:px-3 px-2'>Login</Button></Link>
          }
            <Menu onClick={()=>{setMobileTrue(!mobileTrue)}} className='h-7 w-7 sm:hidden block float-right'/>
       
        </div>




       <div className='flexitems-center justify-center float-left bg-white absolute w-[320px] top-[70px]'>

        
           <div className={`mt-1 bg-white z-10 h-screen rounded-md p-3 ${!mobileTrue?'absolute left-[-1px] top-[-900px] transition-all ease-in-out 2s':'absolute top-[2px] left-[-10px]  transition-all ease-in-out 2000ms'}`}>
           <div  onClick={()=>router.push('/newsletter')} className='lg:md:xl:xxl:hidden h-7 w-7 relative hover:cursor-pointer'>
            <Bell className='text-gray-500 sm:p-0 p-0.5 h-7 w-7 lg:md:xl:xxl:hidden md:lg:xl:xxl:absolute'></Bell>
            <div className='absolute rounded-[6px] h-3 w-3 bg-red-600 right-0 top-0 text-[8px] text-white text-center' >{news?.length}</div>
            </div>
           {menu.map((item,index)=>item.auth&&(
              
              <Link key={index} href={item.path}> <div  onClick={()=>setMobileTrue(!mobileTrue)} className={`flex  w-[320px] border-[2px] mt-5 gap-5 p-2 rounded-sm text-[20px] items-center text-gray-500 
               cursor-pointer hover:bg-primary group hover:text-white transition-all ease-in-out duration-200 ${path.includes(item.path)&&'bg-primary rounded-md text-white'}`}>
                    
                   <item.icon  className='group-hover:animate-bounce'/>
                   <h2 >{item.name}</h2>
                   </div>
                   </Link>
                   
           ))}
       </div>
        </div>
        
        </div>
  )
}

export default Header