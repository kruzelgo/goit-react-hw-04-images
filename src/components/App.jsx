import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import { fetchData } from './fetchData';
import './styles.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchDataAndUpdateState = async () => {
      setLoading(true);

      try {
        const { hits, totalHits } = await fetchData(query, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndUpdateState();
  }, [query, page]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setSearched(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (imageUrl, imageAlt) => {
    setSelectedImageUrl(imageUrl);
    setModalAlt(imageAlt);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <Searchbar onSubmit={handleSubmit} />
        {searched && images.length === 0 && <p>No results found</p>}
        <ImageGallery images={images} onImageClick={handleImageClick} />

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
export default App;
