export class Dropdown{
    
    

    /**
     * [constructor description]
     *
     * @param   {HTMLElement}  domTarget  [domTarget description]
     *
     * @returns
     */
    constructor(domTarget, filters = ["1", "2", "3"]){
        this.filters = filters;
        this.selected = filters[0];
        this.chevronDown = "<i class='fas fa-chevron-down'></i>";
        this.chevronUp = "<i class='fas fa-chevron-up'></i>";
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
            if (cpt === 1){
                this.addFilter(filter, this.chevronUp);
            }else{
                this.addFilter(filter);
            }
            cpt = cpt+1;
        });

    }

    addFilter(name, chevron = ""){
        const filter = document.createElement("filter");
        filter.innerHTML = name+chevron;
        filter.onclick = ()=>this.click(name);
        this.DOM.appendChild(filter);
    }

    click(filter){
        this.active = !this.active;
        if (!this.active) {
            this.selected = filter;
        }
        this.render();
    }
}