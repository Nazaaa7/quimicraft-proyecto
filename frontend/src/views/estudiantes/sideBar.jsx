import './assets/css/sideBar.css';
import SidebarItem from './sideBarItem';
import { Home, StickyNote, Calendar, Layers, Flag, LifeBuoy } from "lucide-react";
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ul className="sidebar">
        <Link to='/estudiantes'>
          <SidebarItem icon={<Home size={20} color="white" />} text="Home" />
        </Link>
        <Link to='/projects'>
          <SidebarItem icon={<StickyNote size={20} color="white" />} text="Projects" />
        </Link>
        <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
        <SidebarItem icon={<Layers size={20} />} text="Tabla Periodica" />
        <hr />
        <SidebarItem icon={<Flag size={20} />} text="Reporting" />
        <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
      </ul>
    </div>
  );
}

export default Sidebar;
