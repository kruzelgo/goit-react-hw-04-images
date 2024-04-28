import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import fetchData from './fetchData';
import './styles.css';

const perPage = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchDataFromApi = async () => {
      setLoading(true);
      try {
        const data = await fetchData(query, page);
        const { hits, totalHits } = data;

        const newImages = hits.filter(newImage =>
          images.every(existingImage => existingImage.id !== newImage.id)
        );

        setImages(prevImages => [...prevImages, ...newImages]);
        setLoadMore(page < Math.ceil(totalHits / perPage));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, [query, page, images]);

  const handleSubmit = useCallback(query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const handleImageClick = useCallback((imageUrl, imageAlt) => {
    setSelectedImageUrl(imageUrl);
    setModalAlt(imageAlt);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div
      style={{
        // height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery onImageClick={handleImageClick} />

        {loadMore && <Button onLoadMore={handleLoadMore} loading={loading} />}
        {showModal && (
          <Modal
            imageUrl={selectedImageUrl}
            alt={modalAlt || 'Image'}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

// export default App;
