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
var Car = /** @class */ (function () {
    function Car(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    Car.prototype.start = function () {
        console.log("Engine started");
    };
    return Car;
}());
var myCar = new Car("Chevy", "Camaro", 2020);
myCar.start();
