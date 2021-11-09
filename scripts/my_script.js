function sayHello() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            console.log(user.uid);
            db.collection("users").doc(user.uid)
                .get()
                .then(function (doc) {
                    var n = doc.data().name;
                    console.log(n);
                    //$("#username").text(n);
                    document.getElementById("username").innerText = n;
                })
        } else {
            // No user is signed in.
        }
    });
}

function insertName() {
    firebase.auth().onAuthStateChanged((user) => {
      // Check if user is signed in:
      if (user) {
        // Do something for the current logged-in user here:
        console.log(user.uid);
        //go to the correct user document by referencing to the user uid
        currentUser = db.collection("users").doc(user.uid);
        //get the document for current user.
        currentUser.get().then((userDoc) => {
          var user_Name = userDoc.data().name;
          console.log(user_Name);
          //method #1:  insert with html only
          document.getElementById("intro").innerText = user_Name; //using javascript
          //method #2:  insert using jquery
          //$("#name-goes-here").text(user_Name); //using jquery
        });
      } else {
        // No user is signed in.
      }
    });
  }
  insertName();
