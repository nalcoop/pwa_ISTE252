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