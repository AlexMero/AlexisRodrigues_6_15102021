import Component from "./component.js";
export default class mediaPopup extends Component{
    media;
    id;
    photographerId;
    title;
    image;
    video;
    tags
    likes;
    date;
    price;
    /**
     * [constructor description]
     *
     * @param   {HTMLElement}   domTarget  [domTarget description]
     * @param   {Object}        props      [props description]
     *
     * @constructor
     */
    constructor(domTarget, props, photographerName){
        super(domTarget, "section");
        this.hydrate(props);
        this.DOM.className = "mediaPopup";
        this.imageTarget = "../images/Sample Photos/" + photographerName.split(" ")[0] + "/" + this.image;
        this.videoTarget = "../images/Sample Photos/" + photographerName.split(" ")[0] + "/" + this.video;

        this.leftArrowContent = this.elementWithClass("span", "leftArrowContent iconContent");
        this.leftArrowContent.appendChild(this.elementWithClass("i", "fas fa-chevron-left"));

        this.rightArrowContent = this.elementWithClass("span", "rightArrowContent iconContent");
        this.rightArrowContent.appendChild(this.elementWithClass("i", "fas fa-chevron-right"));

        this.crossContent = this.elementWithClass("span", "crossContent iconContent");
        this.crossContent.appendChild(this.elementWithClass("i", "fas fa-times"));

        this.DOM.onclick = this.click.bind(this);
        this.render();
    }

    render(){
        const contentPopup = document.createElement("div");
        contentPopup.className = "contentPopup";
        contentPopup.innerHTML = this.image ? this.templateImage : this.templateVideo;
        contentPopup.appendChild(this.leftArrowContent);
        contentPopup.appendChild(this.rightArrowContent);
        contentPopup.appendChild(this.crossContent);
        this.DOM.appendChild(contentPopup);
    }

    get templateVideo() {
        return `
        <video controls>
            <source src="${this.videoTarget}" type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
        </video>
        <span class="titreMediaPopup">${this.title}</span>
        `;

    }

    get templateImage() {
        return `
        <img src="${this.imageTarget}" class="imgMediaPopup">
        <span class="titreMediaPopup">${this.title}</span>
        `;
    }

    elementWithClass(tag, className){
        let result = document.createElement(tag);
        result.className = className;
        return result;
    }

    click(event){
        if (event.path[0] == this.DOM){
            this.DOM.remove();
        }
    }
}