import '@babel/polyfill';

import * as model from './model';

import mainView from './views/mainView';
import currentView from './views/currentView';
import searchView from './views/searchView';
import hourlyView from './views/hourlyView';
import weeklyView from './views/weeklyView';

const controlWeather = async () => {
  try {
    initSpinners();

    const { lat, long } = model.state.currentCity;

    await model.getCurrentWeather(lat, long);
    await model.getHourlyWeather(lat, long);
    await model.getWeeklyWeather(lat, long);

    currentView.renderCurrentWeather(
      model.state.currentWeather,
      model.state.lang
    );
    hourlyView.renderHourlyWeather(
      model.state.hourlyWeather,
      model.state.lang
    );
    weeklyView.renderWeeklyWeather(
      model.state.weeklyWeather,
      model.state.lang
    );
  } catch (err) {
    controlErrors(err);
  }
};

const controlClientCoordinates = async () => {
  try {
    await model.getClientCoordinates();

    controlWeather();
  } catch (err) {
    controlErrors(err);
  }
};

const controlInputChange = async (input) => {
  try {
    await model.getInputCityList(input);

    searchView.renderInputCityList(model.state.cityList);
  } catch (err) {
    controlErrors(err);
  }
};

const controlClientInput = async (input) => {
  try {
    await model.getInputCoordinates(input);

    controlWeather();
  } catch (err) {
    controlErrors(err);
  }
};

const controlCityList = async (index) => {
  try {
    const city = model.getCityFromList(index);

    console.log(city);

    model.updateCurrentCity(city);

    controlWeather();
  } catch (err) {
    console.log(err);
  }
};

const controlLanguage = (lang) => {
  model.setStateLang(lang);

  mainView.languageDisplay(model.state.lang);

  controlWeather();
};

const controlErrors = (err) => {
  currentView.renderErrorMessage(err);
  hourlyView.renderErrorMessage(err);
  weeklyView.renderErrorMessage(err);
};

const initSpinners = () => {
  currentView.renderSpinner();
  hourlyView.renderSpinner();
  weeklyView.renderSpinner();
};

const init = async () => {
  initSpinners();
  mainView.addHandlerLang(controlLanguage);
  currentView.addHandlerLoad(controlClientCoordinates);
  searchView.addHandlerSearchForm(controlClientInput);
  searchView.addHandlerInputChange(controlInputChange);
  searchView.addHandlerSearchList(controlCityList);
  searchView.addInputFocusEventListener();
};

init();
