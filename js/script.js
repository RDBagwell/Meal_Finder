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
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `).join('');
                    search.value = '' 
            }
        } else {
            alert('Please Enter A Search');
        }
        
    }

    async function getMealById(mealId){
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await result.json();
        const meal = data.meals[0];
        addMealToDOM(meal);
    }

    function addMealToDOM(meal){
        const ingredinets = [];

        for(let i = 1; i <= 20; i++){
            if(meal[`strIngredient${i}`]){
                ingredinets.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            } else {
                break;
            }
        }
        singel_mealEl.innerHTML = `
            <div class="single-image">
                <h1>${meal.strMeal}</h1>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="single-meal-info">
                    ${meal.strCategory ? `<p>Category: ${meal.strCategory}</p>`: ''}
                    ${meal.strArea? `<p>Area: ${meal.strArea}</p>`: ''}
                </div>
                <div class="main">
                    <h2>Ingredinets</h2>
                    <ul>
                        ${ingredinets.map(ing=>`<li>${ing}</li>`).join('')}
                    </ul>
                    <p>${meal.strInstructions}</p>
                </div>
            </div>
        `;
    }

    async function randomMeal() {
        mealsEl.innerHTML = '';
        reasultHeading.innerHTML = '';
    
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        const data = await result.json();
        const meal = data.meals[0];
        addMealToDOM(meal);
    }



    submit.addEventListener('submit', searchMeal);
    mealsEl.addEventListener('click', (e)=>{
        const mealInfo = e.path.find(item=>{
            if(item.classList){
                return item.classList.contains('meal-info');
            } else {
                return false
            }
        });

        if(mealInfo){
            const mealID = mealInfo.getAttribute('data-mealid');
            getMealById(mealID);
        }
        
    });


    random.addEventListener('click', randomMeal)