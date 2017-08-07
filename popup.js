/**
 * Created by breussm on 20.05.2017.
 */
var counter = 0;
var bookmarks = [];
var keywords;
var linkList;
var resultOfLinks = "";
var result = [];
function getInfosFromBackgroundPage() {
    var infos = chrome.extension.getBackgroundPage();
    //console.error(JSON.parse(infos.data).keywords);
    //console.error(JSON.parse(infos.data).linkList);

    keywords = JSON.parse(infos.data).keywords;
    linkList =  JSON.parse(infos.data).linkList;

    var bookmarkTreeNodes = chrome.bookmarks.getTree(
        function(bookmarkTreeNodes) {
            getBookmarks(bookmarkTreeNodes);
            showData();
        });



    //console.error(infos.data);
    //var keywords = infos.data.keywords;
    //var content  = infos.data.content;


}

function showData()
{
    for (var i in linkList) {
        if (bookmarks.indexOf(linkList[i].raw) > -1) {
            result.push(linkList[i].raw);
        }
    }

    for (var i = 0; i < result.length; i++) {
        resultOfLinks = resultOfLinks + "<a href="+ result[i]  + " >"+ result[i] + "</a>";
    }
    document.getElementById("content").innerHTML = resultOfLinks;

}


function getBookmarks(bookmarkTree) {
    for (var i =0; i < bookmarkTree.length; i++) {
        var bookmark = bookmarkTree[i];
        if (bookmark.url)
            bookmarks.push(bookmark.url);

        if (bookmark.children)
            getBookmarks(bookmark.children);
    }

}

window.onload = getInfosFromBackgroundPage;
