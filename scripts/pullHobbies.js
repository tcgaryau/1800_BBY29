/*
function displayHikes() {
  db.collection("Hikes")
    .get()
    .then((allHikes) => {
      allHikes.forEach((doc) => {
        var hikeName = doc.data().name; //gets the name field
        var hikeID = doc.data().code; //gets the unique ID field
        document.getElementById(hikeID).innerText = hikeName;
      });
    });
}
*/

var Count = 0;

function getCollectionSize() {
  db.collection("Hobbies")
    .get()
    .then((snap) => {
      size = snap.size; // will return the collection size
      console.log(size);
    });
}

