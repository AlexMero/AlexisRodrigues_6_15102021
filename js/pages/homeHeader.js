import {logo} from "../composants/logo.js";
import { tag } from "../composants/tag.js";
import { getAllTags } from "../services/dataManager.js";


let img = { location: "../images/logo/logoFishEye.png", alt: "Fisheye Home page" };
let homeTitle = document.createElement("h1");

/**
 * Create homePage header
 *
 * @return   
 */
export async function homeHeader(domTarget){
    let tagsList = await getAllTags();
    let DOM = domTarget;
    new logo(img, DOM);
    let navDOM = document.createElement("nav");
    DOM.appendChild(navDOM);
    tagsList.forEach(tagClass => {
        let tagName = tagClass.charAt(0).toUpperCase() + tagClass.slice(1);
        new tag(tagName, navDOM);
    });
    homeTitle.innerHTML = "Nos photographes";
    DOM.appendChild(homeTitle);
}