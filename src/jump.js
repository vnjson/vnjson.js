import current from './current';
//import getScene from './get-scene';
export default (pathname)=>{
	/**
		не работает потому что первый прыжок
		загружает саму сцену, а второй только по
		label'ам прыгает.
	*/
	current.pathname = pathname;
	const pathArr = pathname.split('/');
	current.scene = pathArr[0];
	current.label  = pathArr[1];
	//getScene(current.scene);
};