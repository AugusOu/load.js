/* loading 2016-05-18 by augus.ou
* email:augus.ou@gamil.com
* */
;(function($,window, document,undefined) {
    //定义Load的构造函数
    var Load = function(e,a,b,o) {
        var c = b || {};
        this.source = a; this.count = 0; this.total = a.length; this.onload = c.onload; this.prefix = c.prefix || "";
           this.defaults = {
                'background': '#fff',
                'color':"#696969",
                'icon':'http://auguss.top/importemt/icon.png',
                'bordercolor':'#ccc'
            };
               this.options = $.extend({}, this.defaults,o);
               this.init();
    };
    //定义Load的方法
    Load.prototype.init = function() {
        var i=
            '<div id="loadbg" style="position: absolute;left: 0%;top: 0%;width: 100%;height: 100%;background: '+this.check(this.options.background)+';background-size: 100% 100%;z-index: 9999">' +
                '<div  style="position: absolute;left:50%;top: 30%;width: 5rem;height: 7.5rem;font-size: 2rem;color: '+this.options.color+';margin: -2.5rem 0 0 -2.5rem;">' +
                    '<div id="top" style="float:left;width: 5rem;height: 5rem;margin:0 auto; "><img style="border-radius: 50%;border:1px '+this.options.bordercolor+' solid;" width="100%" height="100%" src="'+this.options.icon+'"></div>' +
                    '<div id="loadpercent" style="float: left;width: 5rem;overflow:hidden;text-align:center;height: 2rem;font-size: 1rem;margin-top:0.5rem;color: '+this.options.color+';"></div></div></div>';
        $('body').append(i);
        console.log('www.loadjs.top to know API');
        var a = this;
        a.source.forEach(function(b) {
            var c = b.replace(/[#\?].*$/, "").substr(b.lastIndexOf(".") + 1).toLowerCase(), d = a.prefix + b;
            switch (c) {
                case "js":
                    a.script.call(a, d);
                    break;

                case "css":
                    a.stylesheet.call(a, d);
                    break;
                case "mp3":
                    a.audio.call(a, d);
                    break;
                case "svg":
                case "jpg":
                case "gif":
                case "png":
                case "jpeg":
                    a.image.call(a, d);
            }
        });
    }, Load.prototype.getProgress = function() {
        return Math.round(this.count / this.total * 100);
    }, Load.prototype.image = function(a) {
        var b = document.createElement("img");
        this.load(b, a), b.src = a;
    }, Load.prototype.stylesheet = function(a) {
        var b = document.createElement("link");
        this.load(b, a), b.rel = "stylesheet", b.type = "text/css", b.href = a, document.head.appendChild(b);
    }, Load.prototype.script = function(a) {
        var b = document.createElement("script");
        this.load(b, a), b.type = "text/javascript", b.src = a, document.head.appendChild(b);
    }, Load.prototype.audio = function(a) {
        var b = document.createElement("audio");
        this.load(b, a), b.src = a;
    }, Load.prototype.load = function(a, b) {
        var c = this;
        a.onload = a.onerror = a.onabort = function(a) {
            c.onload && c.onload({
                count: ++c.count,
                total: c.total,
                item: b,
                type: a.type
            });
        };
    },Load.prototype.check=function (a) {
        var extStart=a.lastIndexOf('.');
        var ext=a.substring(extStart,a.length).toUpperCase();
        if(ext!='.BMP'&&ext!='.PNG'&&ext!='.GIF'&&ext!='.JPG'&&ext!='.JPEG'&&ext!='.SVG'){
            return a;
        }else {
            return 'url('+a+')no-repeat center';
        }
    };
    //在插件中使用Load对象
    $.fn.Loadjs = function(a,o) {
        //创建Load的实体
        var loads = new Load(this, a,
            {
                onload: function(load) {
                var count = load.count, total = load.total, percent = Math.ceil(100 * count / total),options=load.options;
                $("#loadpercent").html(percent + "%");
                    setTimeout(function() {
                        if (count == total) {
                            var el = $("#loadbg,#loadpercent");
                           el.fadeOut("slow");
                        }
                    }, 10);
            }
        },o);
        //调用其方法
        return loads;
    }
})(jQuery, window, document);

