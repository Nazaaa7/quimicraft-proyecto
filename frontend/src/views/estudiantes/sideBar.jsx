import './assets/css/sideBar.css';
import SidebarItem from './sideBarItem';
import { Home, StickyNote, Calendar, Atom, Layers } from "lucide-react";
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
      <ul className="sidebar">
        <Link className='tak' to='/estudiantes'>
          <SidebarItem icon={<Home size={20} color="white" />} text="Inicio" />
        </Link>
        <Link className='tak' to='/material'>
          <SidebarItem icon={<StickyNote size={20} color="white" />} text="Material" />
        </Link>
        <Link className='tak' to='/foroList'>
        <SidebarItem icon={<Layers size={20} color='white' textDecoration={null} />} text="Foro" />
        </Link>  
        <Link className='tak' to='/calendar'>
          <SidebarItem icon={<Calendar size={20} color="white" />} text="Calendario" />
        </Link>
        <Link  className='tak' to='/periodicTable'>
        <SidebarItem icon={<Atom size={20} color='white' textDecoration={null} />} text="Tabla Periodica" />
        </Link>       
        <hr />
       
      </ul>
  );
}

export default Sidebar;
