import React from 'react';
import { MessageSquare, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/Slice';

export function Header() {

  const handleLogout = () => {
    dispatch(logout())
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: any) => state.status)
  return !isLoggedIn ? (
    <header className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold text-white">LucidFlow</span>
        </div>
        <div className="flex space-x-4">
          <Button icon={LogIn} onClick={() => navigate('/signin')}>Sign In</Button>
          <Button icon={UserPlus} variant="primary" onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
      </div>
    </header>
  ) : (
    <>
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">LucidFlow</span>
            </div>
            <Button variant="ghost" icon={LogOut} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}