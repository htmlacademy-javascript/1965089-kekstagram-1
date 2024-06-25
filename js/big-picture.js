import {isEscapeKey} from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const bigPictureImg = document.querySelector('.big-picture__img img');

let commentsShown = 0;
let allComments = [];

const renderPhotoDetails = ({url, description, likes}) => {
  bigPictureImg.src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const createComment = (comment) => {
  const elementComment = socialComment.cloneNode(true);
  elementComment.querySelector('.social__picture').src = comment.avatar;
  elementComment.querySelector('.social__picture').alt = comment.name;
  elementComment.querySelector('.social__text').textContent = comment.message;

  return elementComment;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0 ; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  socialComments.innerHTML = '';
  socialComments.append(fragment);
  socialCommentCount.innerHTML = `${commentsShown } из <span class="comment-count">${comments.length}</span> коментариев`;
};

const getCommentsCount = (comments) => {
  commentsShown += COMMENTS_STEP;
  if(commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  renderComments(comments);
};

commentsLoader.addEventListener('click', () => {
  getCommentsCount(allComments);
});

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsShown = 0;
  }
};

const openBigPicture = (pictureElement) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscKeydown);
  allComments = pictureElement.comments;
  getCommentsCount(pictureElement.comments);
  renderPhotoDetails(pictureElement);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  document.body.classList.remove('modal-open');
  commentsShown = 0;
};

bigPictureCloseButton.addEventListener('click', closeBigPicture);

export {openBigPicture};
