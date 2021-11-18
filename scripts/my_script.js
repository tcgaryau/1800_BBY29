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
        // console.log(user.uid);
        //go to the correct user document by referencing to the user uid
        currentUser = db.collection("users").doc(user.uid);
        //get the document for current user.
        currentUser.get().then((userDoc) => {
          var user_Name = userDoc.data().name;
          document.getElementById("loginButton").remove();
          document.getElementById("intro").innerText = `Welcome to Hobby Buddies, ${user_Name}`; 
        });
      } else {
        // No user is signed in.
      }
    });
  }
  insertName();

  function logOut() {
    firebase.auth().signOut().then(() => {
      //sign out
    }).catch(error => {
      //an error
    })
  }
