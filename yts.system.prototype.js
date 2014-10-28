/*
 *
 * Javascript系统扩展库，扩展javascript各原生属性，实现扩展功能
 * Teryy 2014-10-28
 * github：https://github.com/terry668/jl
 *
 * */


/*
 * navigator扩展，主要是判断各种浏览器信息
 * =========================================
 * Terry 2014-10-28
 * */
navigator.isIE = navigator.userAgent.indexOf("MSIE") > -1;
navigator.isIE6 = window.attachEvent && !window.XMLHttpRequest && navigator.userAgent.indexOf("MSIE 6.0") > -1;
navigator.isIE7 = window.attachEvent && navigator.userAgent.indexOf("MSIE 7.0") > -1;


/*
 * Date属性扩展，将Date转换为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * ==================================================================
 * Terry 2014-10-28
 * */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


/*
* 实现String字符串endWith方法，参考C#里的endWith方法，判断字符串是否以某个字符串结尾
* ======================================================
* Terry 2014-10-28
* */
String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
};

// String字符串startWith方法
String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
};