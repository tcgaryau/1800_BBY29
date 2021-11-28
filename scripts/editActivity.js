let activityCategory = document.getElementById("activityCategory");
const city = document.getElementById("city");
const activityForm = document.querySelector("#activityForm");
let id = localStorage.getItem("currentActivity");

window.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      db.collection("Hobbies")
        .doc(id)
        //.get()
        .onSnapshot((docRef) =>{
        //.then(function (docRef) {
          document.getElementById("activityName").value = docRef.data().name;
          document.getElementById("activityCategory").value =
            docRef.data().category;
          document.getElementById("descriptionText").value =
            docRef.data().description;
          document.getElementById("maxPeople").value=docRef.data().maxUsers;
          document.getElementById("datetimepicker").value = docRef.data().time;
          document.getElementById("address").value = docRef.data().location;
          document.getElementById("city").value = docRef.data().province;
          document.getElementById("zip").value = docRef.data().postalCode;
        });
    }
  });
});

activityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let aName = document.getElementById("activityName").value;
  let category = activityCategory.options[activityCategory.selectedIndex].text;
  let description = document.getElementById("descriptionText").value;
  let time = document.getElementById("datetimepicker").value;
  let location = document.getElementById("address").value;
  let aCity = city.options[city.selectedIndex].value;
  let ZIP = document.getElementById("zip").value;

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      //if user is logged in
      let userID = user.uid;
      let newActivity = db.collection("Hobbies").doc(id);

      //Adding activity into firestore
      await newActivity
        .update({
          name: aName,
          category: category,
          description: description,
          time: time,
          location: location,
          province: aCity,
          postalCode: ZIP,
        }) // Returning the promise to grab the generated ID
        .catch((error) => {
          console.log("Error adding document: ", error);
        });
      window.location.replace("activityDetails.html");
    } else {
      console.log("No user is signed in");
    }
  });
});
