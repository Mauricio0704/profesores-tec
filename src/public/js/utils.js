export const removeAccents = (str) => 
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
