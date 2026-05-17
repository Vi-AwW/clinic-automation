import React from 'react';
import { useParams, Link } from 'react-router-dom';

function DoctorDetails() {
  // Зчитуємо динамічний id з адреси (у нашому випадку це буде 1)
  const { id } = useParams();

  // Наша база даних лікарів
  const doctorsData = [
    { id: 1, name: 'Коваленко Олег Петрович', spec: 'Кардіолог (Професор)', price: 600, bio: 'Спеціаліст із лікування серцево-судинних захворювань з 15-річним досвідом.', room: 'Кабінет №302' },
    { id: 2, name: 'Шевченко Олена Ігорівна', spec: 'Педіатр (Вища категорія)', price: 450, bio: 'Турботливий лікар для ваших дітей. Експерт із профілактики дитячих хвороб.', room: 'Кабінет №105' },
    { id: 3, name: 'Мельник Дмитро Сергійович', spec: 'Хірург', price: 700, bio: 'Провідний хірург клініки. Проводить планові консультації та малоінвазивні операції.', room: 'Кабінет №411' },
    { id: 4, name: 'Дмитренко Анна Віталіївна', spec: 'Невропатолог', price: 550, bio: 'Діагностика та лікування розладів нервової системи, головного болю та безсоння.', room: 'Кабінет №215' }
  ];

  // Шукаємо лікаря за ID
  const doctor = doctorsData.find(doc => doc.id === parseInt(id, 10));

  if (!doctor) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Спеціаліста не знайдено</h2>
        <Link to="/doctors">Повернутися до списку</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/doctors" style={{ color: '#0056b3', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
        ← Назад до списку лікарів
      </Link>
      <div style={{ padding: '30px', border: '2px solid #0056b3', borderRadius: '12px', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#0056b3', marginTop: 0 }}>{doctor.name}</h2>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#555' }}>{doctor.spec}</p>
        <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '15px 0' }} />
        <p>{doctor.bio}</p>
        <p><strong>Розміщення:</strong> {doctor.room}</p>
        <p style={{ color: '#28a745', fontWeight: 'bold', fontSize: '18px' }}>Вартість прийому: {doctor.price} грн</p>
      </div>
    </div>
  );
}

export default DoctorDetails;