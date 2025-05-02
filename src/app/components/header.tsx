"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function Header() {
    const [isNotification,setIsNotification] = useState(true)
  return (
    <div className='flex gap-3 h-[84px] w-full bg-[#FFFFFF] border border-[#F2F2F2] items-center justify-end py-[14px] px-[80px]'>
        {isNotification ? <Image src="/notification-on.svg" alt="notification" width={25.35} height={24} /> :<Image src="/notification.svg" alt="notification" width={16.86} height={21.5} /> }

        <div className='bg-[#F2F2F2] text-[#000] flex items-center justify-center gap-3 w-[146px] h-[46px] rounded-[50px] py-[8px] px-[16px]'>
            <Image src="/iconusdc.svg" alt="usdc" width={24} height={24} />
            <p className='font-[ClashGrotesk-Medium] font-[500] text-[16px] '>2000.00</p>
        </div>
        <div className='bg-[#000] text-[#FFFFFF] flex items-center justify-center gap-3 w-[146px] h-[46px] rounded-[50px] py-[8px] px-[16px]'>
            
            <button className='font-[ClashGrotesk-Medium] font-[500] text-[16px] '>New Collection</button>
        </div>
    </div>
  )
}

export default Header

// : "/" 