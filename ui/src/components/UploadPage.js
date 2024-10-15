import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

function UploadPage({ user }) {
  const navigate = useNavigate();
  const { getRootProps, getInputProps } = useDropzone({ accept: '.pdf' });

  const handleUploadComplete = () => {
    // Handle PDF upload completion logic here (e.g., storing PDF)
    navigate('/home'); // Redirect to Home Page
  };

  return (
    <div style={styles.container}>
      <h2>Hello {user.name}!</h2>
      <p>Please upload your study materials (Max 5 PDFs)</p>
      <div {...getRootProps({ style: styles.dropzone })}>
        <input {...getInputProps()} />
        <p>Drag & drop PDFs here, or click to select files</p>
      </div>
      <button onClick={handleUploadComplete} style={styles.uploadButton}>
        Complete Upload
      </button>
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
  dropzone: {
    width: '400px',
    height: '200px',
    borderWidth: '2px',
    borderRadius: '5px',
    borderColor: '#cccccc',
    borderStyle: 'dashed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  uploadButton: {
    marginTop: '20px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default UploadPage;
