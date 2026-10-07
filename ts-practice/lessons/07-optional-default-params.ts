// Lesson 7: optional and default parameters

// Optional parameter: caller may skip it, so we check before using it
function welcome(name: string, title?: string): string {
  if (title) {
    return "Welcome, " + title + " " + name;
  }
  return "Welcome, " + name;
}

// Default parameter: type inferred from the default value
function calculatePrice(price: number, taxRate: number = 0.1): number {
  return price + price * taxRate;
}

// Reference solution: write your own version in index.ts first
function createUser(name: string, age?: number): string {
  if (age !== undefined) {
    return name + " is " + age + " years old";
  }
  return name + " (age not provided)";
}

console.log(welcome("Umair"));
console.log(welcome("Umair", "Dr."));
console.log(calculatePrice(100));
console.log(calculatePrice(100, 0.2));
console.log(createUser("Umair", 32));
console.log(createUser("Ali"));

// Mini-test 1 (deliberate error, commented out): wrong type for optional parameter
// welcome("Umair", 123);

// Mini-test 2 (deliberate error, commented out): wrong type for default parameter
// calculatePrice(100, "20%");

// Mini-test 3 (deliberate error, commented out): too many arguments
// welcome("Umair", "Dr.", "extra");
