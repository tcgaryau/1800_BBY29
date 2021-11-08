// TOOD unify IDs

// Initialize firebase app and database
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference message collection
var activity.

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

}

// Function to retrieve the form's values
function getInputVal(id){
    return document.getElementById(id).value; 
}