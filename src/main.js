
import { createImageMarkup, updateGallery, clearGallery } from './js/render-functions.js';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('#gallery');
const loadMoreBtn = document.querySelector('#load-more');
const loader = document.querySelector('#loader');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

const lightbox = new SimpleLightbox('#gallery a', { captionsData: 'alt', captionDelay: 250 });

const handleSearch = async e => {
  e.preventDefault();
  currentQuery = e.target.query.value.trim();
  if (!currentQuery) return;

  currentPage = 1;
  clearGallery(gallery);
  loadMoreBtn.hidden = true;

  try {
    loader.hidden = false;
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length > 0) {
      const markup = createImageMarkup(data.hits);
      updateGallery(gallery, markup);
      lightbox.refresh();
      loadMoreBtn.hidden = data.hits.length < 15;
    } else {
      alert('No images found.');
    }
  } catch (error) {
    console.error(error);
  } finally {
    loader.hidden = true;
  }
};

const handleLoadMore = async () => {
  currentPage += 1;

  try {
    loader.hidden = false;
    const data = await fetchImages(currentQuery, currentPage);

    const markup = createImageMarkup(data.hits);
    updateGallery(gallery, markup);
    lightbox.refresh();

    if (currentPage * 15 >= totalHits) {
      loadMoreBtn.hidden = true;
      alert("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    loader.hidden = true;
  }
};

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);
