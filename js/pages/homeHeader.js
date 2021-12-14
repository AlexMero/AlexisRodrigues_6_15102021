import {Logo} from "../composants/logo.js";
import { Tag } from "../composants/tag.js";
import { getAllTags } from "../services/dataManager.js";

const img = {alt: "Fisheye Home page", location: "../images/logo/logoFishEye.png"};
const homeTitle = document.createElement("h1");

/**
 * Create homePage header
 *
 * @return
 */
export async function homeHeader(domTarget){
    const tagsList = await getAllTags();
    const DOM = domTarget;
    new Logo(img, DOM);
    const navDOM = document.createElement("nav");
    DOM.appendChild(navDOM);
    tagsList.forEach(tagClass => {
        const tagName = tagClass.charAt(0).toUpperCase() + tagClass.slice(1);
        new Tag(tagName, navDOM);
    });
    homeTitle.innerHTML = "Nos photographes";
    DOM.appendChild(homeTitle);
}