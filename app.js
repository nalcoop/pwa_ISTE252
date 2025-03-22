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
    const objectStore = db.createObjectStore("museumData", {
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

// let heroIndex=0;
// changeSlide();

// function changeSlide() {
//   let i;
//   const carousel = document.getElementsByClassName("hero-images");
//   let dots= document.getElementsByClassName("indicator");
//   for(i=0; i<carousel.length; i++){
//     carousel[i].style.display="none";
//   }
//   heroIndex++;

//   if(heroIndex > carousel.length){
//    heroIndex=1;
//   }
//   for (i=0; i<dots.length; i++){
//     dots[i].className= dots[i].className.replace("active","");
//   }
//  carousel[heroIndex-1].style.display="block";
//  dots[heroIndex-1].className+="active";
//  setTimeout(changeSlide,1000); //  changes it every second

// }

// fix template for the museums 
// gather content ideas 
// FIX THISSSSS

// create the template 
const museum= {
  "museums": [
        {
            "id":1,
            "Name": "Walters Art Museum",
            "Address": "600 N Charles St, Baltimore, MD 21201",
            "Website": "https://thewalters.org/",
            "Brief Description": 
            "The Walters Art Museum is focused on sharing art that tells the story of diverse cultures through the millennials. Located in Baltimore's Mount Vernon community, the Walters’ utilizes its exhibits, collections and educational programs to help the youth of the city and across the world. A local free museum that houses history from multiple cultures, ranging from 19th century French & Ethiopian paintings, ancient Roman artifacts and even images of the Buddha. The Walters’ was established in 1934 “for the benefit of the public” and  has continued that mission in the current years.",
            "type": "Art",

              
        },
        {
            "id":2,
            "Name": "American Visionary Art Museum",
            "Address": "800 Key Highway, Baltimore, MD 21230",
            "Website": "https://www.avam.org/",
            "Brief Description": 
            "The American Visionary Art Museum is focused on promoting and sharing art of all mediums. Located in the Federal Hill Neighborhood in the Baltimore Inner Harbor, the AVAM aims to promote visionary art, by way of teaching and storytelling. The AVAM shares ancient art from diverse cultures, even sharing “art” that may have not been considered art. Adhering to their mission established in 1984, the AVAM continues to promote creativity and expression by showing nontraditional art in a new experimental form for all those to see.",
            "type": "Art"
        },
        {
            "id":3,
            "Name": "Baltimore Museum of Art",
            "Address": "10 Art Museum Drive, Baltimore, MD 21218",
            "Website": "https://artbma.org/ ",
            "Brief Description": 
            "The Baltimore Museum of Art is focused on connecting the art of Baltimore and Baltimore to the world. Located in Baltimore’s Charles Village neighborhood, the BMA aims to share multi-century art from all across the world. For over 100 years, the BMA has been sharing  art and adhering to its foundational values." ,
            "type": "Art"    
        },
        {
            "id":4,
            "Name": "The National Great Blacks In Wax Museum",
            "Address": "1601-03 East North Ave, Baltimore, MD 21213",
            "Website": "https://www.greatblacksinwax.org/",
            "Brief Description": 
            "The National Great Blacks In Wax Museum is focused on sharing the dark raw history of Black Americans. Located in Old East Baltimore Historical District, the Blacks In Wax promotes the teachings of proper Black history. From as far back as slavery, to the recent accomplishments in the Black community. Established in 1988, the Blacks in Wax have upheld their foundational values and continue to promote the uncompromising truth of Black history." ,
            "type": "Education"    
        },
        {
            "id":5,
            "Name":"Reginald F. Lewis Museum of Maryland African American History & Culture", 
            "Address":"830 E Pratt St, Baltimore, MD 21202",
            "Website":" https://www.lewismuseum.org/",
            "Brief Description":"The Reginald F. Lewis Museum of Maryland African American History & Culture is focused on sharing the story of African American Marylanders through the arts. Located in downtown Baltimore, Reginald F. Lewis shares the preserved history of African American Marylanders through art, documents, and oral history presentations. The Reginald F. Lewis is based on the expansion of Black/African American arts and history with its name coming from one of the few Black millionaires. Established in 2005, the Reginald F. Lewis Museum has continued sharing the history of Black Marylanders for all those who attend.",
            "type": "Art"

        },
        {
            "id":6,
            "Name":"Maryland Science Center", 
            "Address":"601 Light St, Baltimore, MD 21230",
            "Website":"https://www.mdsci.org/",
            "Brief Description":"The Maryland Science Center is focused on teaching the multidisciplinary fashions of science. Located in the Baltimore Inner Harbor, the Science Center aims to promote learning science in an interactive, fun for all ages way. The Science Center explores many of the disciplines of science such as paleontology, chemistry, environmental, astronomy and more. Established in 1797, the Science Center has been expanding and teaching the sciences to those who attend for ages.",
            "type": "Education"

        },
        {
            "id":7,
            "Name":"B&O Railroad Museum", 
            "Address":"901 W Pratt St, Baltimore, MD 21223",
            "Website":"https://www.borail.org/",
            "Brief Description":"The B&O Railroad Museum is focused on teaching the history of the American railroad system, in the birthplace of the nation’s first mile of commercial railroad. Conveniently located in Baltimore’s Mount Clare neighborhood, the B&O Railroad brings light to the history of the railroad system by showing artifacts of the evolution of railroading. The B&O goes above and beyond to ensure the enjoyment of the museum by including a public park located right across the street. Established almost 200 years ago, the B&O Railroad has continued to uphold its foundational values. ",
            "type": "Education"

        },
        {
            "id":8,
            "Name":":Baltimore Museum of Industry", 
            "Address":"1415 Key Hwy, Baltimore, MD 21230",
            "Website":"https://www.thebmi.org/",
            "Brief Description":"The Baltimore Museum of Industry is focused on teaching individuals about the history of the labor and industry field. Located right on the Patapsco River in Baltimore, the BMI provides an immersive, interactive experience of the labor and industry field. The BMI teaches all those who visit the stories of significant Baltimore labor workers authentically, ensuring an all-around immersive experience with hands-on activities and more. Established in 1977, the BMI has continued to provide an authentic learning experience for all those who attend.",
            "type": "Education"

        },
        {
            "id":9,
            "Name":"Babe Ruth Birthplace Museum", 
            "Address":"216 Emory Street, Baltimore, MD 21230",
            "Website":"https://baberuthmuseum.org/",
            "Brief Description":"The Babe Ruth Birthplace Museum is home to the memorabilia of the late, great Babe Ruth. Located in downtown Baltimore, the Babe Ruth Birthplace is an educational institution that is dedicated to sharing the history and legacy of Babe Ruth. Established in 1974, the Babe Ruth Birthplace continues to preserve the legacy of Babe Ruth to all those who attend.",
            "type": "Memorabilia"

        },
        {
            "id":10,
            "Name":"Edgar Allan Poe House & Museum", 
            "Address":"203 N Amity St, Baltimore, MD 21223",
            "Website":"https://www.poeinbaltimore.org/",
            "Brief Description":"The Edgar Allan Poe House & Museum is the actual home of the late poet Edgar Allan Poe. Located in West Baltimore, the Poe Homes is a national historic landmark and literary landmark, that aims to tell the story of Edgar Allan Poe. Established in 1949, the Edgar Allan Poe House & Museum is upholding its legacy and expanding across the DMV area.",
            "type": "Memorabilia"
        }
    ]
};
if (!museum.museums || museum.museums.length==0){
    console.error("No museums found");
}

document.addEventListener("DOMContentLoaded", function(){
  let currentPage= window.location.pathname.split("/").pop();
  let filterPages=[];
  let db;
  const dbName= "MuseumDatabase";

    
  request.onerror = function (event) {
    console.error("Database error: " + event.target.error);
  };
  
  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database opened successfully");
  };

  function loadMuseums(){
    //based on page
    if (currentPage === "artMuseums.html"){
      filterPages= museum.museums.filter(specified => specified.type==="Art");
    }else if(currentPage === "educationalMuseums.html"){
      filterPages= museum.museums.filter(specified => specified.type==="Education");
    }else if(currentPage ==="memorabiliaMuseums.html"){
      filterPages= museum.museums.filter(specified => specified.type==="Memorabilia");
    } else{
      filterPages= museum.museums;
    }
  }

  getFavorites().then(favorites=>{
    let template="";
    filterPages.forEach(museumItem =>{
      let isFavorited= favorites.includes(museumItem.id.toString());
      template+= `
      <div class="card" data-id="${museumItem.id}">
          <h1 class="name"> ${museumItem.Name}</h1>
          <h3 class="property-name"> Address: ${museumItem.Address} </h3>
          <h3 class="property-name"> Website: <a href="${museumItem.Website}" target="_blank">${museumItem.Website}</a></h3>
          <p class="about"> ${museumItem["Brief Description"]} </p>
          <button class="favorite-button"> ${isFavorited ? "Remove from Favorites" : "Add to Favorites"}</button>
      </div>`; 
    });
    let container= document.getElementById("museum-list") || document.querySelector(".card");
    if(container){
     container.innerHTML= template;
    addFavorites();
    } else{
     console.error("Container not being made");
    }
 
  });

  
  

//function to create user template

function addFavoritesEventListeners(){
  document.querySelectorAll(".favorite-button").forEach(button =>{
    button.addEventListener("click", function(){
      let card = this.closest(".card");
      let museumId= card.dataset.id.toString();

      getFavorites().then(favorites =>{
        if(favorites.includes(museumId)){
          removeFavorite(museumId);
          this.textContent= "Add to Favorites";
          console.log(favorites);
        } else{
          addFavoritesEventListeners();
          this.textContent= "Remove from Favorites";
        }
      // removing it from the favorites
      if(currentPage === "favorites.html"){
       loadFavorites();
      }
    });
  });
  });
}


function loadFavorites(){
  if(!db){
    console.error("IndexedDB is not initialized yet");
    return;
  }
    getFavorites().then(favoriteIds =>{
      const transaction = db.transaction(["museumData"],"readonly");
      const objectStore= transaction.objectStore("museumData");
      const favoriteMuseums=[];

      objectStore.openCursor().onsuccess = function(event){
        let cursor= event.target.result;
        if(cursor){
          if(favoriteIds.includes(cursor.value.id.toString())){
            favoriteMuseums.push(cursor.value);
          }
          cursor.continue();
        } else{
          displayFavorites(favoriteMuseums,favoriteIds);
        }
      };
    });
}

function displayFavorites(museums, favoriteIds){
  let template="";
  museums.forEach(museumItem =>{
    let isFavorited= favoriteIds.includes(museumItem.id.toString());
    template+= `
    <div class="card" data-id="${museumItem.id}">
        <h1 class="name"> ${museumItem.Name}</h1>
        <h3 class="property-name"> Address: ${museumItem.Address} </h3>
        <h3 class="property-name"> Website: <a href="${museumItem.Website}" target="_blank">${museumItem.Website}</a></h3>
        <p class="about"> ${museumItem["Brief Description"]} </p>
        <button class="favorite-button"> ${isFavorited ? "Remove from Favorites" : "Add to Favorites"}</button>
    </div>`; 
  });
  let container= document.getElementById("museum-list") || document.querySelector(".card");
  if(container){
   container.innerHTML= template;
   addFavoritesEventListeners();
  } else{
   console.error("Container not being made");
  }

}

function addFavorites(id){
      const transaction = db.transaction(["museumData"],"readwrite");
      const objectStore= transaction.objectStore("museumData");
      objectStore.get(id).onsuccess= function (event) {
        const museum= event.target.results;
        if(museum){
          let favorites= JSON.parse(localStorage.getItem("favorites")) || [];
          if(!favorites.includes(id)){
            favorites.push(id);
            localStorage.setItem("favorites",JSON.stringify(favorites));
          }
        }
      };
}

function removeFavorite(id){
  let favorites= JSON.parse(localStorage.getItem("favorites")) || [];
  favorites= favorites.filter(favoriteIds => favoriteIds !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getFavorites(){
  return new Promise((resolve) => {
    let favorites= JSON.parse(localStorage.getItem("favorites")) || [];
    resolve(favorites);
  });
}

})
