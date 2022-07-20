import View from './View';

const checkbox = document.getElementById('checkbox');

const input = document.querySelector('input');
const siteTitle = document.getElementById('site-title');
const label = document.getElementById('label');
const hoursTitle = document.getElementById('title-hours');
const weeksTitle = document.getElementById('title-days');
const footer = document.querySelector('footer');

class mainView extends View {
  addHandlerLang(handler) {
    checkbox.addEventListener('change', (e) => {
      const check = e.target.checked;

      const lang = check === false ? 'fr' : 'eng';

      handler(lang);
    });
  }

  languageDisplay(lang) {
    const fr = lang === 'fr';

    input.placeholder = fr
      ? 'Entrez un nom de ville ...'
      : 'Enter city name ...';

    siteTitle.textContent = fr ? 'Météo' : 'Weather';

    label.textContent = fr ? 'Rechercher' : 'Search';

    hoursTitle.textContent = fr ? "Aujourd'hui" : 'Today';

    weeksTitle.textContent = fr ? 'Cette semaine' : 'This week';

    footer.textContent = fr
      ? 'Copyright ©2022 - Créé par FREɄD'
      : 'Copyright ©2022 - Created by FREɄD';
  }
}

export default new mainView();
