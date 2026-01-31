// 1.fetch  all  recipes
const display = document.getElementById("app");
const form = document.getElementById("form");

//2.this will fetch all my recipe. fetch is defult get request no need to specify
async function fetchData() {
  const response = await fetch(`http://localhost:8080/Recipes`);
  const Recipes = await response.json();
  //3. console log
  //console.log(Recipes);

  return Recipes;
}
// 5. fetchData() no need fetch data beacuse because my displayRecipe
//4. fetch data before retun above function run it seprate terminal client and server open in browser and console. set code first in server then client. from client send request to my server, server create my database and all get back to me in inspact, console.
async function displayRecipe() {
  const Recipes = await fetchData();
  Recipes.forEach((recipe) => {
    //console.log(recipe);
    //6.now set up on pge DOM manipulation. recipes in array so we loop through
    const div = document.createElement("div"); //6.5.
    const dish = document.createElement("p"); //7. check in database table title for  all
    const type = document.createElement("p");
    const difficulty_level = document.createElement("p");

    dish.textContent = recipe.dish; //8.inside html inside array text all
    type.textContent = recipe.type;
    difficulty_level.textContent = recipe.difficulty_level;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`http://localhost:8080/recipes/${recipe.id}`, {
        method: "DELETE",
      });
      displayRecipe();
    };
    // EDIT button

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = () => {
      fetch(`http://localhost:8080/recipes/${recipe.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dish: "New Name",
          type: recipe.type,
          difficulty_level: recipe.difficulty_level,
        }),
      }).then(() => displayRecipe());
    };

    div.append(dish, type, difficulty_level, editBtn, deleteBtn);
    display.appendChild(div);
  });
}

//     div.append(dish, type, difficulty_level, btn)//ppend in this html 6.5, 7 and 1. to get all  to div
//     display.appendChild(div);
//   })
// }
displayRecipe();

// const editBtn = document.createElement("button");
// editBtn.textContent = "Edit";

async function handleSubmit(event) {
  //8.function for submite button. evenlistener envoke the handle submit  always pass in arrgument perameter doesnt metter
  event.preventDefault();

  const formData = new FormData(form); //10.set up form data
  const userInput = Object.fromEntries(formData); //11.turn into regular object
  const userInputJSON = JSON.stringify(userInput); //12 turn in to json

  const response = await fetch(`http://localhost:8080/Recipes`, {
    //13. fetch is always is await data so we ahve gives function to async
    headers: {
      // 14
      "Content-Type": "application/json",
    },
    method: "POST",
    body: userInputJSON,
  });
  window.location.reload();
}

form.addEventListener("submit", handleSubmit);
/*9.evenlistener always passes the even object arrgument of information about the event that happen and on that event object is method call prevent defult which stop the refresh when you submit. event or e*/
