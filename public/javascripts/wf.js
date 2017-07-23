/**
 * @author 剧中人
 * @github https://github.com/bh-lay/toucher
 * @modified 2015-3-7 01:02
 * 
 */


(function(global, doc, factoryFn) {
    //初始化toucher主方法
    var factory = factoryFn(global, doc);

    //提供window.util.toucher()接口
    global.util = global.util || {};
    global.util.toucher = global.util.toucher || factory;

    //提供CommonJS规范的接口
    global.define && define(function(require, exports, module) {
        //对外接口
        return factory;
    });
})(this, document, function(window, document) {
    /**
     * 判断是否拥有某个class
     */
    function hasClass(dom, classSingle) {
        // return dom.className.match(new RegExp('(\\s|^)' + classSingle + '(\\s|$)'));
        return true;
    }

    /**
     * @method 向句柄所在对象增加事件监听
     * @description 支持链式调用
     * 
     * @param string 事件名
     * @param [string] 事件委托至某个class（可选）
     * @param function 符合条件的事件被触发时需要执行的回调函数 
     * 
     */
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
        //检测callback是否合法,事件名参数是否存在·
        if (typeof(fn) == 'function' && eventStr && eventStr.length) {
            var eventNames = eventStr.split(/\s+/);
            for (var i = 0, total = eventNames.length; i < total; i++) {

                var eventName = eventNames[i];
                //事件堆无该事件，创建一个事件堆
                if (!this._events[eventName]) {
                    this._events[eventName] = [];
                }
                this._events[eventName].push({
                    'className': className,
                    'fn': fn
                });
            }
        }

        //提供链式调用的支持
        return this;
    }

    /**
     * @method 事件触发器
     * @description 根据事件最原始被触发的target，逐级向上追溯事件绑定
     * 
     * @param string 事件名
     * @param object 原生事件对象
     */
    function EMIT(eventName, e) {
        this._events = this._events || {};
        //事件堆无该事件，结束触发
        if (!this._events[eventName]) {
            return
        }
        //记录尚未被执行掉的事件绑定
        var rest_events = this._events[eventName];

        //从事件源：target开始向上冒泡
        var target = e.target;
        while (1) {
            //若没有需要执行的事件，结束冒泡
            if (rest_events.length == 0) {
                return;
            }
            //若已经冒泡至顶，检测顶级绑定，结束冒泡
            if (target == this.dom || !target) {
                //遍历剩余所有事件绑定
                for (var i = 0, total = rest_events.length; i < total; i++) {
                    var classStr = rest_events[i]['className'];
                    var callback = rest_events[i]['fn'];
                    //未指定事件委托，直接执行
                    if (classStr == null) {
                        event_callback(eventName, callback, target, e);
                    }
                }
                return;
            }

            //当前需要校验的事件集
            var eventsList = rest_events;
            //置空尚未执行掉的事件集
            rest_events = [];

            //遍历事件所有绑定
            for (var i = 0, total = eventsList.length; i < total; i++) {
                var classStr = eventsList[i]['className'];
                var callback = eventsList[i]['fn'];
                //符合事件委托，执行
                if (hasClass(target, classStr)) {
                    //返回false停止事件冒泡及后续事件，其余继续执行
                    if (event_callback(eventName, callback, target, e) == false) {
                        return
                    }
                } else {
                    //不符合执行条件，压回到尚未执行掉的列表中
                    rest_events.push(eventsList[i]);
                }
            }
            //向上冒泡
            target = target.parentNode;
        }
    }

    /**
     * 执行绑定的回调函数，并创建一个事件对象
     * @param[string]事件名
     * @param[function]被执行掉的函数
     * @param[object]指向的dom
     * @param[object]原生event对象
     */
    function event_callback(name, fn, dom, e) {
        var touch = e.touches.length ? e.touches[0] : {};

        var newE = {
            'type': name,
            'target': e.target,
            'pageX': touch.clientX || 0,
            'pageY': touch.clientY || 0
        };
        //为swipe事件增加交互初始位置及移动距离
        if (name.match(/^swipe/) && e.startPosition) {
            newE.startX = e.startPosition['pageX'],
                newE.startY = e.startPosition['pageY'],
                newE.moveX = newE.pageX - newE.startX,
                newE.moveY = newE.pageY - newE.startY
        }
        var call_result = fn.call(dom, newE);
        //若绑定方法返回false，阻止浏览器默认事件
        if (call_result == false) {
            e.preventDefault();
            e.stopPropagation();
        }

        return call_result;
    }
    /**
     * 判断swipe方向
     */
    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }

    /**
     * 监听原生的事件，主动触发模拟事件
     * 
     */
    function eventListener(DOM) {
        var this_touch = this;

        //轻击开始时间
        var touchStartTime = 0;

        //记录上一次点击时间
        var lastTouchTime = 0;

        //记录初始轻击的位置
        var x1, y1, x2, y2;

        //轻击事件的延时器
        var touchDelay;

        //测试长按事件的延时器
        var longTap;

        //记录当前事件是否已为等待结束的状态
        var isActive = false;
        //记录有坐标信息的事件
        var eventMark = null;
        //单次用户操作结束
        function actionOver(e) {
            isActive = false;
            clearTimeout(longTap);
            clearTimeout(touchDelay);
        }

        //触屏开始
        function touchStart(e) {
            //缓存事件
            var event = e.touches[0];
            x1 = event.pageX;
            y1 = event.pageY;
            x2 = 0;
            y2 = 0;
            isActive = true;
            touchStartTime = new Date();
            EMIT.call(this_touch, 'swipeStart', e);
            //检测是否为长按
            clearTimeout(longTap);
            longTap = setTimeout(function() {
                actionOver(e);
                //断定此次事件为长按事件
                EMIT.call(this_touch, 'longTap', e);
            }, 500);
        }
        //触屏结束
        function touchend(e) {
            //touchend中，拿不到坐标位置信息，故使用全局保存下的事件
            EMIT.call(this_touch, 'swipeEnd', eventMark);
            if (!isActive) {
                return
            }
            var now = new Date();
            if (now - lastTouchTime > 260) {
                touchDelay = setTimeout(function() {
                    //断定此次事件为轻击事件
                    actionOver();
                    EMIT.call(this_touch, 'singleTap', eventMark);
                }, 250);
            } else {
                clearTimeout(touchDelay);
                actionOver(e);
                //断定此次事件为连续两次轻击事件
                EMIT.call(this_touch, 'doubleTap', eventMark);
            }
            lastTouchTime = now;
        }

        //手指移动
        function touchmove(e) {
            //缓存事件
            eventMark = e;
            //在原生事件基础上记录初始位置（为swipe事件增加参数传递）
            e.startPosition = {
                pageX: x1,
                pageY: y1
            };
            //断定此次事件为移动事件
            EMIT.call(this_touch, 'swipe', e);

            if (!isActive) {
                return
            }
            x2 = e.touches[0].pageX;
            y2 = e.touches[0].pageY;
            if (Math.abs(x1 - x2) > 2 || Math.abs(y1 - y2) > 2) {
                //断定此次事件为移动手势
                var direction = swipeDirection(x1, x2, y1, y2);
                EMIT.call(this_touch, 'swipe' + direction, e);
            } else {
                //断定此次事件为轻击事件
                actionOver(e);
                EMIT.call(this_touch, 'singleTap', e);
            }
            actionOver(e);
        }

        /**
         * 对开始手势的监听
         */
        document.addEventListener('touchstart', touchStart);

        /**
         * 对手势结束的监听（轻击）
         */
        document.addEventListener('touchend', touchend);

        /**
         * 对移动手势的监听
         */
        document.addEventListener('touchmove', touchmove);

        /**
         * 对移动结束的监听
         */
        document.addEventListener('touchcancel', actionOver);
    }

    /**
     * touch类
     * 
     */
    function touch(document, param) {
        var param = param || {};

        this.dom = document;
        //监听DOM原生事件
        eventListener.call(this, this.dom);
    }
    //拓展事件绑定方法
    touch.prototype['on'] = ON;

    //对外提供接口
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
            //background:'url(../images/u=541265155,3402819027&fm=214&gp=02222.jpg.png) center no-repeat';
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
    });

    $(".goods_delete").on("click", function() {
        $.ajax({
            type: "get",
            url: "/shopcart/" + $(this).attr("id"),
            //  		dataType:"String",
            //  		data:{id:$(".wf_item").attr("id")}
            async: true,
            success: function(data) {
                if (data == "success") {
                    location.reload();
                }
            }
        });
    });

    $(".clear_button").on("click",function(){
        var data ={
            allcounts:$(".all_counts").attr("value"),
            allprice:$(".all_price").attr("value")
        }
        console.log(data);
        $.ajax({
            type: "post",
            url: "/clearbutton" ,
            data:data,
            async: true,
            success: function(data) {
                if (data == "success") {
                    location.reload();
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

});