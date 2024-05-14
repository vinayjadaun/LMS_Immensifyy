"use client"
import React, { useState } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { useSearchParams } from 'next/navigation'
import { SearchContext } from '../context/SearchContext'

const Layout = ({children}) => {
  const [searchValue,SetSearchValue]=useState([]);
  return (
    
  <SearchContext.Provider value={{searchValue,SetSearchValue}}>
    <div>
      <div className='sm:w-64 sm:block hidden fixed'>
    <SideNav/> </div>

    <div className='sm:ml-64'>
        <Header/>
       {children}</div> </div></SearchContext.Provider>

  )
}

export default Layout