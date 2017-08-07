/**
 * Created by breussm on 20.05.2017.
 */

/**
 * After the page has been loaded the initialization begins.
 */
window.onload = function() {
   init();
}

/**
 * This function will called from the background page.
 * After receiving this message the algorithm starts.
 */
function init() {
    chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        var keywordsFromCurrentPage = findKeywords();
        var contentOfDocument = getContentOfDocument();
        var linkList = getUrlsOfDOMContent(contentOfDocument)
        var info = {};
        info.keywords = keywordsFromCurrentPage;
        info.linkList = linkList;
        info.tabId = msg;
        //info.contentOfDom = contentOfDocument;

        chrome.runtime.sendMessage(JSON.stringify(info), function (response) {

        })
    })
}

/*
 * Find all links in the DOM content and remove the duplicate entries
 * https://alexcorvi.github.io/anchorme.js/
 * https://ilikekillnerds.com/2016/05/removing-duplicate-objects-array-property-name-javascript/
 * @param {string} content of the current document.body
 * @return {array} array of the urls from document.body
 */
function getUrlsOfDOMContent(content){
    var list = anchorme(content, {
        list: true,
    })
    return removeDuplicates(list, "encoded")
}

/*
* Remove Duplicate Entries
* https://ilikekillnerds.com/2016/05/removing-duplicate-objects-array-property-name-javascript/
* @param {array} url array of objects to filter
* @param {string} indicator to filter
* @return {array} array of url objects
* */
function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

/**
 * Find the keywords in the Metatag
 * @returns {string} the defined keywords in the metatag
 */
var findKeywords = function() {
    if(document.getElementsByTagName("meta").keywords)
        return document.getElementsByTagName("meta").keywords.content;
    else
        return "";
}

/**
 * Get the content of the current document.
 * @returns {string} content of document.body
 */
var getContentOfDocument = function() {
    return document.body.innerHTML;
}
