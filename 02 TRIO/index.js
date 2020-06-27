
	function Login(){
		var done=0;
		var one=document.login.one.value;one=one.toLowerCase();
		var two=document.login.two.value;two=two.toLowerCase();
		var tre=document.login.tre.value;tre=tre.toLowerCase();
		
		if (one=="LEPRAGREEN" && two=="LEPRARED" && tre=="LEPRABLUE") { window.location="###"; done=1; }
		if (done==0) { alert("~ ERRROR попробуй еще разок. ~"); }
	}
