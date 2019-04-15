var isDow: number = 1;

var isDone: boolean = false;

var decTiteral: number[] = [1, 2, 3];
var list: Array<number> = [1, 2.5];

var x: [string, number];
x = ['hello', 20];
// console.log(x[0].substr(2))

enum Color { Red, Green, Blue = 1 }

var dcs: string = Color[1];

// console.log(dcs)

let notSure: any = 4;

// console.log(notSure.toFixed()); 

let listOne: any[] = [1, true, 'dcs', "ssss"];

console.log(listOne[1], listOne[2], listOne[0]);

function error(message: string): never {

    throw new Error(message);

}

// 接口初探

interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'size 10  object' };

// console.log(printLabel(myObj));

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {

    let newSquare = { color: 'white', area: 100 };

    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;


}

let mySquare = createSquare({color: "black"});

// console.log(mySquare)

interface Point{
    readonly x:number;
    readonly y:number;
}

let p1:Point = {x:10,y:20};
console.log(p1.x);


class Animal{
    name:string;
    constructor(theName:string) {this.name = theName;}
    move(distanceInMeters:number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }

}

class Snake extends Animal{
    constructor(name:string){super(name);}
}

// private私有的

class Person{

    protected name:string;
    constructor(name:string){this.name = name;}

}

class Employee extends Person{
    private department :string;
    constructor(name:string,department:string){
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }

}

let howard = new Employee("dcs","zx");
console.log(howard.getElevatorPitch());




let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };


function buildName(firstName:string,lastName = 'smiten'){
    
        return firstName + " love " + lastName;
   
}

let result1 = buildName("bob");
let result2 = buildName("dcs",undefined);
let result3 = buildName("bob","haha");
console.log(result1,result2,result3);


let suits = ["header","spades","clubs","diamonds"];

