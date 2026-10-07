// Lesson 5: naming a reusable shape with interface
interface Developer {
  name: string;
  age: number;
  isFounder: boolean;
}

let dev1: Developer = { name: "Umair", age: 32, isFounder: true };
let dev2: Developer = { name: "Ali", age: 28, isFounder: false };

console.log(dev1.name, dev2.name);

// Mini-test (deliberate error, commented out): isFounder is missing
// let dev3: Developer = { name: "Sara", age: 25 };
