import ctx from './ctx';
import getScene from './get-scene';
function jump(pathname){
	ctx.pathname = pathname;
	const pathArr = pathname.split('/');
	ctx.scene = pathArr[0];
	ctx.label  = pathArr[1];
	getScene(ctx.scene);
};

export default jump;