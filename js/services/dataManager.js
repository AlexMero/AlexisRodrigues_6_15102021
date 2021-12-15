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
}

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
    const datas = await getAllData();
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
    const tagsList = [];
    const datas = await getAllData();
    datas.media.forEach(media => {
        const mediaTag = media.tags[0];
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
    const mediaList = [];
    const datas = await getAllData();
    datas.media.forEach(media => {
        const mediaPhotographerId = media.photographerId;
        if (mediaPhotographerId == id) {
            mediaList.push(media);
        }
    });
    return mediaList;
}

async function getPopupMedia(photographerId, mediaId){
    let mediaResult = {};
    let nextID = 0;
    let prevID = 0;
    const mediaList = await getPhotographerMedia(photographerId);
    for (let i = 0; i < mediaList.length; i++) {
        const media = mediaList[i];
        if (media.id == mediaId) {
            mediaResult = media;
            nextID = mediaList[i+1] ? mediaList[i+1].id : mediaList[0].id;
            prevID = mediaList[i-1] ? mediaList[i-1].id : mediaList[mediaList.length - 1].id;
        }

    }
    return {...mediaResult, "nextID": nextID, "prevID": prevID};
}

export {
    initDataManager,
    getAllData,
    getPhotographerData,
    getAllTags,
    getPhotographerMedia,
    getPopupMedia,
};