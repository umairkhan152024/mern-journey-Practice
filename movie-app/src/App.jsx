/**
 import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]); // runs every time count changes

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
    </div>
  );
}

export default App;
**/
//
//
//
//
//
/* 
import { useState, useEffect } from "react";

function App() {
  const [Ausi, setUser] = useState("");

  useEffect(() => {
    console.log("Page loaded — fetching data...");

    fetch("https://api.github.com/users/umairkhan152024")
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received!");
        console.log(data.name);
        setUser(data);
      });
  }, []);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
*/
//
//
//
//
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/umairkhan152024")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>Repos: {user.public_repos}</p>
          <p>Followers: {user.followers}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
