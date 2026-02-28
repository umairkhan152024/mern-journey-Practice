/*
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "Umair", city: "Hong Kong" };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(`Got data: ${data.name}`);
});

console.log("This runs immediately!");
//
//
//
//
//
//
// Pizza shop
function orderPizza1(callback) {
  console.log("Making your pizza01");

  setTimeout(() => {
    const pizza1 = "Pepperoni Pizza01";
    callback(pizza1); // pizza ready — calling you back!
  }, 2000);
}

// You ordering
orderPizza1((pizza1) => {
  console.log(`Pizza arrived: ${pizza1}`);
});

// You watching TV while waiting
console.log("Watching TV...");
///
//
//
//

function orderPizza1() {
  return new Promise((resolve, reject) => {
    console.log("Making your pizza...");

    setTimeout(() => {
      const pizzaReady1 = true;

      if (pizzaReady1) {
        resolve("Pepperoni Pizza is ready!");
      } else {
        reject("Sorry, we ran out of ingredients!");
      }
    }, 3000);
  });
}

orderPizza1()
  .then((pizza1) => console.log(pizza1))
  .catch((error) => console.log(error));

console.log("Watching TV...");
//
//
//
//
//

function orderPizza() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pizzaReady = false;
      if (pizzaReady) {
        resolve("Pepperoni Pizza is ready!");
      } else {
        reject("Sorry, no pizza today!");
      }
    }, 2000);
  });
}

const getPizza = async () => {
  try {
    console.log("Ordering pizza...");
    const pizza = await orderPizza();
    console.log(pizza);
  } catch (error) {
    console.log(error);
  }
};

getPizza();
console.log("Watching TV...");

//
//
//
//
//
//
//

const getUser = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/umairkhan152024",
    );
    const data = await response.json();
    console.log(data.name);
    console.log(data.public_repos);
    console.log(data.followers);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

getUser();
*/
//
//
//
//
//
//
const getUser = async () => {
  try {
    const response = await fetch(
      "https://api.github.com/users/umairkhan152024",
    );
    const data = await response.json();

    document.querySelector("#devName").textContent = `Name: ${data.name}`;
    document.querySelector("#repos").textContent =
      `Repos: ${data.public_repos}`;
    document.querySelector("#followers").textContent =
      `Followers: ${data.followers}`;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

getUser();
