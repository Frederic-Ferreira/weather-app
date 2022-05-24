import _ from 'lodash';

export const convertTimeFR = (unix) => {
  const date = new Date(unix * 1000);

  const hours = date.getHours();

  return `${hours} h`;
};

export const convertTimeENG = (unix) => {
  const date = new Date(unix * 1000);

  let hours = date.getHours();

  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  let strTime = hours + ' ' + ampm;

  return strTime;
};

export const getDay = (unix, lang) => {
  const date = new Date(unix * 1000);

  const day = date.getDay();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const jours = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];

  return lang === 'fr' ? jours[day] : days[day];
};

export const convertToCelsius = (temp) => {
  return _.round(Number(temp) - 273.15) + '°';
};

export const convertToFarenheit = (temp) => {
  return _.round((Number(temp - 273.15) * 9) / 5 + 32) + '°';
};

export const convertMPH = (speed) => {
  return _.round(speed * 2.24, 1) + ' mp/h';
};

export const convertKMH = (speed) => {
  return _.round(speed * 3.6, 1) + ' km/h';
};
