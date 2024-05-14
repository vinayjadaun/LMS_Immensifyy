import React, { useEffect } from 'react'

const VideoPlayer = ({videourl,banner}) => {
    useEffect(()=>{
          console.log(videourl,banner)
    },[videourl,banner])
  return (
    <video
    width={1000}
    height={250}
    controls
    key={videourl}
    poster={banner}
    className='rounded-sm'><source src={videourl}/></video>
  )
}

export default VideoPlayer