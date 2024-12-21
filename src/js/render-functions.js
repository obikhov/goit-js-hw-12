export const createImageMarkup = images => {
    return images
      .map(
        img => `
          <a href="${img.largeImageURL}">
            <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
          </a>
        `
      )
      .join('');
  };
  
  export const updateGallery = (gallery, markup) => {
    gallery.insertAdjacentHTML('beforeend', markup);
  };
  
  export const clearGallery = gallery => {
    gallery.innerHTML = '';
  };
  