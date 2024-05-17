"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { useSearchParams } from 'next/navigation'
import { SearchContext } from '../context/SearchContext'
import { Membership } from '../context/MembershipContext'
import { IsmemberContext } from '../context/IsmemberContext'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '../_services/GlobalApi'

const Layout = ({children}) => {
  const [searchValue,SetSearchValue]=useState([]);
  const{user,isLoaded}=useUser();
  const [membershipid,SetMembershipid]=useState([]);
 
  const [Ismember,SetIsmember]=useState(false);
  useState(()=>{
    SetIsmember(Ismember)
  },[Ismember])

  const checkmemberships=()=>{
    GlobalApi.Checkformembership(user.primaryEmailAddress.emailAddress).then(resp=>{
         if(resp){
          SetIsmember(true);
          console.log(resp.memberships[0]);
         
         }else{
          console.log("setting to false")
         }
         
    })
  }
  useState(()=>{
    checkmemberships()
  },[isLoaded])
  return (
    <IsmemberContext.Provider value={{Ismember,SetIsmember}}>
    <Membership.Provider value={{membershipid,SetMembershipid}}>
  <SearchContext.Provider value={{searchValue,SetSearchValue}}>
    <div>
      <div className='sm:w-64 sm:block hidden fixed'>
    <SideNav/> </div>

    <div className='sm:ml-64'>
        <Header/>
       {children}</div> </div></SearchContext.Provider></Membership.Provider>
       </IsmemberContext.Provider>

  )
}

export default Layout