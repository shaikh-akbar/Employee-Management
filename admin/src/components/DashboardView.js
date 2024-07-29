import React from 'react';
import { FaSearch, FaRegBell, FaEnvelope,FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from './AuthContext'; // Adjust import path if needed
import { useNavigate } from 'react-router-dom';


function DashboardView() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout(); // Clear user session and token
        navigate('/login'); // Redirect to login page
      };

  return (
    <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px]'>
      <div className='flex items-center rounded-[5px] costomclass'>
        <input
          type='text'
          className='bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal'
          placeholder='Search For..'
        />
        <div className='bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
          <FaSearch color='white' />
        </div>
      </div>
      <div className='flex items-center gap-[15px] relative'>
        <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
          <FaRegBell />
          <FaEnvelope />
        </div>
        <div className='flex items-center gap-[15px] relative'>
        {user && <p className='text-lg font-medium'>{user.firstName || 'User'}</p>} {/* Display user name */}
        <button
          onClick={handleLogout}
          className='flex items-center gap-[5px] text-red-600 hover:text-red-800'
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
      </div>
    </div>
  );
}

export default DashboardView;
