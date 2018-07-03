const $ = require('jquery');
exports = module.exports = {
    scrollFunction: function() {
        var aDiv = $('.section'); //楼层
        $(window).scroll(function() {
            //可视窗口高度
            var winH = $(window).height();
            //鼠标滚动的距离
            var iTop = $(window).scrollTop();

            if (iTop >= $(".layout").height()) {
                //鼠标滑动样式改变
                aDiv.each(function() {
                    //console.log($(this).offset().top);
                    if (winH + iTop - $(this).offset().top > winH / 2) {

                        $(".fadeinB").css('animation', "");
                        $(".fadeinA").css('animation', "");
                        if ($(this).index() == '2') {
                            $(".fadeinB").css('animation', "fadeinB 3s");
                            $(".fadeinA").css('animation', "fadeinA 3s");
                        }
                        if ($(this).index() == '3') {
                            $(".fadeinB").css('animation', "fadeinB 3s");
                            $(".fadeinA").css('animation', "fadeinA 3s");
                        }
                    }
                })
            }
        })
    }
}