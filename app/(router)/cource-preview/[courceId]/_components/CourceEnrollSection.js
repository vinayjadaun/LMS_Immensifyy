"use client"
import GlobalApi from '@/app/_services/GlobalApi';
import { IsmemberContext } from '@/app/context/IsmemberContext';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import { Source_Sans_3 } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { toast } from 'sonner';

const CourceEnrollSection = ({courceinfo,isUserEnrolled}) => {
  const membership=false;
  useEffect(()=>{
          console.log("userenrolled"+isUserEnrolled)
  },[isUserEnrolled])
  const {user}=useUser();
  const {Ismember,SetIsmember}=useContext(IsmemberContext);
  const router=useRouter();
  const enrollCource=()=>{
    GlobalApi.enrolltocource(courceinfo.slug,user?.primaryEmailAddress?.emailAddress).then(resp=>{
      console.log(resp);


      // show toast on success
      console.log("enrolled")
      toast("✔ Successfully Enrolled",{
        description:"enrolled",}
      );
      console.log(courceinfo?.slug,user?.primaryEmailAddress?.emailAddress)
      // resdirect to watch cource
      if(resp){
        console.log("success");
      router.push('/watch-cource/'+resp.createUserEnrollCource.id)
      }else{
        console.log(error)
      }
    })
  }


  return (
    <div className='p-3 text-center rounded-md bg-primary flex flex-col gap-3'>
    
      <h2 className='text-[22px] font-bold text-white'>Enroll To The Cource</h2>
       {/* user has membership and already login */}
     
     {user&&(Ismember || courceinfo.free)&&!isUserEnrolled?<div><h2 className='text-white font-light'>Enroll Now to Start Learning and Building Project</h2>
<Button 
onClick={()=>enrollCource()} 
className='bg-white text-w-fullprimary mt-3 hover:bg-white hover:text-primary'>
  Enroll Now</Button></div>
       :!user?<div><h2 className='text-white font-light'>Enroll Now to Start Learning and Building Project</h2>
      <Link href={'/sign-in'}><Button className='bg-white text-primary w-full mt-3 hover:bg-white hover:text-primary'>Enroll Now</Button></Link></div>
       :!isUserEnrolled&&
      // user does not have membership or login 
      <div> <h2 className='text-white font-light'>Buy the membership to access the cource </h2>
      <Link href={'/premium'}><Button className='bg-white text-primary mt-3 hover:bg-white w-full hover:text-primary'  >Buy Now 5$</Button></Link></div>
      
      }
      {isUserEnrolled&&<div> <h2 className='text-white font-light'>Continue to watch the cource </h2>
      <Link href={'/watch-cource/'+isUserEnrolled}><Button className='bg-white text-primary mt-3 w-full hover:bg-white hover:text-primary'>Continue</Button></Link></div>}
      </div>
  )
}

export default CourceEnrollSection