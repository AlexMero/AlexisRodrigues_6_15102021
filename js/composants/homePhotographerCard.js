import { Tag } from "../composants/tag.js";

export class HomePhotographerCard {
    /**
     * Constructeur card photographer in homePage
     *
     * @param   {Object}        photographer          Objet photographer
     * @param   {HTMLElement}   domTarget             header HTMLElement
     *
     * @returns
     */
    constructor(photographer, domTarget, listTag = []) {
        this.photographer = photographer;
        this.idPhotoTarget = "../images/Sample Photos/Photographers ID Photos/"+ photographer.name.replace(" ", "").replace("-", "") +".jpg";
        this.domTarget = domTarget;
        this.listTag = listTag;
        this.DOM = document.createElement("article");
        this.DOM.setAttribute("tabindex", "0");
        this.DOM.setAttribute("role", "button");
        let ariaDescrption = "lien vers la page de " + this.photographer.name;
        this.DOM.classList.add("photographerCard");
        this.contentTag = document.createElement("div");
        this.contentTag.classList.add("contentTag");
        // @ts-ignore
        this.DOM.onclick = () => window.changePage("photographer", this.photographer.id);
        this.render();
    }

    render() {
        this.DOM.innerHTML = `
            <img src='${this.idPhotoTarget}' class='imgPhotographer' alt='${this.photographer.name}'>
            <h2>${this.photographer.name}</h2>
            <span class='location'>${this.photographer.city}, ${this.photographer.country}</span>
            <span class='tagline'>${this.photographer.tagline}</span>
            <span class='price'>${this.photographer.price}€/jour</span>
        `;

        this.photographer.tags.forEach(tagName => {
            if (this.listTag.includes(tagName)){
                new Tag(tagName, this.contentTag, true, false);
            } else {
                new Tag(tagName, this.contentTag, false, false);
            }

        });
        this.DOM.appendChild(this.contentTag);
        this.domTarget.appendChild(this.DOM);
    }

}