/*
 * Javascript各种验证小部件
 * Teryy 2014-10-29
 * github：https://github.com/terry668/yts
 *
 * */

var yts = yts || {};

//
// yts.validator 用户输入验证器
// ------------------------
yts.validator = {

    /*
    * 验证字符串是否为空
    * @val：被验证的字符串
    * 例子：yts.validator.isnull("test")
     * ===============================
     * Terry 2014-10-29
    * */
    isnull: function (val) {
        if (val.replace(/\s/g, "") == "") {
            return true;
        } else {
            return false
        }
        ;
    },

    // 验证邮箱地址是否合法
    // @val：邮箱地址字符串
    ismail: function (val) {
        var p = /^\w+(?:[-+.']\w+)*@\w+(?:[-.]\w+)*\.\w+(?:[-.]\w+)*$/;
        if (p.test(val)) {
            return true;
        } else {
            return false;
        }
    },

    // 验证字符串是否为合法url地址
    // @val：url字符串
    isurl: function (val) {
        var p = /^(?:http(?:s)?:\/\/)?([\w-]+\.)+[\w-]+(?:\/[\w- .\/\?%&=]*)?$/;
        if (p.test(val)) {
            return true;
        } else {
            return false;
        }
    },

    /*
     验证输入是否是数字
     @val:要验证的字符串或数字
     @options:可选参数，{min:最小值,max:最大值,decimal:可以带几位小数}
     */
    isnum: function (val, options) {
        var options = options || {};
        var p = /^\d+$/;
        if (options.decimal) {
            p = eval("/^\\d+(?:\\.\\d{1," + options.decimal + "})?$/");
        }
        var test = p.test(val);
        if (options.min) {
            if (parseFloat(val) < options.min) {
                test = false;
            }
        }
        if (options.max) {
            if (parseFloat(val) > options.max) {
                test = false;
            }
        }
        return test;
    },

    // 验证用户输入的内容长度是否符合要求
    // @val:要验证的字符串或数字
    // [@options]:可选参数，{min:最小长度,max:最大长度,istrim:是否去除空格,传入true则去除}
    checklen: function (val, options) {
        var options = options || {};
        if (options.istrim) {
            val = val.replace(/\s/g, "");
        }
        if (options.min <= val.length && val.length <= options.max) {
            return true;
        }
        else {
            return false;
        }
    },

    // 验证传入的两个值是否完全一致（不转换类型）
    compare: function (val, val2) {
        return val === val2;
    },

    // 验证用户名格式是否合法(4~20位数字、字母、下划线组成并且以字母开头，可允许中文)
    // @val:要验证的字符串
    isuser: function (val) {
        //var p = /^[0-9a-z]{1}[a-z0-9_]{3,19}$/i;
        var p = /^[0-9a-zA-Z|\u4E00-\u9FA5]{1}[\u4E00-\u9FA5|A-Za-z0-9_]{3,19}$/g;
        return p.test(val);
    },

    // 验证密码格式是否合法(6~20位任意字符)
    // @pwd：密码字符串
    ispwd: function (pwd) {
        var p = /^[\s\S]{6,20}$/;
        return p.test(val);
    },

    // 验证密码强度(长度小于8，为弱；长度大于8并且包含2个种类字符为中；长度大于8并且包含3个种类字符为强)
    // @pwd：要验证的密码字符串
    pwdstrength: function (pwd) {

        var l = pwd.length;
        var s = "";
        if (l < 8) {
            s = "Weak password";
        }
        var num = 0; //密码所包括的字符种类
        if (/[0-9]/.test(pwd)) {
            num++;
        } //包括了数字
        if (/[a-z]/i.test(pwd)) {
            num++;
        } //包括了字母
        if (/[^a-z0-9]/i.test(pwd)) {
            num++;
        } //包括了数字字母以外的字符
        if (l >= 8 && l <= 20 && num < 3) {
            s = "Fair password";
        }
        if (l >= 8 && l <= 20 && num == 3) {
            s = "Strong password";
        }
        return s;
    },

    // 验证用户输入是否是合法的日期格式(2011/12/11或12/11/2011)
    // @val：要验证是字符串
    isdate: function (val) {
        if (val.replace(/\s/g, "") == "") {
            return false
        }
        ;
        var d = new Date(val);
        if (isNaN(d)) {
            return false;
        } else {
            return true;
        }
    },

    // 从用户输入内容中分离出金额
    // 1、允许以$或USD开头+数字格式
    // 2、数字后面的字符不做处理
    // @val：需要分离金额的字符串
    getmoney: function (val) {
        if (val.replace(/\s/g, "") == "") {
            return "";
        }
        var p = /^(?:\$|USD|US\$)?\s*(\d+(?:\.\d+)?)/i;
        if (p.test(val)) {
            return RegExp.$1;
        } else {
            return val;
        }
    },

    // 判断用户是否可能输入了联系方式
    // @val：被验证的字符串
    hascontact: function (val) {
        if (wit.validator.isnull(val)) {
            return false;
        }
        //要检测的关键字
        var keyword = ["call", "mobile", "phone", "website", "tele", "tel", "telephone", "mail", "e-mail", "email", "\@", "skype", "icq", "windows\\slive", "\\d{3,}", "qq", "\\+\\d+", "at"];

        var keyCount = 0;
        var match = "";
        for (var i = 0, l = keyword.length; i < l; i++) {
            var reg = new RegExp("\\b(" + keyword[i] + ")\\b", "i");
            if (reg.test(val)) {
                match = RegExp.$1;
                keyCount++;
                break;
            }
        }
        return keyCount > 0;
    }

}