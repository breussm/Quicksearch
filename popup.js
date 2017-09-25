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

    keywords = JSON.parse(infos.data).keywords.split(",");
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
    accordLinklistWithBookmarks();
    searchAccordsFromKeywordsInBookmarks();
    writeToContent();
}

function writeToContent()
{
    var table = document.getElementById("table");
    for (var i = 0; i < result.length; i++) {
        table.insertRow(i).innerHTML = "<a href="+ result[i]  + " target=_blank" + " >"+ result[i] + "</a>"
        //resultOfLinks = resultOfLinks + "<tr></tr>";
    }
    //resultOfLinks = resultOfLinks + "</table>";
    //console.error(resultOfLinks)
    //document.getElementById("content").innerHTML = resultOfLinks;
}

function accordLinklistWithBookmarks()
{
    for (var i in linkList) {
        if (bookmarks.indexOf(linkList[i].raw) > -1) {
            result.push(linkList[i].raw);
        }
    }
}

function searchAccordsFromKeywordsInBookmarks()
{
    keywords.forEach(function(keyword){
        keyword = keyword.trim();
        bookmarks.map(function(bookmark, index, arr){
            if (bookmark.indexOf(keyword) > -1) {
                result.push(bookmark);
                console.error(bookmark);
            }
        })
        /*if (bookmarks.indexOf(keyword) > -1 ) {
            console.error("match: ", keyword);
            result.push(linkList[i].raw);
        }*/
    })
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
