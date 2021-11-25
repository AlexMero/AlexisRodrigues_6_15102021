import { homeMain } from "../pages/homeMain.js";

export class tag{
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
        if (taged === true){
            this.DOM.classList.add("focusedTag");
        }
        if (click === true) {
            this.DOM.onclick = this.click.bind(this);
        }
        this.domTarget.appendChild(this.DOM);
        this.render();
    }

    render(){
        this.DOM.innerHTML = "#" + this.content;
    }

    click(){
        let listToFocus = document.getElementsByClassName(this.content.toLowerCase());
        if (this.DOM.classList.contains("focusedTag")){
            for (let element of listToFocus){
                element.classList.remove("focusedTag");
            }
        }else{
            for (let element of listToFocus){
                element.classList.add("focusedTag");
            }
        }
        homeMain(document.querySelector("main"));
    }
}