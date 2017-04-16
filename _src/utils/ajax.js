/**
 * @Simple ajax function
 */
function ajax(pathToScene){
  let promise = new Promise(function(resolve, reject){
  			const xhttp = new XMLHttpRequest();
 			xhttp.onreadystatechange = function (){
    			if(this.readyState == 4 && this.status == 200) {
     				resolve(JSON.parse(this.responseText));
   			 	}else{
   			 		reject(this);
   			 	}
  			};
  		
  			xhttp.open("GET", pathToScene, true);
  			xhttp.send();


  });

  return promise;
};

export default ajax;