import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import './ImageGallery.scss';

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="gallery">
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt={image.tags || 'Image'}
          onClick={() => onImageClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;