let docRef = db.collection("Hobbies");
let hostActivity = document.querySelector("#hostActivity");
let joinActivity = document.querySelector("#joinActivity");
let joinActivityContainer = document.querySelector("#joinActivityContainer");
let hostActivityContainer = document.querySelector("#hostActivityContainer");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((userDoc) => {
        let joinedArray = userDoc.data().joinedActivity;
        let hostedArray = userDoc.data().hostedActivity;

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

function addActivity(doc, template, container) {
  const hobbies = doc.data();
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

    if (typeof hobbies.joinedUsers !== "undefined") {
      joinedMembers += hobbies.joinedUsers.length;
    }

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
            <h5 class="card-title">Number of joined users.</h5>
            <p class="card-text">${joinedMembers}<p>
            </div>
          </div>
        </div>
      </div>
    `;

  container.innerHTML += template;

  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      let id = this.id;
      localStorage.setItem("currentActivity", id);
      // console.log(id);
      window.location.href = "activityDetails.html";
    });
  });

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      e.target.style.cursor = "pointer";
      e.target.style.color = "orange";
    });
  });
  cards.forEach((card) => {
    card.addEventListener("mouseleave", function (e) {
      e.target.style.color = null;
    });
  });
}

hostActivity.addEventListener("click", (e) => {
  e.preventDefault;
  joinActivityContainer.classList.add("unactive");
  hostActivityContainer.classList.remove("unactive");
});

joinActivity.addEventListener("click", (e) => {
  e.preventDefault;
  joinActivityContainer.classList.remove("unactive");
  hostActivityContainer.classList.add("unactive");
});
