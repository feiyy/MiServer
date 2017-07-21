function modifyName()
{
	$(".dd_modName").val($("#dd_uname").text());
}

function modifySex()
{
	if($("#dd_usex").text() == "男")
	{
		$("#dd_male").css("background-color","deepskyblue");
		$("#dd_male").css("color","white");
		$("#dd_female").css("background-color","lightgrey");
		$("#dd_female").css("color","#333");
	}
	else
	{
		$("#dd_female").css("background-color","pink");
		$("#dd_female").css("color","white");
		$("#dd_male").css("background-color","lightgrey");
		$("#dd_male").css("color","#333");
	}
}


$(function(){
	$(".modal").on("show.bs.modal",
	function(event)
	{
		var button=$(event.relatedTarget);
		
		$(this).find(".modal-footer").html("");
		$(this).find(".modal-footer").append("<div class='col-xs-6 dd_addrHold' onclick=''>保存</div><div class='col-xs-6 dd_addrCancel'>取消</div>");
	});
	
	$(".modal").on("show.bs.modal",
	function(event)
	{
		var button=$(event.relatedTarget);
		
		$(this).find(".modal-footer").html("");
		$(this).find(".modal-footer").append("<div class='col-xs-6 dd_addrHold' onclick=''>保存</div><div class='col-xs-6 dd_addrCancel'>取消</div>");
	});
	
	$("#dd_male").click(function(){
		$("#dd_male").css("background-color","deepskyblue");
		$("#dd_male").css("color","white");
		$("#dd_female").css("background-color","lightgrey");
		$("#dd_female").css("color","#333");
	})
	
	$("#dd_female").click(function(){
		$("#dd_female").css("background-color","pink");
		$("#dd_female").css("color","white");
		$("#dd_male").css("background-color","lightgrey");
		$("#dd_male").css("color","#333");
	})
});





