//Redirect to login
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
  } else {
    window.location.replace("login.html");
  }
});