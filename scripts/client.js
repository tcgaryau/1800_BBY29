function ajaxGET(path, callback) {
  // Document is loaded now so go and fetch a resource.
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
  "navbar-dark",
  "bg-dark",
  "fixed-top"
);

ajaxGET("./xml/navbar.xml", function (data) {
  navBar.innerHTML = data;
});

//Footer - deleted for now
//let footer = document.getElementById("footer");
//footer.classList.add("bg-dark", "text-center", "text-lg-start", "fixed-bottom");

//ajaxGET("./xml/footer.xml", function (data) {
//  footer.innerHTML = data;
//});
