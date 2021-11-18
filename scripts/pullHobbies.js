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
      <div class="card mb-3">
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
              <h5 class="card-title">${hobbies.name}</h5>
              <p class="card-text">Description:<br>${hobbies.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML += template;

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
