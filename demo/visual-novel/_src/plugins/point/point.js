
var scoresData = 0;
function point(data){

	scoresData = scoresData+data;

	scoresEl.innerHTML = `scores: ${scoresData}`;
	
};
