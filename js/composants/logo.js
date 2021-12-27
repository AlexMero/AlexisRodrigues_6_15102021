export class Logo {
    /**
     * @param   {Object}        img                   Objet img
     * @param   {String}        img.location          img address
     * @param   {String}        img.alt               img alt
     * @param   {HTMLElement}   domTarget             header HTMLElement
     *
     * @constructor
     */
    constructor(img, domTarget) {
        this.imgLocation = img.location;
        this.imgAlt = img.alt;
        this.domTarget = domTarget;
        this.DOM = document.createElement("a");
        this.DOM.setAttribute("href", "index.html");
        this.render();
    }

    render() {
        this.DOM.innerHTML = `
            <img src="${this.imgLocation}" alt="${this.imgAlt}">
        `;
        this.domTarget.appendChild(this.DOM);
    }
}