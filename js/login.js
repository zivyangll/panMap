/// <reference path="jquery-1.11.1.min.js" />

$(document).ready(function () {
    if (document.body.offsetWidth < screen.width) {
        window.moveTo(0, 0);
        window.resizeTo(window.screen.availWidth, window.screen.availHeight);
    }

    IPage.Init();
    ILogin.Init();
});

var IPage = {

    pwidth: document.documentElement.clientWidth,

    pheight: document.documentElement.clientHeight,

    Init: function () {
        this.AutoWidthHeight();
    },

    AutoWidthHeight: function () {
        $(".login-box").width(this.pwidth).height(this.pheight);
    }

};

//#region ILogin登录类
var ILogin = {

    Init: function () {
        this.BindToEvent();
    },

    BindToEvent: function () {
        $("#btnSubmit").bind("click", this.ClientToClick);
        // 新增回车键盘操作
        document.onkeydown = function (_event) {
            _event = (_event) ? _event : ((window.event) ? window.event : "");
            var k = _event.keyCode ? _event.keyCode : _event.which;
            if (k == 13) { //判断是否为回车
                ILogin.ClientToClick();
            }
        }
    },

    ShowErrorMsg: function (msg) {
        this.ClearErrorMsg();
        $(".login-error-box").text("✖ " + msg).show();
    },

    ClearErrorMsg: function () {
        $(".login-error-box").hide().text("");
    },

    ClientToClick: function () {
        $("#hidState").val("");
        var user = $.trim($("#txtUser").val());
        var pwd = $.trim($("#txtPwd").val());
        if (user == "") {
            alert("用户名不能为空！");
            $("#txtUser").focus(); return false;
        }
        if (pwd == "") {
            alert("密码不能为空！");
            $("#txtPwd").focus(); return false;
        }
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: "http://10.73.2.130:8080/yuqing/login_check",
            data: {
                "user_name": "'" + user + "'",
                "password": "'" + pwd + "'"
            },
            dataType: "text",
            success: function (result) {
                if (result == "[true]") {
                    window.location = "Index.html";
                } else {
                    alert("用户名或者密码错误！")
                }
            },
            error: function (data) {
                alert("登录失败！")
            }
        });
    }

};
//#endregion