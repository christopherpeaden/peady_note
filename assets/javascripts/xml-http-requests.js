var obj = new XMLHttpRequest();
var buttons = document.getElementsByClassName("delete-button");

for (var x = 0; x < buttons.length; x++) {
    var button = buttons[x];

    button.addEventListener("click", function() {
      var id = this.getAttribute('data-id');
      console.log(id);
      obj.open("DELETE", "http://www.christopherpeaden.xyz?id=" + id);
      obj.onreadystatechange = function() {//Call a function when the state changes.
      if(obj.readyState == XMLHttpRequest.DONE && obj.status == 200) {
          var listDiv = document.getElementById('content');
          console.log(listDiv);
          console.log(obj.response);
      }
  }
      obj.send();
    })
}
