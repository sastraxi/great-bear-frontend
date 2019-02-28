import moment from 'moment';

const toMoment = (value?: string): moment.Moment | undefined => {
  if (!value) return;
  return moment(value);
};

export default toMoment;
