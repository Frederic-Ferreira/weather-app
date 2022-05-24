import View from './View';
import {
  convertMPH,
  convertKMH,
  convertToCelsius,
  convertToFarenheit,
  convertTimeFR,
  convertTimeENG,
} from '../helpers';

import _ from 'lodash';

class currentView extends View {
  _parentElement = document.querySelector('.now-weather');
  _data;
  _lang;

  renderCurrentWeather(currentWeather, lang) {
    this._data = currentWeather;
    this._lang = lang;

    const html = this._generateMarkup(this._data, this._lang);

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }

  renderSpinner() {
    const html = `
    <div class="spinner-current">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
          `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  _generateMarkup(data, lang) {
    const html = `
    <img
    src="${data.icon}"
    alt="weather-icon"
  />
  <div class="main-infos">
    <span class="titles">
      <h1>${data.city}</h1>
      <h2>${
        lang === 'fr'
          ? convertToCelsius(data.temperature)
          : convertToFarenheit(data.temperature)
      }</h2>
    </span>
    <h3>${_.capitalize(data.description)}</h3>
    <span class="rise-set">
      <div class="column-wrapper">
      <i class="bi bi-sunrise"></i>
        <p class="value">${
          lang === 'fr'
            ? convertTimeFR(data.sunrise)
            : convertTimeENG(data.sunrise)
        }</p>
      </div>
      <div class="column-wrapper">
      <i class="bi bi-sunset-fill"></i>
        <p class="value">${
          lang === 'fr'
            ? convertTimeFR(data.sunset)
            : convertTimeENG(data.sunset)
        }</p>
      </div>
    </span>
  </div>
  <div class="second-categories">
    <div class="column-wrapper">
      <i class="bi bi-cloud-drizzle"></i>
      <p>${data.rain === '' ? '0' : data.rain}mm</p>
    </div>
    <div class="column-wrapper">
      <i class="bi bi-droplet"></i>
      <p>${data.humidity}%</p>
    </div>
    <div class="column-wrapper">
      <i class="bi bi-wind"></i>
      <p>${
        lang === 'fr' ? convertKMH(data.wind) : convertMPH(data.wind)
      }</p>
    </div>
    <div class="column-wrapper">
      <p class="icon">Feels</p>
      <p>${
        lang === 'fr'
          ? convertToCelsius(data.feels)
          : convertToFarenheit(data.feels)
      }</p>
    </div>
  </div>
  `;

    return html;
  }
}

export default new currentView();
