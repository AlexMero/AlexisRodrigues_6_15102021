import {initDataManager} from "./services/dataManager.js";
import {PageManager}  from "./services/pageManager.js";

initDataManager("http://localhost:3000/data.json");
new PageManager(document.querySelector("main"));