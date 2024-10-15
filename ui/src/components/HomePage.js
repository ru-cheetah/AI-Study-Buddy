import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ user }) {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <p>Welcome, {user.name}!</p>
        <button style={styles.pdfButton} onClick={() => navigate('/upload')}>
          Add or Remove PDFs
        </button>
      </div>

      <h2 style={styles.heading}>How would you like to study today?</h2>
      
      <div style={styles.boxContainer}>
        <div style={styles.box} onClick={() => handleNavigation('summary')}>
          <h3>PDF Summary</h3>
        </div>
        <div style={styles.box} onClick={() => handleNavigation('chat')}>
          <h3>Chat with PDF Genie</h3>
        </div>
        <div style={styles.box} onClick={() => handleNavigation('quiz')}>
          <h3>Take a Quiz</h3>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f7',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    marginTop: '20px',
    fontSize: '24px',
    color: '#333',
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '40px',
  },
  box: {
    width: '200px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  pdfButton: {
    padding: '10px 15px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default HomePage;
