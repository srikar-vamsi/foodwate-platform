import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Leaf } from 'lucide-react';
import { Button } from './ui/Button';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex flex-shrink-0 items-center gap-2">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">EcoServe</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  <span className="text-xs text-emerald-600 font-semibold">{user.role.replace('ROLE_', '')}</span>
                </div>
                <Button variant="outline" onClick={handleLogout} className="flex gap-2 items-center text-sm py-1.5 px-3">
                  <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login"><Button variant="outline">Sign In</Button></Link>
                <Link to="/register"><Button>Sign Up</Button></Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
