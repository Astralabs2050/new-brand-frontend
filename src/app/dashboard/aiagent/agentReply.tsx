"use client"
import React, { useState } from 'react';
import { Volume2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import Notification from '@/app/components/notification';

interface AgentReplyProps {
  /** Optional text that appears above the heading */
  preHeading?: string;
  /** Main heading for the reply */
  heading?: string;
  /** Display content as a list if true, otherwise as cards */
  bodyList?: boolean;
  /** Optional question text */
  question?: string;
  /** Show greeting message if true */
  greeting?: boolean;
  /** Brand name to be displayed in greeting */
  brandName?: string;
  /** List items to be displayed when bodyList is true */
  listItems?: string[];
  /** Card items when bodyList is false */
  cardItems?: {
    title: string;
    description: string;
  }[];
  /** Default icon color for all action icons */
  iconColor?: string;
  /** Active icon color when clicked */
  activeIconColor?: string;
  /** Icon size for all action icons */
  iconSize?: number;
  /** Optional callback for speaker icon click */
  onSpeakerClick?: () => void;
  /** Optional callback for copy icon click */
  onCopyClick?: () => void;
  /** Optional callback for like icon click */
  onLikeClick?: () => void;
  /** Optional callback for dislike icon click */
  onDislikeClick?: () => void;
}

function AgentReply({
  preHeading,
  heading,
  bodyList = false,
  question,
  greeting = false,
  brandName = "BRAND NAME",
  listItems = ["Option 1", "Option 2", "Option 3"],
  cardItems = Array(5).fill({
    title: "In Stock - Immediate Dispatch",
    description: "Ready to ship within 1-2 business days"
  }),
  iconColor = "#000000",
  activeIconColor = "#2563eb", // Default active color (blue)
  iconSize = 20,
  onSpeakerClick = () =>  Notification.info("Speaker clicked"),
  onCopyClick = () => Notification.info("Copy clicked"),
  onLikeClick = () => Notification.info("Like clicked"),
  onDislikeClick = () => Notification.info("Dislike clicked")
}: AgentReplyProps) {
  // State to track which icons are active
  const [activeIcons, setActiveIcons] = useState({
    speaker: false,
    copy: false,
    like: false,
    dislike: false
  });

  // Handler functions to toggle active state
  const handleSpeakerClick = () => {
    setActiveIcons(prev => ({ ...prev, speaker: !prev.speaker }));
    onSpeakerClick();
  };

  const handleCopyClick = () => {
    setActiveIcons(prev => ({ ...prev, copy: !prev.copy }));
    onCopyClick();
  };

  const handleLikeClick = () => {
    setActiveIcons(prev => ({ 
      ...prev, 
      like: !prev.like,
      dislike: false // Ensure dislike is off when like is clicked
    }));
    onLikeClick();
  };

  const handleDislikeClick = () => {
    setActiveIcons(prev => ({ 
      ...prev, 
      dislike: !prev.dislike,
      like: false // Ensure like is off when dislike is clicked
    }));
    onDislikeClick();
  };

  return (
    <div className="flex flex-col gap-3">
      {preHeading && <p className="w-full max-w-2xl text-lg">{preHeading}</p>}
      {heading && <h3 className="font-medium text-2xl leading-tight">{heading}</h3>}
      {greeting && (
        <p>
          Welcome to Astra, <span className="font-bold">{brandName}!</span> Capture the foundational details of your clothing collection.
        </p>
      )}
      {question && <p>{question}</p>}
      <div>
        {bodyList ? (
          <ol className="list-decimal list-inside">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        ) : (
          <div className="bg-white p-6 flex flex-col gap-6 rounded-lg w-full max-w-md">
            <ul className="flex flex-col gap-4">
              {cardItems.map((item, i) => (
                <li key={i}>
                  <div className="flex flex-col gap-2 p-2 rounded-lg bg-gray-50">
                    <h3 className="font-medium text-base leading-none">{item.title}</h3>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex gap-6 mt-2">
        <button onClick={handleSpeakerClick} className="cursor-pointer transition-colors duration-200">
          <Volume2 
            size={iconSize} 
            color={activeIcons.speaker ? activeIconColor : iconColor} 
            className={activeIcons.speaker ? "animate-pulse" : ""}
          />
        </button>
        <button onClick={handleCopyClick} className="cursor-pointer transition-colors duration-200">
          <Copy 
            size={iconSize} 
            color={activeIcons.copy ? activeIconColor : iconColor} 
          />
        </button>
        <button onClick={handleLikeClick} className="cursor-pointer transition-colors duration-200">
          <ThumbsUp 
            size={iconSize} 
            color={activeIcons.like ? activeIconColor : iconColor} 
            fill={activeIcons.like ? activeIconColor : "none"}
          />
        </button>
        <button onClick={handleDislikeClick} className="cursor-pointer transition-colors duration-200">
          <ThumbsDown 
            size={iconSize} 
            color={activeIcons.dislike ? activeIconColor : iconColor} 
            fill={activeIcons.dislike ? activeIconColor : "none"}
          />
        </button>
      </div>
    </div>
  );
}

export default AgentReply;