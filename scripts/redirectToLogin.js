/**
 * Redirects to login.html if not logged in
 */
firebase.auth().onAuthStateChanged((user) => {
  //If the user is logged in, do nothing
  if (user) {
  }
  //If user is not logged in, redirect to login.html
  else {
    window.location.replace("login.html");
  }
});
