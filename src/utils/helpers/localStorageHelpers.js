export const getStoragedItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
export const addItemToStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};
