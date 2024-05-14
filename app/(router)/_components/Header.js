"use client"
import { BellDot, Search } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button"
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'



const Header = () => {
  const {user,isLoaded}=useUser();
 
  return (
    <div className='p-4 bg-white gap-2 flex justify-between '>
        {/* Search bar */}
        <div className='flex gap-2 border min-w-2  rounded-md p-2'>
        <Search className='sm:h-4 h-2 sm:w-4 w-2'/>
        <input className='outline-none' type='text' placeholder='search cources'/>
        </div>
            
            {/* Get started and bell icon */}
         <div className='flex items-center sm:gap-4 gap-1'>    
            <BellDot className='text-gray-500 sm:p-0 p-0.5'/>
         {isLoaded&&user? <UserButton afterSignOutUrl='/'/>: <Link href={'/sign-in'}><Button  className='sm:text-[15px] text-[8px] sm:py-3 py-1 sm:px-3 px-2'>Login</Button></Link>
          }
        </div>
        
        </div>
  )
}

export default Header