import React from 'react';
import { MessageSquare, Clock, Trash2 } from 'lucide-react';
import { Button } from './Button';

interface ConversationCardProps {
  title: string;
  lastMessage?: string;
  createdAt?: string;
  messageCount?: number;
  onDelete: () => void;
  onClick: () => void;
}

export function ConversationCard({
  title,
  lastMessage="",
  createdAt="",
  messageCount=0,
  onDelete,
  onClick,
}: ConversationCardProps) {
  return (
    <div 
      className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <Button
          variant="ghost"
          icon={Trash2}
          onClick={(e: any) => {
            e.stopPropagation();
            onDelete();
          }}
          styles="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400"
        />
      </div>
      
      {lastMessage && (
        <p className="text-gray-400 mb-4 line-clamp-2">
          {lastMessage}
        </p>
      )}
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{createdAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <span>{messageCount} messages</span>
        </div>
      </div>
    </div>
  );
}