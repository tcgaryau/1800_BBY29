const container = document.querySelector(".container");

// Store last document
let lastDoc = null;

const getNextHobbies = async () => {
  ref = db
    .collection("TestHobbies")
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

  container.innerHTML += template;

  let cards = document.querySelectorAll(".card");
  console.log(cards);
  cards.forEach((card) => {
    card.addEventListener("click", function(e) {
      let id = this.id;
      localStorage.setItem("currentActivity", id);
      // console.log(id);
      window.location.href = "activityDetails.html";
    });
  });

  cards.forEach(card => {
    card.addEventListener("mouseenter", function(e) {
      e.target.style.cursor="pointer";
      e.target.style.color="orange";
    })
  })
  cards.forEach(card => {
    card.addEventListener("mouseleave", function(e) {
      e.target.style.color=null;
    })
  })
  lastDoc = data.docs[data.docs.length - 1];

  if (data.empty) {
    loadMore.removeEventListener("click", handleClick);
    document.getElementById("buttonContainer").innerHTML = "";
  }
};

// Wait for DOM to load
window.addEventListener("DOMContentLoaded", () => getNextHobbies());

const loadMore = document.getElementById("loadMore");

const handleClick = () => {
  getNextHobbies();
};

loadMore.addEventListener("click", handleClick);
