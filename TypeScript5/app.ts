interface Vehicle {
  make: string;
  model: string;
  year: number;
  start: () => void;
}

// class Car implements Vehicle {
//     make: string;
//     model: string;
//     year: number;
//     constructor(make: string, model: string, year: number) {
//         this.make = make;
//         this.model = model;
//         this.year = year;
//     }
//     start() {
//         console.log("Engine started");
//     }
// }

// let myCar:Vehicle = new Car("Chevy", "Camaro", 2020);
// myCar.start()

// ! Another way to implement the above code
class Car implements Vehicle {
  constructor(public make: string, public model: string, public year: number) {}

  start() {
    console.log("Engine started");
  }
}

let myCar: Vehicle = new Car("Chevy", "Camaro", 2020);
myCar.start();
