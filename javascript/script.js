// Save to localStorage
localStorage.setItem("username", "Umair Khan");
localStorage.setItem("goal", "Top 2% MERN Developer in HK");

// Get from localStorage
const username = localStorage.getItem("username");
const goal = localStorage.getItem("goal");

console.log(username);
console.log(goal);
//
//
//
// Save data
localStorage.setItem("username1", "Umair Khan");
localStorage.setItem("city1", "Hong Kong");

// Get data
const username1 = localStorage.getItem("username1");
console.log(username1); // Umair Khan

// Remove one item
localStorage.removeItem("username1");

// Clear everything
localStorage.clear();
//
//
//
//

const developer = { name: "Umair", city: "Hong Kong", salary: 35000 };

// Save object
localStorage.setItem("developer", JSON.stringify(developer));

// Get object back
const dev = JSON.parse(localStorage.getItem("developer"));
console.log(dev.name); // Umair
console.log(dev.city); // Hong Kong
