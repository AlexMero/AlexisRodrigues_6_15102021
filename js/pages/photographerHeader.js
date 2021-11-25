import {logo} from "../composants/logo.js";

let img = { location: "../images/logo/logoFishEye.png", alt: "Fisheye Home page" };

/**
 * Create photographerPage header
 *
 * @return  {void}  
 */
export function photographerHeader(domTarget){
    let DOM = domTarget;
    new logo(img, DOM);
}