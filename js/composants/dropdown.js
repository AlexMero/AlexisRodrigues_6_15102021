export class Dropdown{

    /**
     * @param   {HTMLElement}  domTarget  [domTarget description]
     * @param   {Array}  filters  [domTarget description]
     * @param   {Function}  callback  [domTarget description]
     * @param   {HTMLElement}  parentDOM  [domTarget description]
     *
     * @returns
     */
    constructor(domTarget, filters = ["1", "2", "3"], callback, parentDOM){
        this.filters = filters;
        this.selected = filters[0];
        this.callback = callback;
        this.parentDOM = parentDOM;
        this.chevronDown = "<em class='fas fa-chevron-down'></em>";
        this.chevronUp = "<em class='fas fa-chevron-up'></em>";
        this.DOM = document.createElement("dropdown");
        domTarget.appendChild(this.DOM);
        this.active = false;
        this.render();
    }

    render(){
        this.DOM.innerText = "";
        if (!this.active) {
            this.DOM.className= "resume";
            this.addFilter(this.selected, this.chevronDown);
            return;
        }
        this.DOM.className= "";
        let cpt = 1;
        this.filters.forEach(filter => {
            if (cpt == 1){
                this.addFilter(filter, this.chevronUp);
            } else {
                this.addFilter(filter);
            }
            cpt = cpt+1;
        });

    }

    /**
     * Create new filter element in dropdown
     *
     * @param   {String}  name     Popularité
     * @param   {String}  chevron  <em class='fas fa-chevron-up'></em>
     *
     * @return  {void}           this.DOM.appendChild(filter)
     */
    addFilter(name, chevron = ""){
        const filter = document.createElement("filter");
        filter.setAttribute("tabindex", "0");
        filter.innerHTML = name+chevron;
        // filter.onclick = ()=>this.click(name);
        filter.addEventListener("click", event => {this.click(name, event);});
        this.DOM.appendChild(filter);
    }

    click(filter, event){
        event.stopPropagation();
        event.preventDefault();
        this.active = !this.active;
        if (!this.active) {
            this.selected = filter;
            this.callback(filter, this.parentDOM);
        }
        this.render();
    }
}