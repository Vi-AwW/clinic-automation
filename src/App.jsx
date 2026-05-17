import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container" style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;