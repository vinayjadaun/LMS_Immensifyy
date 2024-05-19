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
import { Island_Moments } from 'next/font/google'
import { OnFilter } from '../context/OnFilter'
import { NewsletterContext } from '../context/NewsletterContext'

const Layout = ({children}) => {
  const [searchValue,SetSearchValue]=useState([]);
  const{user,isLoaded}=useUser();
  const [membershipid,SetMembershipid]=useState([]);
  const [filter,SetFilter]=useState();
  const [Ismember,SetIsmember]=useState(false);
  const[news,Setnews]=useState();
  useState(()=>{
    SetIsmember(Ismember)
  },[Ismember])


  return (
    
    <IsmemberContext.Provider value={{Ismember,SetIsmember}}>
    <Membership.Provider value={{membershipid,SetMembershipid}}>
      <OnFilter.Provider value={{filter,SetFilter}}>
  <SearchContext.Provider value={{searchValue,SetSearchValue}}>
    <NewsletterContext.Provider value={{news,Setnews}}>
    <div>
      <div className='sm:w-64 sm:block hidden fixed'>
    <SideNav/> </div>

    <div className='sm:ml-64'>
        <Header/>
       {children}</div> </div></NewsletterContext.Provider></SearchContext.Provider>
       </OnFilter.Provider>
       </Membership.Provider>
       </IsmemberContext.Provider>

  )
}

export default Layout