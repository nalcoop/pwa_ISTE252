//check if service worker is supported
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("sw.js")
        .then((registration) => {
          console.log("Service worker successfully registered: ", registration);
        })
        .catch((error) => {
          console.log("Service worker registration failed: ", error);
        });
    });
  }
  
  let db;
  const dbName = "MuseumDatabase";
  const request = indexedDB.open(dbName, 1);
  
  request.onerror = function (event) {
    console.error("Database error: " + event.target.error);
  };
  
  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database opened successfully");
  };
  
  request.onupgradeneeded = function (event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("muesumData", {
      keyPath: "id",
    });
  };
  
  //set up broadcast channel
  const channel = new BroadcastChannel("museum_channel");
  
  //listen for messages
  channel.onmessage = (event) => {
    console.log("Received message from SW in PWA: ", event.data);
  
    if (event.data === "data-updated") {
      //update our UI
      console.log("Data updated!");
    //   function call to display the museums
    }
  };
  
  //   function call to display the museums

// to create a favorite site
function getAllJokes() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);
      request.onerror = function (event) {
        reject(`Database error: ${event.target.error}`);
      };
  
      request.onsuccess = function (event) {
        db = event.target.result;
        const transaction = db.transaction("jokeData", "readonly");
        const objectStore = transaction.objectStore("jokeData");
        const objects = [];
        objectStore.openCursor().onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            //add object to our array
            objects.push(cursor.value);
            cursor.continue();
          } else {
            //no more objects to iterate, resolve the promise
            resolve(objects);
          }
        }; //onsuccess
        transaction.oncomplete = () => {
          //db.close();
        };
      };
    }); //promise
  } //getAllJokes
  
//   to remove the favorite sites
function deleteJoke(id) {
    console.log(db);
    const transaction = db.transaction(["jokeData"], "readwrite");
    const objectStore = transaction.objectStore("jokeData");
    const request = objectStore.delete(id);
    request.onsuccess = function (event) {
      console.log("Joke deleted successfully");
      renderPastJokes();
    };
    request.error = function (event) {
      console.log("Error deleting joke: ", event.target.error);
    };
  } //deleteJoke


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
  async function getUserData(){
    try{
        const url= 'https://dummyjson.com/users';
        const userInfo= await fetch(url);
        const userData=await userInfo.json();
        console.log(userData);
        userData.users.forEach(user=> createUser(user));
    } catch (error){
        console.log("Error fetching user data: ",error);
    }
}


//function to create user template
function createUser(user){
   console.log(user);
   console.log(user.image);
   let template= `
    <div class="card">
        <img class="user-photo" src=${user.image} alt="User Photo"/>
        <h2 class="name"> ${user.firstName} ${user.lastName}</h2>
        <h3 class="property-name"> Company: ${user.company.name} </h3>
        <h3 class="property-name"> Contact Info: <p> Phone Number: ${user.phone}<br> Email: ${user.email}</p></h3>
    </div>`;
    
    document.getElementById("container").insertAdjacentHTML("beforeend",template); 
}

getUserData();
