const searchInput = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const foodcontainer = document.getElementById('food_Container');

searchBtn.addEventListener('click', () => {
    const searchValue = searchInput.value;
    if (searchValue == "") {
        alert("Please Input A Letter (A to Z)");
    } else {
        if (searchValue.length > 1) {
            alert("For Search, You Can't Write More Than One Letter");
        } else {
            searchMeals(searchValue);
        }
    }
});

const searchMeals = (searchValue) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`)
        .then(response => response.json())
        .then(data => displayFood(data));
};

const displayFood = (searchResult) => {
    foodcontainer.innerHTML = '';  
    if (searchResult.meals) {
        searchResult.meals.forEach((meal) => {
            foodcontainer.innerHTML += `
                <div class="card mb-3" style="width: 18rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.substring(0, 70)}...</p>
                        <a href="${meal.strYoutube}" class="btn btn-primary" target="_blank">Watch Video</a>
                    </div>
                </div>
            `;
        });
    } else {
        foodcontainer.innerHTML = `<p class="text-center text-danger">No meals found for "${searchValue}"</p>`;
    }
};