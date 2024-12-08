//1- Link to get a random meal
//https://www.themealdb.com/api/json/v1/1/random.php

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=
const mealsElement = document.querySelector("#meals");
const favorites = document.querySelector(".favorites")
const searchBtn = document.querySelector("#search");
const searchTerm = document.querySelector("#search-term")

const localStorageKey = 'mealIds';

mealsElement.innerHTML = "";

getRandomMeal();
updateFavoriteMeals();


searchBtn.addEventListener("click", async () => {
    const searchWord = searchTerm.value;
    const meals = await getMealsBySearch(searchWord);

    mealsElement.innerHTML = "";

    meals.forEach(meal => {
        addMeal(meal);
    })

});

async function getMealsBySearch(word) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' +word);

    const searchData = await resp.json();

    const meals = searchData.meals;

    return meals;
}

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    //console.log(resp);
    const randomData = await resp.json();
    //console.log(randomData);
    const randomMeal = randomData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}

function addMeal(mealData, random = false) {
    const meal = document.createElement("div");
    meal.classList.add("meal");


    meal.innerHTML = ` <div class="meal-header">
${random ? `<span class="random">Meal of the Day</span>` : ""}
<img src="${mealData.strMealThumb}" alt="">
</div>
<div class="meal-body">
<h3>${mealData.strMeal}</h3>
<button class="fav-btn">
<i class="fas fa-heart"></i>
</button>
</div>`;


    const favoriteButton = meal.querySelector(".fav-btn");
    if (favoriteButton) {
        favoriteButton.addEventListener('click', () => {
            if (favoriteButton.classList.contains("active")) {

                favoriteButton.classList.remove("active");
                removeMealFromLocalStorage(mealData.idMeal);
            }
            else {
                favoriteButton.classList.add("active");
                addMealToLocalStorage(mealData.idMeal);
            }
            updateFavoriteMeals();
        })
    }
    mealsElement.appendChild(meal);
}


function addMealToLocalStorage(mealId) {
    const mealsArray = getMealsFromLocalStorage();
    localStorage.setItem(localStorageKey, JSON.stringify([...mealsArray, mealId]));

}
function removeMealFromLocalStorage(mealId) {
    const mealsArray = getMealsFromLocalStorage();
    localStorage.setItem(localStorageKey, JSON.stringify(mealsArray.filter(id => id !== mealId)));
}
function getMealsFromLocalStorage() {
    const mealIds = JSON.parse(localStorage.getItem(localStorageKey));
    if (mealIds === null)
        return [];
    else
        return mealIds;
}


function updateFavoriteMeals() {
    favorites.innerHTML = "";
    const favoriteMeals = getMealsFromLocalStorage();

    favoriteMeals.forEach(async element => {
        const meal = await getMealById(element);
        addMealToFavorites(meal);
    });
}
async function getMealById(elementId) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + elementId);
    //console.log(resp);
    const mealData = await resp.json();
    // console.log(randomData);
    const meal = mealData.meals[0];
    return meal;

    console.log(meal);
}
function addMealToFavorites(mealData) {
    console.log(mealData);
    const favoriteMeal = document.createElement('li')
    favoriteMeal.innerHTML = `<img id="fav-img" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                            <span>${mealData.strMeal}</span>
                            <button class="clear"><i class="fas fa-window-close"></i></button>`;

    const clearBtn = favoriteMeal.querySelector(".clear");
    clearBtn.addEventListener('click', () => {
        removeMealFromLocalStorage(mealData.idMeal);

        updateFavoriteMeals();
    });
    favorites.appendChild(favoriteMeal);
}
