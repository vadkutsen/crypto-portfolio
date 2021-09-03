export default function currencyFilter(value, currency = 'PLN') {
  return new Intl.NumberFormat('en-En', {
    style: 'currency',
    currency,
  }).format(value);
}
