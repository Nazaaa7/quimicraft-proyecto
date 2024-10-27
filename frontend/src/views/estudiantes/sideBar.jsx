import './assets/css/sideBar.css';
import SidebarItem from './sideBarItem';
import { Home, StickyNote, Calendar, Layers, Flag, LifeBuoy } from "lucide-react";
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ul className="sidebar">
        <Link className='text' to='/estudiantes'>
          <SidebarItem icon={<Home size={20} color="white" />} text="Inicio" />
        </Link>
        <Link className='text' to='/material'>
          <SidebarItem icon={<StickyNote size={20} color="white" />} text="Material" />
        </Link>
        <Link className='text' to='/calendar'>
          <SidebarItem icon={<Calendar size={20} color="white" />} text="Calendario" />
        </Link>       
         <SidebarItem icon={<Layers size={20} />} text="Tabla Periodica" />
        <hr />
       
      </ul>
    </div>
  );
}

export default Sidebar;
