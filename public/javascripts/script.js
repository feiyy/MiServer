$(document).ready(function() {
    reSize = function() {
        var width = $(window).width();
        var height = $(window).height();
        if ((width / height) > 0.8) {
            width = height * 0.5625;
            $('.wrapper').css('width', width + 'px');
        } else {
            $('.wrapper').css('width', '100%');
        }
        $('html').css('font-size', parseInt(width / 24) + "px");
    }

    frag_switch = function(target, source, callback) {
        $.ajax({
            type: "get",
            url: "/fragments/" + source,
            async: true,
            success: function(data) {
                $(target).html(data);
                touchLoad();
                $('.carousel').carousel('cycle');
                callback();
            }
        });
    }

    footer = function(id) {
        var fragbtns = $("#fragbtns").children();
        for (var index = 0; index < 4; index++) {
            var fragbtn = fragbtns[index];
            var target = (index + 1) * 2;
            if ((id - 1) == index) {
                $(fragbtn).find(".footerimg>img").attr('src', '/images/footer/footer' + (target - 1) + '.png');
                $(fragbtn).find(".frag_name>p").addClass('active');
            } else {
                $(fragbtn).find(".footerimg>img").attr('src', '/images/footer/footer' + target + '.png');
                $(fragbtn).find(".frag_name>p").removeClass('active');
            }
        }
    }

    fragment = function(id) {
        if (id == 1) {
            frag_switch('#tvbox', 1, function() {
                frag_switch('.content', '1_1', function() {
                    footer(id);
                })
            });
        } else {
            frag_switch('#tvbox', id, function() {
                footer(id);
            });
        }

    }
    reSize();
    $(window).on('load', reSize);
    $(window).on('resize', reSize);
});