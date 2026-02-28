const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const profile = document.querySelector("#profile");
const error = document.querySelector("#error");

const searchUser = async () => {
  const username = searchInput.value.trim();

  if (!username) return;

  // Hide previous results
  profile.classList.add("hidden");
  error.classList.add("hidden");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    // Fill profile card
    document.querySelector("#avatar").src = data.avatar_url;
    document.querySelector("#devName").textContent = data.name || username;
    document.querySelector("#bio").textContent = data.bio || "No bio available";
    document.querySelector("#repos").textContent = data.public_repos;
    document.querySelector("#followers").textContent = data.followers;
    document.querySelector("#following").textContent = data.following;
    document.querySelector("#githubLink").href = data.html_url;

    // Show profile
    profile.classList.remove("hidden");
  } catch (err) {
    error.classList.remove("hidden");
  }
};

// Search on button click
searchBtn.addEventListener("click", searchUser);

// Search on Enter key
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchUser();
});
