/*
 * Bootstrap 3.2.0 扩展插件
 * Teryy 2014-10-29
 * github：https://github.com/terry668/yts
 *
 * */

var yts = yts || {};

//
// yts.bootstrap bootstrap扩展插件
// ------------------------
yts.bootstrap = {

// yts.bootstrap.modal 模态弹窗 基于bootstrap模态弹窗
// @options 可选参数
// {
//   id: 弹窗标识ID [必选，否则无法识别多个模态弹窗]
//   title: 模态弹窗标题
//   html: 内容html，可带标签和样式，可用于表单提交之类的需求
//   onshow: 显示时执行的函数
//   onhide: 隐藏时执行的函数
//   button: 0 不显示按钮栏  1 只显示一个按钮（确定）  2 显示两个按钮（确定、取消） 默认为1
//   btnText1: 按钮1文本
//   btnText2: 按钮2文本
//   callback: 回调函数，确认框的确认按钮事件
// }
// -----------------------
    dialog: function (options) {
        // 初始化参数变量
        options.id = options.id || "";
        options.title = options.title || "";
        options.html = options.html || "信息提示: " + options.id;
        options.button = options.button || 0;
        options.btnText1 = options.btnText1 || "确定";
        options.btnText2 = options.btnText2 || "取消";
        options.callback = options.callback;

        // 如果对象不存则创建对象
        if (!window["mymodal" + options.id]) {

            // 创建模态弹窗对象
            function _modal() {
                var _html = '<div class="modal" data-keyboard="false" data-backdrop="static" id="modal' + options.id + '" tabindex="-1" role="dialog" aria-describedby="modal-body' + options.id + '" aria-labelledby="myModalLabel' + options.id + '" aria-hidden="true">';
                _html += '<div class="modal-dialog">';
                _html += '<div class="modal-content">';
                _html += '<div class="modal-header clearfix">';
                _html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-cancel"></i></button>';
                _html += '<h4 class="modal-title" id="myModalLabel' + options.id + '">' + options.title + '</h4>';
                _html += '</div>';
                _html += '<div class="modal-body" id="modal-body' + options.id + '">';
                _html += options.html
                _html += '</div>';
                if (options.button != 0) {
                    _html += '<div class="modal-footer">';
                    if (options.button == 1) {
                        _html += '<button type="button" class="btn btn-default" id="modal' + options.id + '-btn1">' + options.btnText1 + '</button>';
                    }
                    else if (options.button == 2) {
                        _html += '<button type="button" class="btn btn-primary" id="modal' + options.id + '-btn1">' + options.btnText1 + '</button>';
                        _html += '<button type="button" class="btn btn-default" data-dismiss="modal">' + options.btnText2 + '</button>';
                    }
                    _html += '</div>';
                }
                _html += '</div></div></div>';
                $("body").append(_html);
            }

            // 模态弹窗显示
            // @content：提示内容，可包含html标签
            // @title：提示框标题，可选参数
            _modal.prototype.show = function (content, title) {

                // 设置提示标题
                $("#myModalLabel" + options.id).html(title || options.title);

                // 设置提示内容
                $("#modal-body" + options.id).html(content || options.html);

                $("#modal" + options.id).modal("show");

                // 弹窗对象自己的Jquery对象
                _modal.prototype.self = $("#modal" + options.id);

                // 显示后执行显示回调函数
                if (options.onshow) {
                    options.onshow();
                }
            }

            // 模态弹窗隐藏
            _modal.prototype.hide = function () {

                // 清空弹窗内容
                $("#modal-body" + options.id).html("");

                $("#modal" + options.id).modal("hide");

                // 隐藏后执行隐藏回调函数
                if (options.onhide) {
                    options.onhide();
                }
            }

            // 返回弹窗对象，jquery对象
            _modal.prototype.self = $("#modal" + options.id);

            // 模态弹窗存入全局变量
            window["mymodal" + options.id] = new _modal();

            // 绑定确认按钮事件
            if (options.button >= 1) {
                $("#modal" + options.id + "-btn1").on("click", function () {
                    if (options.callback && typeof(options.callback) == "function") {
                        options.callback();
                    }
                    window["mymodal" + options.id].hide();
                });
            }

        }

        return window["mymodal" + options.id]

    },

//
// yts.bootstrap.alert 信息提示框
// @msg: 提示信息内容
// @type: 提示类型
//        e - error 错误提示信息
//        s - success 成功提示信息
//        w - warning 警告提示信息
//        对应的类型显示对应的提示图标，默认为普通提示，显示普通提示信息图标
// @callback: 提示框确认按钮点击函数
// ----------------------
    alert: function (msg, type, callback) {
        var title = "信息提示";
        var tipIco = " <i class='icon-attention fsize-16 text-primary'></i> ";

        // 根据提示类型显示不同的提示标题和提示图标
        if (type) {
            switch (type) {
                case "e":
                    title = "错误提示";
                    tipIco = " <i class='icon-cancel-circle text-danger'></i> ";
                    break;
                case "s":
                    title = "成功提示";
                    tipIco = " <i class='icon-ok-circle text-success'></i> ";
                    break;
                case "w":
                    title = "警告提示";
                    tipIco = " <i class='icon-attention text-warning'></i> ";
                    break;
                default:
                    tipIco = " <i class='icon-attention text-primary'></i> ";
                    break;
            }
        }

        var alertbox = this.dialog({
            id: "-yts-alert",
            button: 1,
            callback: callback
        });
        alertbox.show(msg, tipIco + title);
        return alertbox;
    }
};