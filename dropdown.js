class Dropdown{
    
    filters = ["popularité", "date", "likes"];
    selected = this.filters[0];

    constructor(domTarget){
        this.DOM = document.createElement("dropdown");
        domTarget.appendChild(this.DOM);
        this.active = false;
        this.render();
    }

    render(){
        this.DOM.innerText = "";
        if (!this.active) {
            this.addFilter(this.selected);
            return;
        }
        this.filters.forEach(filter => {
            this.addFilter(filter);
        });

    }

    addFilter(name){
        const filter = document.createElement("filter");
        filter.innerText = name;
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