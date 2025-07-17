export const saveToLS = (name: string, data: string): void => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const retrieveFromLS = (name: string): string | null => {
  return localStorage.getItem(name) ?? null;
};
