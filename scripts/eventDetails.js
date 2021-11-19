let id = localStorage.getItem("currentActivity");
let docRef = db.collection("TestHobbies").doc(id);

docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      let aName = doc.data().name;
      let aDescription = doc.data().description;
      console.log(aName);
      console.log(aDescription);
    } else {
      console.log("No such document!");
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
