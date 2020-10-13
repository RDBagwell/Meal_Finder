const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    reasultHeading = document.getElementById('result-heading'),
    singel_mealEl = document.getElementById('single-meal');

    async function searchMeal(e) {
        e.preventDefault();
        singel_mealEl.innerHTML = '';
        const term = search.value;
        if(term.trim()){
            const result = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
            const data = await result.json();
            
            if(data.meals === null){
                reasultHeading.innerHTML = `<h2> There are no results for "${term}" </h2>`;
            } else {
                reasultHeading.innerHTML = `<h2> Search results for "${term}" </h2>`;
                mealsEl.innerHTML = data.meals.map(meal =>`
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                     </div>
                     <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                     </div>
                    `).join('');
                    search.value = '' 
            }
        } else {
            alert('test');
        }
        
    }

    submit.addEventListener('submit', searchMeal);