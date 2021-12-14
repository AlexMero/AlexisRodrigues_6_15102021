import Component from "./component.js";
import HeartBlock from "./heartBlock.js";
import MediaPopup from "./mediaPopup.js";

/**
 * @typedef {import("../../typedef.js").media}  media
 * @typedef {import("../../typedef.js").callbackFunction} callbackFunction
 */

export default class MediaCard extends Component{
    media;

    id;

    photographerId;

    title;

    image;

    video;

    tags;

    likes;

    date;

    price;

    mediaTarget;

    callback;

    originTarget;

    nextID;

    prevID;

    /**
     * Constructeur card media in photographer page
     *
     * @param   {HTMLElement}               domTarget             header HTMLElement
     * @param   {media & callbackFunction } media                 header HTMLElement
     * @param   {String}                    photographerName
     *
     * @constructor
     */
    constructor(media, domTarget, photographerName) {
        super(domTarget, "article");
        this.hydrate(media);
        this.photographerName = photographerName;
        this.media = media;
        this.DOM.classList.add("mediaCard");
        this.imageTarget = "../images/Sample Photos/" + photographerName.split(" ")[0] + "/" + this.image;
        this.videoTarget = "../images/Sample Photos/" + photographerName.split(" ")[0] + "/" + this.video;
        this.DOM.onclick = this.click.bind(this);
        this.render();
    }

    render() {
        this.DOM.innerHTML = this.image ? this.templateImage : this.templateVideo;
        new HeartBlock(this.DOM, {
            callback: this.callback,
            likes : this.likes,
            originTarget : this.originTarget
        });
    }

    get templateVideo() {
        return `
        <video>
            <source src="${this.videoTarget}" type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
        </video>
        <span class="titreMedia">${this.title}</span>
        `;

    }

    get templateImage() {
        return `
        <img src="${this.imageTarget}" class="imgMedia">
        <span class="titreMedia">${this.title}</span>
        `;
    }

    click(){
        const media = this.media;
        const nextID = this.nextID;
        const prevID = this.prevID;
        new MediaPopup(document.body, {...media, "nextID": nextID, "prevID": prevID}, this.photographerName);
    }
}