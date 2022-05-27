import View from './View';

class searchView extends View {
  _parentElement = document.getElementById('city');
  _search = document.querySelector('.bi-search');
  _data;

  _getInput() {
    const input = this._parentElement.value;
    this._clearInput();
    return input;
  }

  _clearInput() {
    this._parentElement.value = '';
  }

  _clearCityList() {
    this._parentElement.closest(
      'form'
    ).nextElementSibling.firstElementChild.innerHTML = '';
  }

  renderInputCityList(data) {
    this._data = data;

    this._clearCityList();

    const list =
      this._parentElement.closest('form').nextElementSibling
        .firstElementChild;

    this._data.forEach((city, i) => {
      const html = this._generateMarkup(city, i);

      list.insertAdjacentHTML('beforeend', html);

      if (i === this._data.length - 1)
        list.lastElementChild.lastElementChild.style.border = 'none';
    });
  }

  addHandlerInputChange(handler) {
    this._parentElement
      .closest('form')
      .addEventListener('input', () => {
        if (this._parentElement.value === '')
          return this._clearCityList();

        handler(this._parentElement.value);
      });
  }

  addInputFocusEventListener() {
    const evts = ['focusin', 'focusout'];

    evts.forEach((evt) => {
      this._parentElement
        .closest('form')
        .addEventListener(evt, () => {
          const dropdown =
            this._parentElement.closest('form').nextElementSibling;
          dropdown.classList.toggle('hidden');
        });
    });
  }

  addHandlerSearchList(handler) {
    document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('li')) return;

      const { index } = e.target.dataset;

      this._clearInput();

      this._clearCityList();

      handler(Number(index));
    });
  }

  addHandlerSearchForm(handler) {
    const passInputHandler = () => {
      if (this._parentElement.value === '') return;

      const input = this._getInput();
      handler(input);
    };

    this._parentElement
      .closest('form')
      .addEventListener('submit', function (e) {
        e.preventDefault();

        passInputHandler();
      });

    this._search.addEventListener('click', passInputHandler);
  }

  _generateMarkup(data, i) {
    const html = `
    <li class="li" data-index="${i}">
        <p class="li" data-index="${i}">${data.name}, ${data.country}</p>
      </li>
`;

    return html;
  }
}

export default new searchView();
