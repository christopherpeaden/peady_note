var editButtons = document.getElementsByClassName("edit-button");

for (var x = 0; x < editButtons.length; x++) {
    editButtons[x].addEventListener('click', function() {
        setupInputForm(this.dataset.id);
    });
}

function setupInputForm(id) {

    var form = document.createElement('form');
    var input = document.createElement('input');

    var list = document.getElementById('content-list');
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
    var saveButton= document.createElement('a');
    saveButton.href = "#";
    saveButton.setAttribute("data-id", id);
    var saveText = document.createTextNode('Save');
    saveButton.appendChild(saveText);

    var cancelButton= document.createElement('a');
    cancelButton.href = "#";
    var cancelText = document.createTextNode('Cancel');
    cancelButton.appendChild(cancelText);

    listItem.appendChild(saveButton);
    var spacer = document.createTextNode(" ");
    listItem.appendChild(spacer);
    listItem.appendChild(cancelButton);

    saveButton.addEventListener("click", function() {
        var obj = new XMLHttpRequest();
        sendSaveRequest(obj, saveButton, input);
        obj.onreadystatechange = function() {
            if(obj.readyState == XMLHttpRequest.DONE && obj.status == 200) {
                parser = new DOMParser();
                doc = parser.parseFromString(obj.response, "text/html");
                var newListItem = doc.firstChild.children[1].firstChild;
                var list = document.getElementsByTagName('ul')[0]; 
                list.replaceChild(newListItem, listItem);
                newListItem.children[0].addEventListener("click", function() {
                    setupInputForm(this.dataset.id);
                });
                addEventsToDeleteButton(newListItem.children[1].dataset.id);
            }
        }
    });

    cancelButton.addEventListener("click", function() {
        listItem.replaceChild(listItemText, form);
        listItem.appendChild(listEditButton);
        listItem.appendChild(spacer);
        listItem.appendChild(listDeleteButton);
        listItem.removeChild(saveButton);
        listItem.removeChild(cancelButton);
    });
}

function sendSaveRequest(obj, saveButton, input) {
    var saveId = saveButton.getAttribute('data-id');
    var title = input.value;
    obj.open("PUT", "http://localhost?id=" + saveId + "&title=" + title);
    obj.send();
}
