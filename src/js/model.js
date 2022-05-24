import { weatherKEY } from './config';

export const state = {
  cityList: [],
  currentCity: {},
  currentWeather: {},
  hourlyWeather: [],
  weeklyWeather: [],
  lang: 'fr',
};

export const setStateLang = (choice) => {
  state.lang = choice;
};

export const getClientCoordinates = async () => {
  await new Promise((resolve, reject) => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(successRes, errorRes);
    else {
      throw Error(
        lang
          ? 'Votre navigateur ne supporte pas le servir de géolocalisation, rechercher une météo dans la barre de recherche'
          : 'Your navigator does not support geolocation, please enter a city name'
      );
    }

    function successRes(position) {
      state.currentCity = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      resolve();
    }

    function errorRes(err) {
      const lang = state.lang === 'fr';

      if (err.code == 1) {
        reject(
          lang
            ? 'Veuillez autoriser votre navigateur à accéder à votre position, ou faites une recherche.'
            : 'Please, allow your browser to access your position or search a specific city name.'
        );
      } else if (err.code == 2) {
        reject(
          lang
            ? 'Le réseau ne fonctionne pas, ou on ne peut pas accéder au service de position.'
            : "The network is down or the positioning service can't be reached."
        );
      } else if (err.code == 3) {
        reject(
          lang
            ? 'Le timer a atteint son maximum avant de pouvoir récupérer les données de position'
            : 'The attempt timed out before it could get the location data.'
        );
      } else {
        reject(
          lang
            ? 'La géolocalisation a échouée pour une raison inconnue'
            : 'Geolocation failed due to unknown error.'
        );
      }
    }
  });
};

export const getInputCityList = async (input) => {
  const lang = state.lang === 'fr';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${weatherKEY}`
    );

    if (!response.ok)
      throw Error(
        lang
          ? 'Le serveur météo a des problèmes, réessayez plus tard ...'
          : 'Something went wrong with the server, please try again ...'
      );

    const data = await response.json();

    state.cityList = [];

    data.forEach((city) => {
      const obj = {
        country: city.country,
        name: city.name,
        lat: city.lat,
        long: city.lon,
      };

      state.cityList.push(obj);
    });
  } catch (err) {
    throw lang
      ? 'Le serveur météo a des problèmes techniques, réessayez plus tard ...'
      : 'Something went wrong with the server, please try again ...';
  }
};

export const getCityFromList = (index) => {
  return state.cityList[index];
};

export const updateCurrentCity = (data) => {
  state.currentCity = {
    name: data.name,
    lat: data.lat,
    long: data.long,
  };
};

export const getInputCoordinates = async (input) => {
  const lang = state.lang === 'fr';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${weatherKEY}`
    );

    if (!response.ok)
      throw Error(
        lang
          ? 'Le serveur météo a des problèmes, réessayez plus tard ...'
          : 'Something went wrong with the server, please try again ...'
      );

    const data = await response.json();

    state.currentCity = {
      name: data[0].name,
      lat: data[0].lat,
      long: data[0].lon,
    };
  } catch (err) {
    throw lang
      ? 'Le serveur météo a des problèmes techniques, réessayez plus tard ...'
      : 'Something went wrong with the server, please try again ...';
  }
};

export const getCurrentWeather = async (lat, long) => {
  const lang = state.lang === 'fr';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherKEY}&lang=${state.lang}`
    );

    if (!response.ok)
      throw Error(
        lang
          ? 'Le serveur météo a des problèmes techniques, réessayez plus tard ...'
          : 'Something went wrong with the server, please try again ...'
      );

    const data = await response.json();

    state.currentWeather = {
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      temperature: data.main.temp,
      feels: data.main.feels_like,
      humidity: data.main.humidity,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      wind: data.wind.speed,
      rain: data.rain === undefined ? '' : data.rain['1h'],
      snow: data.snow === undefined ? '' : data.snow['1h'],
      time: data.dt,
      city: data.name,
    };
  } catch {
    throw lang
      ? 'Le serveur météo a des problèmes techniques, réessayez plus tard ...'
      : 'Something went wrong with the server, please try again ...';
  }
};

export const getHourlyWeather = async (lat, long) => {
  const lang = state.lang === 'fr';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts,current,daily&appid=${weatherKEY}&lang=${state.lang}`
    );

    if (!response.ok)
      throw Error(
        lang
          ? 'Le serveur météo a des problèmes techniques, réessayez plus tard ...'
          : 'Something went wrong with the server, please try again ...'
      );

    const { hourly } = await response.json();

    state.hourlyWeather = [];

    hourly.forEach((hour) => {
      const obj = {
        hourNumber: hour.dt,
        icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@4x.png`,
        temperature: hour.temp,
        rain: hour.rain === undefined ? '' : hour.rain['1h'],
        snow: hour.snow === undefined ? '' : hour.snow['1h'],
        wind: hour.wind_speed,
      };
      state.hourlyWeather.push(obj);
    });
  } catch {
    throw lang
      ? 'Le serveur météo a des problèmes techniques, réessayez plus tard ...'
      : 'Something went wrong with the server, please try again ...';
  }
};

export const getWeeklyWeather = async (lat, long) => {
  const lang = state.lang === 'fr';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,current,alerts&appid=${weatherKEY}&lang=${state.lang}`
    );

    if (!response.ok)
      throw Error(
        lang
          ? 'Le serveur météo a des problèmes techniques, réessayez plus tard ...'
          : 'Something went wrong with the server, please try again ...'
      );

    const { daily } = await response.json();

    state.weeklyWeather = [];

    daily.forEach((day, i) => {
      if (i !== 0) {
        const obj = {
          dayName: day.dt,
          icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`,
          minTemp: day.temp.min,
          maxTemp: day.temp.max,
          rain: day.rain === undefined ? '' : day.rain,
          snow: day.snow === undefined ? '' : day.snow,
          wind: day.wind_speed,
        };
        state.weeklyWeather.push(obj);
      }
    });
  } catch {
    throw lang
      ? 'Le serveur météo a des problèmes techniques, réessayez plus tard ...'
      : 'Something went wrong with the server, please try again ...';
  }
};
