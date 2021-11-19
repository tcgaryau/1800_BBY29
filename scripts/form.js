const activityCategory = document.getElementById("activityCategory");
const city = document.getElementById("city");
const activityForm = document.querySelector("#activityForm");

// window.onload = () => {
//   document.getElementById("form1").onsubmit = () => {
//     window.location.replace("main.html");
//     return false;
//   };
// };

var currentUser;

activityForm.addEventListener("submit", event => {
  event.preventDefault();
  let aName = document.getElementById("activityName").value;
  let category = activityCategory.options[activityCategory.selectedIndex].text;
  let description = document.getElementById("descriptionText").value;
  let time = document.getElementById("datetimepicker").value;
  let location = document.getElementById("address").value;
  let aCity = city.options[city.selectedIndex].value;
  let ZIP = document.getElementById("zip").value;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //if user is logged in
      currentUser = db.collection("users").doc(user.uid);
      let userID = user.uid;
      let newActivity = db.collection("Hobbies");

      //Adding activity into firestore
      newActivity
        .add({
          name: aName,
          category: category,
          description: description,
          time: time,
          location: location,
          province: aCity,
          postalCode: ZIP,
          host: userID,
        }) // Returning the promise to grab the generated ID
        .then((docRef) => {
          let docID = docRef.id;
          db.collection("users")
            .doc(user.uid)
            .update({
              hostedActivity: firebase.firestore.FieldValue.arrayUnion(docID),
            });
          window.location.replace("main.html");
        })
        .catch((error) => {
          console.log("Error adding document: ", error);
        });
    } else {
      console.log("No user is signed in");
    }
  });
});
