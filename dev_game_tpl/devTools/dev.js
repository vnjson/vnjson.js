function devTools(){
$('body').append('<section id="dev"></section>');

 $.get('devTools/devTempate.mustache',function(template){

 var object = [];	
 /*$.each(ren.current.object,function(key,value){
 	object.push({key:key,value:value});
 });*/

 var data = {
 	item:"ren.current.item",
 	object:null,//object,
 	scene:"ren.current.scene",
 	label:"ren.current.label"
 };	
 	 
 Mustache.parse(template);   

	
  var rendered = Mustache.render(template,data);
  $('#dev').html(rendered);

 });

}