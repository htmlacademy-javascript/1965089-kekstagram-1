const MIN_ID = 1;
const MAX_ID = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATAR_NUMBER = 6;
const PICTURE_COUNT = 25;
const COMMENTS_COUNT = 25;

const DESCRIPTION = [
  'Закат на фото',
  'Дорога на фото',
  'Животные на фото',
  'Рассвет на фото',
  'Котики на фото',
  'Растения на фото',
  'Природа на фото',
];

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Василий',
  'Арсений',
  'Егор',
  'Дмитрий',
  'Артём',
  'Михаил',
  'Матвей',
  'Александр',
  'Ян',
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//comments, массив объектов — список комментариев, позже войдёт в состав createPictures последним свойством
const createComments = () => ({
  id: createRandomIdFromRangeGenerator(1, 200)(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(COMMENTS_MESSAGE),
  name: getRandomArrayElement(NAMES),
});
createComments();

//создаю массив из 25 createComments:
const createArrayComments = Array.from({length: COMMENTS_COUNT}, createComments);

//создаю основной массив
const createPictures = () => ({
  id: createRandomIdFromRangeGenerator(MIN_ID, MAX_ID)(),
  url: `photos/${createRandomIdFromRangeGenerator(MIN_ID, MAX_ID)()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: getRandomArrayElement(createArrayComments),
});

//создаю массив из 25 createPictures:
const createArrayPictures = () => Array.from({length: PICTURE_COUNT}, createPictures);
createArrayPictures();
