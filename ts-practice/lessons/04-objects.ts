// Lesson 4: object shapes defined inline
let developer: { name: string; age: number; isFounder: boolean } = {
  name: "Umair",
  age: 32,
  isFounder: true,
};

console.log(developer.name, developer.age);
developer.age = 33;

let product: { title: string; price: number } = {
  title: "Laptop",
  price: 1200,
};

console.log(product);

// Mini-tests (deliberate errors, commented out)
// developer.email = "umair@example.com"; // property not in the shape
// developer.name = 123; // wrong type
