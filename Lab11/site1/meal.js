//1- Link to get a random meal
//https://www.themealdb.com/api/json/v1/1/random.php

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=

const localStorageKey = 'mealsIds';

function initMain() {
    const mealsElement = document.querySelector("#meals");
    const favorites = document.querySelector(".favorites");
    const searchBtn = document.querySelector("#search");
    const searchTerm = document.querySelector("#search-term");

    if (mealsElement) {
        mealsElement.innerHTML = "";
        getRandomMeal();
        updateFavoriteMeals();

        if (searchBtn && searchTerm) {
            searchBtn.addEventListener("click", async () => {
                const searchWord = searchTerm.value;
                const meals = await getMealsBySearch(searchWord);
                console.log(meals);
                mealsElement.innerHTML = "";

                if (meals) {
                    meals.forEach(meal => {
                        addMeal(meal);
                    });
                }
            });
        }
    }
}




async function getMealsBySearch(word) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + word);

    const searchData = await response.json();

    const meals = searchData.meals;


    return meals;
}



async function getRandomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    //console.log(response);
    const randomData = await response.json();
    //console.log(randomData);
    const randomMeal = randomData.meals[0];
    console.log(randomMeal);

    addMeal(randomMeal, true);
}



function addMeal(mealData, random = false) {
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `<div class="meal-header">
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
                removeMealfromLocalStorage(mealData.idMeal);

            }
            else {
                favoriteButton.classList.add("active");
                addMealToLocalStorage(mealData.idMeal);

            }

            updateFavoriteMeals();
        });
    }

    const mealsElement = document.querySelector("#meals");
    mealsElement.appendChild(meal);

    const mealHeader = meal.querySelector(".meal-header");
    mealHeader.addEventListener("click", () => {
        OpenMealDetailsPage(mealData);
    });
}



function addMealToLocalStorage(mealID) {
    const mealsArray = getMealsFromLocalStorage();
    localStorage.setItem(localStorageKey, JSON.stringify([...mealsArray, mealID]));
}



function removeMealfromLocalStorage(mealID) {
    const mealsArray = getMealsFromLocalStorage();
    localStorage.setItem(localStorageKey, JSON.stringify(mealsArray.filter(id => id !== mealID)));
}




function getMealsFromLocalStorage() {
    const mealIds = JSON.parse(localStorage.getItem(localStorageKey));
    if (mealIds === null)
        return [];
    else
        return mealIds;
}



function updateFavoriteMeals() {
    const favorites = document.querySelector(".favorites")
    favorites.innerHTML = "";
    const favoriteMeals = getMealsFromLocalStorage();

    favoriteMeals.forEach(async element => {
        const meal = await getMealByID(element);
        addMealToFavorites(meal);
    });

}



async function getMealByID(elementId) {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + elementId);


    //console.log(response);
    const mealData = await response.json();
    //console.log(randomData);
    const meal = mealData.meals[0];
    console.log(meal);
    return meal;

}




function addMealToFavorites(mealData) {
    console.log(mealData)
    const favorites = document.querySelector(".favorites");
    const favoriteMeal = document.createElement('li');
    favoriteMeal.innerHTML = `<img id="fav-img" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                            <span>${mealData.strMeal}</span>
                            <button class="clear"><i class="fas fa-window-close"></i></button>`


    const clearBtn = favoriteMeal.querySelector(".clear");
    clearBtn.addEventListener('click', () => {
        removeMealfromLocalStorage(mealData.idMeal);
        updateFavoriteMeals();
    });

    favorites.appendChild(favoriteMeal);

    const favId = favoriteMeal.querySelector("#fav-img");
    favId.addEventListener("click", () => {
        OpenMealDetailsPage(mealData);
    });
}



function OpenMealDetailsPage(mealData) {
    window.open("details.html?mealId=" + mealData.idMeal, "_self");
}

function initDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);

    const mealId = urlParams.get('mealId');
    if (mealId) {
        showMealDetails(mealId);
    }
}



async function showMealDetails(mealId) {
    let tmpMeal = await getMealByID(mealId);


    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (tmpMeal['strIngredient' + i])
            ingredients.push(`${tmpMeal['strIngredient' + i]}/${tmpMeal['strMeasure' + i]}`);

    }
    const mealsDeatailsContainer = document.querySelector('.meal-container');




    mealsDeatailsContainer.innerHTML =
        `<a href="meal.html">Home</a>
            <div class="meal-info">
                <div>
                    <h1>${tmpMeal.strMeal}</h1>
                    <img src="${tmpMeal.strMealThumb}" alt="${tmpMeal.strMealThumb}">
                </div>
                <div>
                    <p>${tmpMeal.strInstructions}</p>
                        <ul>
                            ${ingredients.map(
            item => `<li>${item}</li>`).join("")

        }
                        </ul>
                </div>
            </div>` ;
}