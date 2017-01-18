var obj = new XMLHttpRequest();
var deleteButtons = document.getElementsByClassName("delete-button");

obj.onreadystatechange = function() {//Call a function when the state changes.
    if(obj.readyState == XMLHttpRequest.DONE && obj.status == 200) {
        parser = new DOMParser();
        var listDiv = document.getElementById('content');
        var list = listDiv.firstChild;
        doc = parser.parseFromString(obj.response, "text/html");
        listDiv.replaceChild(doc.firstChild.children[1].firstChild, list);
        addEventsToDeleteButtons();
    }
}

function addEventsToDeleteButtons() {
    for (var x = 0; x < deleteButtons.length; x++) {
        var deleteButton = deleteButtons[x];

        deleteButton.addEventListener("click", function() {
            var id = this.getAttribute('data-id');
            obj.open("DELETE", "http://localhost?id=" + id);
            obj.send();
        })
    }
}

addEventsToDeleteButtons();
