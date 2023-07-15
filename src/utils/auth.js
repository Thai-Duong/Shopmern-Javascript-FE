export const getProfile = () => {
  const result = localStorage.getItem("user");
  return result ? JSON.parse(result) : null;
};
export const setProfile = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export function formatCurrency(currency) {
  return new Intl.NumberFormat("de-DE").format(currency);
}
