function ajaxGET(path, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      callback(this.responseText);
    }
  };
  xhr.open("GET", path);
  xhr.send();
}

//Navbar - DOM
let navBar = document.getElementById("navbar");
navBar.classList.add(
  "navbar",
  "navbar-expand-lg",
  "navbar-light",
  "bg-light",
  "fixed-top"
);

ajaxGET("./xml/navbar.xml", function (data) {
  navBar.innerHTML = data;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let logout = document.createElement("button");
      logout.setAttribute("class", "btn btn-outline-dark");
      logout.setAttribute("type", "button");
      logout.setAttribute("id", "logout");
      logout.innerHTML = "Log out";
      document.querySelector("#navbarNav").appendChild(logout);
      document.querySelector("#logout").addEventListener("click", () => {
        firebase
          .auth()
          .signOut()
          .then(function () {
            console.log("successfully signed out");
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  });
});
