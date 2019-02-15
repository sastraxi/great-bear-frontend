import numeral from 'numeral';

const { REACT_APP_CURRENCY: CURRENCY } = process.env;

export const formatCents = (amount: number) => {
  if (!amount) {
    return numeral(0).format('0,0[.]00');
  }
  return numeral(amount / 100).format('0,0[.]00');
};

export const getIsoCurrency = () => CURRENCY || 'cad';

export const formatCurrency = (amount: number) =>
  `${formatCents(amount)} ${getIsoCurrency().toUpperCase()}`;
