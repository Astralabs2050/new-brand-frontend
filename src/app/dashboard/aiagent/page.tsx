import React from 'react'
import ChatScreen from './chatScreen'
import PreviousChat from './previousChat'

function page() {
  return (
    <div className='flex h-[100vh] overflow-hidden'>
        <ChatScreen/>
        <PreviousChat/>
    </div>
  )
}

export default page