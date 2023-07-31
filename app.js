/* 
  Oggetto con fuzionalità:
    - constructor
    - getter
    - setter
*/
class Person {
  // Rendiamo privato
  #_info;
  // Funzione constructor
  constructor(firstName, lastName) {
    // Operazioni preliminari
    this.firstName = firstName;
    this.lastName = lastName;
    // ???
    this.#_info = {
      history: [],
      currentValue: null,
      currentVersion: Person.initialVersion
    };
    this._value = {}
  }

  // Accessibili senza inizializzare classe
  // non creiamo il context, non abbiamo accesso al this perché accediamo a metodi e parametri statici senza inizializzare la classe
  static age = 20;
  static initialVersion = 0;

  static getAge = () => {
    console.log(this.firstName);
  }

  static toString = (value) => {
    return value.toString();
  }

  // Modo per settare variabili che non vanno all'interno del context

  // Richiesta dati
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
  get value() {
    return this._value;
  }
  get info() {
    return this.#_info.currentValue;
  }

  // Settaggio dati
  set info(value) {
    const info = {
      version: this.#_info.currentVersion+=1,
      value: value
    }
    this.#_info.history.push(info);
    this.#_info.currentValue = value;
    this.#_info.currentVersion = info.version;
  }
  set value(value) {
    console.log('Value setted');
    this._value = value;
  }

  // Metodo privato
  #printInfo = () => {
    console.log(this.firstName + ' ' + this.lastName);
  }

  // Metodi
  getVersionValue = (version) => {
    const result = this.#_info.history.find((item, index) => {
      // 2 => 1 = false
      // 2 => 2 = true (stop)
      return item.version == version;
    }); 

    return result != null ? result.value : null;
  }
  getCurrentVersion = () => {
    console.log(this.#_info.currentVersion);
  }
  setValue = (value) => {
    this.info = value;
    return this;
  }
  getValue = () => {
    console.log(this.#_info.currentValue);
  }
}

Person.initialVersion = 2;

const person = new Person('Nicola', 'Marcì');

// person.printInfo();
// console.log(person.fullName);
person.info = 'Nico';
// console.log(person.info);
person.info = 'Andrea';
// console.log(person.info);
person.info = 'Massimo';
// console.log(person.info);
person.info = 'Miriana';

// person._info.history.push({
//   version: 12,
//   value: 'Miriana'
// })


// person.getCurrentVersion();

// person.setValue('Monica').getValue().setValue('Luca').getValue();

person.value.age = 12;
console.log(person.value);