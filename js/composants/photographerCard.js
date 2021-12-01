import { tag } from "../composants/tag.js";
import contactPopup from "./contactPopup.js";

export class PhotographerCard {
    /**
     * Constructeur card photographer in homePage
     *
     * @param   {Object}        photographer          Objet photographer
     * @param   {HTMLElement}   domTarget             header HTMLElement
     *
     * @returns
     */
    constructor(photographer, domTarget) {
        this.photographer = photographer;
        this.idPhotoTarget = "../images/Sample Photos/Photographers ID Photos/"+ photographer.name.replace(" ", "").replace("-", "") +".jpg";
        this.domTarget = domTarget;
        this.DOM = document.createElement("section");
        this.DOM.classList.add("photographerCard");
        this.contentTag = document.createElement("div");
        this.contentTag.classList.add("contentTag");
        this.render();
    }
    
    render() {
        
        this.DOM.innerHTML = /* html */
        `
            <img src='${this.idPhotoTarget}' class='imgPhotographer'>
            <button id="contactPopupBtn">Contactez-moi</button>
            <div class='container'>
                <h2>${this.photographer.name}</h2>
                <span class='location'>${this.photographer.city}, ${this.photographer.country}</span>
                <span class='tagline'>${this.photographer.tagline}</span>
            </div>
        `;

        this.photographer.tags.forEach(tagName => {
            new tag(tagName, this.contentTag, false, false);
        });
        this.domTarget.appendChild(this.DOM);
        document.querySelector("section.photographerCard div.container").appendChild(this.contentTag);
        document.querySelector("#contactPopupBtn").addEventListener("click", event => {this.contactClick()});
    }

    contactClick(){
        new contactPopup(document.body, this.photographer);
    }
}