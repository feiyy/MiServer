$(document).ready(function() {
    reSize = function() {
        var width = $(window).width();
        var height = $(window).height();
        if ((width / height) > 0.76 && height > 500) {
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

    shopcartCounts = function() {
        $.ajax({
            type: "post",
            url: "/shopcart/count",
            async: true,
            success: function(data) {
                $("#shopcart-counts").fadeOut("fast", function() {
                    if (data != 0) $("#shopcart-counts").text(data).fadeIn();
                })
            }
        });
    }
});

//wf
(function(global, doc, factoryFn) {
    var factory = factoryFn(global, doc);

    global.util = global.util || {};
    global.util.toucher = global.util.toucher || factory;

    global.define && define(function(require, exports, module) {
        return factory;
    });
})(this, document, function(window, document) {
    function hasClass(dom, classSingle) {
        return true;
    }

    function ON(eventStr, a, b) {
        this._events = this._events || {};
        var className, fn;
        if (typeof(a) == 'string') {
            className = a.replace(/^\./, '');
            fn = b;
        } else {
            className = null;
            fn = a;
        }
        if (typeof(fn) == 'function' && eventStr && eventStr.length) {
            var eventNames = eventStr.split(/\s+/);
            for (var i = 0, total = eventNames.length; i < total; i++) {

                var eventName = eventNames[i];
                if (!this._events[eventName]) {
                    this._events[eventName] = [];
                }
                this._events[eventName].push({
                    'className': className,
                    'fn': fn
                });
            }
        }
        return this;
    }

    function EMIT(eventName, e) {
        this._events = this._events || {};
        if (!this._events[eventName]) {
            return
        }
        var rest_events = this._events[eventName];
        var target = e.target;
        while (1) {
            if (rest_events.length == 0) {
                return;
            }
            if (target == this.dom || !target) {
                for (var i = 0, total = rest_events.length; i < total; i++) {
                    var classStr = rest_events[i]['className'];
                    var callback = rest_events[i]['fn'];
                    if (classStr == null) {
                        event_callback(eventName, callback, target, e);
                    }
                }
                return;
            }
            var eventsList = rest_events;
            rest_events = [];
            for (var i = 0, total = eventsList.length; i < total; i++) {
                var classStr = eventsList[i]['className'];
                var callback = eventsList[i]['fn'];
                if (hasClass(target, classStr)) {
                    if (event_callback(eventName, callback, target, e) == false) {
                        return
                    }
                } else {
                    rest_events.push(eventsList[i]);
                }
            }
            target = target.parentNode;
        }
    }

    function event_callback(name, fn, dom, e) {
        var touch = e.touches.length ? e.touches[0] : {};
        var newE = {
            'type': name,
            'target': e.target,
            'pageX': touch.clientX || 0,
            'pageY': touch.clientY || 0
        };
        if (name.match(/^swipe/) && e.startPosition) {
            newE.startX = e.startPosition['pageX'],
                newE.startY = e.startPosition['pageY'],
                newE.moveX = newE.pageX - newE.startX,
                newE.moveY = newE.pageY - newE.startY
        }
        var call_result = fn.call(dom, newE);
        if (call_result == false) {
            e.preventDefault();
            e.stopPropagation();
        }
        return call_result;
    }

    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }

    function eventListener(DOM) {
        var this_touch = this;
        var touchStartTime = 0;
        var lastTouchTime = 0;
        var x1, y1, x2, y2;
        var touchDelay;
        var longTap;
        var isActive = false;
        var eventMark = null;

        function actionOver(e) {
            isActive = false;
            clearTimeout(longTap);
            clearTimeout(touchDelay);
        }

        function touchStart(e) {
            var event = e.touches[0];
            x1 = event.pageX;
            y1 = event.pageY;
            x2 = 0;
            y2 = 0;
            isActive = true;
            touchStartTime = new Date();
            EMIT.call(this_touch, 'swipeStart', e);
            clearTimeout(longTap);
            longTap = setTimeout(function() {
                actionOver(e);
                EMIT.call(this_touch, 'longTap', e);
            }, 500);
        }

        function touchend(e) {
            EMIT.call(this_touch, 'swipeEnd', eventMark);
            if (!isActive) {
                return
            }
            var now = new Date();
            if (now - lastTouchTime > 260) {
                touchDelay = setTimeout(function() {
                    actionOver();
                    EMIT.call(this_touch, 'singleTap', eventMark);
                }, 250);
            } else {
                clearTimeout(touchDelay);
                actionOver(e);
                EMIT.call(this_touch, 'doubleTap', eventMark);
            }
            lastTouchTime = now;
        }

        function touchmove(e) {
            eventMark = e;
            e.startPosition = {
                pageX: x1,
                pageY: y1
            };
            EMIT.call(this_touch, 'swipe', e);
            if (!isActive) {
                return
            }
            x2 = e.touches[0].pageX;
            y2 = e.touches[0].pageY;
            if (Math.abs(x1 - x2) > 2 || Math.abs(y1 - y2) > 2) {
                var direction = swipeDirection(x1, x2, y1, y2);
                EMIT.call(this_touch, 'swipe' + direction, e);
            } else {
                actionOver(e);
                EMIT.call(this_touch, 'singleTap', e);
            }
            actionOver(e);
        }
        document.addEventListener('touchstart', touchStart);
        document.addEventListener('touchend', touchend);
        document.addEventListener('touchmove', touchmove);
        document.addEventListener('touchcancel', actionOver);
    }

    function touch(document, param) {
        var param = param || {};
        this.dom = document;
        eventListener.call(this, this.dom);
    }
    touch.prototype['on'] = ON;
    return function(dom) {
        return new touch(dom);
    };
});
$(document).ready(function() {
    $(".wf_checkbox").click(function() {
        if ($(this).attr('check') == '0') {
            $(this).css('background', 'url(/images/cart/check.png) center no-repeat');
            $(this).css('background-size', '2rem 2rem');
            $(this).attr('check', '1');
        } else {
            $(this).css('background', 'url(/images/cart/uncheck.png) center no-repeat');
            $(this).css('background-size', '2rem 2rem');
            $(this).attr('check', '0');
        }
    });
    $(".input_add").click(function() {
        var targets = $(this).siblings();
        var target = targets[1];
        var i = $(target).attr('value');
        i++;
        $(target).attr('value', i);
        $(target).html(i);
    });
    $(".input_sub").click(function() {
        var targets = $(this).siblings();
        var target = targets[0];
        var i = $(target).attr('value');
        if (i != 1) {
            i--;
            $(target).attr('value', i);
            $(target).html(i);
        };
    });
    $('.content').click(function() {
        var amount = 0;
        var total = 0;
        var values = $(".wf_input").find('.input_value');
        var prices = $(".goods_element").find(".wf_goods_price");
        var checks = $(".wf_item").find(".wf_checkbox");
        for (var index = 0; index < values.length; index++) {
            var value = $(values[index]).attr('value');
            var price = $(prices[index]).attr('value');
            var check = $(checks[index]).attr('check');
            if (check == '1') {
                amount += Number(value);
                total += value * price;
            }
        }
        $(".all_counts").html('共' + amount + '件 金额/元');
        $(".all_price").html(total);
        $(".all_counts").attr('value', amount);
        $(".all_price").attr('value', total);
    });
    $(".goods_delete").on("click", function() {
        var item = $(this).parents("li").slideUp();
        $.ajax({
            type: "get",
            url: "/shopcart/" + $(this).attr("id"),
            async: true,
            success: function(data) {
                if (data == "success") {
                    item.fadeOut().slideUp();
                }
            }
        });
    });
    $(".clear_button").on("click", function() {
        var checks = $(".wf_item").find(".wf_checkbox");
        var check = [];
        for (index = 0; index < checks.length; index++) {
            check.push($(checks[index]).attr('check'));
        }
        var data = {
            allcounts: $(".all_counts").attr("value"),
            allprice: $(".all_price").attr("value"),
            check: check
        }
        $.ajax({
            type: "post",
            url: "/clearbutton",
            traditional: true,
            data: data,
            async: true,
            success: function(data) {
                if (data == "success") {
                    window.location.href = "/payment";
                }
            }
        });
    });
    touchLoad = function() {
        var myTouch = util.toucher(document.getElementById('carousel-example-generic'));
        myTouch.on('swipeLeft', function(e) {
            $('.right').click();
        }).on('swipeRight', function(e) {
            $('.left').click();
        });
    }
    touchLoad();
});