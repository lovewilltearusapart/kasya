$("#fullscreen").hide();
$("#noclick").hide();
var keys = [];
var konami = '38,38,40,40,37,39,37,39,66,65';
var konamiArray = ['38','38','40','40','37','39','37','39','66','65'];
var x = 0;
var i = 0;

function yes(id){
	$("#"+(id+1)).addClass("correct");
}
function no(id){
	$("#"+(id+1)).addClass("incorrect");
}
function check(){
	$(keys).each(function(index, value){
		if(konamiArray[index] == value){
			yes(index);
		} else {
			no(index);
		}
	});
}

setInterval(function(){
	i++;
	if(i>300){
		$("i").each(function(){
			$(this).removeClass("correct").removeClass("incorrect");
			keys = [];
			x = 0;
		});
	}
}, 1);

$(document).keydown(function(e) {
	i = 0;
	keys.push(e.keyCode);
	check();
	if (keys.toString().indexOf(konami) >= 0) {
		keys = [];
		$('#fullscreen').append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/####СОЗДАТЬ РОЛИК####?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
		$('#fullscreen').show();
		$('#noclick').show();
		full = true;
	}
});
$(noclick).click(function(){
	$("#fullscreen").html(" ").fadeout();
	$(this).fadeout();
});
