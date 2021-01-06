const oneMinute = 60000;
const oneHour = 3600000;
const oneDay = 86400000;

export const convertToUnit = (value, unit) => {
  let newValue = 0;
  if (value === 0) {
    newValue = '';
  } else if (unit === 'Minutes') {
    newValue = value / oneMinute;
  } else if (unit === 'Hours') {
    newValue = value / oneHour;
  } else if (unit === 'Days') {
    newValue = value / oneDay;
  }
  return newValue;
};

export const convertToMilliseconds = (value, unit) => {
  let newValue = 0;
  if (value === '') {
    newValue = 0;
  } else if (unit === 'Minutes') {
    newValue = value * oneMinute;
  } else if (unit === 'Hours') {
    newValue = value * oneHour;
  } else if (unit === 'Days') {
    newValue = value * oneDay;
  }
  return newValue;
};

export const timeTo12HrFormat = (hour, minute) => {
  let tempHour = hour;
  let meridiem = 'AM';
  if (hour >= 12) {
    meridiem = 'PM';
    if (hour > 12) {
      tempHour -= 12;
    }
  }
  return `${tempHour}:${minute === 0 ? '00' : minute} ${meridiem}`;
};
