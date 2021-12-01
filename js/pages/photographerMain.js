import {getPhotographerData} from "../services/dataManager.js";
import {PhotographerCard} from "../composants/PhotographerCard.js";
import mediaCard from "../composants/mediaCard.js";
import { getPhotographerMedia } from "../services/dataManager.js"
import { Dropdown } from "../composants/dropdown.js";
import fixedRectangle from "../composants/fixedRectangle.js";
import mediaPopup from "../composants/mediaPopup.js";

let photographerData;

/**
 * @typedef {import("../../typedef.js").mediaList}  mediaList
 * @typedef {import("../../typedef.js").media}  media
 */

/**
 * liste des medias
 *
 * @var {mediaList}
 */
let photographerMediaList = [];
let totalLikes = 0;

const divCardContent = document.createElement("div");

/**
 * [async description]
 *
 * @param   {HTMLElement}  domTarget  [domTarget description]
 * @param   {Number}  photographerId  [domTarget description]
 *
 * @return  {Promise.<void>}             [return description]
 */
export async function photographerMain(domTarget, photographerId) {
    const DOM = domTarget;
    photographerData = await getPhotographerData(photographerId);
    photographerMediaList = await getPhotographerMedia(photographerId);
    new PhotographerCard(photographerData, domTarget);
    sectionSelect(domTarget);
    divCardContent.classList.add("mediaCardContainer");
    domTarget.appendChild(divCardContent);
    render(domTarget);
}


function render(domTarget) {
    totalLikes = 0;
    divCardContent.innerHTML = "";
    photographerMediaList.forEach(media => {
        new mediaCard({...media, "callback": updateLikes.bind(this)}, divCardContent, photographerData.name);
        totalLikes+=media.likes;
    });
    new fixedRectangle(domTarget, {"totalLikes": totalLikes, "prix": photographerData.price});
}

function sectionSelect(domTarget) {
    let sectionSelect = document.createElement("section");
    sectionSelect.classList.add("sectionSelect");
    let label = document.createElement("label");
    label.innerHTML = "Trier par";
    

    sectionSelect.appendChild(label);
    new Dropdown(sectionSelect, ["Popularité", "Dates", "Titre"], updateFilter.bind(this), domTarget);

    domTarget.appendChild(sectionSelect);
}

function updateLikes(inc){
    totalLikes+= inc ? 1 : -1;
}

function updateFilter(filter, DOM){
    photographerMediaList.sort(function compare(a, b) {
        if (filter == "Dates") {
            if (a.date < b.date){
                return -1;
            }
            if (a.date > b.date ){
                return 1;
            }
            return 0;
        }else if (filter == "Titre") {
            if (a.title < b.title){
                return -1;
            }
            if (a.title > b.title ){
                return 1;
            }
            return 0;
        }else if (filter == "Popularité") {
            if (a.likes > b.likes){
                return -1;
            }
            if (a.likes < b.likes ){
                return 1;
            }
            return 0;
        } 
    });
    
    render(DOM);
}