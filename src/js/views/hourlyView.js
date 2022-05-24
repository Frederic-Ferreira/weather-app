import View from './View';
import {
  convertTime,
  convertMPH,
  convertKMH,
  convertToCelsius,
  convertToFarenheit,
  convertTimeFR,
  convertTimeENG,
} from '../helpers';

import _ from 'lodash';

class hourlyView extends View {
  _parentElement = document.querySelector('.hourly-weather');
  _data;
  _lang;

  renderHourlyWeather(currentWeather, lang) {
    this._data = currentWeather;
    this._lang = lang;

    this._clear();

    this._data.forEach((hour, i) => {
      if (i <= 24) {
        const html = this._generateMarkup(hour, this._lang);

        this._parentElement.insertAdjacentHTML('beforeend', html);
      }

      if (i === 24) {
        this._parentElement.lastElementChild.style.border = 'none';
      }
    });
  }

  renderSpinner() {
    const html = `
    <div class="spinner-hours">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
          `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  _generateMarkup(data, lang) {
    const html = `
    <div class="hour">
    <h2>${
      lang === 'fr'
        ? convertTimeFR(data.hourNumber)
        : convertTimeENG(data.hourNumber)
    }</h2>
    <img
      src="${data.icon}"
    />
    <h1>${
      lang === 'fr'
        ? convertToCelsius(data.temperature)
        : convertToFarenheit(data.temperature)
    }</h1>
    <div class="smaller-icons">
      <div class="column-wrapper">
        <i class="bi bi-cloud-drizzle"></i>
        <p>${data.rain === '' ? '0' : data.rain}mm</p>
      </div>
      <div class="column-wrapper">
        <i class="bi bi-wind"></i>
        <p>${
          lang === 'fr'
            ? convertKMH(data.wind)
            : convertMPH(data.wind)
        }</p>
      </div>
    </div>
  </div>
  `;

    return html;
  }
}

export default new hourlyView();
