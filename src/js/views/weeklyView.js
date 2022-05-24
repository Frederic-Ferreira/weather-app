import View from './View';
import {
  convertTime,
  convertMPH,
  convertKMH,
  convertToCelsius,
  convertToFarenheit,
  getDay,
} from '../helpers';

import _ from 'lodash';

class weeklyView extends View {
  _parentElement = document.getElementById('daily-container');
  _data;
  _lang;

  renderWeeklyWeather(currentWeather, lang) {
    this._data = currentWeather;
    this._lang = lang;

    this._clear();

    this._data.forEach((hour, i) => {
      const html = this._generateMarkup(hour, i, this._lang);

      this._parentElement.insertAdjacentHTML('beforeend', html);
    });
  }

  renderSpinner() {
    const html = `
    <div class="spinner-weeks">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
          `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  _generateMarkup(data, i, lang) {
    const html = `
    <div class="day">
      <h1>${getDay(data.dayName, lang)}</h1>
      <img
      src="${data.icon}"
      alt="weather-icon"
    />
    <div class="row-wrapper">
      <p>min</p>
      <p class="value">${
        lang === 'fr'
          ? convertToCelsius(data.minTemp)
          : convertToFarenheit(data.minTemp)
      }</p>
    </div>
    <div class="row-wrapper">
      <p>max</p>
      <p class="max">${
        lang === 'fr'
          ? convertToCelsius(data.maxTemp)
          : convertToFarenheit(data.maxTemp)
      }</p>
    </div>
    <div class="row-wrapper">
      <i class="bi bi-cloud-drizzle"></i>
      <p class="rain">${data.rain === '' ? '0' : data.rain}mm</p>
    </div>
    <div class="row-wrapper">
      <i class="bi bi-wind"></i>
      <p class="wind">${
        lang === 'fr' ? convertKMH(data.wind) : convertMPH(data.wind)
      }</p>
    </div>
  </div>

  ${i < this._data.length - 1 ? '<hr />' : ''}
  `;

    return html;
  }
}

export default new weeklyView();
