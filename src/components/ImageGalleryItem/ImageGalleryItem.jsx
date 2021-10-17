import s from './ImageGalleryItem.module.css';

function ImageGalleryItem({ webformatURL, toggleModal, largeImageURL }) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={webformatURL}
        onClick={() => toggleModal(largeImageURL)}
        className={s['ImageGalleryItem-image']}
      />
    </li>
  );
}

export default ImageGalleryItem;
