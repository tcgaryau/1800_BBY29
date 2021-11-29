function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      // Do something for the current logged-in user here:
      // console.log(user.uid);
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        var user_Name = userDoc.data().name;
        document.getElementById("loginButton").remove();
        document.getElementById(
          "intro"
        ).innerText = `Welcome to Hobby Buddies, ${user_Name}`;
      });
    } else {
      // No user is signed in.
    }
  });
}
insertName();
