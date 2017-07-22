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

//需要把阅读的文件传进来file element是把读取到的内容放入的容器
function readFile(file,element) 
{
	//新建阅读器

	var reader = new FileReader();
	//根据文件类型选择阅读方式
	switch (file.type)
	{
		case 'image/jpg':
		case 'image/png':
		case 'image/jpeg':
		case 'image/gif':
		reader.readAsDataURL(file);
		break;
    }
    //当文件阅读结束后执行的方法
	reader.addEventListener('load',function () 
	{
		//如果说让读取的文件显示的话 还是需要通过文件的类型创建不同的标签

		switch (file.type)
		{
		    case 'image/jpg':
			case 'image/png':
			case 'image/jpeg':
			case 'image/gif':
			var img = document.createElement('img');

			img.src = reader.result;
			element.append(img);
			element.show();
			break;
		}
    });
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

	$("#exampleInputFile").change(function () {
 	  $(".dd_userimg").empty();
      var file = this.files[0];
      readFile(file,$(".dd_userimg"));
    });

});





