/**
 * Declaring variables to be used
 */
let id = localStorage.getItem("currentActivity");
let docRef = db.collection("Hobbies").doc(id);
let join = document.querySelector(".join");
let unjoin = document.querySelector(".unjoin");
let edit = document.querySelector(".edit");
let cardContainer = document.querySelector("#cardContainer");

/**
 * Checking if the user is logged in, redirects to log in if they are not logged in.
 */
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let template = "";
          addActivity(doc, template, cardContainer);
          let arrayActivites = doc.data().joinedUsers;
          //Checking if the user created this activity
          checkJoineduser();
          if (doc.data().host == user.uid) {
            edit.classList.remove("unactive");
          } else {
            // Check if this array exists first.
            if (typeof arrayActivites !== "undefined") {
              // Check if the user is in the joined activity array.
              if (arrayActivites.includes(user.uid)) {
                unjoin.classList.remove("unactive");
              } else {
                join.classList.remove("unactive");
              }
            } else {
              join.classList.remove("unactive");
            }
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    console.log("You are not logged in");
    window.location.replace("login.html");
  }
});

/**
 * Function to check in real time if the joined user has changed.
 */
function checkJoineduser() {
  docRef.onSnapshot((doc) => {
    let joinedMembers = document.querySelector("#joinedMembers");
    let joinedMembersNum = 1;

    if (typeof doc.data().joinedUsers !== "undefined") {
      joinedMembersNum += doc.data().joinedUsers.length;
    }

    joinedMembers.innerHTML = joinedMembersNum;
  });
}

/**
 * Function for the button in editActivity.html to switch the page.
 */
function editActivity() {
  window.location.href = "./editActivity.html";
}

/**
 * Function to add an activity into the cardContainer. It reads from a collection in Firebase.
 * @param {Object} doc is a reference to a Firebase Collection
 * @param {String} template is a String to be editted
 * @param {Object} container is a reference to the HTML element to add
 */
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
            <h5 class="card-title">Location:</h5>
            <p class="card-text">${hobbies.location}, ${hobbies.postalCode}, ${hobbies.province}</p>
            <h5 class="card-title">Number of users:</h5>
            <p class="card-text" id="joinedMembers">${joinedMembers}<p>
            </div>
          </div>
        </div>
      </div>
    `;

  container.innerHTML += template;
}

/**
 * Function to remove the current user from the Activity.
 */
function unjoinActivity() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .update({
          joinedActivity: firebase.firestore.FieldValue.arrayRemove(id),
        });
      docRef.update({
        joinedUsers: firebase.firestore.FieldValue.arrayRemove(user.uid),
      });

      join.classList.remove("unactive");
      unjoin.classList.add("unactive");
    }
  });
}

/**
 * Function to add the current user into the Activity.
 */
function joinActivity() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let userID = user.uid;
      db.collection("users")
        .doc(userID)
        .update({
          joinedActivity: firebase.firestore.FieldValue.arrayUnion(id),
        });
      docRef.update({
        joinedUsers: firebase.firestore.FieldValue.arrayUnion(userID),
      });
      // join.classList.remove("active");
      join.classList.add("unactive");
      unjoin.classList.remove("unactive");
      // unjoin.classList.add("active");
    } else {
      console.log("Ruh roh");
    }
  });
}
