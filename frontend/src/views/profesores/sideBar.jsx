import { Link } from 'react-router-dom';
import { Home, StickyNote, Calendar, Atom, Layers } from "lucide-react";
import React from 'react';

function Sidebar() {
  const sidebarItems = [
    { 
      icon: <Home size={20} />, 
      text: "Inicio", 
      to: '/profesores' 
    },
    { 
      icon: <StickyNote size={20} />, 
      text: "Material", 
      to: '/subject' 
    },
    { 
      icon: <Layers size={20} />, 
      text: "Foro", 
      to: '/foroList' 
    }
  ];

  return (
    <div className="bg-green-100 w-68 h-full min-h-screen py-8 px-4 shadow-md">
      <nav className="space-y-2">
        {sidebarItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.to} 
            className="block hover:bg-green-100 rounded-lg transition duration-300 ease-in-out no-underline" // Aquí agregamos no-underline
          >
            <div className="flex items-center space-x-3 p-3 text-green-700 hover:text-green-900">
              {React.cloneElement(item.icon, { 
                className: "text-green-600 mr-3" 
              })}
              <span className="font-medium">{item.text}</span>
            </div>
          </Link>
        ))}
        <hr className="border-green-200 my-4" />
      </nav>
    </div>
  );
}

export default Sidebar;
