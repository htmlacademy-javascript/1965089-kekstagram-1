const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
let pictures = [];

const renderThumbnails = (thumbnails) => {
  thumbnails.forEach(({url, likes, comments,id}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.id = id;
    fragment.appendChild(pictureElement);
  });
  pictureList.appendChild(fragment);
  pictures = thumbnails;
};

export {renderThumbnails, pictures};
