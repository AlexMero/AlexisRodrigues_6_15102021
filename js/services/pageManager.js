import {homeHeader} from "../pages/homeHeader.js";
import {homeMain} from "../pages/homeMain.js";
import {photographerHeader} from "../pages/photographerHeader.js";
import {photographerMain} from "../pages/photographerMain.js";
export class PageManager{
    header;

    page;

    constructor(domTarget, dataManager){
        this.DOM =domTarget;
        this.dataManager = dataManager;
        this.headerTarget = document.querySelector("header");

        // @ts-ignore
        window.changePage = this.changePage.bind(this);
        window.onpopstate = this.definePage.bind(this);
        this.definePage();
    }

    route(newPage, args=undefined){
        this.DOM.innerHTML = "";
        this.DOM.className = "";
        this.headerTarget.innerHTML = "";
        switch (newPage){
                case "index" :
                    this.DOM.classList.add("home");
                    this.header = homeHeader(this.headerTarget);
                    this.page = homeMain(this.DOM);
                    break;
                case "photographer" :
                    this.DOM.classList.add("photographer");
                    this.header = photographerHeader(this.headerTarget);
                    this.page = photographerMain(this.DOM, args);
                    break;
                default :
                    this.DOM.innerHTML="404";
                    break;
        }
    }

    /*
     * @param   {String}  newPage  [newPage description]
     * @param   {Number}  [args]     [args description]
     *
     * @return  {void}           [return description]
     */
    changePage(newPage, args=undefined){
        event.preventDefault();
        event.stopPropagation();
        history.pushState({}, newPage, "?"+newPage+ ( args ? "/"+args : ""));
        this.route(newPage, args);
    }

    definePage(){
        // eslint-disable-next-line prefer-const
        let  [requestedPage, args] = window.location.search.slice(1).split("/");
        if (requestedPage == "") requestedPage = "index";
        this.route(requestedPage, args);
    }
}