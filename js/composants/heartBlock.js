import Component from "./component.js";
export default class heartBlock extends Component{

    /**
     * fonction a appeler au clic
     * @type {Function}
     */
    callback;

    likes;

    originTarget;

    liked=false;

    /**
     * [constructor description]
     *
     * @param   {HTMLElement}       domTarget  [domTarget description]
     * @param   {Object}            props      fonction a appeler au
     * @param   {Function}          props.callback
     * @param   {Number}            props.likes
     * @param   {HTMLElement}       props.originTarget
     *
     * @constructor
     */
    constructor(domTarget, props){
        super(domTarget, "span");
        this.hydrate(props);
        this.DOM.className = "likesMedia";
        this.DOM.setAttribute("tabindex", "0");
        this.DOM.onclick = this.updateLikes.bind(this);
        this.render();
    }

    render(){
        this.DOM.innerHTML = /*html*/ `${this.likes} <i class="fa${this.liked?"s":"r"} fa-heart"></i>`;
    }

    updateLikes(event){
        event.stopPropagation();
        this.liked = !this.liked;
        this.likes += this.liked? 1 : -1;
        this.callback(this.liked, this.originTarget);
        this.render();
    }
}