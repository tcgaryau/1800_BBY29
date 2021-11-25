let cardContainer = document.querySelector(".cardContainer");
let fetching = document.querySelector(".fetching");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  } else {
    window.location.replace("login.html");
  }
});

// Store last document
let lastDoc = null;

const getNextHobbies = async () => {
  fetching.classList.add("active");

  ref = db
    .collection("Hobbies")
    .orderBy("name")
    .startAfter(lastDoc || 0)
    .limit(3);
  const data = await ref.get();

  //src image
  // output
  let template = "";
  data.docs.forEach((doc) => {
    addActivity(doc, template, cardContainer);
  })

  fetching.classList.remove("active");
  lastDoc = data.docs[data.docs.length - 1];

  if (data.empty) {
    document.removeEventListener("scroll", handleScroll);
  }
};

const handleScroll = () => {
  let triggerHeight = window.innerHeight + window.scrollY;
  console.log(triggerHeight);
  if (triggerHeight >= document.body.offsetHeight) {
    getNextHobbies();
  }
};

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

  fetching.classList.remove("active");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      e.target.style.cursor = "pointer";
      e.target.style.color = "#b4c6a6";
    });
  });
  cards.forEach((card) => {
    card.addEventListener("mouseleave", function (e) {
      e.target.style.color = null;
    });
  });
}

document.addEventListener("scroll", handleScroll);

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => getNextHobbies());