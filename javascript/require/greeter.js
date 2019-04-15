var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var isDow = 1;
var isDone = false;
var decTiteral = [1, 2, 3];
var list = [1, 2.5];
var x;
x = ['hello', 20];
// console.log(x[0].substr(2))
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 1] = "Blue";
})(Color || (Color = {}));
var dcs = Color[1];
// console.log(dcs)
var notSure = 4;
// console.log(notSure.toFixed()); 
var listOne = [1, true, 'dcs', "ssss"];
console.log(listOne[1], listOne[2], listOne[0]);
function error(message) {
    throw new Error(message);
}
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: 'size 10  object' };
function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var p1 = { x: 10, y: 20 };
console.log(p1.x);
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    return Snake;
}(Animal));
// private私有的
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department + ".";
    };
    return Employee;
}(Person));
var howard = new Employee("dcs", "zx");
console.log(howard.getElevatorPitch());
var myAdd = function (x, y) { return x + y; };
function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = 'smiten'; }
    return firstName + " love " + lastName;
}
var result1 = buildName("bob");
var result2 = buildName("dcs", undefined);
var result3 = buildName("bob", "haha");
console.log(result1, result2, result3);
var suits = ["header", "spades", "clubs", "diamonds"];
