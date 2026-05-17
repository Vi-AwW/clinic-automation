import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DoctorsPage from "./components/MainContent";
import DoctorDetails from './pages/DoctorDetails'; 
import ContactsPage from './pages/ContactsPage'; // Імпортуємо сторінку контактів

function HomePage() {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h2 style={{ color: '#0056b3' }}>Вітаємо в автоматизованій системі клініки!</h2>
      <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
        Тут ви можете знайти необхідного лікаря та забронювати талон онлайн. Оберіть «Лікарі» у меню, щоб переглянути каталог.
      </p>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9' }}>
        <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #0056b3', borderRadius: '50%', width: '60px', height: '60px', animation: 'spin 1s linear infinite' }} />
        <h2 style={{ color: '#0056b3', marginTop: '20px' }}>Завантаження медичної бази даних...</h2>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container" style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
        <Header />
        
        {timeLeft > 0 && (
          <div style={{ backgroundColor: '#ffc107', color: '#333', textAlign: 'center', padding: '12px', fontWeight: 'bold' }}>
            🔥 Гаряча пропозиція: Знижка 20% на комплексний чекап! До кінця акції: {timeLeft} сек
          </div>
        )}

        {/* НАВІГАЦІЯ: Напис "(Лаб 5)" успішно видалено */}
        <nav style={{ background: '#fff', padding: '12px', display: 'flex', justifyContent: 'center', gap: '25px', borderBottom: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <Link to="/" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}>Головна</Link>
          <Link to="/doctors" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}>Лікарі</Link>
          <Link to="/contacts" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' }}>Контакти</Link>
        </nav>

        <main style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            
            {/* Статичний маршрут для сторінки зворотного зв'язку */}
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;