// TOOD unify IDs

// Initialize firebase app and database
//const app = firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();

var currentUser;
function submitForm() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //if user is logged in
      currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      console.log(currentUser);
      console.log("user pressed submit");

      let newActivity = db.collection("Hobbies");

      // Retrieve the values

      let x = document.getElementById("activityCategory");
      let y = document.getElementById("city");

      let aName = document.getElementById("activityName").value;
      var category = x.options[x.selectedIndex].text;
      let description = document.getElementById("descriptionText").value;
      let time = document.getElementById("datetimepicker").value;
      let location = document.getElementById("address").value;
      var city = y.options[y.selectedIndex].value;
      let ZIP = document.getElementById("zip").value;

      console.log(aName);
      console.log(city);

      newActivity.add({
        name: aName,
        category: category,
        description: description,
        time: time,
        location: location,
        province: city,
        postalCode: ZIP,
        host: userID,
      });

      db.collection("users").doc(user.uid).update({
        hostedActivity: firebase.firestore.FieldValue.arrayUnion(aName)
      });
     
    } else {
      console.log("No user is signed in");
    }
  });
}
