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
  if (!db.objectStoreNames.contains("museumData")) {
    const objectStore = db.createObjectStore("museumData", { keyPath: "id" });
    objectStore.createIndex("name", "Name", { unique: false });
  }
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
let hamburger = document.getElementById("hamburger");
let menu = document.querySelector("header nav>ul");
hamburger.addEventListener("click", () => {
  menu.classList.toggle("notransition");
  menu.classList.toggle("display");
  //Wait for transition to finish
  setTimeout(() => {
    menu.classList.toggle("notransition");
  }, 600);
});

//When a dropdown control is clicked, apply the display class to the
//corresponding dropdown menu to play the slide out animation
let dropdownControls = document.getElementsByClassName("dropdownControl");
let len = dropdownControls.length;
for (let i = 0; i < len; i++) {
  let element = dropdownControls[i];
  const parentLi = element.parentElement;

  element.addEventListener("click", (e) => {
    e.preventDefault();
    let allDropDowns = document.getElementsByClassName("dropdown");
    let allDropDownsLen = allDropDowns.length;
    let menuIsOpen = false;

    let dropdowns = parentLi.getElementsByClassName("dropdown");
    dropdowns = Array.prototype.slice.call(dropdowns); //Convert from html collection to array
    let parentLen = dropdowns.length;

    //Close all currently open dropdowns outside the selected element
    for (let i = 0; i < allDropDownsLen; i++) {
      if (!dropdowns.includes(allDropDowns[i])) {
        if (allDropDowns[i].classList.contains("display")) {
          menuIsOpen = true;
        }
        allDropDowns[i].classList.remove("display");
      }
    }

    //Wait for close transition to finish before opening selected menu
    //If no menus are open, do not wait
    setTimeout(
      () => {
        for (let i = 0; i < parentLen; i++) {
          dropdowns[i].classList.toggle("display");
        }
      },
      menuIsOpen ? 600 : 0
    );
  });
}

// fix template for the museums
const museum = {
  museums: [
    {
      // add in an image tag to store the images for each slide show
      id: 1,
      Name: "Walters Art Museum",
      Images: [
        "./assets/images/walters-art-1.jpg",
        "./assets/images/walters-art-2.jpg",
        "./assets/images/walters-art-3.jpg",
        "./assets/images/walters-art-4.jpg",
      ],
      Address: "600 N Charles St, Baltimore, MD 21201",
      Website: "https://thewalters.org/",
      "Brief Description":
        "The Walters Art Museum is focused on sharing art that tells the story of diverse cultures through the millennials. Located in Baltimore's Mount Vernon community, the Walters’ utilizes its exhibits, collections and educational programs to help the youth of the city and across the world. A local free museum that houses history from multiple cultures, ranging from 19th century French & Ethiopian paintings, ancient Roman artifacts and even images of the Buddha. The Walters’ was established in 1934 “for the benefit of the public” and  has continued that mission in the current years.",
      type: "Art",
    },
    {
      id: 2,
      Name: "American Visionary Art Museum",
      Images: [
        "./assets/images/avam-art-1.jpg",
        "./assets/images/avam-art-2.jpg",
        "./assets/images/avam-art-3.jpg",
        "./assets/images/avam-art-4.jpg",
      ],
      Address: "800 Key Highway, Baltimore, MD 21230",
      Website: "https://www.avam.org/",
      "Brief Description":
        "The American Visionary Art Museum is focused on promoting and sharing art of all mediums. Located in the Federal Hill Neighborhood in the Baltimore Inner Harbor, the AVAM aims to promote visionary art, by way of teaching and storytelling. The AVAM shares ancient art from diverse cultures, even sharing “art” that may have not been considered art. Adhering to their mission established in 1984, the AVAM continues to promote creativity and expression by showing nontraditional art in a new experimental form for all those to see.",
      type: "Art",
    },
    {
      id: 3,
      Name: "Baltimore Museum of Art",
      Images: [
        "./assets/images/bma-art-1.jpg",
        "./assets/images/bma-art-2.jpg",
        "./assets/images/bma-art-3.jpg",
        "./assets/images/bma-art-4.jpg",
      ],
      Address: "10 Art Museum Drive, Baltimore, MD 21218",
      Website: "https://artbma.org/ ",
      "Brief Description":
        "The Baltimore Museum of Art is focused on connecting the art of Baltimore and Baltimore to the world. Located in Baltimore’s Charles Village neighborhood, the BMA aims to share multi-century art from all across the world. For over 100 years, the BMA has been sharing  art and adhering to its foundational values.",
      type: "Art",
    },
    {
      id: 4,
      Name: "Reginald F. Lewis Museum of Maryland African American History & Culture",
      Images: [
        "./assets/images/rfl-art-1.jpg",
        "./assets/images/rfl-art-2.jpg",
        "./assets/images/rfl-art-3.jpg",
        "./assets/images/rfl-art-4.jpg",
      ],
      Address: "830 E Pratt St, Baltimore, MD 21202",
      Website: " https://www.lewismuseum.org/",
      "Brief Description":
        "The Reginald F. Lewis Museum of Maryland African American History & Culture is focused on sharing the story of African American Marylanders through the arts. Located in downtown Baltimore, Reginald F. Lewis shares the preserved history of African American Marylanders through art, documents, and oral history presentations. The Reginald F. Lewis is based on the expansion of Black/African American arts and history with its name coming from one of the few Black millionaires. Established in 2005, the Reginald F. Lewis Museum has continued sharing the history of Black Marylanders for all those who attend.",
      type: "Art",
    },
    {
      id: 5,
      Name: "The National Great Blacks In Wax Museum",
      Images: [
        "./assets/images/ngbw-art-1.jpg",
        "./assets/images/ngbw-art-2.jpeg",
        "./assets/images/ngbw-art-3.jpeg",
        "./assets/images/ngbw-art-4.jpg",
      ],
      Address: "1601-03 East North Ave, Baltimore, MD 21213",
      Website: "https://www.greatblacksinwax.org/",
      "Brief Description":
        "The National Great Blacks In Wax Museum is focused on sharing the dark raw history of Black Americans. Located in Old East Baltimore Historical District, the Blacks In Wax promotes the teachings of proper Black history. From as far back as slavery, to the recent accomplishments in the Black community. Established in 1988, the Blacks in Wax have upheld their foundational values and continue to promote the uncompromising truth of Black history.",
      type: "Education",
    },

    {
      id: 6,
      Name: "Maryland Science Center",
      Images: [
        "./assets/images/msc-educational-1.jpg",
        "./assets/images/msc-educational-2.jpg",
        "./assets/images/msc-educational-3.jpg",
        "./assets/images/msc-educational-4.jpg",
      ],
      Address: "601 Light St, Baltimore, MD 21230",
      Website: "https://www.mdsci.org/",
      "Brief Description":
        "The Maryland Science Center is focused on teaching the multidisciplinary fashions of science. Located in the Baltimore Inner Harbor, the Science Center aims to promote learning science in an interactive, fun for all ages way. The Science Center explores many of the disciplines of science such as paleontology, chemistry, environmental, astronomy and more. Established in 1797, the Science Center has been expanding and teaching the sciences to those who attend for ages.",
      type: "Education",
    },
    {
      id: 7,
      Name: "B&O Railroad Museum",
      Images: [
        "./assets/images/railroad-educational-1.jpg",
        "./assets/images/railroad-educational-2.jpg",
        "./assets/images/railroad-educational-3.jpg",
        "./assets/images/railroad-educational-4.jpg",
      ],
      Address: "901 W Pratt St, Baltimore, MD 21223",
      Website: "https://www.borail.org/",
      "Brief Description":
        "The B&O Railroad Museum is focused on teaching the history of the American railroad system, in the birthplace of the nation’s first mile of commercial railroad. Conveniently located in Baltimore’s Mount Clare neighborhood, the B&O Railroad brings light to the history of the railroad system by showing artifacts of the evolution of railroading. The B&O goes above and beyond to ensure the enjoyment of the museum by including a public park located right across the street. Established almost 200 years ago, the B&O Railroad has continued to uphold its foundational values. ",
      type: "Education",
    },
    {
      id: 8,
      Name: "Baltimore Museum of Industry",
      Images: [
        "./assets/images/bmi-educational-1.jpg",
        "./assets/images/bmi-educational-2.jpg",
        "./assets/images/bmi-educational-3.jpeg",
        "./assets/images/bmi-educational-4.jpg",
      ],
      Address: "1415 Key Hwy, Baltimore, MD 21230",
      Website: "https://www.thebmi.org/",
      "Brief Description":
        "The Baltimore Museum of Industry is focused on teaching individuals about the history of the labor and industry field. Located right on the Patapsco River in Baltimore, the BMI provides an immersive, interactive experience of the labor and industry field. The BMI teaches all those who visit the stories of significant Baltimore labor workers authentically, ensuring an all-around immersive experience with hands-on activities and more. Established in 1977, the BMI has continued to provide an authentic learning experience for all those who attend.",
      type: "Education",
    },
    {
      id: 9,
      Name: "Babe Ruth Birthplace Museum",
      Images: [
        "./assets/images/baberuth-memorabilia-1.jpg",
        "./assets/images/baberuth-memorabilia-2.png",
        "./assets/images/baberuth-memorabilia-3.png",
        "./assets/images/baberuth-memorabilia-4.jpg",
      ],
      Address: "216 Emory Street, Baltimore, MD 21230",
      Website: "https://baberuthmuseum.org/",
      "Brief Description":
        "The Babe Ruth Birthplace Museum is home to the memorabilia of the late, great Babe Ruth. Located in downtown Baltimore, the Babe Ruth Birthplace is an educational institution that is dedicated to sharing the history and legacy of Babe Ruth. Established in 1974, the Babe Ruth Birthplace continues to preserve the legacy of Babe Ruth to all those who attend.",
      type: "Memorabilia",
    },
    {
      id: 10,
      Name: "Edgar Allan Poe House & Museum",
      Images: [
        "./assets/images/poe-memorabilia-1.JPG",
        "./assets/images/poe-memorabilia-2.jpg",
        "./assets/images/poe-memorabilia-3.jpg",
        "./assets/images/poe-memorabilia-4.jpg",
      ],
      Address: "203 N Amity St, Baltimore, MD 21223",
      Website: "https://www.poeinbaltimore.org/",
      "Brief Description":
        "The Edgar Allan Poe House & Museum is the actual home of the late poet Edgar Allan Poe. Located in West Baltimore, the Poe Homes is a national historic landmark and literary landmark, that aims to tell the story of Edgar Allan Poe. Established in 1949, the Edgar Allan Poe House & Museum is upholding its legacy and expanding across the DMV area.",
      type: "Memorabilia",
    },
  ],
};
const sections = {
  speciality: [
    {
      id: 1,
      name: "Art Museums",
      images: [
        "./assets/images/walters-art-1.jpg",
        "./assets/images/avam-art-1.jpg",
        "./assets/images/bma-art-1.jpg",
        "./assets/images/ngbw-art-1.jpg",
        "./assets/images/rfl-art-1.jpg",
      ],
      description:
        "Immerse yourself in art of all forms,backgrounds and, cultures. Check out Baltimore's best art museums.",
    },
    {
      id: 2,
      name: "Educational Museums",
      images: [
        "./assets/images/msc-educational-1.jpg",
        "./assets/images/railroad-educational-1.jpg",
        "./assets/images/bmi-educational-1.jpg",
      ],
      description:
        "Immerse yourself in interactive, hands-on learning. Check out Baltimore's best educational museums.",
    },
    {
      id: 3,
      name: "Memorabilia Museums",
      images: [
        "./assets/images/baberuth-memorabilia-1.jpg",
        "./assets/images/poe-memorabilia-1.JPG",
      ],
      description:
        "Learn about some of Baltimore's most famous historic figures. Check out Baltimore's best memorabilia museums.",
    },
  ],
};
if (!museum.museums || !museum.museums) {
  console.error("No museums found");
}

document.addEventListener("DOMContentLoaded", function () {
  let filterPages;

  let db;
  const dbName = "MuseumDatabase";
  const request = indexedDB.open(dbName, 1);
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  request.onerror = function (event) {
    console.error("Database error: " + event.target.error);
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Database opened successfully");
  };

  function loadMuseums() {
    //based on page
    let currentPage = window.location.pathname.split("/").pop();
  
    if (currentPage === "artMuseums.html") {
      filterPages = museum.museums.filter((museum) => museum.type === "Art");
    } else if (currentPage === "educationalMuseums.html") {
      filterPages = museum.museums.filter(
        (museum) => museum.type === "Education"
      );
    } else if (currentPage === "memorabiliaMuseums.html") {
      filterPages = museum.museums.filter(
        (museum) => museum.type === "Memorabilia"
      );
    } else if (currentPage === "favorites.html") {
      let favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

      filterPages = museum.museums.filter((museum) =>
        favoriteIds.includes(museum.id.toString())
      );
    } else {
      filterPages = museum.museums;
    }
    createMuseums();
  }

  function loadFavorites() {
    let favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    let container=document.getElementById("museum-list");
    if (!museum || !museum.museums) {
      console.error("Museum data not loaded");
    }
    if(favoriteIds.length === 0){
      container.innerHTML=`<h1 class="no favorites"> Add some favorites to display here. </h1>`;
      console.log("no favorites");
      return;
    }
    filterPages = museum.museums.filter((museum) =>
      favoriteIds.includes(museum.id.toString())
    );
    container.innerHTML=`<h1 class="favorites">Favorites List </h1>`;
    createMuseums();
    console.log("creating favorite");
  }

  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "favorites.html") {
    loadFavorites();
  } else {
    loadMuseums();
  }
  if (currentPage === "index.html") {
    createSection();
  }
  function updateFavorites(museumId) {
    let index = favorites.indexOf(museumId);
    if (index === -1) {
      favorites.push(museumId);
      console.log(`Added ${museumId} to favorites`);
    } else {
      favorites.splice(index, 1);
      console.log(`Removed ${museumId} from favorites`);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));

    document.querySelectorAll(".favorite-button").forEach((button) => {
      if (button.dataset.id === museumId) {
        button.textContent = favorites.includes(museumId)
          ? "Remove from Favorites"
          : "Add to favorites";
      }
    });

    if (window.location.pathname.includes("favorites.html")) {
      loadFavorites();
    }
  }

  function createSection() {
    let template = "";
    let filterSections = sections.speciality;
    filterSections.forEach((sectionItem) => {
      let images = sectionItem.images || [];
      template += `
        <div class="specialityCard">
        <div class="slideshow" id="slideshow-${sectionItem.id}">
            ${images.map((imgSrc, index) => `<img src= "${imgSrc}" class="slide  ${index === 0 ? 'active' : ''}"/>`).join("")}
        </div>
         <h1 class="name"> ${sectionItem.name}</h1>
         <p class="property-name"><strong>${sectionItem.description}</strong> </p>
         <button class="details" data-id="${sectionItem.id}">Learn More</button>
         </div>`;
    });
    let container = document.getElementById("speciality-list");
    if (container) {
      container.innerHTML = template;
      addDetailsEventListener();
      animatedSlideshow();
      console.log("slideshow working");
    } else {
      console.error("Container not being made");
    }
  }

  // updating to include the images
  function createMuseums() {
    let template = "";
    filterPages.forEach((museumItem) => {
      let isFavorited = favorites.includes(museumItem.id.toString());
      let images = museumItem.Images || [];
      template += `
        <div class="card" data-id="${museumItem.id}">
                   <div class="slideshow" id="slideshow-${museumItem.id}">
            ${images
              .map(
                (imgSrc, index) =>
                  `<img src= "${imgSrc}" class="slide  ${
                    index === 0 ? "active" : ""
                  }"/>`
              )
              .join("")}
            <button class="prev" data-id="${museumItem.id}">&#10094;</button>
            <button class="next" data-id="${museumItem.id}">&#10095;</button>
        </div>
            <h1 class="name"> ${museumItem.Name}</h1>
            <div class="property-info">
            <h4 class="property-name"> Address:</h4>
            <address> ${museumItem.Address}</address> 
            <br>
            <h4 class="property-name"> Website: </h4>
            <a href="${museumItem.Website}" target="_blank">${museumItem.Website}</a>
            <p class="about"> ${museumItem["Brief Description"]} </p>
            </div>
        <button class="favorite-button" data-id="${museumItem.id}"> ${
        isFavorited ? "Remove from Favorites" : "Add to Favorites"
      }</button>
        </div>`;
    });
    let container = document.getElementById("museum-list");
    if (container) {
      container.innerHTML = template;
      addFavoritesEventListeners();
      buttonControlledSlideshow();
      console.log("functions added");
    } else {
      console.error("Container not being made");
    }
    document.dispatchEvent(new Event("museumContentUpdated"));
  }
  //function to create user template

  function addFavoritesEventListeners() {
    document.querySelectorAll(".favorite-button").forEach((button) => {
      button.addEventListener("click", function () {
        console.log("button clicked");
        let museumId = this.getAttribute("data-id");
        updateFavorites(museumId);
      });
    });
  }

  function addDetailsEventListener() {
    document.querySelectorAll(".details").forEach((button) => {
      button.addEventListener("click", function () {
        let sectionId = parseInt(this.getAttribute("data-id"), 10);
        if (sectionId === 1) {
          window.location.href = "artMuseums.html";
        } else if (sectionId === 2) {
          window.location.href = "educationalMuseums.html";
        } else if (sectionId === 3) {
          window.location.href = "memorabiliaMuseums.html";
        }
      });
    });
  }

  function animatedSlideshow(slideshow) {
    if (!slideshow) {
      console.log("slideshow not being made", slideshow);
      return;
    }
    let slides = slideshow.querySelectorAll(".slide");
    if (slides.length === 0) return;
    let currentIndex = 0;
    slides[currentIndex].classList.add("active", "fade");

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active", "fade"));
      slides[index].classList.add("active", "fade");
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    if (slideshow.dataset.interval) {
      clearInterval(slideshow.dataset.interval);
    }

    let interval = setInterval(nextSlide, 2500);
    slideshow.dataset.interval = interval;
  }

  function buttonControlledSlideshow(slideshow) {
    if (!slideshow) {
      console.log("slideshow not being made", slideshow);
      return;
    }
    let slides = slideshow.querySelectorAll(".slide");
    if (slides.length === 0) {
      console.log("no slides");
      return;
    }

    let prevButton = slideshow.querySelector(".prev");
    let nextButton = slideshow.querySelector(".next");
    let currentIndex = 0;
    slides[currentIndex].classList.add("active", "fade");

    if (slides.length <= 1) {
      if (prevButton) prevButton.style.display = "none";
      if (nextButton) nextButton.style.display = "none";
      return;
    }

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active", "fade"));
      slides[index].classList.add("active", "fade");
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    if (prevButton) {
      prevButton.removeEventListener("click", prevSlide);
      prevButton.addEventListener("click", prevSlide);
    }

    if (nextButton) {
      nextButton.removeEventListener("click", nextSlide);
      nextButton.addEventListener("click", nextSlide);
    }
  }

  // Apply both functions to different slideshows
  function initSlideshows() {
    document.querySelectorAll(".slideshow").forEach((slideshow) => {
      if(currentPage=="index.html"){
        animatedSlideshow(slideshow);
      } else{
        buttonControlledSlideshow(slideshow);
      }
    });
  }

  initSlideshows();

  document.addEventListener("DOMContentLoaded", initSlideshows);
  document.addEventListener("museumContentUpdated", initSlideshows);

});
