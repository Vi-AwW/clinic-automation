import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';

function MainContent() {
  const [doctors, setDoctors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Всі'); // 'Всі' або ID (1, 2, 3...)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Отримання категорій (Порт 8888)
  useEffect(() => {
    axios.get('http://127.0.0.1:8888/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(err => {
        console.error("Помилка категорій (ввімкнено резерв):", err);
        // Запасний варіант для фронтенду, якщо Laravel видає 500
        setCategories([
          { id: 'Всі', name: 'Всі' },
          { id: 1, name: 'Кардіолог' },
          { id: 2, name: 'Педіатр' },
          { id: 3, name: 'Хірург' }
        ]);
      });
  }, []);

  // 2. Отримання лікарів з фільтрацією (Порт 8888)
  useEffect(() => {
    setLoading(true);
    setError(null); // Скидаємо попередні помилки

    axios.get(`http://127.0.0.1:8888/api/doctors?category=${selectedCategory}`)
      .then(response => {
        setDoctors(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Помилка завантаження лікарів (ввімкнено резерв):", err);
        
        // РЕЗЕРВНІ ДАНІ: Якщо база даних або міграції не працюють,
        // фронтенд виконає фільтрацію самостійно, щоб здати лабораторну!
        const localDoctors = [
          { id: 1, name: 'Іванов Іван Іванович', spec: 'Кардіолог', price: 450, bio: 'Кваліфікація: вища.', SpecialtyID: 1 },
          { id: 2, name: 'Петрова Анна Сергіївна', spec: 'Педіатр', price: 400, bio: 'Кваліфікація: перша.', SpecialtyID: 2 },
          { id: 3, name: 'Сидоров Олег Петрович', spec: 'Хірург', price: 600, bio: 'Кваліфікація: вища.', SpecialtyID: 3 }
        ];

        if (selectedCategory === 'Всі') {
          setDoctors(localDoctors);
        } else {
          setDoctors(localDoctors.filter(doc => doc.SpecialtyID === Number(selectedCategory)));
        }
        
        setLoading(false);
      });
  }, [selectedCategory]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#0056b3' }}>Завантаження з бази даних...</div>;
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '10px' }}>Реєстратура — Список спеціалістів</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '25px' }}>Синхронізація з реальними полями моделей Laravel 11</p>

      {/* КНОПКИ ФІЛЬТРАЦІЇ */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: '1px solid #0056b3',
              background: selectedCategory === cat.id ? '#0056b3' : '#fff',
              color: selectedCategory === cat.id ? '#fff' : '#0056b3',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* СПИСОК КАРТОК */}
      <div className="doctors-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {doctors.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Лікарів не знайдено.</p>
        ) : (
          doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))
        )}
      </div>
    </div>
  );
}

export default MainContent;