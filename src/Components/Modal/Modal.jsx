import React, { useEffect } from 'react';
import './Modal.scss';

function Modal({ largeImageURL, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]); // effect only re-runs if onClose changes

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
}

export default Modal;

// import React, { Component } from 'react';
// import './Modal.scss';

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = (e) => {
//     if (e.key === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { largeImageURL } = this.props;
//     return (
//       <div className="overlay" onClick={this.handleOverlayClick}>
//         <div className="modal">
//           <img src={largeImageURL} alt="" />
//         </div>
//       </div>
//     );
//   }
// }

// export default Modal;