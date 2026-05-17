import React from 'react';

function Footer() {
  return (
    <footer className="site-footer" style={{ padding: '20px', background: '#333', color: '#ccc', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} Усі права захищено. Лабораторна робота на React.</p>
    </footer>
  );
}

export default Footer;