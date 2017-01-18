var obj = new XMLHttpRequest();
var editButtons = document.getElementsByClassName("edit-button");

obj.onreadystatechange = function() {//Call a function when the state changes.
    if(obj.readyState == XMLHttpRequest.DONE && obj.status == 200) {
        parser = new DOMParser();
        var listDiv = document.getElementById('content');
        var list = listDiv.firstChild;
        doc = parser.parseFromString(obj.response, "text/html");
        listDiv.replaceChild(doc.firstChild.children[1].firstChild, list);
        addEventsToEditButtons();
    }
}

function addEventsToEditButtons() {
    for (var x = 0; x < editButtons.length; x++) {
        var editButton = editButtons[x];

        editButton.addEventListener("click", function() {
            var id = this.getAttribute('data-id');
            var form = document.createElement('form');
            var input = document.createElement('input');

            var list = document.getElementById('content-list');
            var id = this.getAttribute('data-id');
            var listItem = document.getElementById('list-item-' + id);
            var listItemText = document.getElementById('list-item-' + id).firstChild;
            var text = listItemText.wholeText;
            input.value = text;
            form.appendChild(input);
            var listEditButton = document.getElementById('list-item-' + id).children[0];
            var listDeleteButton = document.getElementById('list-item-' + id).children[1];


            listItem.replaceChild(form, listItemText);
            listItem.removeChild(listEditButton);
            listItem.removeChild(listDeleteButton);
            var saveLink = document.createElement('a');
            saveLink.href = "#";
            saveLink.setAttribute("data-id", id);
            var saveText = document.createTextNode('Save');
            saveLink.appendChild(saveText);

            var cancelLink = document.createElement('a');
            cancelLink.href = "#";
            var cancelText = document.createTextNode('Cancel');
            cancelLink.appendChild(cancelText);

            listItem.appendChild(saveLink);
            listItem.appendChild(cancelLink);

            saveLink.addEventListener("click", function() {
                sendSaveRequest(saveLink, input);
            });
        })
    }
}

function sendSaveRequest(saveLink, input) {
    var saveId = saveLink.getAttribute('data-id');
    var title = input.value;
    obj.open("PUT", "http://localhost?id=" + saveId + "&title=" + title);
    obj.send();
}
addEventsToEditButtons();
