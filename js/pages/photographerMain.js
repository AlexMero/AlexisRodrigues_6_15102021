import {getPhotographerData, getPhotographerMedia} from "../services/dataManager.js";
import {Dropdown} from "../composants/dropdown.js";
import FixedRectangle from "../composants/fixedRectangle.js";
import MediaCard from "../composants/mediaCard.js";
import {PhotographerCard} from "../composants/PhotographerCard.js";

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
    photographerData = await getPhotographerData(photographerId);
    /** @type {Array[Object]} */
    photographerMediaList = await getPhotographerMedia(photographerId);
    new PhotographerCard(photographerData, domTarget);
    sectionSelect(domTarget);
    divCardContent.classList.add("mediaCardContainer");
    domTarget.appendChild(divCardContent);
    render(domTarget);
    fixedRectangleRender(domTarget);
}

function render(domTarget) {
    totalLikes = 0;
    divCardContent.innerHTML = "";
    // photographerMediaList.forEach(media => {
    //     new mediaCard({...media, "callback": updateLikes.bind(this), "originTarget": domTarget}, divCardContent, photographerData.name);
    //     totalLikes+=media.likes;
    // });
    for (let i = 0; i < photographerMediaList.length; i++) {
        const media = photographerMediaList[i];
        const nextID = photographerMediaList[i+1] ? photographerMediaList[i+1].id : photographerMediaList[0].id;
        const prevID = photographerMediaList[i-1] ? photographerMediaList[i-1].id : photographerMediaList[photographerMediaList.length - 1].id;
        new MediaCard({...media, "callback": updateLikes.bind(this), "nextID": nextID, "originTarget": domTarget, "prevID": prevID}, divCardContent, photographerData.name);
        totalLikes+=media.likes;
    }

}

function fixedRectangleRender(domTarget){
    new FixedRectangle(domTarget, {"prix": photographerData.price, "totalLikes": totalLikes});
}

function sectionSelect(domTarget) {
    const sectionSelect = document.createElement("section");
    sectionSelect.classList.add("sectionSelect");
    const label = document.createElement("label");
    label.innerHTML = "Trier par";

    sectionSelect.appendChild(label);
    new Dropdown(sectionSelect, ["Popularité", "Dates", "Titre"], updateFilter.bind(this), domTarget);

    domTarget.appendChild(sectionSelect);
}

function updateLikes(inc, target){
    totalLikes+= inc ? 1 : -1;
    fixedRectangleRender(target);
}

function updateFilter(filter, DOM){
    // eslint-disable-next-line complexity
    photographerMediaList.sort(function compare(a, b) {
        if (filter === "Dates") {
            if (a.date < b.date){
                return -1;
            }
            if (a.date > b.date ){
                return 1;
            }
            return 0;
        } else if (filter === "Titre") {
            if (a.title < b.title){
                return -1;
            }
            if (a.title > b.title ){
                return 1;
            }
            return 0;
        } else if (filter === "Popularité") {
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