/**
 * Created by breussm on 20.05.2017.
 */

/**
 * The data variable expand the window object with spezfic information from the content page.
 */
var data;

/**
 * This listener is the interface between background and the content.
 * We need this for message passing.
 *
 * Fired when a message is sent from either an extension process (by runtime.sendMessage) or a content script
 * (by tabs.sendMessage).
 * https://developer.chrome.com/extensions/runtime#event-onMessage
*/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        data = message;
        chrome.browserAction.enable(JSON.parse(message).tabId);
        sendResponse();
    });

/**
 * Listener if the active tab changes
 *
 * Fires when the active tab in a window changes. Note that the tab's URL may not be set at the time this event fired,
 * but you can listen to onUpdated events to be notified when a URL is set.
 * https://developer.chrome.com/extensions/tabs#event-onActivated
*/
chrome.tabs.onActivated.addListener(function(activeInfo) {
    /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.browserAction.disable(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, tabs[0].id, function(response) {});
    });*/
    queryTab();
});

/**
 * Fired when a tab is updated.
 * https://developer.chrome.com/extensions/tabs#event-onUpdated
*/
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
    if (changeInfo.status == 'complete') {
        queryTab()
    }
});

/**
 * Gets all tabs that have the specified properties, or all tabs if no properties are specified and send the
 * information from the current tab to the content.js
 * https://developer.chrome.com/extensions/tabs#method-query
 *
 */
function queryTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.browserAction.disable(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id, tabs[0].id, function(response) {});
    });
}

/**
 * After the page has been loaded the browserAction button will be disabled.
 */
window.onload = function() {
    chrome.browserAction.disable();
}