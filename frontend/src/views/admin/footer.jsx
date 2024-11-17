// Footer.js
import React from 'react';
import './assets/footer.css'; // Import a CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} QuimiCraft. All rights reserved.</p>
      
      </div>
    </footer>
  );
}

export default Footer;
