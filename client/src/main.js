// fetch  recipes
const display = document.getElementById("app");
const form = document.getElementById("form");

async function fetchData() {
  const response = await fetch(`http://localhost:8080/Recipes`);
  const Recipes = await response.json();

  console.log(Recipes);

  return Recipes;
}

async function displayRecipe() {
  const Recipes = await fetchData();

  Recipes.forEach((recipe) => {
    const div = document.createElement("div");
    const dish = document.createElement("p");
    const type = document.createElement("p");
    const difficulty_level = document.createElement("p");
    dish.textContent = recipe.dish;
    type.textContent = recipe.type;
    difficulty_level.textContent = recipe.difficulty_level;

    div.append(dish, type, difficulty_level);

    display.appendChild(div);
  });
}
displayRecipe();

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const userInput = Object.fromEntries(formData);

  const userInputJSON = JSON.stringify(userInput);

  const response = await fetch(`http://localhost:8080/Recipes`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: userInputJSON,
  });
  window.location.reload();
}

form.addEventListener("submit", handleSubmit);
