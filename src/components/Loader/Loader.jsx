import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './Loader.module.css';

function LoaderImg() {
  return (
    <div className={s.LoaderBox}>
      {
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      }
      Loading...
    </div>
  );
}

export default LoaderImg;
