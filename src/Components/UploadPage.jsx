import React from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      navigate('/edit', { state: { imageUrl: reader.result } });
    };

    if (file) reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Select an Image to Edit</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

export default UploadPage;
