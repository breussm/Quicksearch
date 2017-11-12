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
       console.timeEnd("Keywords")
         var contentOfDocument = getContentOfDocument();
       console.timeEnd("body")
         var linkList = getUrlsOfDOMContent(contentOfDocument);
       console.timeEnd("URL")
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
  * @param {string} content of the current document.body
  * @return {array} array of the urls from document.body
  */
 function getUrlsOfDOMContent(content){
    console.time("URL")
    var list = content.match(/(?:ht|f)tps?:\/\/[-a-zA-Z0-9.]+\.[a-zA-Z]{2,3}(\/[^"<]*)?/g);
    return uniq(list);
 }
 
  /**
  * Find duplicate entries
  * @return {array} of urls
  */
 function uniq(a) {
    return Array.from(new Set(a));
  }
 
 /**
  */
 var findKeywords = function() {
    console.time("Keywords")
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
    console.time("body")
     return document.body.innerHTML;
 
 }
 