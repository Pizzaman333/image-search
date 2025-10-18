import React, { Component } from 'react';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import Button from './Components/Button/Button';
import Loader from './Components/Loader/Loader';
import Modal from './Components/Modal/Modal';
import './App.scss';

const API_KEY = '49798366-add1efa312560eace02750f13'; // Replace with your actual Pixabay API key
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      const data = await response.json();
      if (data.hits) {
        this.setState((prevState) => ({
          images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
          totalHits: data.totalHits,
        }));
      } else {
        this.setState({ error: 'No images found.' });
      }
    } catch (err) {
      this.setState({ error: 'Failed to fetch images.' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = (newQuery) => {
    if (newQuery !== this.state.query) {
      this.setState({
        query: newQuery,
        page: 1,
        images: [],
        totalHits: 0,
        error: null,
      });
    }
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  openModal = (url) => {
    this.setState({ largeImageURL: url, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, error, showModal, largeImageURL, totalHits } = this.state;
    const hasMoreImages = images.length < totalHits;

    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p className="error">{error}</p>}
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && hasMoreImages && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;