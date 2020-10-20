url
To run this project after you clone it you have to install the npm packages:
    npm install
You can run it on localhost:
    npm run start
You can build it with:
    npm run build

Technologies used:
    Sass, React, Html, CSS, Javascript
Other tools used:
    npm, git, webpack
Editor used:
    Visual Studio Code

Points of interest:
    - src/app.js
        React.lazy let us render only-needed components.
        React.Suspense loads fallback component Loading while loading.
        NavBar component is always loaded.
        Switch loads components based on url

    - src/components/Loading.js
        spinner created with html and css
        loading messsage controlled by "message" state.
        useEffect hook which changes the message
            to have one extra dot in time based on the speed variable.
            to return to zero dots when it has already 3 dots.
    
    - src/components/NavBar.js
        "active" state is used to decide if the menu is shown or not while screen size is less than 800px.
        div element with class header is positioned fixed to the top of the website and contains:
            "burger btn" hidden with screen size bigger than 800px.
            "logo"
            text "dashboard" which is hidden while screen size is 800px or less .
            "logout" with the "LOGOUT" text hidden while screen size is 800px or less 
        div element with class navigation is positioned fixed
            to the top of the website  while screen size is 800px or less  and controlled by "active" state to be open or not.
            to the left of the website while screen is bigger than 800px
    
    - src/components/Colors.js
        uses useWrapper custom hook to get "loading" and "error"
        uses sessionStorage to get "colors"
        based on the values of "loading", "error" and "colors" displays the content.

    - src/components/Users.js
        uses useWrapper custom hook to get "loading" and "error"
        uses sessionStorage to get "users"
        uses useDelete custom hook to get "activeBtn", "checked", "toggle" and "deleteAction" 
            "toggle" and "delete" are functions.
        based on the values of "loading", "error", "users", "activeBtn" and "checked" displays the content.
        "deleteAction" is called when the button delete is pressed.
        "checked" is called when a checkbox is clicked
    
    - src/components/useWrapper.js
        dispatch case "sessionLoad" sets loading to false to stop loading.
        dispatch case "success" sets loading to false to stop loading and saves data to session storage
        dispatch case "error" stops loading to false to stop loading, sets error to true to display error message
        "_isMounted" is used to clear safely in case component is changed before it is finished with the useEffect.
        the useEffect
            if we have already saved the data needed in the session dispatches "sessionLoad"
            else it tries to fetch the data
                if it succeeds it will dispatch "success"
                else if error it will dispatch "error"
        "dataKind" should be "users" or "colors"
        returns "loading" and "error" (it also saves data in session storage as mentioned)

    - src/components/useDelete.js
        dispatch case "delete" removes data from session storage variable and removes from "checked" object the right properties.
        dispatch case "toggle" toggles the "checked" object property correpsonding to the id given.
        "checked" state is initialized with an object which has properties with keys based on the ids of the table data and values of false.
        "deleteAction" function is used to dispatch "delete" only after confirmation.
        "toogle" function is used just to dispatch "toggle"
        returns "activeBtn", "checked", "toggle" and "deleteAction"