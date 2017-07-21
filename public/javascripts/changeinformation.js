function modifyName()
{
	$(".dd_modName").val($("#dd_uname").text());
}

function modifySex()
{
	if()
}

$(function(){
	$("#myModal1").on("show.bs.modal",
	function(event)
	{
		var button=$(event.relatedTarget);
		
		$(this).find(".modal-footer").html("");
		$(this).find(".modal-footer").append("<div class='col-xs-6 dd_addrHold' onclick=''>保存</div><div class='col-xs-6 dd_addrCancel'>取消</div>");
	});
});





