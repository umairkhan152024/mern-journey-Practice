// Lesson 3: typed arrays
let skills: string[] = ["React", "Node", "MongoDB"];
let scores: number[] = [90, 85, 77];
let flags: boolean[] = [true, false, true];

skills.push("TypeScript");

// Inferred as number[]
let years = [2021, 2022, 2023];

console.log(skills, scores, flags, years);

// Mini-test (deliberate error, commented out): number cannot go into string[]
// skills.push(42);
