import React from 'react';
import { MessageSquare, LogIn, UserPlus } from 'lucide-react';
import { Button } from './Button';

export function Header() {
  return (
    <header className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold text-white">LucidFlow</span>
        </div>
        <div className="flex space-x-4">
          <Button icon={LogIn}>Sign In</Button>
          <Button icon={UserPlus} variant="primary">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}