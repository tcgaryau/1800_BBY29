// TOOD unify IDs

// Initialize firebase app and database
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// Listen for form submission
document.getElementById('').addEventListener('', submitForm);

function submitForm(e){
    e.preventDefault();

    // Retrieve the values
    var name = getInputVal('');
    var category = getInputVal('');
    var description = getInputVal('');
    var time = getInputVal('');
    var location = getInputVal('');

    // Save activity
    saveActivity(name, description, time, location);


}

// Function to retrieve the form's values
function getInputVal(id){
    return document.getElementById(id).value; 
}

// Save activity to firebase
function saveActivity(name, description, time, location){
    var newActivityRed = db.collection("Hobbies").doc(category).set({
        name: name,
        description: description,
        time:  time,
        location: location
    })
}