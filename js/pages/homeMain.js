import {getAllData} from "../services/dataManager.js";
import {homePhotographerCard} from "../composants/homePhotographerCard.js";

let DOM;
let data;
let idPhotoTarget;
let listFocused;
let listTag = [];

/**
 * [async description]
 *
 * @param   {HTMLElement}  domTarget  [domTarget description]
 *
 * @return  {Promise.<void>}             [return description]
 */
export async function homeMain(domTarget) {
    DOM = domTarget;
    listTag = [];
    listFocused = document.querySelectorAll("nav span.focusedTag");
    listFocused.forEach(element => {
        listTag.push(element.textContent.toLowerCase().slice(1));
    });
    data = await getAllData();
    render();
}

function render() {
    DOM.innerHTML = "";
    
    data.photographers.forEach(photographer => {
        let showThis = "false";
        if (listTag.length >= 1){
            showThis = "false";
            listTag.forEach(tag => {
                if (photographer.tags.includes(tag)){
                    showThis = "true";
                }
            });
            if (showThis === "true"){
                new homePhotographerCard(photographer, DOM, listTag);
            }          
        }else{
            new homePhotographerCard(photographer, DOM);
        }
    });
}

