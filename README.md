# Image Search App

A React-based web application for searching and displaying images using the Pixabay API. Features include a search bar, image gallery with pagination, a "Load More" button, a loading spinner, and a modal for viewing large images.

## Features
- **Searchbar**: Enter keywords to search for images.
- **Image Gallery**: Displays images in a responsive grid with hover effects.
- **Load More**: Fetches additional images via pagination.
- **Loader**: Shows a spinner during API requests.
- **Modal**: Displays a large image on click, closable via ESC or overlay click.

## Project Structure
- `src/App.js`: Main component managing state and API calls.
- `src/components/`: Contains React class components and their styles in appropriate directories (`Searchbar`, `ImageGallery`, `ImageGalleryItem`, `Button`, `Loader`, `Modal`).
- `src/index.js`: Entry point for React rendering.

## Technologies
- **React**: Class-based components with lifecycle methods.
- **SCSS**: For bold, responsive styling with hover effects.
- **Pixabay API**: For image search and retrieval.
- **react-loader-spinner**: For loading animation.

## Usage
- Enter a search term in the search bar and submit.
- Browse images in the gallery; click an image to view it in a modal.
- Use the "Load More" button to fetch additional images.
- Close the modal with ESC or by clicking the overlay.