"use client"
// Updated ChatScreen.tsx
import React, { useState } from 'react'
import Image from 'next/image'
import AgentReply from './agentReply'
import UserReply from './userReply'
import MessageInput from './chatInput'

// Define message types for typesafety
interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string | React.ReactNode;
  images?: string[];
  timestamp: string;
}

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      content: (
        <AgentReply
          brandName="BRAND NAME"
          heading='Collection Basics'
          bodyList={true}
          question='Provide the following details to start creating your first collection: '
          greeting={true}
          listItems={[
            "Collection Name",
            "Quantity of the outfit",
            "Price per Outfit ($)"
          ]}
        />
      ),
      timestamp: '10:00 AM'
    },
    {
      id: '2',
      sender: 'user',
      content: (
        <div className='flex flex-col'>
          <p>1. Ephemeral Mechanics</p>
          <p>2. 20</p>
          <p>3. 100 ($)</p>
        </div>
      ),
      timestamp: '10:02 AM'
    },
    {
      id: '3',
      sender: 'agent',
      content: (
        <AgentReply
          preHeading='Thank you for sharing your collection details! Next thing is taking your Logistics & Delivery information.'
          heading='Logistics & Delivery'
          bodyList={false}
          question='What is your delivery time lead? Select from the following options:'
        />
      ),
      timestamp: '10:03 AM'
    },
  ]);

  // Mocked options for the demo
  const deliveryOptions = [
    { title: "In Stock - Immediate Dispatch", description: "Ready to ship within 1-2 business days" },
    { title: "Made to Order - Standard", description: "7-14 business days production time" },
    { title: "Made to Order - Custom", description: "14-21 business days for special production" },
    { title: "Pre-Order", description: "Expected delivery in 30-45 days" },
    { title: "Limited Release", description: "Exclusive batch, 21-30 days production time" }
  ];

  // Handle sending a new message
  const handleSendMessage = (text: string, files: File[]) => {
    // In a real app, you would upload files to a server and get back URLs
    const mockImageUrls = files.length > 0 
      ? files.map((_, i) => `/mock-image-${i + 1}.jpg`) 
      : [];
    
    const newMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      images: mockImageUrls.length > 0 ? mockImageUrls : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    
    // Mock agent response after user message
    setTimeout(() => {
      let agentResponse: Message;
      
      // Simple logic to determine next agent message based on message count
      if (messages.length === 3) {
        // After user selects delivery option
        agentResponse = {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          content: (
            <AgentReply
              heading='Logistics & Delivery'
              question='What is your delivery region? Select from the following options:'
            />
          ),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        // Default response for product details
        agentResponse = {
          id: `agent-${Date.now()}`,
          sender: 'agent',
          content: (
            <AgentReply
              heading='Product Details'
              preHeading='Thank you for sharing your Logistics & Delivery information! Next, upload your design images (via Sketches, pictures...). Then enter a short description for the collection - optional but recommended.'
            />
          ),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      
      setMessages([...messages, newMessage, agentResponse]);
    }, 1000);
  };
console.log("ChatScreen component rendered with messages:", messages);
  return (
    <div className='w-[880px]  bg-[#FAFAFA] py-[16px] px-[24px]'>
      {/* Header Section */}
      <div className='flex flex-col items-center justify-center gap-[24px] mb-8'>
        <Image src="/logo.svg" width={179} height={42.69} alt="logo" priority />
        <p className='text-[30px] leading-[100%]'>Welcome to your Creative Space</p>
        <div className='flex items-center gap-1'>
          <Image src="/download.svg" width={20} height={20} alt="download" priority />
          <p className='text-[15px] leading-[100%]'>Create your collection using AI and bring your ideas to life</p>
        </div>
        <div className='bg-[#E0E0E0] h-[1px] w-[800px]'></div>
      </div>

      {/* Chat Content Section */}
      <div className='flex flex-col h-[53vh] overflow-y-auto p-[16px] gap-[24px]'>
        {/* Display all messages */}
        {messages.map((message) => (
          <div key={message.id}>
            {message.sender === 'agent' ? (
              <div>{message.content}</div>
            ) : (
              <UserReply 
                content={message.content} 
                images={message.images}
                timestamp={message.timestamp}
              />
            )}
          </div>
        ))}

        {/* Show options when needed (after specific agent messages) */}
        {messages.length === 3 && (
          <div className='grid grid-cols-1 gap-2 mb-4'>
            {deliveryOptions.map((option, index) => (
              <div key={index} className='bg-white p-3 rounded border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors'>
                <p className='font-medium'>{option.title}</p>
                <p className='text-sm text-gray-600'>{option.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <MessageInput 
        onSend={handleSendMessage} 
        placeholder="Type your response..." 
      />
    </div>
  )
}

export default ChatScreen