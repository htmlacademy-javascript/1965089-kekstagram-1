import {renderThumbnails} from './pictures.js';
import './pictures.js';
import './big-picture.js';
import './form.js';
import './pictures-scale.js';
import './pictures-effects.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {closeModal, onFormSubmit, showFullSuccessMessage, showFullErrorMessage} from './form.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showFullSuccessMessage();
  } catch {
    showFullErrorMessage();
  }
});

try {
  const data = await getData();
  renderThumbnails(data);
} catch (err) {
  showAlert(err.message);
}
