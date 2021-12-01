## Our Web Application Hobby Buddies

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This browser based web application helps people reconnect after CoVID by facilitating group activities based on common interests and hobbies. They can create or join other user-created activities.

* Authors (Group BBY29): 
* Felix Ng
* Gary Au
* Dongwan Kang (Jake)
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Firebase, Firestore
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── 404.html                 # Firebase generated error page
├── activityDetails.html     # Activity HTML file, this is what users see after clicking on an Activity.
├── createActivities.html    # Creating HTML file, this is the form page user fills out to create an Activity.
├── editActivity.html        # HTML file, this is a form from activityDetails.html that allows users to edit their Activity.
├── index.html               # landing HTML file, this is what users see when they come to the url.
├── log                      # Log from git conflicts
├── login.html               # Login HTML file, this allows user to log in.
├── main.html                # main HTML file, this is what users to browse through all available Activities.
├── myActivities.html        # HTML file, this shows all the hosted and joined activities from the user.
├── package-lock.json        # Package file depedency.
├── package.json             # Package file depedency.
├── profile.html             # template HTML file, this is the user profile page for future work.
├── README.md
└── storage.rules            # Firebase generated file

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /arts.png                # 
    /favicon.png             # 
    /food.png                # 
    /gaming.png              # 
    /hb_logo.png             # 
    /itsme.png               # 
    /miscellaneous.png       # 
    /music.png               # 
    /sports.png              # 
├── node_modules             # Folder for node_modules
├── scripts                  # Folder for scripts
    /activityDetails.js      # JavaScript file, Reads our Firestore Hobbies data.
    /client.js               # JavaScript file, Generates our navbar by reading it from ./xml/navbar.xml.
    /editActivity.js         # JavaScript file, Reads/Updates/Deletes the activity detail in Hobbies from Firestore.
    /form.js                 # JavaScript file, Creates the activity detail into Hobbies from Firestore.
    /index.js                # JavaScript file, Loads our welcome messsage and Reads in user from Firestore.
    /login.js                # JavaScript file, authenticate from Firebase.
    /main.js                 # JavaScript file, Reads activitys in Hobbies from Firestore and populates them.
    /myActivities.js         # JavaScript file, Reads Activites in user from Firestore and populates them into the page.
    /redirectToLogin.js      # JavaScript file, Redirects the user to the index.html page when they are not logged in.
├── styles                   # Folder for styles
    /my_style.css            # Styling for the web app.
└── xml                      # Folder for xml
    /navbar.xml              # Navbar code that gets called from client.js

Firebase hosting files: 
├── .firebaserc...
├── firebase.json            # Firebase generated file
├── firestore.indexes.json   # Firebase generated file
└── firestore.rules          # Firebase generated file