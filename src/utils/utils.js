export const removeSpecialCharacter = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );
export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i,${id}`;
};
export function formatCurrency(currency) {
  return new Intl.NumberFormat("de-DE").format(currency);
}
export const getIdFormNameId = (nameId) => {
  const arr = nameId.split("-i,");
  return arr[arr.length - 1];
};
export const getStringtoYear = (date) => {
  const d = new Date(date);
  return d.getFullYear();
};
