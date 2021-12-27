import Component from "./component.js";
import { getPopupMedia } from "../services/dataManager.js";
export default class MediaPopup extends Component{
    media;

    id;

    alt;

    photographerId;

    title;

    image;

    video;

    tags;

    likes;

    date;

    price;

    nextID;

    prevID;

    /**
     * @param   {HTMLElement}   domTarget  [domTarget description]
     * @param   {Object}        props      [props description]
     *
     * @constructor
     */
    constructor(domTarget, props, photographerName){
        super(domTarget, "section");
        this.hydrate(props);
        this.photographerName = photographerName;
        this.DOM.className = "mediaPopup";

        this.leftArrowContent = this.elementWithClass("span", "leftArrowContent iconContent");
        this.leftArrowContent.setAttribute("role", "button");
        this.leftArrowContent.appendChild(this.elementWithClass("i", "fas fa-chevron-left"));

        this.rightArrowContent = this.elementWithClass("span", "rightArrowContent iconContent");
        this.rightArrowContent.setAttribute("role", "button");
        this.rightArrowContent.appendChild(this.elementWithClass("i", "fas fa-chevron-right"));

        this.crossContent = this.elementWithClass("span", "crossContent iconContent");
        this.crossContent.setAttribute("role", "button");
        this.crossContent.appendChild(this.elementWithClass("i", "fas fa-times"));

        this.DOM.onclick = this.click.bind(this);
        // this.DOM.setAttribute("tabindex", "0");
        window.onkeyup = this.listenKey.bind(this);
        this.render();
    }

    render(){
        this.DOM.innerHTML = "";
        this.imageTarget = "../images/Sample Photos/" + this.photographerName.split(" ")[0] + "/" + this.image;
        this.videoTarget = "../images/Sample Photos/" + this.photographerName.split(" ")[0] + "/" + this.video;
        this.contentPopup = document.createElement("div");
        this.contentPopup.className = "contentPopup";
        this.contentPopup.innerHTML += this.image ? this.templateImage : this.templateVideo;
        this.contentPopup.appendChild(this.leftArrowContent);
        this.contentPopup.appendChild(this.rightArrowContent);
        this.contentPopup.appendChild(this.crossContent);
        this.DOM.appendChild(this.contentPopup);
    }

    get templateVideo() {
        return  /* html */ `
        <video controls autoplay loop alt="${this.alt}">
            <source src="${this.videoTarget}" type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
        </video>
        <span class="titreMediaPopup">${this.title}</span>
        `;

    }

    get templateImage() {
        return /* html */ `
        <img src="${this.imageTarget}" class="imgMediaPopup" alt="${this.alt}">
        <span class="titreMediaPopup">${this.title}</span>
        `;
    }

    /**
     * Create an html element with a specific class name
     *
     * @param   {String}  tag        span
     * @param   {String}  className  red
     *
     * @return  {HTMLElement}        <span class='red'></span>
     */
    elementWithClass(tag, className){
        const result = document.createElement(tag);
        result.className = className;
        return result;
    }

    click(event){
        if (event.path[0] == this.DOM || event.path.includes(this.crossContent)){
            this.DOM.remove();
        }
        if (event.path.includes(this.rightArrowContent)){
            this.updateMedia(this.nextID);
        }
        if (event.path.includes(this.leftArrowContent)){
            this.updateMedia(this.prevID);
        }
    }

    async updateMedia(id){
        const result = await getPopupMedia(this.photographerId, id);
        this.hydrate(result);
        this.render();
    }

    listenKey(evt){
        if (evt.keyCode == 39) {
            this.updateMedia(this.nextID);
        }
        if (evt.keyCode == 37) {
            this.updateMedia(this.prevID);
        }
        if (evt.keyCode == 27) {
            this.DOM.remove();
        }
    }
}