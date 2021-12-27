import Component from "./component.js";
export default class FixedRectangle extends Component {

    totalLikes;

    prix;

    /**
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
                <em class="fas fa-heart"></em>
            </span>
            <span class="prix">
                ${this.prix}€ / jour
            </span>
            `;

    }
}