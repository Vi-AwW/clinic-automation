import React, { useState } from 'react';

// Компонент приймає дані про лікаря через props
function DoctorCard({ doctor }) {
  // Хук useState для лічильника кількості обраних талонів
  const [appointments, setAppointments] = useState(0);

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
        <h3 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>{doctor.name}</h3>
        <p style={{ margin: '5px 0' }}><strong>Спеціалізація:</strong> {doctor.spec}</p>
        <p style={{ margin: '5px 0', color: '#28a745', fontWeight: 'bold' }}>Вартість прийому: {doctor.price} грн</p>
      </div>

      <div style={{ textAlign: 'center', minWidth: '160px' }}>
        {/* Кнопка "Купити" (у нас - Записатись), яка змінює стан (State) */}
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
        
        {/* Виведення лічильника кількості примірників */}
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#555', margin: '10px 0 0 0' }}>
          Обрано талонів: <strong style={{ color: '#0056b3', fontSize: '16px' }}>{appointments}</strong>
        </p>
      </div>
    </div>
  );
}

export default DoctorCard;