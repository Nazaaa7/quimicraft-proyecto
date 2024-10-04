// src/components/SidebarItem.jsx
import "./assets/css/SidebarItem.css"; // Estilos específicos para cada ítem


function SidebarItem({ icon, text, active }) {
  return (
    <li className={`sidebar-item ${active ? "active" : ""}`}>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>

    </li>
  );
}

export default SidebarItem;