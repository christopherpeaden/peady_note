var deleteButtons = document.getElementsByClassName("delete-button");

for (var x = 0; x < deleteButtons.length; x++) {
    addEventsToDeleteButton(deleteButtons[x].dataset.id);
}

function addEventsToDeleteButton(id) {
    var deleteButton = document.querySelectorAll("[data-id='" + id + "']")[1];

    deleteButton.addEventListener("click", function() {
        var id = this.getAttribute('data-id');
        var itemToDelete = document.getElementById('list-item-' + id);

        var obj = new XMLHttpRequest();
        obj.open("DELETE", "http://localhost?id=" + id);
        obj.send();
        obj.onreadystatechange = function() {
            if(obj.readyState == XMLHttpRequest.DONE && obj.status == 200) {
                var list = document.getElementsByTagName('ul')[0]; 
                list.removeChild(itemToDelete);
            }
        }
    })
}
