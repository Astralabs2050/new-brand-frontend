"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

function SideBarNavigation({image, label}: {image: string, label: string}) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  
  // Generate path from label: lowercase and remove spaces
  const getPath = (label:string) => {
    // Handle special case for "Help & Support"
    if (label === "Help & Support") return "/dashboard/support"
    
    if (label === "Dashboard") return "/dashboard"

    // Handle special case for "Account Settings"
    if (label === "Account Settings") return "/dashboard/settings"
    
    // For other labels, convert to lowercase and remove spaces
    return "/dashboard/" + label.toLowerCase().replace(/\s+/g, '')
  }

  // Check if current path matches this navigation item
  const pathname = usePathname()
  const isActive = pathname === getPath(label)
  
  const handleClick = () => {
    router.push(getPath(label))
  }

  return (
    <div 
      className={`flex rounded-[10px] items-center gap-[16px] py-[16px] px-[24px] h-[56px] w-[232px] cursor-pointer transition-colors duration-200
        ${isActive || isHovered ? 'bg-[#D9D9D9] text-black' : 'bg-white text-[#4F4F4F]'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Image 
        src={image} 
        alt={label.toLowerCase()} 
        width={24} 
        height={24}
      />
      <p className="font-[ClashGrotesk-Medium] font-[500] text-[16px] leading-[24px]">
        {label}
      </p>
    </div>
  )
}

export default SideBarNavigation