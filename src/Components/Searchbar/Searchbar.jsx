import React, { useState } from 'react';
import './Searchbar.scss';

function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue) {
      onSubmit(trimmedValue); 
      setInputValue('');   
    }
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <span className="button-label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;

// import React, { Component } from 'react';
// import './Searchbar.scss';

// class Searchbar extends Component {
//   state = {
//     inputValue: '',
//   };

//   handleChange = (e) => {
//     this.setState({ inputValue: e.target.value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     if (this.state.inputValue.trim()) {
//       this.props.onSubmit(this.state.inputValue.trim());
//       this.setState({ inputValue: '' });
//     }
//   };

//   render() {
//     return (
//       <header className="searchbar">
//         <form className="form" onSubmit={this.handleSubmit}>
//           <button type="submit" className="button">
//             <span className="button-label">Search</span>
//           </button>
//           <input
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.inputValue}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;