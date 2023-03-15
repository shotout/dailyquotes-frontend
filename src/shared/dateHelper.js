import moment from 'moment';

export const dateToUnix = date => moment(date).unix();
export const unixToDate = date => moment.unix(date).format('YYYY-MM-DD HH:ss');

export const getFutureDate = date =>
  moment().add(date, 'days').format('YYYY-MM-DD');
export const secondToMinutes = duration => {
  const padSecond = number => (number < 10 ? '0' : '') + number;
  if (duration) {
    const minutes = duration / 60;
    const second = duration % 60;
    return `${minutes === 0 ? '00' : padSecond(Math.floor(minutes))}${
      second === 0 ? ':00' : `:${padSecond(Math.floor(second))}`
    }`;
  }
  return null;
};

export const parseTimerHoursFormat = (duration, hideNull) => {
  const padSecond = number => (number < 10 ? '0' : '') + number;
  if (duration) {
    const hours = Math.floor(Number(duration / 3600));
    const minutes = (duration % 3600) / 60;
    const second = duration % 60;
    if (hideNull) {
      return `${hours < 1 ? '' : hours}${
        minutes < 1 ? '00' : `${padSecond(Math.floor(minutes))}`
      }${second === 0 ? ':00' : `:${padSecond(Math.floor(second))}`}`;
    }
    return `${hours < 1 ? '00' : hours}${
      minutes < 1 ? ':00' : `:${padSecond(Math.floor(minutes))}`
    }${second === 0 ? ':00' : `:${padSecond(Math.floor(second))}`}`;
  }
  return null;
};

export const normalizeNumber = total => {
  if (parseInt(total) < 10) {
    return `0${total}`;
  }
  return total;
};

export const reformatDate = valueDate => {
  if (valueDate) {
    const formatYears = moment(valueDate).format('YYYY');
    const formatMonth = moment(valueDate).format('MM');
    const formatDay = moment(valueDate).format('DD');
    const formatHours = moment(valueDate).format('HH');
    const minutes = moment(valueDate).format('mm');
    return new Date(
      formatYears,
      formatMonth - 1,
      formatDay,
      formatHours,
      minutes,
      30,
      0,
    );
  }
  return new Date();
};

export const convertLocalTimeToUTC = time =>
  moment.utc(time).format('YYYY-MM-DD HH:mm');

export const convertUTCToLocalTime = utcTime => {
  const offsetTime = moment().utcOffset();
  return moment
    .utc(utcTime)
    .utcOffset(offsetTime)
    .format('YYYY-MM-DD HH:mm:ss');
};
