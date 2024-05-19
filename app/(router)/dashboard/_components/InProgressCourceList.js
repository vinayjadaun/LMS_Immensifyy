"use client"
import React, { useContext, useEffect } from 'react'
import ProgressItem from './ProgressItem'
import { SearchContext } from '@/app/context/SearchContext';

const InProgressCourceList = ({UserAllEnrolledCources}) => {
  const {searchValue,SetSearchValue}=useContext(SearchContext);
    useEffect(()=>{
        console.log(UserAllEnrolledCources)
    },[UserAllEnrolledCources])
    const search="Vinay Jadaun Son of Chandrakanta jadaun"

  return UserAllEnrolledCources&& (
    <div className='bg-white p-5 sm:mt-3 mt-2 rounded-sm'>
        <h2 className='text-primary text-[18px] font-semibold'>Recent Enrolled Cources</h2>
        <div className='grid grid-cols-1 mt-3 md:grid-cols-3 gap-5'>
           {UserAllEnrolledCources.filter((item)=>{
        return search.toLowerCase()===''?item:item.courceList?.name.toLowerCase().includes(searchValue)
       }).map((item,index)=>(
            <ProgressItem key={index} cource={item}/>
           ))}
        </div>
    </div>
  )
}

export default InProgressCourceList