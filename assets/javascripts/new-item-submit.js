var submitForm = document.getElementById('submit-form');

submitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var obj = new XMLHttpRequest();
    var input = document.getElementById('submit-input');
    var params = "&title=" + input.value + "&list_id=" + 1;
    obj.open("POST", "http://localhost");
    obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    obj.send(params);
    obj.onreadystatechange = function() {
        if(obj.readyState == XMLHttpRequest.DONE && obj.status == 200) {
            parser = new DOMParser();
            doc = parser.parseFromString(obj.response, "text/html");
            var newListItem = doc.firstChild.children[1].firstChild;
            var list = document.getElementsByTagName('ul')[0]; 
            list.appendChild(newListItem);
        }
    }
})
    
