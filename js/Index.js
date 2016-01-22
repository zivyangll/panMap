/// <reference path="jquery-1.7.2.min.js" />
$(document).ready(function () {
    if (document.body.offsetWidth < screen.width) {
        window.moveTo(0, 0);
        window.resizeTo(window.screen.availWidth, window.screen.availHeight);
    }
    var width = document.documentElement.clientWidth;
    if (width > 1440) {
        $(".menu").css("font-size", "18px");
    }
    $(".pbody").width(document.documentElement.clientWidth).height(document.documentElement.clientHeight);
    $(".ptop,pinfo,#MFrame").width($(".pbody").width());
    $(".pinfo,#MFrame").height($(".pbody").height() - $(".ptop").height());
    $(".menu").bind("click", function () {
        var xt = $(this).attr("xt") + "";
        if (!$(this).hasClass("ss")) {
            $(".ss").removeClass("ss");
            $(this).addClass("ss");
            var src = "";
            switch (xt) {
                case "0":
                    src = "Home.html";
                    break;
                case "1":
                    src = "Cata.html";
                    break;
                case "2":
                    src = "Theme.html";
                    break;
                case "3":
                    src = "Hot.html";
                    break;
            }
            $("#MFrame").attr("src", "page/"+src);
        }
    });
    $(".menu").eq(0).click();
});

function ShowDialog() {
    var pop = new $.dialog({
        id: "pop",
        width: "1024",
        height: "768",
        opacity: 0,
        btnBar: true,
        cover: true,
        titleBar: true,
        title: '室内全景图',
        rang: true,
        drag: true,
        resize: false,
        iconTitle: true,
        xButton: true,
        args: {},
        // 关闭事件
        onXclick: function () {
            var _len = parent.$(".ac_results").length;
            if (_len == 1) {
                parent.$(".ac_results").hide();
            } else if (_len > 1) {
                $(parent.$(".ac_results")[_len - 1]).hide();
            }
            pop.cancel();
        },
        page: "http://202.114.114.34:8088/lmars/lmarsPanoMap.html"
    });
    pop.ShowDialog();
}