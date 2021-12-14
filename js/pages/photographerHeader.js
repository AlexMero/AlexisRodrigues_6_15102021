import {Logo} from "../composants/logo.js";

const img = {alt: "Fisheye Home page", location: "../images/logo/logoFishEye.png"};

/**
 * Create photographerPage header
 *
 * @return  {void}
 */
export function photographerHeader(domTarget){
    const DOM = domTarget;
    DOM.className = "photographerHeader";
    new Logo(img, DOM);
}