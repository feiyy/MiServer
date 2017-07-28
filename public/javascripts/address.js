function modifyAddr(j) {
    $("#number").val(j);
    $(".zk_modName").val($("#zk_address" + j + " .zk_addrUser").text());
    $(".zk_modPhone").val($("#zk_address" + j + " .zk_addrPhone").text());
    $(".zk_modAddr").val($("#zk_address" + j + " .zk_addrSpecific").text());
}

initialize = function() {
    $.ajax({
        type: "get",
        url: "/order",
        async: true,
        success: function(item) {
            var j = 0;
            for (var i = 0; i < item.address.length; i++) {
                var str = "<div class='zk_addrDetail col-xs-12' id='zk_address" + j + "'>" +
                    "<div class='col-xs-12'>" +
                    "<div class='col-xs-3 zk_addrUser'>" + item.address[i].name + "</div>" +
                    "<div class='col-xs-4 zk_addrPhone'>" + item.address[i].phone + "</div>" +
                    "<div class='col-xs-12 zk_addrSpecific'>" + item.address[i].addr + "</div>" +
                    "<div class='col-xs-12' style='background-color: rgba(0,0,0,0.1);height: 1px;padding-bottom: 0;padding-top: 0;'></div>" +
                    "<div class='col-xs-6 zk_addrModify'  data-toggle='modal' data-target='#myModal' data-whatever=" + j + " onclick='modifyAddr(" + j + ")'>修改</div>" +
                    "<div class='col-xs-6 zk_addrDelete' onclick='removeAddr(" + j + ")' >删除</div>" +
                    "</div>" +
                    "</div>";
                $(".zk_addrs").append(str);
                j++;
            }

        }
    });
}

function removeAddr(divNum) {
    $.ajax({
        type: "get",
        url: "/address/delete/" + divNum,
        async: true,
        success: function(item) {
            console.log(item);
            $("#zk_address" + divNum).slideUp();
        }
    });
}

$(function() {
    $("#myModal").on("show.bs.modal",
        function(event) {
            console.log("come in")
            var button = $(event.relatedTarget);
            // var recipient = button.data('whatever');
            $("#number").val(button.data('whatever'));
            $(this).find(".modal-footer").html("");
            // $(".zk_addrHold").attr("onclick", "keepInDB(" + recipient + ")");
        });
});

cancel = function() {
    $(".close").click();
}