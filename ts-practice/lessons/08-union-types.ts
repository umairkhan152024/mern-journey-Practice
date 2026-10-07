// Lesson 8: union types and type narrowing

// A union means "this OR that", written with |
let id: number | string;
id = 101;
id = "A-101";

// Another union: a variable that can be boolean or number
let value: boolean | number = true;

// typeof narrows the union, so each branch knows the exact type
function showId(id: number | string): void {
  if (typeof id === "string") {
    // id is a string here, so toUpperCase is allowed
    console.log(id.toUpperCase());
  } else {
    // id is a number here, so toFixed is allowed
    console.log(id.toFixed(2));
  }
}

showId("a-101");
showId(101);
console.log(id, value);

// Mini-test 1 (deliberate error, commented out): boolean is not in number | string
// id = true;

// Mini-test 2 (deliberate error, commented out): toUpperCase does not exist on number
// function broken(id: number | string): void {
//   console.log(id.toUpperCase());
// }
