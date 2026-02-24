const greetSimple = () => console.log("Hello Umair!");

const greet = (name) => console.log(`Hello ${name}!`);

const addSalary = (base, bonus) => base + bonus;

greetSimple();
greet("Umair");
console.log(`Total salary: ${addSalary(25000, 5000)} HKD`);
