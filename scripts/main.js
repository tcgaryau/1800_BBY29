//Declaring variables.
let cardContainer = document.querySelector(".cardContainer");
let fetching = document.querySelector(".fetching");


/**
 * Checks if the user is logged in. If they are not it will redirect them to the login page.
 */
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  } else {
    window.location.replace("login.html");
  }
});

// Store last document
let lastDoc = null;

/**
 * Function that reads 3 activities from our Firebase document Hobbies.
 */
const getNextHobbies = async () => {
  fetching.classList.add("active");

  ref = db
    .collection("Hobbies")
    .orderBy("name")
  const data = await ref.get();

  fetching.classList.remove("active");
  lastDoc = data.docs[data.docs.length - 1];

  if (data.empty) {
    document.removeEventListener("scroll", handleScroll);
  } else {
    data.docs.forEach((doc) => {
      
      addActivity(doc, cardContainer);
    });
  }
};

/**
 * Function to add an activity into the cardContainer. It reads from a collection in Firebase.
 * @param {Object} doc is a reference to a Firebase Collection
 * @param {String} template is a String to be editted
 * @param {Object} container is a reference to the HTML element to add
 */
function addActivity(doc, container) {
  const hobbies = doc.data();
  let template = "";
  let src = "";
  switch (hobbies.category) {
    case "Gaming":
      src = "gaming.png";
      break;
    case "Sports":
      src = "sports.png";
      break;
    case "Foods":
      src = "food.png";
      break;
    case "Arts":
      src = "arts.png";
      break;
    case "Music":
      src = "music.png";
      break;
    case "Miscellaneous":
      src = "miscellaneous.png";
      break;
  }

  let joinedMembers = 1;

  // Checks joinedUser to make sure this array exists.
  if (typeof hobbies.joinedUsers !== "undefined") {
    joinedMembers += hobbies.joinedUsers.length;
  }

  // Adds a card into the container.
  template += `
      <div class="card mb-3" id=${doc.id}>
        <div class="row g-0 pt-5 bg-light">
          <div class="col-md-4">
            <img
              src="./images/${src}"
              class="img-fluid rounded-start"
              alt="${hobbies.category}"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h1 class="card-title">${hobbies.name}</h1>
              <h5 class="card-title">Description:</h5>
              <p class="card-text">${hobbies.description}</p>
              <h5 class="card-title">Host:</h5>
              <p class="card-text">${hobbies.hostName}</p>
              <h5 class="card-title">Number of users:</h5>
              <p class="card-text">${joinedMembers}<p>
            </div>
          </div>
        </div>
      </div>
    `;
  container.innerHTML += template;

  // Checks for all card class and adds an id from Firebase into their attribute.
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      let id = this.id;
      localStorage.setItem("currentActivity", id);
      // console.log(id);
      window.location.href = "activityDetails.html";
    });
  });

  // Removes the fetching text.
  fetching.classList.remove("active");

  // Adds a mouse pointer to all the cards.
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      e.target.style.cursor = "pointer";
      e.target.style.color = "#b4c6a6";
    });
  });

  // Removes the mouse pointer when it exists the card.
  cards.forEach((card) => {
    card.addEventListener("mouseleave", function (e) {
      e.target.style.color = null;
    });
  });
}

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => getNextHobbies());
