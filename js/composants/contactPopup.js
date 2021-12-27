import Component from "./component.js";
export default class ContactPopup extends Component{
    name;

    id;

    city;

    country;

    tags;

    tagline;

    price;

    portrait;

    /**
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {Object}  props      [props description]
     *
     * @constructor
     */
    constructor(domTarget, props){
        super(domTarget, "section");
        this.hydrate(props);
        this.DOM.className = "contactPopup";

        this.contentContactPopup = document.createElement("div");
        this.contentContactPopup.className = "contentContactPopup";

        this.title = document.createElement("h1");

        this.formModal = document.createElement("form");
        this.formModal.onsubmit = this.submit.bind(this);

        this.crossContent = document.createElement("span");
        this.crossContent.className = "crossContent";
        this.crossIcon = document.createElement("i");
        this.crossIcon.className = "fas fa-times";
        this.crossContent.appendChild(this.crossIcon);

        this.DOM.onclick = this.click.bind(this);
        this.render();
    }

    render(){
        this.title.innerHTML = /* html */
        `
            Contactez-moi
            <br>
            ${this.name}
        `;

        this.formModal.innerHTML = /* html */
        `
            <label for="prenom">Prénom</label>
            <input type="text" id="prenom">
            <label for="nom">Nom</label>
            <input type="text" id="nom">
            <label for="email">Email</label>
            <input type="email" id="email">
            <label for="msg">Votre message</label>
            <textarea id="msg"></textarea>

            <input type="submit">
        `;

        this.contentContactPopup.appendChild(this.title);
        this.contentContactPopup.appendChild(this.crossContent);
        this.contentContactPopup.appendChild(this.formModal);
        this.DOM.appendChild(this.contentContactPopup);
    }

    click(event){
        if (event.path[0] == this.DOM || event.path.includes(this.crossContent)){
            this.DOM.remove();
        }
    }

    submit(event){
        event.stopPropagation();
        event.preventDefault();
        const prenom = event.srcElement[0].value;
        const nom = event.srcElement[1].value;
        const email = event.srcElement[2].value;
        const msg = event.srcElement[3].value;

        console.log("Prénom => ", prenom, "\r\n","Nom => ", nom, "\r\n","Email => ", email, "\r\n","Message => ", msg, "\r\n",);
    }
}