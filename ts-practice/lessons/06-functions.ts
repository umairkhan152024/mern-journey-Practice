// Lesson 6: functions with typed parameters and return types

// Parameters get types, and the type after the brackets is the return type
function add(a: number, b: number): number {
  return a + b;
}

// A function that returns a string
function greet(name: string): string {
  return "Hello, " + name;
}

// void means the function returns nothing
function logMessage(message: string): void {
  console.log(message);
}

// Reference solution: write your own version in index.ts first
function multiply(a: number, b: number): number {
  return a * b;
}

console.log(add(5, 10));
console.log(greet("Umair"));
logMessage("TypeScript is working");
console.log(multiply(4, 5));

// Mini-test 1 (deliberate error, commented out): string passed where number is expected
// add(5, "10");

// Mini-test 2 (deliberate error, commented out): missing argument
// greet();

// Mini-test 3 (deliberate error, commented out): promises number but returns string
// function broken(a: number): number {
//   return "result";
// }
