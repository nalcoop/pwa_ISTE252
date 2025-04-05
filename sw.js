const VERSION = "v1";
// use the client side of 

//offline resources list
const APP_STATIC_RESOURCES = [
  "index.html",
  "artMuseums.html",
  "memorabiliaMuseums.html",
  "educationalMuseums.html",
  "favorites.html",
  "styles.css",
  "app.js",
  "museumtracker.json",
];

const CACHE_NAME = `museum-tracker-${VERSION}`;
let cache;

//install event listener to retrieve and store the cached resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try{
        cache = await caches.open(CACHE_NAME);
        console.log("await is functioning");
        cache.addAll(APP_STATIC_RESOURCES);
        console.log("add all is working");
      } catch(error){
        console.log("Cached failed: ",error);
      }  
    })()
  );
});

//listen for activate event update cache if needed and delete old cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      //get existing cache names
      const names = await caches.keys();

      //iterate through all the cache promises
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            //delete old cache
            return caches.delete(name);
          }
        })
      ); //promise.all

      //enable the service worker to take control of clients in scope
      await clients.claim();
    })()
  );
}); //activate
//listen for fetch event and intercept it so we can work offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
  
        //try to get requested resource from the cache
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
  
        //if not in cache, try to fetch from the network
        try {
          const networkResponse = await fetch(event.request);
  
          //cache for future use
          cache.put(event.request, networkResponse.clone());
  
          return networkResponse;
        } catch (error) {
          console.error("Fetch failed; returning offline page instead", error);
  
          //if request is for a page, return index.html as a fallback
          if (event.request.mode === "navigate") {
            return cache.match("/index.html");
          }
  
          //for other resources, you could return a default offline asset
          //or just let error propagate
          throw error;
        } //catch
      })()
    ); //respondWith
  }); //fetch
  
  //create a broadcast channel - name needs to match the name in the PWA (app.js)
  const channel = new BroadcastChannel("museum_channel");
  
  //listen for messages
  channel.onmessage = (event) => {
    console.log("Received message from PWA in SW: ", event.data);
  
    if (event.data === "fetch-museums") {
      console.log("Fetching Museum Data!");
      fetchMuseums();
    }
  };

  const museum= {
    "museums": [
        {
            "id":1,
            "Name": "Walters Art Museum",
            "Address": "600 N Charles St, Baltimore, MD 21201",
            "Website": "https://thewalters.org/",
            "Description": 
            "The Walters Art Museum is focused on sharing art that tells the story of diverse cultures through the millennials. Located in Baltimore's Mount Vernon community, the Walters’ utilizes its exhibits, collections and educational programs to help the youth of the city and across the world. A local free museum that houses history from multiple cultures, ranging from 19th century French & Ethiopian paintings, ancient Roman artifacts and even images of the Buddha. The Walters’ was established in 1934 “for the benefit of the public” and  has continued that mission in the current years."
              
        },
        {
            "id":2,
            "Name": "American Visionary Art Museum",
            "Address": "800 Key Highway, Baltimore, MD 21230",
            "Website": "https://www.avam.org/",
            "Description": 
            "The American Visionary Art Museum is focused on promoting and sharing art of all mediums. Located in the Federal Hill Neighborhood in the Baltimore Inner Harbor, the AVAM aims to promote visionary art, by way of teaching and storytelling. The AVAM shares ancient art from diverse cultures, even sharing “art” that may have not been considered art. Adhering to their mission established in 1984, the AVAM continues to promote creativity and expression by showing nontraditional art in a new experimental form for all those to see."     
        },
        {
            "id":3,
            "Name": "Baltimore Museum of Art",
            "Address": "10 Art Museum Drive, Baltimore, MD 21218",
            "Website": "https://artbma.org/ ",
            "Description": 
            "The Baltimore Museum of Art is focused on connecting the art of Baltimore and Baltimore to the world. Located in Baltimore’s Charles Village neighborhood, the BMA aims to share multi-century art from all across the world. For over 100 years, the BMA has been sharing  art and adhering to its foundational values."     
        },
        {
            "id":4,
            "Name": "The National Great Blacks In Wax Museum",
            "Address": "1601-03 East North Ave, Baltimore, MD 21213",
            "Website": "https://www.greatblacksinwax.org/",
            "Description": 
            "The National Great Blacks In Wax Museum is focused on sharing the dark raw history of Black Americans. Located in Old East Baltimore Historical District, the Blacks In Wax promotes the teachings of proper Black history. From as far back as slavery, to the recent accomplishments in the Black community. Established in 1988, the Blacks in Wax have upheld their foundational values and continue to promote the uncompromising truth of Black history."     
        },
        {
            "id":5,
            "Name":"Reginald F. Lewis Museum of Maryland African American History & Culture", 
            "Address":"830 E Pratt St, Baltimore, MD 21202",
            "Website":" https://www.lewismuseum.org/",
            "Description":"The Reginald F. Lewis Museum of Maryland African American History & Culture is focused on sharing the story of African American Marylanders through the arts. Located in downtown Baltimore, Reginald F. Lewis shares the preserved history of African American Marylanders through art, documents, and oral history presentations. The Reginald F. Lewis is based on the expansion of Black/African American arts and history with its name coming from one of the few Black millionaires. Established in 2005, the Reginald F. Lewis Museum has continued sharing the history of Black Marylanders for all those who attend."

        },
        {
            "id":6,
            "Name":"Maryland Science Center", 
            "Address":"601 Light St, Baltimore, MD 21230",
            "Website":"https://www.mdsci.org/",
            "Description":"The Maryland Science Center is focused on teaching the multidisciplinary fashions of science. Located in the Baltimore Inner Harbor, the Science Center aims to promote learning science in an interactive, fun for all ages way. The Science Center explores many of the disciplines of science such as paleontology, chemistry, environmental, astronomy and more. Established in 1797, the Science Center has been expanding and teaching the sciences to those who attend for ages."

        },
        {
            "id":7,
            "Name":"B&O Railroad Museum", 
            "Address":"901 W Pratt St, Baltimore, MD 21223",
            "Website":"https://www.borail.org/",
            "Description":"The B&O Railroad Museum is focused on teaching the history of the American railroad system, in the birthplace of the nation’s first mile of commercial railroad. Conveniently located in Baltimore’s Mount Clare neighborhood, the B&O Railroad brings light to the history of the railroad system by showing artifacts of the evolution of railroading. The B&O goes above and beyond to ensure the enjoyment of the museum by including a public park located right across the street. Established almost 200 years ago, the B&O Railroad has continued to uphold its foundational values. "

        },
        {
            "id":8,
            "Name":":Baltimore Museum of Industry", 
            "Address":"1415 Key Hwy, Baltimore, MD 21230",
            "Website":"https://www.thebmi.org/",
            "Description":"The Baltimore Museum of Industry is focused on teaching individuals about the history of the labor and industry field. Located right on the Patapsco River in Baltimore, the BMI provides an immersive, interactive experience of the labor and industry field. The BMI teaches all those who visit the stories of significant Baltimore labor workers authentically, ensuring an all-around immersive experience with hands-on activities and more. Established in 1977, the BMI has continued to provide an authentic learning experience for all those who attend."

        },
        {
            "id":9,
            "Name":"Babe Ruth Birthplace Museum", 
            "Address":"216 Emory Street, Baltimore, MD 21230",
            "Website":":https://baberuthmuseum.org/",
            "Description":"The Babe Ruth Birthplace Museum is home to the memorabilia of the late, great Babe Ruth. Located in downtown Baltimore, the Babe Ruth Birthplace is an educational institution that is dedicated to sharing the history and legacy of Babe Ruth. Established in 1974, the Babe Ruth Birthplace continues to preserve the legacy of Babe Ruth to all those who attend."

        },
        {
            "id":10,
            "Name":"Edgar Allan Poe House & Museum", 
            "Address":"203 N Amity St, Baltimore, MD 21223",
            "Website":"https://www.poeinbaltimore.org/",
            "Description":"The Edgar Allan Poe House & Museum is the actual home of the late poet Edgar Allan Poe. Located in West Baltimore, the Poe Homes is a national historic landmark and literary landmark, that aims to tell the story of Edgar Allan Poe. Established in 1949, the Edgar Allan Poe House & Museum is upholding its legacy and expanding across the DMV area."

        }      
    ]
};

  function fetchMuseums(){
    fetch("museumtracker.json")
    .then(response => response.json())
    .then((data) => {
        console.log("Got Museums:", data);
        return addDataToIndexedDB(data);
      }) //store in database
      .then(() => {
        channel.postMessage("data-updated");
      }) //notify the PWA
      .catch((error) => {
        console.error("Error fetching museums: ", error);
        channel.postMessage("fetch-error"); //optionally send message back
      });
  }

  function addDataToIndexedDB(data) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("MuseumDatabase", 1);
  
      request.onerror = (event) => {
        reject("IndexedDB error: " + event.target.error);
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["museumData"], "readwrite");
        const objectStore = transaction.objectStore("museumData");
  
        //Add each joke
        data.museums.forEach((museum) => {
          let myuuid = crypto.randomUUID();
          museum.id = myuuid;
          console.log(museum);
          objectStore.add(museum);
        });
        transaction.oncomplete = () => resolve();
        transaction.onerror = (event) =>
          reject("Transaction error: " + event.target.error);
      };
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("museumData", { keyPath: "id" });
      };
    }); //promise
  }