import './assets/css/sideBar.css';
import SidebarItem from './sideBarItem';
import { Home, StickyNote, Calendar, Layers, Flag, LifeBuoy } from "lucide-react";
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ul className="sidebar">
        <Link to='/estudiantes'>
          <SidebarItem icon={<Home size={20} color="white" />} text="Inicio" />
        </Link>
        <Link to='/material'>
          <SidebarItem icon={<StickyNote size={20} color="white" />} text="Material" />
        </Link>
        <SidebarItem icon={<Calendar size={20} />} text="Calendario" />
        <SidebarItem icon={<Layers size={20} />} text="Tabla Periodica" />
        <hr />
       
      </ul>
    </div>
  );
}

export default Sidebar;
