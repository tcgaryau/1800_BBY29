let id = localStorage.getItem("currentActivity");
let docRef = db.collection("Hobbies").doc(id);
let join = document.querySelector(".join");
let unjoin = document.querySelector(".unjoin");
let edit = document.querySelector(".edit");
let cardContainer = document.querySelector("#cardContainer");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let template = "";
          addActivity(doc, template, cardContainer);
          let arrayActivites = doc.data().joinedUsers;
          if (typeof arrayActivites !== "undefined") {
            if (arrayActivites.includes(user.uid)) {
              unjoin.classList.remove("unactive");
            } else {
              join.classList.remove("unactive");
            }
          } else {
            join.classList.remove("unactive");
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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (doc.data().host == user.uid) {
            edit.classList.remove("unactive");
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

function editActivity() {
  window.location.href = "./editActivity.html";
}

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
            <h5 class="card-title">Number of users:</h5>
            <p class="card-text">${joinedMembers}<p>
            </div>
          </div>
        </div>
      </div>
    `;

  container.innerHTML += template;
}

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
