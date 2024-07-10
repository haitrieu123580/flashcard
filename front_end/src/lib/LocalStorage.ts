const getItem = <T = unknown>(key: string | any): T | string | null => {
  const value = window.localStorage.getItem(key);
  if (!value || value == 'undefined') return null;
  return JSON.parse(value);
};

const setItem = (key: string, value: unknown) => {
  if (value == undefined) {
    return window.localStorage.setItem(key, '');
  }
  window.localStorage.setItem(key, JSON.stringify(value));
};
const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
