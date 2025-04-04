import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  //@ts-ignore
  icon?: LucideIcon;
  onClick?: () => void;
  styles?: any
}

export function Button({ children, variant = 'ghost', icon: Icon, onClick, styles }: ButtonProps) {
  const baseStyles = "px-4 py-2 transition-colors flex items-center gap-2";
  const variants = {
    primary: "bg-blue-500 text-white rounded-lg hover:bg-blue-600",
    ghost: "text-white hover:text-blue-400"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${styles}`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </button>
  );
}