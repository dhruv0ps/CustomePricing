import { Outlet, useLocation } from 'react-router-dom';
import NavSideBar from './SideBar';
import NavBar from './Nav';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';


const Home = observer(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
 
  
  const location = useLocation();
 

  useEffect(() => {
    if (window.innerWidth < 700) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen">
    <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
    <div className="flex flex-1 overflow-hidden">
      <NavSideBar isSidebarOpen={isSidebarOpen} />
      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  </div>
  )
})

export default Home


