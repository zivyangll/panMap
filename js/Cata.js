/// <reference path="jquery-1.7.2.min.js" />
var map;
jQuery.support.cors = true;
$(document).ready(function () {
    Icata.Init();
    ///TODO: 百度地图API功能
    initMap();
});
var Icata = {
    Init: function () {
        this.Size();
        this.Btn();
        Icata.InitRdqy(0);
        $(".btn_query").click();
        $(".catr select").multiselect({
            multiple: false,
            header: false,
            selectedList: 1,
            minWidth: 80
        });
    },
    Size: function () {
        $(".p_body").width(parent.$("#MFrame").width()).height(parent.$("#MFrame").height());
        $(".tjsep").width($(".p_body").width());
        $(".tjbx").width($(".p_body").width() - 20);
        $(".updown").css("margin-left", ($(".p_body").width() - $(".updown").width()) / 2 + "px");
        $(".xsleft").height($(".p_body").height() - $(".tjbx").height() - $(".tjsep").height() - 20);
        $(".xsseq,.xsright").height($(".xsleft").height());
        $(".showhide").css("margin-top", ($(".xsseq").height() - $(".showhide").height()) / 2 + "px");
        $(".xsright").width($(".p_body").width() - $(".xsleft").width() - $(".xsseq").width() - 20);
    },
    Btn: function () {
        $("#slt_ztlx,#slt_area").multiselect({
            multiple: false,
            header: false,
            selectedList: 1,
            minWidth: 120
        });
        //$("#slt_area").bind("change", function () {
        //    var area = parseInt($(this).val());
        //    Icata.InitRdqy(area);
        //});
        $("#txt_start").bind("click", function () {
            WdatePicker({ dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\'txt_end\')}' });
        });
        $("#txt_end").bind("click", function () {
            WdatePicker({ dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\'txt_start\')}', maxDate: '%y-%M-%d' });
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
            var ztlx = $("#slt_ztlx").val();
            var area = $("#slt_area").val();
	    //alert($("#slt_area").val())
            //var rdqy = $("#slt_rdqy option:selected").text();
            var start = $.trim($("#txt_start").val());
            var end = $.trim($("#txt_end").val());
            var gjz = $.trim($("#txt_gjz").val());
            var obj = {}; 
            //if (gjz == "") {
                Ilist.ListUrl = Config.FLtj;
                obj.topic_type = ztlx;
                obj.location = area;
               // obj.detail_location = rdqy;
                obj.start_date = start;
                obj.end_date = end;
                obj.key_word = gjz;
            //} else {
            //    Ilist.ListUrl = Config.FLKey;
            //    obj.key_word = gjz;
            //}
            Ilist.Init(obj);
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
    },
    InitRdqy:function(xt){
        var arr = Idata.Area[xt];
        var html = '<select id="slt_rdqy"><option title="全部" value="-1">全部</option>';
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                html += '<option title="' + arr[i] + '" value="0">' + arr[i] + '</option>';
            } else {
                html += '<option title="' + arr[i] + '" value="' + (i + 1) + '">' + arr[i] + '</option>';
            }
        }
        html += '</select>';
        $("#div_rdqy").html(html);
        $("#slt_rdqy").multiselect({
            multiple: false,
            header: false,
            selectedList: 1,
            minWidth: 120
        });
        $("#div_rdqy button").width(114);
    },
    OpenUrl: function (url) {
        if ($.trim(url) == "") {
            alert("该网址为空，不能打开！");
            return;
        }
        window.open(url);
    }
};
//#region 主题分析左侧列表
var Ilist = {
    ListUrl: "",
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
        var tmp = $(".xsleft").height() - $(".xspage").height();
        Ilist.record = Math.floor(tmp / 100);
        Ilist.Para = obj;
        Ilist.ajaxData();
    },
    ajaxData: function () {
        var start = (Ilist.pagenum - 1) * Ilist.record + 1;
        var end = Ilist.pagenum * Ilist.record;
        Ilist.Para.start_num = start;
        Ilist.Para.end_num = end;
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
                    clearLayer();
                    return;
                }
                Ilist.count = parseInt(data[0].count_num);
                $("#my").html(Ilist.count);
                Ilist.pageTotal = ((Ilist.count + Ilist.record - 1) / Ilist.record) | 0;
                Ilist.list = data;
                Ilist.ShowList();
            },
            error: function (data) {
                alert("获取列表信息失败！")
            }
        });
    },
    InitSlt:function(xt){
        var html = '<select><option value="1"';
        if (xt == "1") {
            html += ' selected="selected"';
        }
        html += '>案件</option><option value="2"';
        if (xt == "2") {
            html += ' selected="selected"';
        }
        html += '>民生</option><option value="3"';
        if (xt == "3") {
            html += ' selected="selected"';
        }
        html += '>人员</option><option value="4"';
        if (xt == "4") {
            html += ' selected="selected"';
        }
        html += '>服务</option><option value="5"';
        if (xt == "5") {
            html += ' selected="selected"';
        }
        html += '>管理</option><option value="6"';
        if (xt == "6") {
            html += ' selected="selected"';
        }
        html += '>社会</option><option value="0"';
        if (xt == "0") {
            html += ' selected="selected"';
        }
        html += '>其他</option></select>';
        return html;
    },
    ShowList: function () {
        var data = Ilist.list;
        var html = '', tmpstr = "", tmp = "";
        var start = (Ilist.pagenum - 1) * Ilist.record;
        for (var i = 0; i < data.length; i++) {
            html += '<div class="catr" xi="' +i+ '"><div class="catd">';
            html += '<div class="cabt"><div class="xh">' + (i+1) + '</div><div class="bt" title="' + data[i].q_content + '"  xurl="' + data[i].q_urlAddress + '">' + data[i].q_content + '</div></div>';
            tmpstr = data[i].q_topicType + "";
            html += '<div class="canr"><div class="bz cs" style="margin-top:5px;">' + Ilist.InitSlt(tmpstr) + '</div><div class="dz">' + data[i].q_location + '</div></div>';
            tmpstr = data[i].q_source + "";
            switch (tmpstr) {
                case "0":
                    tmpstr = "58同城";
                    break;
                case "1":
                    tmpstr = "百姓网";
                    break;
                case "2":
                    tmpstr = "赶集网";
                    break;
                case "3":
                    tmpstr = "跳骚市场";
                    break;
                case "4":
                    tmpstr = "淘宝二手";
                    break;
                case "5":
                    tmpstr = "得意生活";
                    break;
                case "6":
                    tmpstr = "本地宝";
                    break;
                case "7":
                    tmpstr = "豆瓣同城";
                    break;
                case "8":
                    tmpstr = "大麦网";
                    break;
                case "9":
                    tmpstr = "新浪微博";
                    break;
                case "10":
                    tmpstr = "今日头条";
                    break;
                case "11":
                    tmpstr = "途牛网";
                    break;
                case "12":
                    tmpstr = "阿里旅游";
                    break;
                case "13":
                    tmpstr = "帮帮网";
                    break;
                case "14":
                    tmpstr = "亿房网";
                    break;
            }
            html += '<div class="canr"><div class="bz">【' + tmpstr + '】</div><div class="sj">' + data[i].q_pubTime + '</div>';
            html += '<div class="pl" p1="' + data[i].q_source_category + '" p2="' + data[i].q_id + '"><div class="p_save">保存</div><div class="p_del">删除</div></div></div></div>';
            html += '<div class="catp"><img src="' + Config.Imgurl + data[i].q_id + Config.Imgtype + '"';
            tmpstr = Config.Imgurl + Config.CataImg[parseInt(data[i].q_source_category) - 1];
            html += ' onerror="this.onerror=\'\';this.src=\'' + tmpstr + '\'"';
            html += '/></div></div>';
            
        }
        $("#div_list").html(html);
        $(".catr select").multiselect({
            multiple: false,
            header: false,
            selectedList: 1,
            minWidth: 80
        });
        $(".catr .p_save").bind("click", function () {
            var p1 = $(this).parent().attr("p1");
            var p2 = $(this).parent().attr("p2");
            var p3 = 0;
            var p4 = $(this).parent().parent().parent().find("select").val();
            Ilist.SaveOrDel(p1, p2, p3, p4);
        });
        $(".catr .p_del").bind("click", function () {
            var p1 = $(this).parent().attr("p1");
            var p2 = $(this).parent().attr("p2");
            var p3 = 1;
            var p4 = $(this).parent().parent().parent().find("select").val();
            Ilist.SaveOrDel(p1, p2, p3, p4);
        });
        showCataPOI(data);
        $("#zys").html(Ilist.pageTotal);
        $("#dqy").html(Ilist.pagenum);
        $(".catr .bt").bind("click", function () {
            var xurl = $(this).attr("xurl");
            Icata.OpenUrl(xurl);
        });
        $(".catr").bind("mousemove", function () {
            ///TODO:列表中一行鼠标滑过，相应地图上的点高亮显示,并位于地图中心点
            var xi = $(this).attr("xi");
            var obj = Ilist.list[parseInt(xi)];
            lightMap(obj);
        }).bind("mouseout", function () {
            ///TODO:列表中一行鼠标滑过，相应地图上的取消高亮显示
            var xi = $(this).attr("xi");
            closelightLayer();
        });
        Ilist.SetPage();
    },
    UpdateUrl: Config.UpdateUrl,
    SaveOrDel: function (p1, p2, p3, p4) {
        var obj = {
            source_type: p1,
            id: p2,
            theme_type: p4,
            opt_type: p3
        };
        var str = "";
        if (p3 == 0) {
            str = "您确定保存吗？";
        } else {
            str = "您确定删除吗？";
        }
        if (window.confirm(str)) {
            $.ajax({
                type: "get",
                url: Ilist.UpdateUrl,
                data: obj,
                dataType: "text",
                success: function (result) {
                    if (eval(result)[0]) {
                        $(".btn_query").click();
                    } else {
                        alert("更新或删除未成功！")
                    }
                },
                error: function (data) {
                    alert("更新或删除失败！")
                }
            });
        }
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
    // 热点区域下拉框的值
    Area: [
        ["南湖", "光谷", "东湖高新技术开发区", "广埠屯", "虎泉", "街道口", "鲁巷", "东湖区", "黄家湖大学城", "徐东大街", "白沙洲", "光谷创业街", "石牌岭"],
        ["南湖", "光谷", "东湖高新技术开发区", "广埠屯", "虎泉", "街道口", "鲁巷", "东湖区", "黄家湖大学城", "徐东大街", "白沙洲", "光谷创业街", "石牌岭"],
        ["江汉路新佳丽广场", "江汉路新佳丽", "江汉路步行街", "菱角湖", "常青路", "西北湖", "武汉广场", "香港路", "汉口火车站", "新民众乐园", "新华路", "西园", "青年路", "京汉大道友谊路", "中山大道友谊南路", "中山大道友谊", "江滩", "沿江一号", "六渡桥", "王家墩"],
        ["藏龙岛", "大花岭", "梁子湖", "庙山", "纸坊"],
        ["江汉路步行街", "大智路", "二七", "后湖", "南京路", "台北路", "竹叶山", "香港路", "百步亭", "三阳路", "黄浦路", "球场街", "循礼门", "武汉天地", "解放公园", "澳门路", "客运港", "知行学院"],
        ["沌口", "王家湾", "钟家村", "墨水湖", "琴台大道", "汉阳大道", "鹦鹉大道", "琴台", "腰路堤"],
        ["奥山", "钢都花园", "工业路", "红钢城", "沿港路", "欢乐大道", "仁和路", "建二", "八大家", "铁机", "柴林花园", "武钢厂区", "武东", "武汉火车站", "杨春湖", "余家头", "四美塘"],
        ["古田路", "汉西", "硚口路", "武胜路凯德广场", "解放大道航空路", "崇仁路", "利济路", "武胜路", "游艺路"],
        ["东西湖"],
        ["黄陂"],
        ["武生院", "工程学院", "阳逻街区", "邾城街"],
        ["蔡甸"],
        ["汉南"],
        ["其他"]
    ],
    List: [
        { id: "1", title: "我是标题我是标题我是标题我是标题1", lb: "民生类别", dz: "我是地址我是地址", nums: "20", ly: "阿里旅游", sj: "2015-08-20 15:23:35", url: "" },
        { id: "1", title: "我是标题我是标题我是标题我是标题2", lb: "民生类别", dz: "我是地址我是地址", nums: "200", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题3", lb: "民生类别", dz: "我是地址我是地址", nums: "20000", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题4", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题5", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题6", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题7", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题8", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题9", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题10", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题11", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题12", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题13", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题14", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" },
        { id: "1", title: "我是标题我是标题我是标题我是标题15", lb: "民生类别", dz: "我是地址我是地址", nums: "2", ly: "人民网", sj: "2015-08-20 15:23:35", url: "http://www.baidu.com" }
    ]
};