const internalMemory = {
    set: (name,value) => {
        localStorage.setItem(name,JSON.stringify(value));
    },
    get: (name) => {
       return JSON.parse(localStorage.getItem(name)); 
    },
    remove: (name) => {
        localStorage.removeItem(name);
    }
}

export default internalMemory;