let id = localStorage.getItem("currentActivity");
let docRef = db.collection("Hobbies").doc(id);
let join = document.querySelector(".join");
let unjoin = document.querySelector(".unjoin");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let aName = doc.data().name;
          let aDescription = doc.data().description;
          let arrayActivites = doc.data().joinedUsers;
          document.querySelector("h1").innerHTML = aName;
          document.querySelector("p").innerHTML = aDescription;
          console.log(arrayActivites);
          console.log(user.uid);
          console.log(arrayActivites.includes(user.uid));
          if (arrayActivites.includes(user.uid)) {
            unjoin.classList.remove("unactive");
            // unjoin.classList.add("active");
          } else {
            join.classList.remove("unactive");
            // join.classList.add("active");
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
  }
});

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
      // join.classList.add("active");
      // unjoin.classList.remove("active");
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