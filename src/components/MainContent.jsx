import React, { useState, useEffect } from 'react';

export default function MainContent() {
  // Список лікарів
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('clinic_doctors');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Коваленко Олена Миколаївна", specialty: "Педіатр", category: "Вища категорія", cabinet: "102", price: 450 },
      { id: 2, name: "Petренко Ігор Васильович", specialty: "Кардіолог", category: "Перша категорія", cabinet: "305", price: 600 },
      { id: 3, name: "Сидоренко Анна Олегівна", specialty: "Терапевт", category: "Вища категорія", cabinet: "104", price: 400 },
      { id: 4, name: "Мороз Дмитро Петрович", specialty: "Хірург", category: "Кандидат мед. наук", cabinet: "201", price: 750 }
    ];
  });

  // Список записів пацієнтів
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('clinic_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedSpecialty, setSelectedSpecialty] = useState('Всі');
  const [isAdmin, setIsAdmin] = useState(false); 
  const [activeTab, setActiveTab] = useState('doctors'); 

  // Модалка
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  // Форма адміна
  const [newDoc, setNewDoc] = useState({ name: '', specialty: 'Педіатр', category: 'Вища категорія', cabinet: '', price: '' });

  useEffect(() => {
    localStorage.setItem('clinic_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('clinic_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const specialties = ['Всі', 'Кардіолог', 'Педіатр', 'Терапевт', 'Хірург'];

  const filteredDoctors = selectedSpecialty === 'Всі' 
    ? doctors 
    : doctors.filter(doc => doc.specialty === selectedSpecialty);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !appointmentDate) return;
    setAppointments([...appointments, {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      patientName,
      patientPhone,
      date: appointmentDate
    }]);
    setIsModalOpen(false);
    setPatientName('');
    setPatientPhone('');
    setAppointmentDate('');
    alert(`Успішно! Ви записані до лікаря ${selectedDoctor.name}`);
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.cabinet || !newDoc.price) return;
    setDoctors([...doctors, { id: Date.now(), ...newDoc, price: Number(newDoc.price) }]);
    setNewDoc({ name: '', specialty: 'Педіатр', category: 'Вища категорія', cabinet: '', price: '' });
  };

  // Вбудовані стилі (Гарне синьо-біле оформлення, як на скріншоті 2)
  const styles = {
    app: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', padding: '0 0 40px 0', color: '#1e293b' },
    topNav: { backgroundColor: '#ffffff', padding: '12px 20px', display: 'flex', justifyContent: 'center', gap: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', borderBottom: '1px solid #e2e8f0' },
    navLink: { color: '#2563eb', textDecoration: 'none', fontWeight: '600', fontSize: '15px' },
    container: { maxWidth: '800px', margin: '40px auto', padding: '0 20px' },
    mainTitle: { fontSize: '32px', fontWeight: 'bold', textCombineUpright: 'center', color: '#1e293b', marginBottom: '8px', textAlign: 'center' },
    subTitle: { fontSize: '15px', color: '#64748b', marginBottom: '30px', textAlign: 'center' },
    
    filterWrap: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '35px' },
    filterBtn: (active) => ({
      padding: '8px 20px', borderRadius: '20px', border: '1px solid #2563eb', cursor: 'pointer', fontSize: '14px', fontWeight: '500', transition: 'all 0.2s',
      backgroundColor: active ? '#0056b3' : '#ffffff', color: active ? '#ffffff' : '#2563eb'
    }),

    card: { backgroundColor: '#ffffff', border: '1px solid #bee3f8', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'between', alignItems: 'center' },
    docName: { color: '#0056b3', fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0' },
    docMeta: { fontSize: '15px', margin: '4px 0', color: '#1e293b' },
    priceText: { color: '#38a169', fontWeight: 'bold', fontSize: '16px', margin: '6px 0' },
    detailsLink: { color: '#718096', fontSize: '13px', textDecoration: 'underline', cursor: 'pointer' },
    
    blueBtn: { backgroundColor: '#0056b3', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'block', marginBottom: '6px' },
    talonsText: { color: '#4a5568', fontSize: '13px', textAlign: 'center', margin: 0 },

    adminBar: { backgroundColor: '#2d3748', padding: '10px', display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' },
    adminBtn: (active) => ({ backgroundColor: active ? '#4a5568' : 'transparent', color: '#fff', border: '1px solid #4a5568', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }),

    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', itemsCenter: 'center', zIndex: 1000, padding: '20px' },
    modalBox: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', width: '100%', maxWidth: '420px', boxShdow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
    input: { width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '14px', boxSizing: 'border-box', fontSize: '14px' }
  };

  return (
    <div style={styles.app}>
      {/* Верхнє меню як на скріншоті */}
      <div style={styles.topNav}>
        <span style={styles.navLink}>Головна</span>
        <span style={styles.navLink}>Лікарі</span>
        <span style={styles.navLink}>Контакти</span>
        <button 
          onClick={() => { setIsAdmin(!isAdmin); setActiveTab('doctors'); }}
          style={{ marginLeft: 'auto', background: 'none', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
        >
          {isAdmin ? "🔴 Вийти з Адміна" : "🔒 Адмін-панель"}
        </button>
      </div>

      {/* Панель вкладок адміна */}
      {isAdmin && (
        <div style={styles.adminBar}>
          <button style={styles.adminBtn(activeTab === 'doctors')} onClick={() => setActiveTab('doctors')}>🔎 Панель Пацієнта</button>
          <button style={styles.adminBtn(activeTab === 'appointments')} onClick={() => setActiveTab('appointments')}>📋 Заявки ({appointments.length})</button>
          <button style={styles.adminBtn(activeTab === 'manage')} onClick={() => setActiveTab('manage')}>🛠️ Керування (CRUD)</button>
        </div>
      )}

      <div style={styles.container}>
        {activeTab === 'doctors' && (
          <div>
            <h1 style={styles.mainTitle}>Реєстратура — Список спеціалістів</h1>
            <p style={styles.subTitle}>Синхронізація з реальними полями моделей Laravel 11</p>

            {/* Блок гарних круглих фільтрів */}
            <div style={styles.filterWrap}>
              {specialties.map(spec => (
                <button 
                  key={spec} 
                  style={styles.filterBtn(selectedSpecialty === spec)}
                  onClick={() => setSelectedSpecialty(spec)}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Список красивих білих карток із синьою рамкою */}
            <div>
              {filteredDoctors.map(doc => (
                <div key={doc.id} style={styles.card}>
                  <div style={{ flex: 1 }}>
                    <h3 style={styles.docName}>{doc.name}</h3>
                    <div style={styles.docMeta}><strong>Спеціалізація:</strong> {doc.specialty}</div>
                    <div style={styles.docMeta}>Кабінет {doc.cabinet} | {doc.category}</div>
                    <div style={styles.priceText}>Вартість прийому: {doc.price} грн</div>
                    <span style={styles.detailsLink}>Переглянути деталі та графік</span>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginLeft: '20px' }}>
                    <button 
                      style={styles.blueBtn}
                      onClick={() => { setSelectedDoctor(doc); setIsModalOpen(true); }}
                    >
                      Записатись
                    </button>
                    <p style={styles.talonsText}>Обрано талонів: <strong>3</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Таблиця заявок для адміна */}
        {activeTab === 'appointments' && isAdmin && (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ marginBottom: '15px', fontWeight: 'bold', fontSize: '22px' }}>Журнал онлайн-записів</h2>
            {appointments.length === 0 ? <p>Заявки відсутні.</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }} border="1" cellPadding="10">
                <thead>
                  <tr style={{ backgroundColor: '#f1f5f9' }}><th>Пацієнт</th><th>Телефон</th><th>Лікар</th><th>Дата візиту</th></tr>
                </thead>
                <tbody>
                  {appointments.map(app => (
                    <tr key={app.id}><td><b>{app.patientName}</b></td><td>{app.patientPhone}</td><td>{app.doctorName}</td><td style={{ color: '#38a169', fontWeight: 'bold' }}>{app.date}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Панель CRUD для додавання та видалення лікарів */}
        {activeTab === 'manage' && isAdmin && (
          <div>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '25px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '15px' }}>➕ Додати спеціаліста в базу даних</h3>
              <form onSubmit={handleAddDoctor}>
                <input type="text" placeholder="Повне ПІБ лікаря" value={newDoc.name} onChange={e => setNewDoc({...newDoc, name: e.target.value})} style={styles.input} />
                <select value={newDoc.specialty} onChange={e => setNewDoc({...newDoc, specialty: e.target.value})} style={styles.input}>
                  <option>Педіатр</option>
                  <option>Кардіолог</option>
                  <option>Терапевт</option>
                  <option>Хірург</option>
                </select>
                <input type="text" placeholder="Номер кабінету" value={newDoc.cabinet} onChange={e => setNewDoc({...newDoc, cabinet: e.target.value})} style={styles.input} />
                <input type="number" placeholder="Вартість прийому (грн)" value={newDoc.price} onChange={e => setNewDoc({...newDoc, price: e.target.value})} style={styles.input} />
                <button type="submit" style={{ ...styles.blueBtn, width: '100%' }}>Зберегти лікаря</button>
              </form>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }} border="1" cellPadding="10">
                <thead><tr style={{ backgroundColor: '#f1f5f9' }}><th>Спеціаліст</th><th>Кабінет</th><th>Ціна</th><th>Дії</th></tr></thead>
                <tbody>
                  {doctors.map(doc => (
                    <tr key={doc.id}>
                      <td><b>{doc.name}</b><br/><small style={{ color: '#64748b' }}>{doc.specialty}</small></td>
                      <td>{doc.cabinet}</td>
                      <td>{doc.price} грн</td>
                      <td><button onClick={() => handleDeleteDoctor(doc.id)} style={{ color: '#dc2626', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Видалити</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Гарне вікно онлайн-запису */}
      {isModalOpen && selectedDoctor && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: 'bold' }}>Запис на прийом</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '14px' }}>Спеціаліст: {selectedDoctor.name}</p>
            
            <form onSubmit={handleBookingSubmit}>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Ваше ПІБ</label>
              <input type="text" required value={patientName} onChange={e => setPatientName(e.target.value)} style={styles.input} placeholder="Приклад: Шевченко А. В." />
              
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Контактний телефон</label>
              <input type="tel" required value={patientPhone} onChange={e => setPatientPhone(e.target.value)} style={styles.input} placeholder="+380" />
              
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Бажана дата і час візиту</label>
              <input type="text" required value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} placeholder="Приклад: 25.05 об 14:00" style={styles.input} />
              
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', border: '1px solid #e2e8f0' }}>
                Кабінет: <b>{selectedDoctor.cabinet}</b> | До сплати: <b style={{ color: '#38a169' }}>{selectedDoctor.price} грн</b>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ ...styles.blueBtn, backgroundColor: '#cbd5e1', color: '#1e293b', flex: 1 }}>Скасувати</button>
                <button type="submit" style={{ ...styles.blueBtn, flex: 1 }}>Записатись</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}