

/**
 * @typedef {import("../../typedef.js").mediaList}  mediaList
 */

let source;
let data;

/**
 * [initDataManager description]
 *
 * @param   {String}  src  server's url
 *
 * @return  {void}      update source
 */
function initDataManager(src) {
    source = src;
};

async function getAllData() {
    const answer = await fetch(source);
    data = await answer.json();
    return data;
}

/**
 * get all DATA about a photographer from id
 *
 * @param   {Number}  id  photographer ID
 *
 * @return  {Promise}      [return description]
 */
async function getPhotographerData(id){
    let thisPhotographer;
    let datas = await getAllData();
    datas.photographers.forEach(photographer => {
        if (photographer.id == id){
            thisPhotographer = photographer;
        }
    });
    return thisPhotographer;
}

/**
 * get all differents tags
 *
 * @return  {Promise}      [return description]
 */
async function getAllTags(){
    let tagsList = [];
    let datas = await getAllData();
    datas.media.forEach(media => {
        let mediaTag = media.tags[0];
        if (!tagsList.includes(mediaTag)) {
            tagsList.push(mediaTag);
        }
    });
    return tagsList;
}

/**
 * get all MEDIA about a photographer from id
 *
 * @param   {Number}  id  photographer ID
 *
 * @return  {Promise.<mediaList>}      [return description]
 */
async function getPhotographerMedia(id){
    let mediaList = [];
    let datas = await getAllData();
    datas.media.forEach(media => {
        let mediaPhotographerId = media.photographerId;
        if (mediaPhotographerId == id) {
            mediaList.push(media);
        }
    });
    return mediaList;
}

export {
    initDataManager,
    getAllData,
    getPhotographerData,
    getAllTags,
    getPhotographerMedia,
}