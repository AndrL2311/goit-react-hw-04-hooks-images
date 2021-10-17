const API_KEY = '22969928-aad90fecb00099c81964f1030';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(imageName, page) {
  const url = `${BASE_URL}?key=${API_KEY}&per_page=12&page=${page}&q=${imageName}&image_type=photo`;
  return fetch(url)
    .then(res => {
      // console.log(res);
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error('Something went wrong '));
    })
    .then(res => {
      if (res.hits.length === 0) {
        return Promise.reject(
          new Error(
            'No images with this name were found. Please enter a different name. ',
          ),
        );
      }
      // console.log(res.hits.length);
      return res.hits;
    });
}

export default fetchImages;
