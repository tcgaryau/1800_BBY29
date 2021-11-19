// TOOD unify IDs

// Initialize firebase app and database
//const app = firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();

window.onload = function() {
  document.getElementById("form1").onsubmit = function() {
    window.location.replace("main.html");
    return false;
  };
};

var currentUser;

function submitForm() {
  // Retrieve the values

  let activityCategory = document.getElementById("activityCategory");
  let city = document.getElementById("city");

  let aName = document.getElementById("activityName").value;
  let category = activityCategory.options[activityCategory.selectedIndex].text;
  let description = document.getElementById("descriptionText").value;
  let time = document.getElementById("datetimepicker").value;
  let location = document.getElementById("address").value;
  let aCity = city.options[city.selectedIndex].value;
  let ZIP = document.getElementById("zip").value;

  console.log(`aName: ${aName}`);
  console.log(`category: ${category}`);
  console.log(`description: ${description}`);
  console.log(`time: ${time}`);
  console.log(`location: ${location}`);
  console.log(`aCity: ${location}`);
  console.log(`ZIP: ${ZIP}`);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //if user is logged in
      currentUser = db.collection("users").doc(user.uid);
      let userID = user.uid;
      let newActivity = db.collection("Hobbies");

      newActivity.add({
        name: aName,
        category: category,
        description: description,
        time: time,
        location: location,
        province: aCity,
        postalCode: ZIP,
        host: userID,
      });

      db.collection("users")
        .doc(user.uid)
        .update({
          hostedActivity: firebase.firestore.FieldValue.arrayUnion(aName),
        })
        .then((docRef) =>{
          console.log("New event added with id:" + docRef);
          window.location.replace("main.html")
        });
    } else {
      console.log("No user is signed in");
    }
  });

  return false;
}

