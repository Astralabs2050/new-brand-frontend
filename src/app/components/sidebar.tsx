import Image from 'next/image'
import React from 'react'
import SideBarNavigation from './sideBarNavigation'

function Sidebar() {
  return (
    <div className='w-[280px] border border-[#F2F2F2] flex flex-col p-[24px] gap-[24px]'>
       <Image src="/logo.svg" alt="logo" width={155.12} height={37} className='' />
       <div className='flex flex-col gap-[24px]'>
        <Image src="/minimize.svg" alt='minimize' width={17} height={14.14} />
        <div className='flex flex-col gap-[24px]'>
            <SideBarNavigation image='/dashboard.svg' label='Dashboard'/>
            <SideBarNavigation image='/agent.svg' label='AI Agent'/>
            <SideBarNavigation image='/inventory.svg' label='Inventory'/>
            <SideBarNavigation image='/message.svg' label='Messages'/>
            <SideBarNavigation image='/settings.svg' label='Account Settings'/>
            <SideBarNavigation image='/help.svg' label='Help & Support'/>
        </div>
       </div>
    </div>
  )
}

export default Sidebar