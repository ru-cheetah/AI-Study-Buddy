import React from 'react';

function PDFSummary() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>PDF Summary</h2>
      <select style={styles.dropdown}>
        <option>Select a PDF</option>
        {/* Add options dynamically based on uploaded PDFs */}
      </select>
      <textarea style={styles.textBox} placeholder="Summary will appear here..." />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f7',
  },
  title: {
    marginBottom: '20px',
  },
  dropdown: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
  },
  textBox: {
    width: '400px',
    height: '200px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
};

export default PDFSummary;
