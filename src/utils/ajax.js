/**
 * @Simple ajax function
 */
function ajax(pathToScene, callback){
const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     		callback(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", pathToScene, true);
  xhttp.send();
};

export default ajax;