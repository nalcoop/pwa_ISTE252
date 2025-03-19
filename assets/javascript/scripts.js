//Hamburger menu open/close event listener
let hamburger = document.getElementById('hamburger');
let menu = document.querySelector('header nav>ul');
hamburger.addEventListener('click', () => {
    menu.classList.toggle('notransition');
    menu.classList.toggle('display');
    //Wait for transition to finish
    setTimeout(() => {
        menu.classList.toggle('notransition');
    }, 600);
});

//When a dropdown control is clicked, apply the display class to the
//corresponding dropdown menu to play the slide out animation
let dropdownControls = document.getElementsByClassName('dropdownControl');
let len = dropdownControls.length;
for (let i = 0; i < len; i++) {
    let element = dropdownControls[i];
    const parentLi = element.parentElement;

    element.addEventListener('click', (e) => {
        e.preventDefault();
        let allDropDowns = document.getElementsByClassName('dropdown');
        let allDropDownsLen = allDropDowns.length;
        let menuIsOpen = false;

        let dropdowns = parentLi.getElementsByClassName('dropdown');
        dropdowns = Array.prototype.slice.call(dropdowns); //Convert from html collection to array
        let parentLen = dropdowns.length;

        //Close all currently open dropdowns outside the selected element
        for (let i = 0; i < allDropDownsLen; i++) {
            if (!dropdowns.includes(allDropDowns[i])) {
                if (allDropDowns[i].classList.contains('display')) {
                    menuIsOpen = true;
                }
                allDropDowns[i].classList.remove('display');
            }
        }

        //Wait for close transition to finish before opening selected menu
        //If no menus are open, do not wait
        setTimeout(() => {
            for (let i = 0; i < parentLen; i++) {
                dropdowns[i].classList.toggle('display');
            }
        }, menuIsOpen ? 600 : 0);
    });
}

// Carousel Function 
// Must update to change automatically yet allow the user to change the image by swiping or clicking

let heroIndex=0;
changeSlide();

function changeSlide() {
  let i;
  const carousel = document.getElementsByClassName("hero-images");
  let dots= document.getElementsByClassName("indicator");
  for(i=0; i<carousel.length; i++){
    carousel[i].style.display="none";
  }
  heroIndex++;

  if(heroIndex > carousel.length){
   heroIndex=1;
  }
  for (i=0; i<dots.length; i++){
    dots[i].className= dots[i].className.replace("active","");
  }
 carousel[heroIndex-1].style.display="block";
 dots[heroIndex-1].className+="active";
 setTimeout(changeSlide,1000); //  changes it every second

}

// fix template for the museums 
// gather content ideas 
// FIX THISSSSS
if (!recipe.recipes || recipe.recipes.length==0){
    console.error("No recipe found");
}

recipe.recipes.forEach(recipeItem =>{
    let template= `
    <h1> Recipe Name: <br> ${recipeItem.name}</h1>
    <img class="recipe-photo" src=${recipeItem.image} />
    <h2>Ingredients: </h2>
    <ul>${recipeItem.ingredients.map(ingredients => `<li>${ingredients}</li>`).join("") }</ul>
    <h2>Instructions: </h2>
    <ul>${recipeItem.instructions.map(instructions=> `<li>${instructions}</li>`).join("")}</ul> 
    <p>Prep Time Minutes: ${recipeItem.prepTimeMinutes}</p>
    <p>Cook Time: ${recipeItem.cookTimeMinutes}</p>
    <p>Servings: ${recipeItem.servings}</p>
    <p>Difficulty: ${recipeItem.difficulty}</p>
    <p>Cuisine: ${recipeItem.cuisine}</p>
    <p>Calories Per Serving: ${recipeItem.caloriesPerServing}</p>
    <p>Rating: ${recipeItem.rating}</p>
    `;
    document.getElementById("container").insertAdjacentHTML("beforeend",template); 
});