// Without destructuring — messy
const developer = { name1: "Umair", city: "Hong Kong", salary: 35000 };
const name3 = developer.name1;
const city1 = developer.city;
const salary1 = developer.salary;
console.log(name3); // Umair
console.log(city1); // Hong Kong
console.log(salary1); // 35000

// With destructuring — clean
const { name1, city, salary } = developer;
console.log(name1); // Umair
console.log(city); // Hong Kong
console.log(salary); // 35000

const skills = ["HTML", "CSS", "JavaScript"];
const [first1, second1, third1] = skills;
console.log(first1); // HTML
console.log(second1); // CSS
console.log(third1); // JavaScript

// Spread in arrays
const skills1 = ["HTML", "CSS"];
const skills2 = ["JavaScript", "React"];
const allSkills = [...skills1, ...skills2];
console.log(allSkills); // ["HTML", "CSS", "JavaScript", "React"]

// Spread in objects
const basicInfo = { name: "Umair", age: 32 };
const fullInfo = { ...basicInfo, city: "Hong Kong", salary: 35000 };
console.log(fullInfo);

// Rest in arrays
const [first, second, ...remaining] = ["HTML", "CSS", "JS", "React", "Node"];
console.log(first); // HTML
console.log(second); // CSS
console.log(remaining); // ["JS", "React", "Node"]

// Rest in functions
const addAll = (...numbers) => {
  return numbers.reduce((acc, num) => acc + num, 0);
};
console.log(addAll(10, 20, 30, 40)); // 100
