/*
 * Javascript转换组件
 * Teryy 2014-10-29
 * github：https://github.com/terry668/yts
 *
 * */

var yts = yts || {};

//
// yts.convert js转换器
// ------------------------
yts.convert = {

    /*
     * 把数字转换为货币显示
     * @number ： 金额数字
     * @symbol ： 货币符号
     * @decimal ： 小数位数
     * =============================
     * 例子：yts.convert.number2money(10023.123,"$",2);
     * =============================
     * Terry 2014-10-29
     * */
    number2money: function (number, symbol, decimal) {
        try {
            if (isNaN(number))
                throw "The param “number” must be a number.";
            number = parseFloat(number, 10);
            return symbol +
            number.toFixed(decimal).split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('');
        }
        catch (e) {
            if (console && console.warn) {
                console.warn(e);
            }
            return "";
        }
    },

    /*
     * 倒计时，提供两种形式的倒计时功能。1、只有秒的倒计时 2、传入天、时、分、秒的倒计时
     * @time:倒计时,{d:天,h:时,m:分,s:秒,format:"object"},format表示返回值形式，传入"object"则返回{d:天,h:时,m:分,s:秒}，否则直接返回剩余数值
     * @onTicking:倒计时中的回调函数，每倒数1秒就执行一次，回调函数的上下文对象this指向了内部的计时器i，可在回调函数内部使用clearInterval(this)提前结束计时
     * @ended:倒计时结束后执行的回调函数，回调函数的上下文对象this指向了内部的计时器i，可在回调函数内部使用clearInterval(this)提前结束计时
     * =============================
     * 例子：yts.convert.timer(133322332);
     * =============================
     * Terry 2014-10-29
     * */
    timer: function (time, onTicking, ended) {
        var time = time || {};
        var d = parseInt(time.d) || 0;
        var h = parseInt(time.h) || 0;
        var m = parseInt(time.m) || 0;
        var s = parseInt(time.s) || 0;
        s += d * 24 * 3600 + m * 60 + h * 3600;
        if (s == 0) {
            return false;
        }
        var ticker = 0;
        var isobj = time.format == "object" ? true : false;
        //将秒转换成{d:天,h:时,m:分,s:秒}形式
        function convert2hms(s) {
            var d = Math.floor(s / (24 * 3600));
            s -= d * 24 * 3600;
            var h = Math.floor(s / 3600);
            s -= h * 3600;
            var m = Math.floor(s / 60);
            s -= m * 60;
            return {d: d, h: h, m: m, s: s}
        }

        var i = setInterval(function () {
            s--;
            var cur = isobj == true ? convert2hms(s) : s;
            if (onTicking) {
                onTicking.call(i, cur);
            }
            ;
            if (s == 0) {
                clearInterval(i);
                if (ended) {
                    ended.call(i, cur);
                }
            }
        }, 1000);
    }
};