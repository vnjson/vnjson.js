ren.createLayers = function(layers){
	/**
	 * Задаю стили родительскому элементу
	 */
$(ren.config.parent).append("<canvas id='vn' ></canvas");
var canvas = document.getElementById('vn');
canvas.style.border ="2px dotted grey";
canvas.width = 600;
canvas.height = 400;

var ctx = canvas.getContext("2d");

function creatLayer(layer){
	ctx.fillStyle = layer.style.backgroundColor;
	ctx.fillRect(layer.style.x,layer.style.y,canvas.width,canvas.height);
}

//
/**
LAYERS[].pusth()
update();

*/
//scene.children[<dbox>]

			//ren.event.jump(startLabel);
};