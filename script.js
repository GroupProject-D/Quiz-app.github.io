const searchBox = document.querySelector(".searchBox");
const searchbutton = document.querySelector(".searchbutton");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeClosebtn = document.querySelector(".recipe-closebtn");
const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h2>...Fetching recipes ...<h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();
    recipeContainer.innerHTML = ""
    //const length = response.meals.length;
    //IMPPPP
    //For fetching ingrediant after clicking view

    const fetchingredents = (meal) => {
        let IngredentsList = "";
        for (let i = 1; i <= 20; i++) {
            const Ingredent = meal[`strIngredient${i}`];
            if (Ingredent) {
                const measure = meal[`strMeasure${i}`];
                IngredentsList += `<li>${measure} ${Ingredent}</li>`
            } else {
                break;
            }

        }
        return IngredentsList;
    }
    //fun execute for specific reciper 
    const openRecipePopUp = (meal) => {
        recipeDetailsContent.innerHTML = `<h2 class="recipeName" >${meal.strMeal}</h2>
        <h3>Ingredents</h3>
        <ul class="ingredentsList" >${fetchingredents(meal)}</ul>
        <div>
            <h3>
            Instructions:-
            </h3>
            <p class="recipeInstructions" >
                ${meal.strInstructions}
            </p>
        </div>
        `;

        recipeDetailsContent.parentElement.style.display = "block";

    }
    response.meals.forEach(meal => {
        const recipDiv = document.createElement("div");
        recipDiv.classList.add("recipe");
        recipDiv.innerHTML =
            `<img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}<span></p>
            <p>Belongs to <span>${meal.strCategory}<span> Catagory</p>
            `;
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        recipDiv.appendChild(button);
        button.addEventListener('click', () => {
            openRecipePopUp(meal);
        });
        recipeContainer.appendChild(recipDiv);

    });
};

searchbutton.addEventListener("click", (e) => {
    e.preventDefault();

    const searchInput = searchBox.value.trim();
    if (searchInput == null) {

    } else {
        fetchRecipe(searchInput);
        searchBox.value = "";
    }

});
recipeClosebtn.addEventListener("click", () => {
    //x button war click kel ki band zal pahije
    recipeDetailsContent.parentElement.style.display = "none";
})