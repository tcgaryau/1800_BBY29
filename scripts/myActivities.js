// Declaring variables.
let docRef = db.collection("Hobbies");
let hostActivity = document.querySelector("#hostActivity");
let joinActivity = document.querySelector("#joinActivity");
let joinActivityContainer = document.querySelector("#joinActivityContainer");
let hostActivityContainer = document.querySelector("#hostActivityContainer");

/**
 * Checks if user is logged in, if they are read their joinedActivity and hostedActivity
 * fields and calls the addActivity function. Otherwise, they are redirected to login.html.
 */
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((userDoc) => {
        // Declare local variable to store user joinedActivity and hostedActivity arrays.
        let joinedArray = userDoc.data().joinedActivity;
        let hostedArray = userDoc.data().hostedActivity;

        // Checks if the joinedArray not undefined then calls addActivity
        if (typeof joinedArray !== "undefined") {
          let template = "";
          joinedArray.forEach((element) => {
            docRef
              .doc(element)
              .get()
              .then((doc) => {
                addActivity(doc, template, joinActivityContainer);
              });
          });
        }
        // Checks if the hostedArray not undefined then calls addActivity
        if (typeof hostedArray !== "undefined") {
          let template = "";
          hostedArray.forEach((element) => {
            docRef
              .doc(element)
              .get()
              .then((doc) => {
                addActivity(doc, template, hostActivityContainer);
              });
          });
        }
      });
  } else {
    console.log("You are not logged in");
    window.location.replace("login.html");
  }
});

/**
 * Function to add an activity into the cardContainer. It reads from a collection in Firebase.
 * @param {Object} doc is a reference to a Firebase Collection
 * @param {String} template is a String to be editted
 * @param {Object} container is a reference to the HTML element to add
 */
function addActivity(doc, template, container) {
  let hobbies = doc.data();
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

// Switches the viewable tab to view hostedAcitivites
hostActivity.addEventListener("click", (e) => {
  e.preventDefault;
  joinActivityContainer.classList.add("unactive");
  hostActivityContainer.classList.remove("unactive");
});

// Switches the viewable tab to view the joinedActivities
joinActivity.addEventListener("click", (e) => {
  e.preventDefault;
  joinActivityContainer.classList.remove("unactive");
  hostActivityContainer.classList.add("unactive");
});
