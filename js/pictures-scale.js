const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const imgPreview = document.querySelector('.img-upload__preview img');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const controlValue = document.querySelector('.scale__control--value');

const scaleImage = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  controlValue.value = `${value}%`;
};

const controlSmallerClick = () => {
  const currentValue = parseInt(controlValue.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < SCALE_MIN) {
    newValue = SCALE_MIN;
  }
  scaleImage(newValue);
};

const controlBiggerClick = () => {
  const currentValue = parseInt(controlValue.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > SCALE_MAX) {
    newValue = SCALE_MAX;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(100);

controlSmaller.addEventListener('click', controlSmallerClick);

controlBigger.addEventListener('click', controlBiggerClick);

export {resetScale};
