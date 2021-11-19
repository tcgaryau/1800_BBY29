let cardContainer = document.querySelector(".cardContainer");
let fetching = document.querySelector(".fetching");

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
    const hobbies = doc.data();
    template += `
      <div class="card mb-3" id=${doc.id}>
        <div class="row g-0 pt-5">
          <div class="col-md-4">
            <img
              src="./images/cartoongirlrope.jpg"
              class="img-fluid rounded-start"
              alt="rope"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h1 class="card-title">${hobbies.name}</h1>
              <h5 class="card-title">Description:</h5>
              <p class="card-text">${hobbies.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cardContainer.innerHTML += template;

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
      e.target.style.color = "orange";
    });
  });
  cards.forEach((card) => {
    card.addEventListener("mouseleave", function (e) {
      e.target.style.color = null;
    });
  });
  lastDoc = data.docs[data.docs.length - 1];

  if (data.empty) {
    cardContainer.removeEventListener("scroll", handleScroll);
  }
};

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => getNextHobbies());

const handleScroll = () => {
  let fireHeight = cardContainer.scrollTop + cardContainer.offsetHeight;
  if (fireHeight >= cardContainer.scrollHeight) {
    getNextHobbies();
  }
};

cardContainer.addEventListener("scroll", handleScroll);
