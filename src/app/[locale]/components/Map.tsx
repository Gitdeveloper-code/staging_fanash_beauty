import React from 'react'
import Image from 'next/image'

const Map = () => {
  return (
    <div className='relative flex flex-1 items-start'>
        <div className='relative  z-20 w-60 flex-col bg-secondary gap-8 rounded-3xl px-7 py-8'>
<div className='flex flex-col'>
    <div className='flex gap-x-20'>
        <p className='text-gray-200 font-thin text-sm'>Location</p>
        <Image
        src="/asset/img/close.png"
        width={20}
        height={20}
        alt="close"
        ></Image>
    </div>
    <p className='text-gray-200 text-sm'>Fanash Beauty</p>
    <div className='grid grid-cols-2'>
    <div className='flex flex-col pt-5'>
    <p className='text-gray-200 font-thin text-sm'>Distance</p>
    <p className='text-gray-200 text-sm'>25&apos; E 45&apos;E</p>
    </div>
    <div className='flex flex-col pt-5'>
    <p className='text-gray-200 font-thin text-sm'>Distance</p>
    <p className='text-gray-200 text-sm'>25&apos; E 45&apos;E</p>
    </div>
   
    </div>


</div>
    </div>
    </div>
     )
  
}

export default Map
