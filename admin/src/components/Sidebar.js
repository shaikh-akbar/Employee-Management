import React, { useState } from 'react';
import { FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentDuotone } from 'react-icons/pi';
import { MdClass } from 'react-icons/md';
import {Link } from 'react-router-dom'

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex'>
            <div className={`bg-[#4E73DF] h-screen fixed z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:relative`}>
                <div className='px-[25px]'>
                    <div className='px-[15px] py-[30px] flex items-center justify-between border-b-[1px] border-[#EDEDED]/[0.3]'>
                        <h1 className='text-white font-extrabold text-[20px] leading-[24px] cursor-pointer'>Admin </h1>
                        <button onClick={toggleSidebar} className='lg:hidden'>
                            <FaTimes color='black'  />
                        </button>
                    </div>
                    <div >
                    <Link to='/' className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                    <FaTachometerAlt color='white' />
                        <p className='text-white text-[14px] leading-[20px] font-bold'>Dashboard</p>
                    </Link>
                        
                    </div>
                    <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                        <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'>INTERFACE</p>
                        <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                            <div >
                                <Link to='/employee' className='flex items-center gap-[10px]'>
                                <GiTeacher color='white' />
                                <p className='text-[14px] leading-[20px] font-normal text-white'>Employee</p>
                                </Link>
                               
                            </div>
                        </div>
                        {/* <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                            <div >
                            <Link to='/student' className='flex items-center gap-[10px]'>
                                <PiStudentDuotone color='white' />
                                <p className='text-[14px] leading-[20px] font-normal text-white'>Students</p>
                            </Link>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                            <div >
                            <Link to='/class' className='flex items-center gap-[10px]'>
                                <MdClass color='white' />
                                <p className='text-[14px] leading-[20px] font-normal text-white'>Class</p>
                            </Link>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                            <div >
                            <Link to='/ClassAnalytics/:id' className='flex items-center gap-[10px]'>
                                <MdClass color='white' />
                                <p className='text-[14px] leading-[20px] font-normal text-white'>Analytics</p>
                            </Link>
                            </div>
                        </div> */}
                        {/* <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                            <div >
                            <Link to='/expense-income-analytics' className='flex items-center gap-[10px]'>
                                <MdClass color='white' />
                                <p className='text-[14px] leading-[20px] font-normal text-white'>Expensive Income Analytics</p>
                            </Link>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className='flex-1 lg:hidden'>
                <button onClick={toggleSidebar} className='p-4'>
                    <FaBars color='black' />
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
