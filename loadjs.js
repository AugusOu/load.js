/* loading 2016-05-11 by augus.ou
* email:augus.ou@gamil.com
* */
;(function($,window, document,undefined) {
    //定义Load的构造函数
    var Load = function(e,a,b,o) {
        var c = b || {};
        this.source = a, this.count = 0, this.total = a.length, this.onload = c.onload, this.prefix = c.prefix || "";
           this.defaults = {
                'background': 'http://mat1.gtimg.com/house_guangzhou/fc/429ld/bg1.jpg',
                'color':"#fff"
            },
               this.options = $.extend({}, this.defaults,o),
               this.init()
    };
    //定义Load的方法
    Load.prototype.init = function() {
        var i='<div id="loadbg" style="position: absolute;left: 0%;top: 0%;width: 100%;height: 100%;background: url('+this.options.background+')no-repeat;background-size: 100% 100%;z-index: 9999"><div id="loadpercent" style="position: absolute;left:50%;top: 50%;width: 10rem;height: 1rem;font-size: 2rem;color: '+this.options.color+';margin: -5rem 0 0 -5rem;"></div></div>';
        $('body').append(i);
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
                            el.css('display','none');
                        }
                    }, 10);
            }
        },o);
        //调用其方法
        return loads;
    }
})(jQuery, window, document);

