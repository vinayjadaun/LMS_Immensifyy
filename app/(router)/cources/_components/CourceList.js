"use client"
import React, { useEffect,useState } from 'react'
import CourceItem from './CourceItem';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import GlobalApi from '../../../_services/GlobalApi';






const CourceList = () => {
  const[CourceList,setCourceList]=useState([]);
    useEffect(()=>{
        getAllCources();
    },[])
    useEffect(()=>{
        setCourceList(CourceList);
        console.log(CourceList)
    },[CourceList]);

    const getAllCources=()=>{
        GlobalApi.getAllCourcesList().then((resp)=>{
            console.log(resp);
            setCourceList(resp?.courceLists);
           
           
        })
    }
  return (
    <div className='p-5 bg-white rounded-lg mt-5'>
      {/* Title and filter */}
      <div className='flex items-center justify-between'>
         <h2 className='tex-[20px] font-bold text-primary'>ALL COURCES</h2>
         <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Filter" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

      </div>
      {/* courceLists view */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
       {CourceList.length>0 ?CourceList.map((item,index)=>(
       <Link href={'/cource-preview/'+item.slug}>  <div key={index}>
            <CourceItem cource={item}/>
          </div></Link> 
        )):[1,2,3,4,5,6,7].map((item,index)=>(
          <div key={index} className='w-full h-[240px] rounded-xl m-2 bg-slate-200 animate-pulse'>

            </div>
        ))}
      </div>
    </div>
  )
}

export default CourceList