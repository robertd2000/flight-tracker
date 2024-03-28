export const localStorageController = {
  setItem: (k: string, v: string): void => localStorage.setItem(k, v),
  getItem: <V>(k: string): V | null => {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as V) : null;
  },
  removeItem: (k: string): void => localStorage.removeItem(k),
  removeAll: (): void => localStorage.clear(),
  checkKey: (k: string): boolean => Object.keys(localStorage).includes(k),
};
