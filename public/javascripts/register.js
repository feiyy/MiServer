

function timeout(time)
{
	if(time != 0)
	{
		$("#regmobile_btn").val("("+time+"s)后重新获取");
		time--;		
		setTimeout("timeout("+time+")",1000);
	}
	else
	{
		$("#regmobile_btn").val("获取动态码");
	}
}

$(function(){
		$("#regmobile_btn").click(function(){
			var phonenum =$("#dd_phoneinput").val();
			var reg =/^1[3|4|5|8][0-9]\d{8}$/;
			if(!reg.test(phonenum) && phonenum.length != 0)
			{
				$("#dd_phonenumerr").css("display","block");
			}
			else if(phonenum.length == 0)
			{
				$("#dd_phonenum").css("display","block");
			}
			else
			{
				$("#dd_phonenumerr").css("display","none");
				setTimeout(timeout(60),1000);		
			}
	    })
		
		$("#dd_phoneinput").blur(function(){
			var phonenum =$("#dd_phoneinput").val();
			if(phonenum.length == 0)
			{
				$("#dd_phonenum").css("display","block");
			}
			else
			{
				$("#dd_phonenum").css("display","none");	
			}
		})
				
		$("#dd_phoneinput").blur(function(){
			var phonenum =$("#dd_phoneinput").val();
			var reg =/^1[3|4|5|8][0-9]\d{8}$/;
			if(!reg.test(phonenum) && phonenum.length != 0)
			{
				$("#dd_phonenumerr").css("display","block");
			}
			else
			{
				$("#dd_phonenumerr").css("display","none");	
			}
		})
		
		$("#dd_movephonenum").blur(function(){
			var movephonenum = $("#dd_movephonenum").val();
			if(movephonenum.length != 0)
			{
				$("#dd_phonemovenum").css("display","none");	
			}
		})
		
		
		$("#dd_repassword").blur(function(){
			var password = $("#dd_password").val();
			var password2 = $("#dd_repassword").val();
			if(password2.length != 0)
			{
				$("#dd_pwdnum").css("display","none");
			}
			if(password != password2)
			{
				$("#dd_pwderr").css("display","block");
				return false;
			}
			$("#dd_pwderr").css("display","none");
			return true;
		})
		
		$("#dd_password").blur(function(){
			var password = $("#dd_password").val();
			var password2 = $("#dd_repassword").val();
			if(password.length != 0)
			{
				$("#dd_pwdnum").css("display","none");
			}
			if(password != password2 && password2.length != 0)
			{
				$("#dd_pwderr").css("display","block");
				return false;
			}
			$("#dd_pwderr").css("display","none");
			return true;
		})
		
		
		$("#dd_registerbtn").click(function(){
			var phonenum =$("#dd_phoneinput").val();
			var movephonenum = $("#dd_movephonenum").val();
			var password = $("#dd_password").val();
			var password2 = $("#dd_repassword").val();
			if($("#dd_phonenum").css("display") == "none" && $("#dd_phonenumerr").css("display") == "none" && $("#dd_phonemovenum").css("display") == "none" && $("#dd_pwdnum").css("display") == "none" && $("#dd_pwderr").css("display") == "none")
			{
				if(phonenum.length == 0)
				{
					$("#dd_phonenum").css("display","block");
				}
				else if(movephonenum.length == 0)
				{
					$("#dd_phonemovenum").css("display","block");
				}
				else if(password.length == 0 && password2.length == 0)
				{
					$("#dd_pwdnum").css("display","block");
				}
				else
				{
					$("#dd_registerbtn").attr("type","submit");
				}
			}
			
	    })
		
		
})

