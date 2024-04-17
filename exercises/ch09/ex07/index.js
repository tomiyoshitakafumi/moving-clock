//機能の委任?
class Eating {
    eat() {
    }
}

class MakeSounding {
    makeSound() {
    }

}

class Dog {
    constructor() {
        this.eat = new Eating();
        this.makeSound = new MakeSounding();
    }
}

class Husky {
    constructor() {
        this.eat = new Eating();
        this.makeSound = new MakeSounding();
    }
}

class Cat {
    constructor() {
        this.eat = new Eating();
        this.makeSound = new MakeSounding();
    }

    scratch() {
    }
}

class Bird {
    constructor() {
        this.eat = new Eating();
        this.makeSound = new MakeSounding();
    }

    fly() {
    }
}

class Fish {
    constructor() {
        this.eat = new Eating();
    }

    swim() {
    }
}