import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DoctorCard from './components/DoctorCard';

function App() {
  // Стан для екрану завантаження та таймера акції
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60); // Таймер на 60 секунд

  const doctorsData = [
    { id: 1, name: 'Коваленко Олег Петрович', spec: 'Кардіолог (Професор)', price: 600 },
    { id: 2, name: 'Шевченко Олена Ігорівна', spec: 'Педіатр (Вища категорія)', price: 450 },
    { id: 3, name: 'Мельник Дмитро Сергійович', spec: 'Хірург', price: 700 },
    { id: 4, name: 'Дмитренко Анна Віталіївна', spec: 'Невропатолог', price: 550 }
  ];

  // Ефект 1: Реалізація стану "Завантаження" (імітація завантаження БД протягом 2 секунд)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer); // Очищення таймера
  }, []);

  // Ефект 2: Акційний банер із таймером зворотного відліку (оновлюється кожну секунду)
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval); // Очищення інтервалу при розмонтуванні
  }, [timeLeft]);

  // Якщо працює isLoading — показуємо Spinner (індикатор завантаження)
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f9' }}>
        <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #0056b3', borderRadius: '50%', width: '60px', height: '60px', animation: 'spin 1s linear infinite' }} />
        <h2 style={{ color: '#0056b3', marginTop: '20px' }}>Завантаження медичної бази даних...</h2>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
      <Header />
      
      {/* Завдання: Акційний банер з таймером */}
      {timeLeft > 0 && (
        <div style={{ backgroundColor: '#ffc107', color: '#333', textAlign: 'center', padding: '12px', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          🔥 Гаряча пропозиція: Знижка 20% на комплексний чекап здоров'я! До кінця акції залишилось: 
          <span style={{ color: '#dc3545', marginLeft: '5px', fontSize: '18px' }}>{timeLeft} сек</span>
        </div>
      )}

      <main style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '10px' }}>
          Автоматизація роботи платної поліклініки
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Електронна реєстратура з підтримкою синхронізації сесії пацієнта
        </p>
        
        <div className="doctors-list">
          {doctorsData.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;