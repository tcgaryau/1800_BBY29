// TOOD unify IDs

// Initialize firebase app and database
//const app = firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();


function submitForm(){
    console.log("user pressed submit")

    let newActivity = db.collection("Hobbies");

    // Retrieve the values
    
    let aName = document.getElementById('activityName').value;
    //let category = document.getElementById('activityCategory');
    let description = document.getElementById('descriptionText').value;
    let time = document.getElementById('datetimepickerExample').value;
    let location = document.getElementById('address').value;
    let ZIP = document.getElementById('zip').value;

    console.log(aName);

    newActivity.add({
        name: aName,
        //category: category,
        description: description,
        time:  time,
        location: location,
        ZIP: ZIP
    })
}

