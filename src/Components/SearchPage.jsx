import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;

function SearchPage() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const searchImages = async () => {
    if (!query.trim()) {
      setError('Please enter a search term.');
      return;
    }

    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch images.');
      }

      const data = await response.json();

      if (data.hits.length === 0) {
        setError('No results found.');
        setImages([]);
      } else {
        setImages(data.hits);
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Try again later.');
    }
  };

  const handleEdit = (imageUrl) => {
    navigate('/edit', { state: { imageUrl } });
  };

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
      <h1>Image Search or Upload</h1>

      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          value={query}
          placeholder="Search for images (e.g. nature, dogs, city)..."
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '0.5rem', width: '50%', fontSize: '1rem' }}
        />
        <button onClick={searchImages} style={{ padding: '0.5rem 1rem' }}>
          Search
        </button>

        <label style={{ background: '#28a745', color: '#fff', padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Upload Image
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}
      >
        {images.map((image) => (
          <div key={image.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              style={{ width: '100%', height: 'auto' }}
            />
            <button
              onClick={() => handleEdit(image.largeImageURL)}
              style={{
                marginTop: '10px',
                padding: '0.5rem',
                width: '100%',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add Captions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
