let activityCategory = document.getElementById("activityCategory");
const city = document.getElementById("city");
const activityForm = document.querySelector("#activityForm");
let id = localStorage.getItem("currentActivity");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        db.collection("Hobbies")
            .doc(id)
            .get()
            .then(function (docRef) {

                document.getElementById("activityName").value = docRef.data().name;
                activityCategory.options[activityCategory.selectedIndex].text = docRef.data().category;
                document.getElementById("descriptionText").value = docRef.data().description;

                document.getElementById("datetimepicker").value = docRef.data().time;
                document.getElementById("address").value = docRef.data().location;
                city.options[city.selectedIndex].value = docRef.data().province;
                document.getElementById("zip").value = docRef.data().postalCode;
                console.log(document.getElementById("activityName").value);

            });
    }

});

activityForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let aName = document.getElementById("activityName").value;
    let category = activityCategory.options[activityCategory.selectedIndex].text;
    let description = document.getElementById("descriptionText").value;
    let time = document.getElementById("datetimepicker").value;
    let location = document.getElementById("address").value;
    let aCity = city.options[city.selectedIndex].value;
    let ZIP = document.getElementById("zip").value;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //if user is logged in
            let userID = user.uid;
            let newActivity = db.collection("Hobbies").doc(id);

            //Adding activity into firestore
            newActivity
                .update({
                    name: aName,
                    category: category,
                    description: description,
                    time: time,
                    location: location,
                    province: aCity,
                    postalCode: ZIP,
                    host: userID,
                    hostName: user.displayName,
                }) // Returning the promise to grab the generated ID
                // .then((docRef) => {
                //     let docID = docRef.id;
                //     db.collection("users")
                //         .doc(userID)
                //         .update({
                //             hostedActivity: firebase.firestore.FieldValue.arrayUnion(docID),
                //         });
                //     localStorage.setItem("currentActivity", docID);
                //     window.location.replace("activityDetails.html");
                // })
                // .catch((error) => {
                //     console.log("Error adding document: ", error);
                // });
        } else {
            console.log("No user is signed in");
        }
    });
});