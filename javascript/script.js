const title = document.querySelector("#title");
const bio = document.querySelector(".bio");

title.textContent = "Umair Khan - MERN Developer";
bio.textContent = "Building the future of Hong Kong tech";
title.style.color = "blue";

const btn = document.querySelector("#btn");

let isClicked = false;

btn.addEventListener("click", () => {
  if (isClicked) {
    title.textContent = "Umair Khan - MERN Developer";
    title.style.color = "blue";
    btn.textContent = "Click Me";
    isClicked = false;
  } else {
    title.textContent = "You clicked the button!";
    title.style.color = "red";
    btn.textContent = "Click Again";
    isClicked = true;
  }
});
