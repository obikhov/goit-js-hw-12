import axios from 'axios';

const API_KEY = '47470900-b8e0eef515806370832377144';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export const fetchImages = async (query, page) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  };

  const { data } = await axios.get(BASE_URL, { params });
  return data;
};
