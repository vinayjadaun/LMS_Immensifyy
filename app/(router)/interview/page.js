import React from 'react'
import Headerr from './components2/headerr'
import AddNewInterview from './components2/AddNewInterview'
import InterviewList from './components2/InterviewList'

const interview = () => {
  return (
    <div className='bg-white p-1'>
    <Headerr/>
    <div className='p-10'>
      <h2 className='font-bold text-2xl text-primary'>Welcome to AI Mockup Interview</h2>
      <h2 className='text-gray-500  my-5'>Create and Start your AI MockUp Interview with Immensifyy AI Interview</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
      {/* previous interview details */}
        <InterviewList/>

    </div>
    </div>
  )
}

export default interview