import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  // const [imageName, setImageName] = useState('');

  useEffect(() => {
    const handleKeyDown = e => {
      // console.log(e.code);
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const hadleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={hadleBackDropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

export default Modal;
