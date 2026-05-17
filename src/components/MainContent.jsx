import React from 'react';

function MainContent() {
  return (
    <main className="main-content" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <h1 className="welcome-title" style={{ color: '#0056b3' }}>
        ІС «Автоматизація роботи платної поліклініки»
      </h1>
      <p className="welcome-text" style={{ fontSize: '18px', lineHeight: '1.6', maxWidth: '800px' }}>
        Ласкаво просимо до інформаційної системи керування медичним центром. 
        Цей модульний фронтенд-інтерфейс розроблено на React + Vite для забезпечення 
        швидкого доступу пацієнтів до онлайн-запису, перегляду розкладу лікарів та керування електронними картками.
      </p>
      
      <div className="features-preview" style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', flex: 1 }}>
          <h3>Реєстратура</h3>
          <p>Електронний запис на прийом та онлайн-розклад спеціалістів.</p>
        </div>
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', flex: 1 }}>
          <h3>Кабінет пацієнта</h3>
          <p>Доступ до історії хвороб, рецептів та результатів аналізів.</p>
        </div>
      </div>
    </main>
  );
}

export default MainContent;