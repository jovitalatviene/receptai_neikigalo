document.getElementById("searchButton").addEventListener("click", (e) => {
    e.preventDefault();
    const recipeName = document.getElementById("recipeInput").value;
    searchRecipe(recipeName);
});

document.getElementById("recipeInput").addEventListener("input", (e) => {
    e.preventDefault();
    const recipeName = e.target.value;
    searchRecipe(recipeName)
})

function searchRecipe(recipeName){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
    .then((response)=>data=response.json())
    .then((data)=>displayRecipes(data.meals))
    .catch((error)=>console.error('Error:', error));   //jeigu ivyksta klaida, parodo klaidos pranesima
}
function displayRecipes(meals){
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";          //isvalo esamus card'us
    if(meals){
        meals.forEach(function(meal){
            const card = document.createElement("div");
            card.className = "card-fluid col-sm-6";
            card.id = "cards-bord";  
            card.style.width = '45%';
            card.style.height = 'auto';
            card.style.position = 'relative';
            card.style.top = '0px';
            card.style.left = '0px';           
            const image = document.createElement("img");            
            image.src = meal.strMealThumb;
            image.alt = meal.strMeal;
            image.style.width = '100%';
            card.appendChild(image);
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            const cardHead = document.createElement("div");
            cardHead.className = "row card-head";            
            const colTitle = document.createElement("div");
            colTitle.className = "col-sm-9";          
            const title = document.createElement("h4");
            title.classname = "card-text";
            title.innerHTML= meal.strMeal  //idedame pavadinima           

            colTitle.appendChild(title);
            cardHead.appendChild(colTitle);
            const colRating = document.createElement("div");
            colRating.className = "col-sm-3"; 
            const starRating = document.createElement("div");
            starRating.innerHTML = '<img src="img/6.png" class="star" alt="...">'; 
            const pRating = document.createElement("p");
            pRating.textContent = "4.4";
            const heart = document.createElement("a");
            heart.innerHTML = '<a class="heart" href="#"><img class="img-heart" src="img/heart.png"></a>';
            heart.style.position = 'absolute';
            heart.style.top = '0px';
            heart.style.right = '0px';            
            colRating.appendChild(starRating);
            colRating.appendChild(pRating);
            colRating.appendChild(heart);
            cardHead.appendChild(colRating);            
            const listas = document.createElement("div");
            listas.className = "listas";
            const ul = document.createElement("ul");
            ul.style.display = 'inline-block';
            const liOne = document.createElement("li");
            liOne.textContent = "25 min";
            ul.appendChild(liOne);
            const liTwo = document.createElement("li");
            liTwo.innerHTML = '<img src="img/Ellipse.png" alt="">';
            ul.appendChild(liTwo);
            const liThree = document.createElement("li");
            liThree.innerHTML =  meal.strCategory;
            ul.appendChild(liThree);

            listas.appendChild(ul);
            cardBody.appendChild(cardHead);
            cardBody.appendChild(listas);
            card.appendChild(cardBody);            
            cardsContainer.appendChild(card);
           
        });
    } 
    else {
        cardsContainer.innerHTML = "NO RECIPES FOUND.";
    }    
}

function getCategories(){
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then((response)=>data=response.json())
    .then((data)=>displayCategories(data.categories))
    .catch((error)=>console.error('Error:', error));
}

function searchRecipesByCategory(categoryName){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=` +categoryName)
    .then((response)=>data=response.json())
    .then((data)=>displayRecipes(data.meals)) 
    .catch((error)=>console.error('Error:', error));
}

function displayCategories(categories){
    const categoryContainer = document.getElementById("category-container");
    if (categories) {
        categories.forEach(function(category) {
            const categoryButton = document.createElement("button");
            categoryButton.type = "button";
            categoryButton.classNmame = "btn btn-danger";
            categoryButton.innerText = category.strCategory;
            categoryButton.addEventListener("click", function  (){
                const categoryName = category.strCategory;
                searchRecipesByCategory(categoryName); 
            });
            categoryContainer.appendChild(categoryButton)
        })
    }
    else {
        categoryContainer.innerHTML = "No categories found"
    }
}
getCategories()  




