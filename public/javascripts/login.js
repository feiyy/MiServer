$(function(){
	$("#dd_lookeye").click(function(){
		if($("#pwd").attr("type") == "password")
		{
			$("#pwd").attr("type","text");
		}
		else
		{
			$("#pwd").attr("type","password");
		}		
	})
	
	$("#pwd").blur(function(){
		var pwdnum =$("#pwd").val();
		if(pwdnum.length != 0)
		{
			$("#dd_errorpwd").css("display","none");
		}
	})
	
	
	
	$("#username").blur(function(){
		var accountnum = $("#username").val();
		if(accountnum.length != 0)
		{
			$("#dd_errorname").css("display","none");		
		}
    })
	
	$("#loginbutton").click(function(){
		var accountnum = $("#username").val();
		var pwdnum =$("#pwd").val();
		if(accountnum.length == 0 && $("#dd_errorpwd").css("display") == "none")
		{
			$("#dd_errorname").css("display","block");
		}
		else if(pwdnum.length == 0)
		{
			$("#dd_errorpwd").css("display","block");
		}
		else
		{
			$("#loginbutton").attr("type","submit");
		}
    })
	
	
})