// utilities
export const InternalMemory = {
  set: (name, payload) => {
    localStorage.setItem(name, JSON.stringify(payload))
  },
  get: (name) => {
    return JSON.parse(localStorage.getItem(name));
  },
  remove: (name) => {
    localStorage.removeItem(name);
  }
}