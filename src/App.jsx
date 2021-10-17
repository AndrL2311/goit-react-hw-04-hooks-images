import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { v4 as uuidv4 } from 'uuid';

import s from './App.module.css';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

class App extends React.Component {
  state = {
    imageName: '',
    showModal: false,
    largeImageURL: '',
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }));
  };

  formSubmitHandler = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery
          imageName={this.state.imageName}
          toggleModal={this.toggleModal}
        />
        <ToastContainer autoClose={3000} theme={'colored'} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              src={this.state.largeImageURL}
              alt={this.state.largeImageURL}
              className={s.modalImage}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
