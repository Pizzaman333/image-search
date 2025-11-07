import React, { useState, useEffect, useCallback } from 'react';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import Loader from './Components/Loader/Loader';
import Modal from './Components/Modal/Modal';
import './App.scss';

const API_KEY = '49798366-add1efa312560eace02750f13';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

function App() {
  // state
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null); 

      try {
        const response = await fetch(
          `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
          setImages((prevImages) =>
            page === 1 ? data.hits : [...prevImages, ...data.hits]
          );
          setTotalHits(data.totalHits);
        } else if (page === 1) {
          setError('No images found.');
          setImages([]); 
          setTotalHits(0);
        }
        
      } catch (err) {
        setError(err.message || 'Failed to fetch images.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]); 

  const handleSubmit = useCallback((newQuery) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);       
      setImages([]);    
      setTotalHits(0);  
      setError(null);   
    }
  }, [query]); // only re-create this function if query changes

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []); // function is created once and never changes
 
  const openModal = useCallback((url) => {
    setLargeImageURL(url);
    setShowModal(true);
  }, []); // function is created once and never changes
 
  const closeModal = useCallback(() => {
    setShowModal(false);
    setLargeImageURL('');
  }, []); // function is created once and never changes
 
  const hasMoreImages = images.length < totalHits;

  return (
    <div className="app">
      <Searchbar onSubmit={handleSubmit} />
      
      {error && <p className="error">{error}</p>}
      
      <ImageGallery images={images} onImageClick={openModal} />
      
      {isLoading && <Loader />}
      
      {images.length > 0 && !isLoading && hasMoreImages && (
        <Button onClick={handleLoadMore} />
      )}
      
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;

// import React, { Component } from 'react';
// import Searchbar from './Components/Searchbar/Searchbar';
// import ImageGallery from './Components/ImageGallery/ImageGallery';
// import Button from './Components/Button/Button';
// import Loader from './Components/Loader/Loader';
// import Modal from './Components/Modal/Modal';
// import './App.scss';

// const API_KEY = '49798366-add1efa312560eace02750f13'; 
// const BASE_URL = 'https://pixabay.com/api/';
// const PER_PAGE = 12;

// class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     page: 1,
//     isLoading: false,
//     error: null,
//     showModal: false,
//     largeImageURL: '',
//     totalHits: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.fetchImages();
//     }
//   }

//   fetchImages = async () => {
//     const { query, page } = this.state;
//     this.setState({ isLoading: true });
//     try {
//       const response = await fetch(
//         `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
//       );
//       const data = await response.json();
//       if (data.hits) {
//         this.setState((prevState) => ({
//           images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
//           totalHits: data.totalHits,
//         }));
//       } else {
//         this.setState({ error: 'No images found.' });
//       }
//     } catch (err) {
//       this.setState({ error: 'Failed to fetch images.' });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleSubmit = (newQuery) => {
//     if (newQuery !== this.state.query) {
//       this.setState({
//         query: newQuery,
//         page: 1,
//         images: [],
//         totalHits: 0,
//         error: null,
//       });
//     }
//   };

//   handleLoadMore = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   openModal = (url) => {
//     this.setState({ largeImageURL: url, showModal: true });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false, largeImageURL: '' });
//   };

//   render() {
//     const { images, isLoading, error, showModal, largeImageURL, totalHits } = this.state;
//     const hasMoreImages = images.length < totalHits;

//     return (
//       <div className="app">
//         <Searchbar onSubmit={this.handleSubmit} />
//         {error && <p className="error">{error}</p>}
//         <ImageGallery images={images} onImageClick={this.openModal} />
//         {isLoading && <Loader />}
//         {images.length > 0 && !isLoading && hasMoreImages && (
//           <Button onClick={this.handleLoadMore} />
//         )}
//         {showModal && (
//           <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
//         )}
//       </div>
//     );
//   }
// }

// export default App;