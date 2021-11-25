import Component from "./component.js";
export default class fixedRectangle extends Component {

    totalLikes;
    prix;

    /**
     * [constructor description]
     *
     * @param   {HTMLElement}   domTarget               [domTarget description]
     * @param   {Object}        props                   [props description]
     * @param   {Number}        props.totalLikes        [props description]
     * @param   {Number}        props.prix              [props description]
     *
     * @constructor
     */
    constructor(domTarget, props) {
        super(domTarget, "div");
        this.hydrate(props);
        this.DOM.className = "fixedRectangle";
        this.render();
    }

    render() {
        this.DOM.innerHTML = /* html*/ `
            <span class="totalLikes">
                ${this.totalLikes}
                <i class="fas fa-heart"></i>
            </span>
            <span class="prix">
                ${this.prix}€ / jour
            </span>
            `;

    }
}