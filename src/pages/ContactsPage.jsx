import React, { useState } from 'react';

function ContactsPage() {
  // Завдання: керовані інпути (controlled inputs) для кожного поля
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Стан для збереження помилок валідації
  const [errors, setErrors] = useState({});
  // Стан для успішного повідомлення про відправку
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Функція обробки відправки форми
  const handleSubmit = (e) => {
    e.preventDefault(); // Скасовуємо перезавантаження сторінки
    
    let currentErrors = {};

    // Валідація імені
    if (!name.trim()) {
      currentErrors.name = "Будь ласка, вкажіть ваше ім'я.";
    }

    // Завдання: валідація Email (має містити "@")
    if (!email.includes('@')) {
      currentErrors.email = "Email обов'язково має містити символ '@'.";
    }

    // Завдання: валідація повідомлення (не коротше 10 символів)
    if (message.length < 10) {
      currentErrors.message = "Повідомлення має містити не менше 10 символів.";
    }

    // Якщо є помилки — записуємо їх у стан і зупиняємо відправку
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setIsSubmitted(false);
    } else {
      // Якщо все правильно — очищаємо помилки та показуємо успіх
      setErrors({});
      setIsSubmitted(true);
      // Очищаємо поля форми
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#0056b3', textAlign: 'center' }}>Зворотний зв'язок з адміністрацією</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        Залиште ваше звернення, і ми відповімо вам найближчим часом.
      </p>

      {isSubmitted && (
        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
          Thank you! Ваше звернення успішно надіслано адміністратору клініки.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Поле: Ім'я */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Ваше ім'я:</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: errors.name ? '2px solid #dc3545' : '1px solid #ccc' }}
          />
          {/* Завдання: виведення попередження про помилки червоним кольором */}
          {errors.name && <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.name}</span>}
        </div>

        {/* Поле: Email */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Електронна пошта (Email):</label>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: errors.email ? '2px solid #dc3545' : '1px solid #ccc' }}
          />
          {errors.email && <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.email}</span>}
        </div>

        {/* Поле: Повідомлення */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Текст звернення:</label>
          <textarea 
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: errors.message ? '2px solid #dc3545' : '1px solid #ccc', resize: 'vertical' }}
          />
          {errors.message && <span style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.message}</span>}
        </div>

        <button 
          type="submit"
          style={{ background: '#0056b3', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}
        >
          Надіслати повідомлення
        </button>

      </form>
    </div>
  );
}

export default ContactsPage;