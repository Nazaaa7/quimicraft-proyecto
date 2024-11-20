// src/components/SidebarItem.jsx


function navarItems({  text, active }) {
  return (
    <li className={`sidebar-item ${active ? "active" : ""}`}>
      <span className="tak">{text}</span>

    </li>
  );
}

export default navarItems;