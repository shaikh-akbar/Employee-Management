import React from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="flex">
      <div className='basis-[12%] h-[100vh]'>
        <Sidebar />
      </div>
      <div className='basis-[88%] border'>
        <DashboardView />
        <div>
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
