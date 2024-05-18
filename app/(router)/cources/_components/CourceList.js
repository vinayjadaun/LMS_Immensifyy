"use client"
import React, { useContext, useEffect,useState } from 'react'
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
import { SearchContext } from '@/app/context/SearchContext';
import { OnFilter } from '@/app/context/OnFilter';






const CourceList = () => {
  const search="Vinay Jadaun Son of Chandrakanta jadaun";
  const{filter,SetFilter}=useContext(OnFilter);

  const {searchValue,SetSearchValue}=useContext(SearchContext);
    const[CourceList,setCourceList]=useState([]);
    useEffect(()=>{
      console.log(filter)
    },[filter])
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
    const handleStringToInt = (value) => {
      SetFilter(value)
    }
  return (
    <div className='p-5 bg-white rounded-lg sm:mt-5 mt-2'>
      {/* Title and filter */}
      <div className='flex items-center justify-between'>
         <h2 className='tex-[20px] font-bold text-primary'>ALL COURCES</h2>
         <Select onValueChange={handleStringToInt}>
  <SelectTrigger className="sm:w-[180px] w-[90px] lg:md:xl:xxl:h-[30px]">
    <SelectValue  placeholder="FILTER" />
  </SelectTrigger>
  <SelectContent className='bg-white z-10'>
    <SelectItem  value='ALL' >ALL</SelectItem>
    <SelectItem  value='Paid'>Paid</SelectItem>
    <SelectItem  value='Free'>
      Free
    </SelectItem>
  </SelectContent>
</Select>

      </div>
      {/* courceLists view */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-7'>
       {CourceList.length>0 ?CourceList.filter((item)=>{
        if(filter==='Paid'){
          console.log("paid filter")
          return item.free===false;
        }
        else if(filter==='Free'){
          console.log('free filter')
          return item.free===true;
        }else{
          console.log("all filter")
          return item;
        }
       }).filter((item)=>{
        return search.toLowerCase()===''?item:item.name.toLowerCase().includes(searchValue)
       }).map((item,index)=>(
      
        <Link key={index} href={'/cource-preview/'+item.slug}>  <div key={index}>
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