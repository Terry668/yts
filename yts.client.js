/*
 * Javascript客户端操作库
 * Teryy 2014-10-29
 * github：https://github.com/terry668/yts
 *
 * */

var yts = yts || {};

//
// yts.client js客户端操作库
// ------------------------
yts.client = {

    /*
    * 把页面直接滚动到顶部
    * ========================
    * 例子：yts.client.scrollTop();
    * ========================
    * 2014-10-29
    * */
    scrollTop: function () {
        function b() {
            return $(window).scrollTop();
        }

        function c(a) {
            $(window).scrollTop(a);
        }

        function a() {
            c(b() / 1.1);
            b() < 1 && clearInterval(d);
        }

        var d = setInterval(a, 5);

        return false;
    },

    /*
    * 获取访客环境属性
    * 返回对象
    * osinfo:{
    * browserName:浏览器名称 ,
    * browserVersion:浏览器版本,
    * browserLanguage:浏览器语言环境
    * }
    * ===================================
    * Terry 2014-10-29
    * */
    // 获取访客环境属性
    // 返回osInfo
    clientInfo: function () {
        var ua = navigator.userAgent, type = 0, system, agent = ua,
            osinfo = {
                agent: ua,
                screen: [window.screen.width, window.screen.height],
                isIE: isIE
            },
            rMsie = /.*(msie) ([\w.]+).*/, // ie
            rTT = /.*(tencenttraveler) ([\w.]+).*/, // tt
            rMaxthon = /.*(maxthon) ([\w.]+).*/, // maxthon
            rFirefox = /.*(firefox)\/([\w.]+).*/, // firefox
            rOpera = /(opera).+version\/([\w.]+)/, // opera
            rChrome = /.*(chrome)\/([\w.]+).*/, // chrome
            rSafari = /.*version\/([\w.]+).*(safari).*/;// safari

        //获取操作系统信息
        if (ua.indexOf("Windows") > -1) {
            system = "Windows";
        }
        else if (ua.indexOf("iPhone") > -1) {
            system = "iPhone";
        }
        else if (ua.indexOf("SymbOS") > -1) {
            system = "SymbOS";
        }
        else {
            system = "Others";
        }
        ;
        osinfo.system = system.toLowerCase();

        //获取浏览器信息
        function uaMatch(ua) {
            var match = rTT.exec(ua); //TT浏览器
            if (match != null) {
                return {browser: match[1] || "", version: match[2] || "0"};
            }
            var match = rMaxthon.exec(ua); //Maxthon浏览器
            if (match != null) {
                return {browser: match[1] || "", version: match[2] || "0"};
            }
            var match = rMsie.exec(ua); //IE浏览器
            if (match != null) {
                return {browser: match[1] || "", version: match[2] || "0"};
            }
            var match = rFirefox.exec(ua); //FireFox浏览器
            if (match != null) {
                return {browser: match[1] || "", version: match[2] || "0"};
            }
            var match = rOpera.exec(ua);//Opera浏览器
            if (match != null) {
                return {browser: match[1] || "", version: match[2] || "0"};
            }
            var match = rChrome.exec(ua);//Chrome浏览器
            if (match != null) {
                return {browser: match[1] || "", version: match[2] || "0"};
            }
            var match = rSafari.exec(ua);//Safari浏览器
            if (match != null) {
                return {browser: match[2] || "", version: match[1] || "0"};
            }
            if (match != null) {
                return {browser: "", version: "0"};
            }
        }

        var browserMatch = uaMatch(ua.toLowerCase());
        if (browserMatch) {
            osinfo.browserName = browserMatch.browser;
            osinfo.browserVersion = browserMatch.version;
            osinfo.browserLanguage = (navigator.language ? navigator.language
                : navigator.userLanguage || "");
        }
        return osinfo;
    },

    /*
     * 把URL加入收藏夹
     * @sURL: 要加入收藏夹的URL地址
     * @sTitle: 加入收藏夹的名称
     * =========================
     * 例子：yts.client.fav(location.href,document.title);
     * =========================
     * Terry 2014-10-29
     * */
    fav: function (sURL, sTitle) {
        try {
            window.external.addFavorite(sURL, sTitle);
        }
        catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "");
            }
            catch (e) {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }
};