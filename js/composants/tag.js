import { homeMain } from "../pages/homeMain.js";

export class Tag{
    /**
     * tag constructor
     *
     * @param   {String}  content    [content description]
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @constructor
     */
    constructor(content, domTarget, taged = false, click = true){
        this.content = content;
        this.domTarget = domTarget;
        /** @var {HTMLElement} this.DOM */
        this.DOM = document.createElement("span");
        this.DOM.classList.add("tagSpan");
        this.DOM.classList.add(this.content.toLowerCase());
        if (taged == true){
            this.DOM.classList.add("focusedTag");
        }
        if (click == true) {
            this.DOM.onclick = this.click.bind(this);
            this.DOM.setAttribute("tabindex", "0");
        }
        this.domTarget.appendChild(this.DOM);
        this.render();
    }

    render(){
        this.DOM.innerHTML = "#" + this.content;
    }

    click(){
        const listToFocus = document.getElementsByClassName(this.content.toLowerCase());
        if (this.DOM.classList.contains("focusedTag")){
            for (const element of listToFocus){
                element.classList.remove("focusedTag");
            }
        } else {
            for (const element of listToFocus){
                element.classList.add("focusedTag");
            }
        }
        homeMain(document.querySelector("main"));
    }
}