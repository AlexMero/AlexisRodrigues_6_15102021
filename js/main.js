import {PageManager}  from "./services/pageManager.js";
import {initDataManager} from "./services/dataManager.js";

initDataManager("http://localhost:3000/data.json");
new PageManager(document.querySelector("main"));

//Add element who have focus
var body = document.body;

// Execute when the user releases a key on the keyboard
body.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    // @ts-ignore
    if (event.keyCode === 13) {
        // @ts-ignore
        event.path[0].click();
    }
});