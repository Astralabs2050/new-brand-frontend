// MessageInput.tsx
import React, { useState, useRef } from 'react';

interface MessageInputProps {
  onSend: (message: string, files: File[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  placeholder = 'Type your response...',
  disabled = false
}) => {
  const [message, setMessage] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...filesArray]);
      
      // Optional: You could add file previews here
    }
  };

  const handleSend = () => {
    if (message.trim() || selectedFiles.length > 0) {
      onSend(message, selectedFiles);
      setMessage('');
      setSelectedFiles([]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className=" max-w-4xl rounded-2xl border border-gray-200 bg-white px-4 py-3 h-[144px] w-[774px]">
      <div className="flex  h-full items-end">
        {/* Text Input */}
        <textarea
          
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className="flex-1 h-full outline-none text-base text-gray-700"
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        
        <div className="flex gap-2 ml-2">
          {/* Attach Button */}
          <button
            onClick={handleAttach}
            type="button"
            className="rounded-full w-[105px] px-4 py-2 border border-gray-300 text-gray-700 flex items-center gap-1 hover:bg-gray-50"
            disabled={disabled}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Attach
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,.pdf,.doc,.docx,.xlsx"
              className="hidden"
              disabled={disabled}
            />
          </button>
          
          {/* Send Button */}
          <button
            onClick={handleSend}
            type="button"
            className={`rounded-full w-[105px] px-4 py-2 bg-black text-white flex items-center gap-1 ${
              (message.trim() === '' && selectedFiles.length === 0) || disabled
                ? 'opacity-75 cursor-not-allowed'
                : 'hover:bg-gray-900'
            }`}
            disabled={(message.trim() === '' && selectedFiles.length === 0) || disabled}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Send
          </button>
        </div>
      </div>
      
      {/* Optional: File preview section */}
      {selectedFiles.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="bg-gray-100 rounded px-2 py-1 text-sm flex items-center">
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  const newFiles = [...selectedFiles];
                  newFiles.splice(index, 1);
                  setSelectedFiles(newFiles);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageInput;