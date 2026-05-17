import React from 'react';

function Header() {
  return (
    <header className="site-header" style={{ padding: '20px', background: '#222', color: '#fff' }}>
      <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold' }}>Мій Логотип</div>
      <nav className="navigation">
        <ul style={{ display: 'flex', listStyle: 'none', gap: '20px', padding: 0 }}>
          <li><a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Головна</a></li>
          <li><a href="#catalog" style={{ color: '#fff', textDecoration: 'none' }}>Каталог</a></li>
          <li><a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>Про нас</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;