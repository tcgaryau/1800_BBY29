let id = localStorage.getItem("currentActivity");
let docRef = db.collection("Hobbies").doc(id);
let join = document.querySelector("#join");
let unjoin = document.querySelector("#unjoin");

docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      let aName = doc.data().name;
      let aDescription = doc.data().description;
      console.log(aName);
      console.log(aDescription);
      document.querySelector("h1").innerHTML = aName;
      document.querySelector("p").innerHTML = aDescription;
      
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });

  function joinActivity() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        let userID = user.uid;
        db.collection("users").doc(userID).update({
          joinedActivity: firebase.firestore.FieldValue.arrayUnion(id)
        });
        docRef.update({
          joinedUsers: firebase.firestore.FieldValue.arrayUnion(userID)
        })

        join.classList.add("unactive");
        unjoin.classList.add("active");
      }
      else {
        console.log("Ruh roh");
      }
    })
  };

  function unjoinActivity() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection("users").doc(user.uid).update({
          joinedActivity: firebase.firestore.FieldValue.arrayRemove(id)
        });
        docRef.update({
          joinedUsers: firebase.firestore.FieldValue.arrayRemove(user.uid)
        });
        
        join.classList.remove("unactive");
        unjoin.classList.remove("active");

      }
    })
  }
