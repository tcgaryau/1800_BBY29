// Declaring the variables.
const activityCategory = document.getElementById("activityCategory");
const city = document.getElementById("city");
const activityForm = document.querySelector("#activityForm");

/**
 * Event handler when submitting to create a collection in Hobbies in Firebase.
 */
activityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Variables values from the form.
  let aName = document.getElementById("activityName").value;
  let category = activityCategory.options[activityCategory.selectedIndex].text;
  let description = document.getElementById("descriptionText").value;
  let time = document.getElementById("datetimepicker").value;
  let location = document.getElementById("address").value;
  let aCity = city.options[city.selectedIndex].value;
  let ZIP = document.getElementById("zip").value;
  let max = document.getElementById("maxPeople").value;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //if user is logged in
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
          hostName: user.displayName,
          maxUsers: max,
        }) // Returning the promise to grab the generated ID
        .then((docRef) => {
          let docID = docRef.id;
          db.collection("users")
            .doc(userID)
            .update({
              hostedActivity: firebase.firestore.FieldValue.arrayUnion(docID),
              
            });
          db.collection
          localStorage.setItem("currentActivity", docID);
          window.location.replace("activityDetails.html");
        })
        .catch((error) => {
          console.log("Error adding document: ", error);
        });
    } else {
      console.log("No user is signed in");
    }
  });
});


