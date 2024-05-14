
import { Sidebar } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../../_services/GlobalApi';

const SideBanners = () => {
    const[sideBanners,setSideBanners]=useState([]);
    useEffect(()=>{
        getSideBanners();
    },[])
    useEffect(()=>{
        setSideBanners(sideBanners);
        console.log(sideBanners)
    },[sideBanners]);

    const getSideBanners=()=>{
        GlobalApi.getSideBanner().then((resp)=>{
            console.log(resp);
            setSideBanners(resp?.sideBanners);
           
           
        })
    }
  return (
    <div className='flex flex-col gap-2'>{sideBanners.map((item,index)=>(
        <div key={index}>
            <Image src={item.banner.url} height={300} width={500} onClick={()=>window.open(item.url)} alt="hellobanner" className='rounded-xl cursor-pointer' />
        </div>
    ))}</div>
  )
}

export default SideBanners