/// <reference path="jquery-1.7.2.min.js" />
var map;
jQuery.support.cors = true;
$(document).ready(function () {
    Itheme.Init();
    initMap();
});
var Itheme = {
    Init: function () {
        this.Size();
        this.Btn();
        this.InitYear();
        $(".tab").eq(0).click();
        $(".dtlist").dragDrop({
            //fixarea: [0, $('.p_body').width() - 710, 0, $('.p_body').height() - 250], callback: function (params) {}
        });
    },
    Size: function () {
        $(".p_body").width(parent.$("#MFrame").width()).height(parent.$("#MFrame").height());
        $(".tjsep").width($(".p_body").width());
        $(".p_top,.tjbx").width($(".p_body").width() - 20);
        $(".updown").css("margin-left", ($(".p_body").width() - $(".updown").width()) / 2 + "px");
        $(".p_info").width($(".p_body").width()).height($(".p_body").height() - $(".p_top").height() - 21);
        $(".xsleft").height($(".p_info").height() - $(".tjbx").height() - 20);
        $(".xsseq,.xsright").height($(".xsleft").height());
        $(".showhide").css("margin-top", ($(".xsseq").height() - $(".showhide").height()) / 2 + "px");
        $(".xsright").width($(".p_info").width() - $(".xsleft").width() - $(".xsseq").width() - 20);
        $(".tjinfo,.tbbg").height(Math.floor(($(".p_info").height() - $(".tjbx").height() * 2 - $(".tjbx1").height() * 2 - 20) / 2));
        $(".tbbx").height($(".tjinfo").height()).width(Math.floor(($(".tjinfo").width() - 30) / 2));
        $(".tbbg").height($(".tbbx").height() - $(".tbbt").height()).width($(".tbbx").width());
    },
    Btn: function () {
        $("#slt_mjlx,#slt_sjly,#slt_xslb,#tj_mjlx,#tj_sjly,#tj_xslb").multiselect({
            multiple: false,
            header: false,
            selectedList: 2,
            minWidth: 115
        });
        $(".ui-multiselect-all").click();
        
        $("#txt_start").bind("click", function () {
            WdatePicker({ dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\'txt_end\')}' });
        }); 
        $("#txt_end").bind("click", function () {
            WdatePicker({ dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\'txt_start\')}', maxDate: '%y-%M-%d' });
        });
        $(".tab").bind("click", function () {
            var xt = $(this).attr("xt") + "";
            if (!$(this).hasClass("ss")) {
                $(".ss").removeClass("ss").addClass("us");
                $(this).removeClass("us").addClass("ss");
                $(".p_info").hide();
                $(".p_info[xt='" + xt + "']").show();
                if (xt == "0") {
                    // 销售分析
                    $(".btn_query").click();
                } else {
                    // 统计分析
                    $(".btn_tj").eq(0).click();
                    $(".btn_grcx").click();
                }
            }
        });
        $(".showhide").bind("click", function () {
            var xt = $(this).attr("xt") + "";
            if (xt == "1") {
                $(".xsleft").hide();
                $(this).css("background", "url(../images/right.png)");
                $(this).attr("xt", "2");
                $(".xsright").width($(".xsright").width() + $(".xsleft").width() + 10);
                $(this).attr("title", "显示");
                map.resize(true);
                map.reposition();
            } else {
                $(".xsleft").show();
                $(this).css("background", "url(../images/left.png)");
                $(this).attr("xt", "1");
                $(".xsright").width($(".xsright").width() - $(".xsleft").width() - 10);
                $(this).attr("title", "隐藏");
                map.resize(true);
                map.reposition();
            }
        });
        $(".updown").bind("click", function () {
            var xt = $(this).attr("xt") + "";
            var tmp = 0;
            if (xt == "1") {
                $(".tjbx").hide();
                $(this).css("background", "url(../images/down.png)");
                $(this).attr("xt", "2");
                tmp = $(".tjbx").height() + 10;
                $(".xsleft").height($(".xsleft").height() + tmp);
                $(".xsseq").height($(".xsseq").height() + tmp);
                $(".xsright").height($(".xsright").height() + tmp);
                $(this).attr("title", "显示");
            } else {
                $(".tjbx").show();
                $(this).css("background", "url(../images/up.png)");
                $(this).attr("xt", "1");
                tmp = $(".tjbx").height() + 10;
                $(".xsleft").height($(".xsleft").height() - tmp);
                $(".xsseq").height($(".xsseq").height() - tmp);
                $(".xsright").height($(".xsright").height() - tmp);
                $(this).attr("title", "隐藏");
            }
            $(".pmap").css({ "width": "100%", "height": "100%" });
            $(".dtlist").css("bottom", "252px");
            $(".xsyt").css("bottom", "0px");
            $(".ytkg").css("bottom", $(".ytkg").css("bottom"));
        });
        $(".ytkg").bind("click", function () {
            var xt = $(this).attr("xt") + "";
            if (xt == "1") {
                $(".xsyt").hide();
                $(this).css({ "right": "0px", "bottom": "0px" });
                $(this).css("background", "url(../images/xs.png)");
                $(this).attr("xt", "2");
                $(this).attr("title", "显示");
            } else {
                $(".xsyt").show();
                $(this).css({ "right": "206px", "bottom": "206px" });
                $(this).css("background", "url(../images/yc.png)");
                $(this).attr("xt", "1");
                $(this).attr("title", "隐藏");
            }
        });
        $(".btn_query").bind("click", function () {
            //点击了查询按钮
            var mjlx = $("#slt_mjlx").val();
            var sjly = $("#slt_sjly").val();
            var xslb = $("#slt_xslb").val();
            var start = $.trim($("#txt_start").val());
            var end = $.trim($("#txt_end").val());
            var gjz = $.trim($("#txt_gjz").val());
            var obj = {};
			if(gjz == ""){
				// 条件查询
				Ilist.ListUrl = Config.XSList;
				obj.seller_type = mjlx;
				obj.source_type = sjly;
				obj.product_type = xslb;
				if (start != "") {
					obj.start_date = start;
				}
				if (end != "") {
					obj.end_date = end;
				}
			}else{
				// 关键字查询
				Ilist.ListUrl = Config.ZTGJZList;
				obj.key_word = gjz;
			}
            // 左侧列表初始化
            Itheme.InitXSlist(obj);
        });
        //#region 左侧列表翻页
        $("#div_sy").bind("click", function () {
            Ilist.FirstPage();
        });
        $("#div_syy").bind("click", function () {
            Ilist.PrePage();
        });
        $("#div_xyy").bind("click", function () {
            Ilist.NextPage();
        });
        $("#div_my").bind("click", function () {
            Ilist.LastPage();
        });
        //#endregion 
        //#region 地图详情列表翻页
        $("#dl_sy").bind("click", function () {
            Ixqlist.FirstPage();
        });
        $("#dl_syy").bind("click", function () {
            Ixqlist.PrePage();
        });
        $("#dl_xyy").bind("click", function () {
            Ixqlist.NextPage();
        });
        $("#dl_my").bind("click", function () {
            Ixqlist.LastPage();
        });
        //#endregion 
        //#region 卖家统计列表翻页
        $("#mj_sy").bind("click", function () {
            Imjlist.FirstPage();
        });
        $("#mj_syy").bind("click", function () {
            Imjlist.PrePage();
        });
        $("#mj_xyy").bind("click", function () {
            Imjlist.NextPage();
        });
        $("#mj_my").bind("click", function () {
            Imjlist.LastPage();
        });
        //#endregion 
        //#region 个人统计列表翻页
        $("#gr_sy").bind("click", function () {
            Igrlist.FirstPage();
        });
        $("#gr_syy").bind("click", function () {
            Igrlist.PrePage();
        });
        $("#gr_xyy").bind("click", function () {
            Igrlist.NextPage();
        });
        $("#gr_my").bind("click", function () {
            Igrlist.LastPage();
        });
        //#endregion 
        // 卖家信息统计查询
        $(".btn_tj").bind("click", function () {
            var xt = $(this).attr("xt");
            //if (!$(this).hasClass("ans")) {
                $(".ans").removeClass("ans");
                $(this).addClass("ans");
                var mjlx = $("#tj_sjly").val();
                var sjly = $("#tj_mjlx").val();
                var xslb = $("#tj_xslb").val();
                var sj = $("#mj_year").val();
                var obj = {};
                obj.seller_type = mjlx;
                obj.source_type = sjly;
                obj.product_type = xslb;
                obj.year_num = sj;
                obj.total_num = xt;
                // 左侧列表初始化
                Imjlist.Init(obj);
           // }
        });
        // 个人信息统计查询
        $(".btn_grcx").bind("click", function () {
            var mjxm = $.trim($("#txt_mjxm").val());
            var sj = $.trim($("#txt_sj").val());
            var QQ = $.trim($("#txt_QQ").val());
            var dd = $.trim($("#txt_dd").val());
            var year = $("#gr_year").val();
            var obj = {};
            obj.seller_name = mjxm;
            obj.seller_phone = sj;
            obj.seller_qq = QQ;
            obj.seller_loc = dd;
            obj.year = year;
            Igrlist.Init(obj);
        });
        $(".close").bind("click", function () {
            $(".dtlist").hide();
            closeSellLocationLayer();
        });
    },
    InitXSlist: function (obj) {
        Ilist.Init(obj);
    },
    OpenUrl: function (url) {
        if ($.trim(url) == "") {
            alert("该网址为空，不能打开！");
            return;
        }
        window.open(url);
    },
    InitYear: function () {
        $.ajax({
            type: "get",
            url: Config.GetYear,
            data: {},
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                var html = '';
                if (data.length == 0) {
                    var year = (new Date()).getFullYear();
                    html += '<option value="' + year + '">' + year + '年</option>';
                    return;
                }
                for (var i = data.length - 1; i >= 0; i--) {
                    html += '<option value="' + data[i] + '">' + data[i] + '年</option>';
                }
                $("#gr_year,#mj_year").html(html);
                $("#gr_year,#mj_year").multiselect({
                    multiple: false,
                    header: false,
                    selectedList: 1,
                    minWidth: 115
                });
            },
            error: function (data) {
                alert("获取年份信息失败！")
            }
        });
    }
};
//#region 主题分析左侧列表
var Ilist = {
    ListUrl: Config.XSList,
    Para: null,
    //每页显示多少条记录
    record: 12,
    //记录总数 
    count: 0,
    //总页数 
    pageTotal: 0,
    //将要显示的页码
    pagenum: 1,
    //所有的数据
    list: null,    
    Init: function (obj) {
        Ilist.pagenum = 1;
        var tmp = $(".xsleft").height() - $(".xstitle").height() - $(".xspage").height();
        Ilist.record = Math.floor(tmp / 33);
        Ilist.Para = obj;
        Ilist.ajaxData();   
    },
    ajaxData: function () {
        var start = (Ilist.pagenum - 1) * Ilist.record + 1;
        var end = Ilist.pagenum * Ilist.record;
        Ilist.Para.start_num = start;
        Ilist.Para.end_num = end;
		if($.trim($("#txt_gjz").val()) == ""){
			Ilist.Para.start_date="";
			Ilist.Para.end_date="";
		}
        // 获取服务数据
        $.ajax({
            type: "get",
            url: Ilist.ListUrl,
            data: Ilist.Para,
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                if (data.length == 0) {
                    $(".xslist").html('');
                    return;
                }
                Ilist.count = parseInt(data[0].total_count);
                $("#my").html(Ilist.count);
                Ilist.pageTotal = ((Ilist.count + Ilist.record - 1) / Ilist.record) | 0;
                Ilist.list = data;
                Ilist.ShowList();
            },
            error: function (data) {
                alert("获取销售列表信息失败！")
            }
        });
    },    
    ShowList: function () {
        var data = Ilist.list;
        var html = '';
        var start = (Ilist.pagenum - 1) * Ilist.record + 1;
        for (var i = 0; i < data.length; i++) {
            html += '<div class="xstr" xi="' + i + '" xid="' + data[i].seller_id + '" xt="'+data[i].web_from+'"><div class="th">' + (i + start) + '</div>';
            html += '<div class="td" title="' + data[i].seller_name + '">' + data[i].seller_name + '</div>';
            html += '<div class="td" title="' + data[i].seller_phone + '">' + data[i].seller_phone + '</div><div class="td kd">' + data[i].publish_count + '</div></div>';
            ///TODO:地图打点，根据data[i].loc_x,data[i].loc_y,显示当前页的点
        }
        $(".xslist").html(html);
        $("#zys").html(Ilist.pageTotal);
        $("#dqy").html(Ilist.pagenum);
        $(".xslist .kd").bind("click", function () {
            var count = $(this).html();
            var id = $(this).parent().attr("xid");
            var type = $(this).parent().attr("xt");
            var obj = { user_id: id, pub_num: count, xt:type};
            Ixqlist.Init(obj);
        });
        /*$(".xslist .xstr").bind("click", function () {
            // 数组中的位置
            var xi = $(this).attr("xi");
            // 卖家ID
            var xid = $(this).attr("xid");
            var obj = Ilist.list[parseInt(xi)];
            lightMap_Theme(obj);
            //alert("您点击了一行");
            ///TODO:根据Ilist.list[i].loc_x,Ilist.list[i].loc_y,对点进行高亮显示，与其他未点击标注区分，将当前点至于地图中心点
        }).bind("mouseout", function () {
            ///TODO:列表中一行鼠标滑过，相应地图上的取消高亮显示
            var xi = $(this).attr("xi");
            closelightLayer();
        });*/
        Ilist.SetPage();
        showThemePOI(data);
    },
    SetPage: function () {
        if (Ilist.pagenum <= 1) {
            //首页不可用，上一页不可用
            $("#div_sy").removeClass("ky").addClass("bky");
            $("#div_syy").removeClass("ky").addClass("bky");
        } else {
            //首页可用，上一页可用
            $("#div_sy").removeClass("bky").addClass("ky");
            $("#div_syy").removeClass("bky").addClass("ky");
        }
        if (Ilist.pagenum >= Ilist.pageTotal) {
            //末页可用，下一页不可用
            $("#div_my").removeClass("ky").addClass("bky");
            $("#div_xyy").removeClass("ky").addClass("bky");
        } else {
            //末页可用，下一页可用
            $("#div_my").removeClass("bky").addClass("ky");
            $("#div_xyy").removeClass("bky").addClass("ky");
        }
    },
    //重新整理当前页码，如果页面小于1，则赋值为1，如果大于总页数，则等于总页数 
    CoordinatePagenum: function () {
        if (Ilist.pagenum < 1) {
            Ilist.pagenum = 1;
        } else if (Ilist.pagenum > Ilist.pageTotal) {
            Ilist.pagenum = Ilist.pageTotal;
        }
    },
    //首页
    FirstPage: function () {
        if (Ilist.pagenum != 1) {
            Ilist.pagenum = 1;
            Ilist.ajaxData(); 
            Ilist.SetPage(Ilist.pagenum);
        }
    },
    //上一页
    PrePage: function () {
        if ($("#div_syy").hasClass("ky")) {
            Ilist.pagenum--;
            Ilist.CoordinatePagenum();
            Ilist.ajaxData(); 
            Ilist.SetPage();
        }
    },
    //下一页
    NextPage: function () {
        if ($("#div_xyy").hasClass("ky")) {
            Ilist.pagenum++;
            Ilist.CoordinatePagenum();
            Ilist.ajaxData(); 
            Ilist.SetPage();
        }
    },
    //尾页
    LastPage: function () {
        if (Ilist.pagenum != Ilist.pageTotal) {
            Ilist.pagenum = Ilist.pageTotal;
            Ilist.ajaxData(); 
            Ilist.SetPage();
        }
    }
}
//#endregion 
var Idata = {
    List: [
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "1233", nums: "2" },
        { id: "1", name: "姓名", tel: "123455", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "1233", nums: "2" },
        { id: "1", name: "姓名", tel: "123455", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "1233", nums: "2" },
        { id: "1", name: "姓名", tel: "123455", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "1233", nums: "2" },
        { id: "1", name: "姓名", tel: "123455", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "1233", nums: "2" },
        { id: "1", name: "姓名", tel: "123455", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "1233", nums: "2" },
        { id: "1", name: "姓名", tel: "123455", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "123", nums: "2" },
        { id: "1", name: "姓名", tel: "12312", nums: "2" },
        { id: "1", name: "姓名", tel: "1233", nums: "2" },
        { id: "1", name: "姓名", tel: "123455", nums: "2" }
    ],
    List1: [
        { id: "1", name: "姓名", tel: "12312", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "123", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "123", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "12312", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "1233", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "123455", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "12312", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "123", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "123", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "12312", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "1233", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "123455", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "12312", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "123", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" },
        { id: "1", name: "姓名", tel: "123", nums: "2",qq:"123",qy:"xxx",url:"http://www.baidu.com" }
    ]
};
//#region 主题分析地图上的详细列表
var Ixqlist = {
    ListUrl: Config.XXList,
    Para: null,
    //每页显示多少条记录
    record: 2,
    //记录总数 
    count: 0,
    //总页数 
    pageTotal: 0,
    //将要显示的页码
    pagenum: 1,
    //所有的数据
    list: null,
    Init: function (obj) {
        Ixqlist.pagenum = 1;
        $("#dlmy").html(Ixqlist.record);
        Ixqlist.Para = obj;
        Ixqlist.ajaxData();
    },
    ajaxData: function () {
        var start = (Ixqlist.pagenum - 1) * Ixqlist.record + 1;
        var end = Ixqlist.pagenum * Ixqlist.record;
        Ixqlist.Para.start_num = start;
        Ixqlist.Para.end_num = end;
        // 获取服务数据
        $.ajax({
            type: "get",
            url: Ixqlist.ListUrl,
            data: Ixqlist.Para,
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                if (data.length == 0) {
                    $(".dtlist").show();
                    $(".dtlistbx .dltable").html('');
                    return;
                }
                Ixqlist.count = parseInt(Ixqlist.Para.pub_num);
                $("#dlzs").html(Ixqlist.count);
                Ixqlist.pageTotal = ((Ixqlist.count + Ixqlist.record - 1) / Ixqlist.record) | 0;
                Ixqlist.list = data;
                $(".dtlist").show();
                Ixqlist.ShowList();
            },
            error: function (data) {
                alert("获取详细列表信息失败！")
            }
        });
    },
    ShowList: function () {
        var data = Ixqlist.list;
        var html = '',tmp;
        var start = (Ixqlist.pagenum - 1) * Ixqlist.record + 1;
        for (var i = 0; i < data.length; i++) {
            html += '<div class="dltr" xi="' + i + '"><div class="td" style="width:50px;padding-left:15px;">' + (i + start) + '</div>';
            html += '<div class="td" style="width:120px;"><img src="' + Config.Imgurl + data[i].seller_id + Config.Imgtype + '" ';			
            html += 'onerror="this.onerror=\'\';this.src=\'' + Config.Imgurl + Config.ThemeImg[parseInt(Ixqlist.Para.xt)] + '\'"/></div>';
            html += '<div class="td" style="width:180px;" title="' + data[i].seller_location + '">' + data[i].seller_location + '</div>';
            html += '<div class="td" style="width:80px;" title="' + data[i].seller_name + '">' + data[i].seller_name + '</div>';
            html += '<div class="td" style="width:120px;" title="' + data[i].full_phone_number + '">' + data[i].full_phone_number + '</div>';
            switch (data[i].product_type + "") {
                case "0":
                    tmp = '自行车';
                    break;
                case "1":
                    tmp = '电动车';
                    break;
                case "2":
                    tmp = '摩托车';
                    break;
                case "3":
                    tmp = '笔记本';
                    break;
                case "4":
                    tmp = '手机';
                    break;

            }
            html += '<div class="td" style="width:85px;" title="' + tmp + '">' + tmp + '</div>';
            html += '<div class="td kd" style="width:60px;" xt="' + data[i].product_url_address + '">网址</div></div>';
            ///TODO:地图打点，根据data[i].loc_x,data[i].loc_y,与原来点的图标颜色要区分
        }
        showThemePOI2(data);
        $(".dtlistbx .dltable").html(html);
        $("#dlzys").html(Ixqlist.pageTotal);
        $("#dldqy").html(Ixqlist.pagenum);
        $(".dtlistbx .td.kd").bind("click", function () {
            Itheme.OpenUrl($(this).attr("xt"));
        });
        $(".dtlistbx .dltr").bind("click", function () {
            // 数组中的位置
            var xi = $(this).attr("xi");
            var obj = Ixqlist.list[parseInt(xi)];
            lightMap_Theme(obj);
            //alert("您点击了一行");
            ///TODO:根据Ixqlist.list[i].loc_x,Ixqlist.list[i].loc_y,对点进行高亮显示，与其他未点击标注区分，将当前点至于地图中心点
        }).bind("mouseout", function () {
            ///TODO:列表中一行鼠标滑过，相应地图上的取消高亮显示
            var xi = $(this).attr("xi");
            closelightLayer();
        });
        Ixqlist.SetPage();
    },
    SetPage: function () {
        if (Ixqlist.pagenum <= 1) {
            //首页不可用，上一页不可用
            $("#dl_sy").removeClass("ky").addClass("bky");
            $("#dl_syy").removeClass("ky").addClass("bky");
        } else {
            //首页可用，上一页可用
            $("#dl_sy").removeClass("bky").addClass("ky");
            $("#dl_syy").removeClass("bky").addClass("ky");
        }
        if (Ixqlist.pagenum >= Ixqlist.pageTotal) {
            //末页可用，下一页不可用
            $("#dl_my").removeClass("ky").addClass("bky");
            $("#dl_xyy").removeClass("ky").addClass("bky");
        } else {
            //末页可用，下一页可用
            $("#dl_my").removeClass("bky").addClass("ky");
            $("#dl_xyy").removeClass("bky").addClass("ky");
        }
    },
    //重新整理当前页码，如果页面小于1，则赋值为1，如果大于总页数，则等于总页数 
    CoordinatePagenum: function () {
        if (Ixqlist.pagenum < 1) {
            Ixqlist.pagenum = 1;
        } else if (Ixqlist.pagenum > Ixqlist.pageTotal) {
            Ixqlist.pagenum = Ixqlist.pageTotal;
        }
    },
    //首页
    FirstPage: function () {
        if (Ixqlist.pagenum != 1) {
            Ixqlist.pagenum = 1;
            Ixqlist.ajaxData();
            Ixqlist.SetPage(Ixqlist.pagenum);
        }
    },
    //上一页
    PrePage: function () {
        if ($("#dl_syy").hasClass("ky")) {
            Ixqlist.pagenum--;
            Ixqlist.CoordinatePagenum();
            Ixqlist.ajaxData();
            Ixqlist.SetPage();
        }
    },
    //下一页
    NextPage: function () {
        if ($("#dl_xyy").hasClass("ky")) {
            Ixqlist.pagenum++;
            Ixqlist.CoordinatePagenum();
            Ixqlist.ajaxData();
            Ixqlist.SetPage();
        }
    },
    //尾页
    LastPage: function () {
        if (Ixqlist.pagenum != Ixqlist.pageTotal) {
            Ixqlist.pagenum = Ixqlist.pageTotal;
            Ixqlist.ajaxData();
            Ixqlist.SetPage();
        }
    }
}
//#endregion 
//#region 卖家分析统计列表
var Imjlist = {
    ListUrl: Config.MJlist,
    Para: null,
    //每页显示多少条记录
    record: 2,
    //记录总数 
    count: 0,
    //总页数 
    pageTotal: 0,
    //将要显示的页码
    pagenum: 1,
    //所有的数据
    list: null,
    Init: function (obj) {
        Imjlist.pagenum = 1;
        var tmp = $(".tbbg").height() - $(".tjpage").height();
        Imjlist.record = Math.floor(tmp / 33);
        $("#mjmy").html(Imjlist.record);
        Imjlist.Para = obj;
        Imjlist.ajaxData();
    },
    ajaxData: function () {
        // 获取服务数据
        $.ajax({
            type: "get",
            url: Imjlist.ListUrl,
            data: Imjlist.Para,
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                if (data.length == 0) {
                    $("#div_mjlist").html('');
                    return;
                }
                Imjlist.count = data[0].total_count;
                if (data.length < Imjlist.Para.total_num) {
                    Imjlist.count = data.length;
                }
                $("#mj_zs").html(Imjlist.count);
                Imjlist.pageTotal = ((Imjlist.count + Imjlist.record - 1) / Imjlist.record) | 0;
                Imjlist.list = data;
                Imjlist.ShowList();
            },
            error: function (data) {
                alert("获取卖家列表信息失败！")
            }
        });
    },
    ShowList: function () {
        var data = Imjlist.list;
        var html = '', tmp;
        var start = (Imjlist.pagenum - 1) * Imjlist.record;
        var end = Imjlist.pagenum * Imjlist.record;
        if (end >= data.length) {
            end = data.length;
        }
        var xData = [];
        for (var i = 0; i < data[0].stats.length; i++) {
            xData[i] = (i + 1) + "月";
        }
        var legendData = [], seriesData = [], tmpname = "";
        for (var i = start; i < end; i++) {
            html += '<div class="tbtr">';
            tmpname = data[i].seller_name == "" ? "无" : data[i].seller_name;
            html += '<div class="tbtd" style="text-align:center;width:8%;">' + (i + 1) + '</div>';
            html += '<div class="tbtd" title="' + data[i].seller_name + '">' + tmpname + '</div>';
            html += '<div class="tbtd" title="' + data[i].seller_phone + '">' + data[i].seller_phone + '</div>';
            html += '<div class="tbtd" title="' + data[i].seller_qq + '">' + data[i].seller_qq + '</div>';
            html += '<div class="tbtd"  style="width:17%;" title="' + data[i].seller_location + '">' + data[i].seller_location + '</div>';
            html += '<div class="tbtd" title="' + data[i].publish_count + '">' + data[i].publish_count + '</div>';
            html += '<div class="tbtd kd" xt="' + data[i].seller_url + '">网址</div>';
            html += '</div>';
            legendData.push(tmpname);
            seriesData.push({ name: tmpname, type: 'line', stack: '发布数量', data: data[i].stats });
        }
        $("#div_mjlist").html(html);
        $("#mjzys").html(Imjlist.pageTotal);
        $("#mjdqy").html(Imjlist.pagenum);
        $("#div_mjlist .tbtd.kd").bind("click", function () {
            Itheme.OpenUrl($(this).attr("xt"));
        });
        Imjlist.SetPage();
        Imjlist.InitMjtb(legendData, xData, seriesData);
    },

    InitMjtb: function (legendData, xData, seriesData) {
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: { x: 40, y: 40, x2: 40, y2: 40 },
            legend: {
                data: legendData,
                textStyle: { color: "#fff" }
            },
            toolbox: {
                show: false
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    axisTick: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    axisLine: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    splitLine: {
                        lineStyle: { color: '#1c4993', width: 1 }
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',    // {number}
                        textStyle: {
                            fontSize: 12,
                            color: 'white'
                        }
                    },
                    boundaryGap: false,
                    data: xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    axisTick: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    axisLine: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    splitLine: {
                        lineStyle: { color: '#1c4993', width: 1 }
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',    // {number}
                        textStyle: {
                            fontSize: 12,
                            fontFamily: "Arial",
                            color: 'white'
                        }
                    }
                }
            ],
            series: seriesData
        };
        var myChart = echarts.init($('#mjtb').get(0));
        myChart.setOption(option);
    },
    SetPage: function () {
        if (Imjlist.pagenum <= 1) {
            //首页不可用，上一页不可用
            $("#mj_sy").removeClass("ky").addClass("bky");
            $("#mj_syy").removeClass("ky").addClass("bky");
        } else {
            //首页可用，上一页可用
            $("#mj_sy").removeClass("bky").addClass("ky");
            $("#mj_syy").removeClass("bky").addClass("ky");
        }
        if (Imjlist.pagenum >= Imjlist.pageTotal) {
            //末页可用，下一页不可用
            $("#mj_my").removeClass("ky").addClass("bky");
            $("#mj_xyy").removeClass("ky").addClass("bky");
        } else {
            //末页可用，下一页可用
            $("#mj_my").removeClass("bky").addClass("ky");
            $("#mj_xyy").removeClass("bky").addClass("ky");
        }
    },
    //重新整理当前页码，如果页面小于1，则赋值为1，如果大于总页数，则等于总页数 
    CoordinatePagenum: function () {
        if (Imjlist.pagenum < 1) {
            Imjlist.pagenum = 1;
        } else if (Imjlist.pagenum > Imjlist.pageTotal) {
            Imjlist.pagenum = Imjlist.pageTotal;
        }
    },
    //首页
    FirstPage: function () {
        if (Imjlist.pagenum != 1) {
            Imjlist.pagenum = 1;
            Imjlist.ajaxData();
            Imjlist.SetPage(Imjlist.pagenum);
        }
    },
    //上一页
    PrePage: function () {
        if ($("#mj_syy").hasClass("ky")) {
            Imjlist.pagenum--;
            Imjlist.CoordinatePagenum();
            Imjlist.ajaxData();
            Imjlist.SetPage();
        }
    },
    //下一页
    NextPage: function () {
        if ($("#mj_xyy").hasClass("ky")) {
            Imjlist.pagenum++;
            Imjlist.CoordinatePagenum();
            Imjlist.ajaxData();
            Imjlist.SetPage();
        }
    },
    //尾页
    LastPage: function () {
        if (Imjlist.pagenum != Imjlist.pageTotal) {
            Imjlist.pagenum = Imjlist.pageTotal;
            Imjlist.ajaxData();
            Imjlist.SetPage();
        }
    }
};
//#endregion 
//#region 个人分析统计列表
var Igrlist = {
    ListUrl: Config.GRlist,
    Para: null,
    //每页显示多少条记录
    record: 2,
    //记录总数 
    count: 0,
    //总页数 
    pageTotal: 0,
    //将要显示的页码
    pagenum: 1,
    //所有的数据
    list: null,
    Init: function (obj) {
        Igrlist.pagenum = 1;
        var tmp = $(".tbbg").height() - $(".tjpage").height();
        Igrlist.record = Math.floor(tmp / 33);
        $("#grmy").html(Igrlist.record);
        Igrlist.Para = obj;
        Igrlist.ajaxData();
    },
    ajaxData: function () {
        var start = (Igrlist.pagenum - 1) * Igrlist.record + 1;
        var end = Igrlist.pagenum * Igrlist.record;
        Igrlist.Para.start_num = start;
        Igrlist.Para.end_num = end;
        // 获取服务数据
        $.ajax({
            type: "get",
            url: Igrlist.ListUrl,
            data: Igrlist.Para,
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                if (data.length == 0) {
                    $("#div_grlist").html('');
                    return;
                }
                Igrlist.count = parseInt(data[0].total_count);
                $("#gr_zs").html(Igrlist.count);
                Igrlist.pageTotal = ((Igrlist.count + Igrlist.record - 1) / Igrlist.record) | 0;
                Igrlist.list = data;
                Igrlist.ShowList();
            },
            error: function (data) {
                alert("获取个人列表信息失败！")
            }
        });
    },
    ShowList: function () {
        var data = Igrlist.list;
        var html = '', tmp;
        var start = (Igrlist.pagenum - 1) * Igrlist.record + 1;
        var xData = [];
        for (var i = 0; i < data[0].stats.length; i++) {
            xData[i] = (i + 1) + "月";
        }
        var legendData = [], seriesData = [], tmpname = "";
        for (var i = 0; i < data.length; i++) {
            html += '<div class="tbtr">';
            tmpname = data[i].seller_name == "" ? "无" : data[i].seller_name;
            html += '<div class="tbtd" style="text-align:center;width:8%;">' + (i + start) + '</div>';
            html += '<div class="tbtd" title="' + data[i].seller_name + '">' + tmpname + '</div>';
            html += '<div class="tbtd" title="' + data[i].seller_phone + '">' + data[i].seller_phone + '</div>';
            html += '<div class="tbtd" title="' + data[i].seller_qq + '">' + data[i].seller_qq + '</div>';
            html += '<div class="tbtd"  style="width:17%;" title="' + data[i].seller_location + '">' + data[i].seller_location + '</div>';
            html += '<div class="tbtd" title="' + data[i].publish_count + '">' + data[i].publish_count + '</div>';
            html += '<div class="tbtd kd" xt="' + data[i].seller_url + '">网址</div>';
            html += '</div>';
            legendData.push(tmpname);
            seriesData.push({ name: tmpname, type: 'line', stack: '发布数量', data: data[i].stats });
        }
        $("#div_grlist").html(html);
        $("#grzys").html(Igrlist.pageTotal);
        $("#grdqy").html(Igrlist.pagenum);
        $("#div_grlist .tbtd.kd").bind("click", function () {
            Itheme.OpenUrl($(this).attr("xt"));
        });
        Igrlist.SetPage();
        Igrlist.InitMjtb(legendData, xData, seriesData);
    },

    InitMjtb: function (legendData, xData, seriesData) {
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: { x: 40, y: 40, x2: 40, y2: 40 },
            legend: {
                data: legendData,
                textStyle: { color: "#fff" }
            },
            toolbox: {
                show: false
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    axisTick: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    axisLine: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    splitLine: {
                        lineStyle: { color: '#1c4993', width: 1 }
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',    // {number}
                        textStyle: {
                            fontSize: 12,
                            color: 'white'
                        }
                    },
                    boundaryGap: false,
                    data: xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    axisTick: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    axisLine: {
                        lineStyle: { color: '#70b4fd', width: 1 }
                    },
                    splitLine: {
                        lineStyle: { color: '#1c4993', width: 1 }
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',    // {number}
                        textStyle: {
                            fontSize: 12,
                            fontFamily: "Arial",
                            color: 'white'
                        }
                    }
                }
            ],
            series: seriesData
        };
        var myChart = echarts.init($('#grtb').get(0));
        myChart.setOption(option);
    },
    SetPage: function () {
        if (Igrlist.pagenum <= 1) {
            //首页不可用，上一页不可用
            $("#gr_sy").removeClass("ky").addClass("bky");
            $("#gr_syy").removeClass("ky").addClass("bky");
        } else {
            //首页可用，上一页可用
            $("#gr_sy").removeClass("bky").addClass("ky");
            $("#gr_syy").removeClass("bky").addClass("ky");
        }
        if (Igrlist.pagenum >= Igrlist.pageTotal) {
            //末页可用，下一页不可用
            $("#gr_my").removeClass("ky").addClass("bky");
            $("#gr_xyy").removeClass("ky").addClass("bky");
        } else {
            //末页可用，下一页可用
            $("#gr_my").removeClass("bky").addClass("ky");
            $("#gr_xyy").removeClass("bky").addClass("ky");
        }
    },
    //重新整理当前页码，如果页面小于1，则赋值为1，如果大于总页数，则等于总页数 
    CoordinatePagenum: function () {
        if (Igrlist.pagenum < 1) {
            Igrlist.pagenum = 1;
        } else if (Igrlist.pagenum > Igrlist.pageTotal) {
            Igrlist.pagenum = Igrlist.pageTotal;
        }
    },
    //首页
    FirstPage: function () {
        if (Igrlist.pagenum != 1) {
            Igrlist.pagenum = 1;
            Igrlist.ajaxData();
            Igrlist.SetPage(Igrlist.pagenum);
        }
    },
    //上一页
    PrePage: function () {
        if ($("#gr_syy").hasClass("ky")) {
            Igrlist.pagenum--;
            Igrlist.CoordinatePagenum();
            Igrlist.ajaxData();
            Igrlist.SetPage();
        }
    },
    //下一页
    NextPage: function () {
        if ($("#gr_xyy").hasClass("ky")) {
            Igrlist.pagenum++;
            Igrlist.CoordinatePagenum();
            Igrlist.ajaxData();
            Igrlist.SetPage();
        }
    },
    //尾页
    LastPage: function () {
        if (Igrlist.pagenum != Igrlist.pageTotal) {
            Igrlist.pagenum = Igrlist.pageTotal;
            Igrlist.ajaxData();
            Igrlist.SetPage();
        }
    }
};
//#endregion