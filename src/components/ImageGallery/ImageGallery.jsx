import { useState, useEffect } from 'react';

import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import fetchImages from '../../services/images-api';
import LoaderImg from '../Loader/Loader';

function ImageGallery({ imageName, toggleModal }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    setPage(1);
    setStatus('pending');

    fetchImages(imageName, 1)
      .then(images => {
        showBtn(images);
        setImages(images);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imageName]);

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    if (page > 1) {
      setStatus('pending');

      fetchImages(imageName, page)
        .then(images => {
          showBtn(images);
          setImages(prevImages => [...prevImages, ...images]);
          setStatus('resolved');
        })
        .then(() => {
          return window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const showBtn = images => {
    images.length < 12 ? setLoadMoreBtn(false) : setLoadMoreBtn(true);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
              toggleModal={toggleModal}
            />
          ))}
        </ul>
        {loadMoreBtn && <Button onLoadMore={onLoadMore} />}
      </>
    );
  }
}

// class ImageGallery extends React.Component {
//   state = {
//     images: [],
//     page: 1,
//     status: 'idle',
//     error: null,
//     loadMoreBtn: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevImageName = prevProps.imageName;
//     const nextImageName = this.props.imageName;

//     if (prevImageName !== nextImageName) {
//       this.setState({ page: 1, status: 'pending', images: [] });

//       fetchImages(nextImageName, 1)
//         .then(images => {
//           this.showBtn(images);
//           this.setState({ images, status: 'resolved' });
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }

//     if (prevState.page < this.state.page) {
//       this.setState({ status: 'pending' });

//       fetchImages(nextImageName, this.state.page)
//         .then(images => {
//           this.showBtn(images);
//           this.setState(prevState => {
//             return {
//               images: [...prevState.images, ...images],
//               status: 'resolved',
//             };
//           });
//         })
//         .then(() => {
//           return window.scrollTo({
//             top: document.documentElement.scrollHeight,
//             behavior: 'smooth',
//           });
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   showBtn = images => {
//     images.length < 12
//       ? this.setState({ loadMoreBtn: false })
//       : this.setState({ loadMoreBtn: true });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };

//   render() {
//     const { images, error, status, loadMoreBtn } = this.state;

//     if (status === 'idle') {
//       return <div className={s.text}>Enter image name.</div>;
//     }

//     if (status === 'pending') {
//       return <LoaderImg />;
//     }

//     if (status === 'rejected') {
//       return <div className={s.text}>{error.message}</div>;
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <ul className={s.ImageGallery}>
//             {images.map((image, index) => (
//               <ImageGalleryItem
//                 key={index}
//                 webformatURL={image.webformatURL}
//                 largeImageURL={image.largeImageURL}
//                 toggleModal={this.props.toggleModal}
//               />
//             ))}
//           </ul>
//           {loadMoreBtn && <Button onLoadMore={this.onLoadMore} />}
//         </>
//       );
//     }
//   }
// }

export default ImageGallery;
