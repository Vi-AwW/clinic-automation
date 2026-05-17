import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DoctorCard from './components/DoctorCard';

function App() {
  // Завдання: Створити масив об'єктів (Дані для нашої поліклініки)
  const doctorsData = [
    { id: 1, name: 'Коваленко Олег Петрович', spec: 'Кардіолог (Професор)', price: 600 },
    { id: 2, name: 'Шевченко Олена Ігорівна', spec: 'Педіатр (Вища категорія)', price: 450 },
    { id: 3, name: 'Мельник Дмитро Сергійович', spec: 'Хірург', price: 700 },
    { id: 4, name: 'Дмитренко Анна Віталіївна', spec: 'Невропатолог', price: 550 }
  ];

  return (
    <div className="app-container" style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
      <Header />
      
      <main style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '10px' }}>
          Автоматизація роботи платної поліклініки
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Електронна реєстратура: демонстрація роботи з Props та State у React
        </p>
        
        <div className="doctors-list">
          {/* Завдання: Вивести список усіх елементів за допомогою методу .map() */}
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