function comedown(divCtrl, divName) {
    if (divCtrl.classList.contains("zk_down")) {
        $("." + divName).css("display", "block");
        divCtrl.classList.remove("zk_down");
        divCtrl.classList.add("zk_turnUp");
        divCtrl.getElementsByTagName("img")[0].src = "/img/getUp.png";
    } else {
        $("." + divName).css("display", "none");
        divCtrl.classList.remove("zk_turnUp");
        divCtrl.classList.add("zk_down");
        divCtrl.getElementsByTagName("img")[0].src = "/img/getDown.png";
    }
}

function chooseAddr(divName, divCtrl) {
    if ($(divCtrl).hasClass("zk_noChoose")) {
        var chDiv = $("." + divName + " .zk_choose");
        chDiv.removeClass("zk_choose");
        chDiv.addClass("zk_noChoose");
        chDiv.find("img").attr("src", "img/check_normal.png");
        divCtrl.getElementsByTagName("img")[0].src = "/img/check_press.png";
        divCtrl.classList.remove("zk_noChoose");
        divCtrl.classList.add("zk_choose");
    } else {
        divCtrl.getElementsByTagName("img")[0].src = "/img/check_normal.png";
        divCtrl.classList.remove("zk_choose");
        divCtrl.classList.add("zk_noChoose");
    }
}