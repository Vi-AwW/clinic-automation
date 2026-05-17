import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. ОБОВ'ЯЗКОВО імпортуємо Link для навігації

function DoctorCard({ doctor }) {
  // Ініціалізуємо стан значенням з LocalStorage, якщо воно там є, інакше 0
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem(`doctor_appointments_${doctor.id}`);
    return saved ? parseInt(saved, 10) : 0;
  });

  // useEffect для збереження кількості талонів у LocalStorage при кожній зміні стану
  useEffect(() => {
    localStorage.setItem(`doctor_appointments_${doctor.id}`, appointments);
  }, [appointments, doctor.id]);

  return (
    <div style={{
      border: '1px solid #0056b3',
      borderRadius: '8px',
      padding: '20px',
      margin: '15px 0',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        {/* 2. ЗМІНЕНО: тепер ім'я лікаря є клікабельним посиланням на динамічний маршрут */}
        <h3 style={{ margin: '0 0 10px 0' }}>
          <Link to={`/doctor/${doctor.id}`} style={{ color: '#0056b3', textDecoration: 'none', fontOverride: 'bold' }}>
            {doctor.name}
          </Link>
        </h3>
        
        <p style={{ margin: '5px 0' }}><strong>Спеціалізація:</strong> {doctor.spec}</p>
        <p style={{ margin: '5px 0', color: '#28a745', fontWeight: 'bold' }}>Вартість прийому: {doctor.price} грн</p>
        
        {/* 3. ДОДАНО: текстове посилання під деталі */}
        <Link to={`/doctor/${doctor.id}`} style={{ fontSize: '14px', color: '#666', textDecoration: 'underline' }}>
          Переглянути деталі та графік
        </Link>
      </div>

      <div style={{ textAlign: 'center', minWidth: '160px' }}>
        <button 
          onClick={() => setAppointments(appointments + 1)}
          style={{
            background: '#0056b3',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Записатись
        </button>
        
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#555', margin: '10px 0 0 0' }}>
          Обрано талонів: <strong style={{ color: '#0056b3', fontSize: '16px' }}>{appointments}</strong>
        </p>
      </div>
    </div>
  );
}

export default DoctorCard;