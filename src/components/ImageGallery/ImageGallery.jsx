import React from 'react';

import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import fetchImages from '../../services/images-api';
import LoaderImg from '../Loader/Loader';

class ImageGallery extends React.Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: null,
    loadMoreBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImageName = prevProps.imageName;
    const nextImageName = this.props.imageName;

    if (prevImageName !== nextImageName) {
      this.setState({ status: 'pending', page: 1, images: [] });

      fetchImages(nextImageName, this.state.page)
        .then(images => {
          this.showBtn(images);
          this.setState({ images, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });

      fetchImages(nextImageName, this.state.page)
        .then(images => {
          this.showBtn(images);
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...images],
              status: 'resolved',
            };
          });
        })
        .then(() => {
          return window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  showBtn = images => {
    images.length < 12
      ? this.setState({ loadMoreBtn: false })
      : this.setState({ loadMoreBtn: true });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, error, status, loadMoreBtn } = this.state;

    if (status === 'idle') {
      return <div className={s.text}>Enter image name.</div>;
    }

    if (status === 'pending') {
      return <LoaderImg />;
    }

    if (status === 'rejected') {
      return <div className={s.text}>{error.message}</div>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery}>
            {images.map((image, index) => (
              <ImageGalleryItem
                key={index}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                toggleModal={this.props.toggleModal}
              />
            ))}
          </ul>
          {loadMoreBtn && <Button onLoadMore={this.onLoadMore} />}
        </>
      );
    }
  }
}

export default ImageGallery;
