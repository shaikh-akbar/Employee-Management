import React, { useState, useEffect } from 'react';
import { PiStudentDuotone } from 'react-icons/pi';
import axios from 'axios';


function Main() {
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employee/getAllEmployee');
        setEmployeeCount(response.data.length); 
      } catch (error) {
        console.error('Error fetching employee count:', error);
      }
    };

    fetchEmployeeCount();
  }, []);

 

  return (
    <div className='pt-6 px-6 bg-[#F8F9FC]'>
      <div className='flex flex-col md:flex-row items-center justify-between'>
        <h1 className='text-[#5a5c69] text-2xl leading-7 font-normal cursor-pointer'>Dashboard</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-4'>
        <div className='h-24 rounded-lg bg-white border-l-4 border-[#4E73DF] flex items-center justify-between px-6 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-in-out'>
          <div>
            <h2 className='text-[#4E73DF] text-xs leading-4 font-bold'>Total (Employee)</h2>
            <h1 className='text-xl leading-6 font-bold text-[#4E73DF] mt-1'>{employeeCount}</h1>
          </div>
          <PiStudentDuotone fontSize={28} color='' />
        </div>
       
      </div>
      
    </div>
  );
}

export default Main;
