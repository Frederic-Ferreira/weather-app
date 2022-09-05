export default class View {
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderErrorMessage(err) {
    const html = `
    <div class="error-message">
      <p>${err}</p>
    </div>
          `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
    // ceci est un commentaire pour tester mes abilités git / github
  }
}
