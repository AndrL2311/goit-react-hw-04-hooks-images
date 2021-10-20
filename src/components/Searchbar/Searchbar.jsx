import { useState } from 'react';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event =>
    setImageName(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      // console.log('Enter image name.');
      toast.error('Enter image name.');
      return;
    }

    // Проп который передается форме для вызова при сабмите
    onSubmit(imageName);
    // Сбрасываем значение input
    reset();
  };

  const reset = () => {
    setImageName('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s['SearchForm-button']}>
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          name="imageName"
          value={imageName}
          placeholder="Search images and photos"
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

// class Searchbar extends React.Component {
//   state = {
//     imageName: '',
//   };

//   handleNameChange = event => {
//     this.setState({ imageName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.imageName.trim() === '') {
//       // console.log('Enter image name.');
//       toast.error('Enter image name.');
//       return;
//     }

//     // Проп который передается форме для вызова при сабмите
//     this.props.onSubmit(this.state.imageName);
//     // Сбрасываем значение input
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ imageName: '' });
//   };

//   render() {
//     return (
//       <header className={s.Searchbar}>
//         <form className={s.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s['SearchForm-button']}>
//             <span className={s['SearchForm-button-label']}>Search</span>
//           </button>

//           <input
//             className={s['SearchForm-input']}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             name="imageName"
//             value={this.state.imageName}
//             placeholder="Search images and photos"
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
export default Searchbar;
