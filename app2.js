class A {
  constructor(name) {
    this.name = name;
  }

  printInfo = () => {
    console.log(this.age, this.name);
  }
}

class B extends A {
  constructor(age, name) {
    // Esegue il costruttore della classe estesa
    // (costruttore di A)
    super(name);
    this.age = age;
  }
}

const person = new B(20, 'Alessandro');

person.printInfo();