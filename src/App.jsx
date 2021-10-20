import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { v4 as uuidv4 } from 'uuid';

import s from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

function App() {
  const [imageName, setImageName] = useState('');
  const [showModal, setShowmodal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const toggleModal = largeImageURL => {
    setShowmodal(!showModal);
    setLargeImageURL(largeImageURL);
  };

  const formSubmitHandler = imageName => {
    setImageName(imageName);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery imageName={imageName} toggleModal={toggleModal} />
      <ToastContainer autoClose={3000} theme={'colored'} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img
            src={largeImageURL}
            alt={largeImageURL}
            className={s.modalImage}
          />
        </Modal>
      )}
    </div>
  );
}

// class App extends React.Component {
//   state = {
//     imageName: '',
//     showModal: false,
//     largeImageURL: '',
//   };

//   toggleModal = largeImageURL => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//       largeImageURL: largeImageURL,
//     }));
//   };

//   formSubmitHandler = imageName => {
//     this.setState({ imageName });
//   };

//   render() {
//     return (
//       <div className={s.App}>
//         <Searchbar onSubmit={this.formSubmitHandler} />
//         <ImageGallery
//           imageName={this.state.imageName}
//           toggleModal={this.toggleModal}
//         />
//         <ToastContainer autoClose={3000} theme={'colored'} />
//         {this.state.showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img
//               src={this.state.largeImageURL}
//               alt={this.state.largeImageURL}
//               className={s.modalImage}
//             />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

export default App;
