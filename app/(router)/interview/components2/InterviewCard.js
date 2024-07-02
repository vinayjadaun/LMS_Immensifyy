import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import React from 'react'

const InterviewCard = ({item}) => {
    const router=useRouter();
  return (
    <div className='border-[2px] shadow-sm rounded-xl p-3'
    >
        <h2 className='font-bold text-primary'>{item?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{item?.jobExperience} Year of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At: {item?.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Button onClick={()=>router.replace('/interview/InterviewDetails/'+item?.mockId+"/feedback")} size='sm' variant='outline' className=' rounded-xl w-full'>Feedback</Button>
            <Button onClick={()=>router.replace('/interview/InterviewDetails/'+item?.mockId+"/start")} size='sm' className='w-full text-white rounded-xl' >Start</Button>
        </div>
    </div>
  )
}

export default InterviewCard