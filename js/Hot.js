/// <reference path="jquery-1.7.2.min.js" />
var map;
jQuery.support.cors = true;
$(document).ready(function () {
    Ihot.Size();
    initMap2();
    ///TODO: 百度地图API功能
//    map = new BMap.Map("map");    // 创建Map实例
//    map.centerAndZoom(new BMap.Point(114.302, 30.599), 12);  // 初始化地图,设置中心点坐标和地图级别
//    map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
//    map.setCurrentCity("武汉");          // 设置地图显示的城市 此项是必须设置的
//    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
});

var Ihot = {
    Init: function () {
        //this.Size();
        this.Btn();
        $(".menu").eq(0).click();
        //$(".pswitch").click();
    },
    TjWidth: 0,
    Size: function () {
        $(".p_body").width(parent.$("#MFrame").width()).height(parent.$("#MFrame").height() - 20);
        $(".pleft,.pmap,.pright").height($(".p_body").height());
        $(".pmap").width($(".p_body").width() - $(".pleft").width() - $(".pright").width() - $(".psep").width() - 16);
        $(".switch").css("margin-top", ($(".p_body").height() - 45) / 2);
        $(".p_lbbx").width($(".pright").width());
        $(".p_lbbx").height($(".pright").height() - $(".p_tjbx").height() * 2 - 10);
        $(".plist").width($(".p_lbbx").width() - 20);
        if ($(".pleft").height() < 644) {
            var tmp = Math.floor(($(".pleft").height() - 50) / 6);
            $(".menu").height(tmp);
            $(".tp").height(tmp - 25);
        }
        $(".rdcx,.rdtj").width($(".pright").width()).height($(".pright").height());
        $(".rdtj").width($(".p_body").width() - $(".pleft").width() - 10).height($(".pright").height());
        $(".pcx").height($(".rdtj").height())
        $(".p_tjarea").height($(".pright").height() - $(".p_tjbx").height() - 5);
        Ihot.TjWidth = Math.floor($(".rdtj").width() / 2);
        $(".pzztbx").width(Ihot.TjWidth).height(Math.floor(($(".p_tjarea").height() - $(".psltqy").height() * 2) / 2));
    },
    Url: Config.Hot,
    Btn: function () {
        $("#slt_year").multiselect({
            multiple: false,
            header: false,
            selectedList: 1,
            minWidth: 100
        });
        $("#txt_start").bind("click", function () {
            WdatePicker({ dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\'txt_end\')}' });
        });
        $("#txt_end").bind("click", function () {
            WdatePicker({ dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\'txt_start\')}', maxDate: '%y-%M-%d' });
        });
        $("#txt_tjks").bind("click", function () {
            WdatePicker({ dateFmt: 'yyyy-MM-dd', maxDate: '#F{$dp.$D(\'txt_tjjs\')}' });
        });
        $("#txt_tjjs").bind("click", function () {
            WdatePicker({ dateFmt: 'yyyy-MM-dd', minDate: '#F{$dp.$D(\'txt_tjks\')}', maxDate: '%y-%M-%d' });
        });
        $(".menu").bind("click", function () {
            var xt = $(this).attr("xt");
            Ilist.MenuXt = xt;
            //$("#fl_zzt").width($(".p_tjbx").width());
            //$("#fl_bzt").hide();
            if (!$(this).hasClass("ss")) {
                $("#txt_tjks,#txt_tjjs").val("");
                $(".ss").removeClass("ss").addClass("us");
                $(this).removeClass("us").addClass("ss");
                Ilist.ListUrl = Ihot.Url[parseInt(xt)];
                $(".cs").remove();
                Ilist.Para.order_type = 0;
                var Obj = {};
                Obj.Url = Config.HotTJ[parseInt(xt)];
                $("#div_tj2").hide();
                switch (xt) {
                    case "0":// 演出活动
                        $(".p_tjbx").eq(1).append('<div id="btn_gxq" class="btn cs">感兴趣人数↓</div><div id="btn_cjrs" class="btn cs">参加人数↓</div>');
                        $("#btn_gxq").bind("click", function () {
                            Ihot.ClickSort(2);
                        });
                        $("#btn_cjrs").bind("click", function () {
                            Ihot.ClickSort(1);
                        });
                        break;
                    case "1":// 社会新闻
                        $(".p_tjbx").eq(1).append('<div id="btn_zfs" class="btn cs">转发数↓</div><div id="btn_dzs" class="btn cs">点赞数↓</div><div id="btn_pls" class="btn cs">评论数↓</div>');
                        $("#btn_zfs").bind("click", function () {
                            Ihot.ClickSort(3);
                        });
                        $("#btn_dzs").bind("click", function () {
                            Ihot.ClickSort(2);
                        });
                        $("#btn_pls").bind("click", function () {
                            Ihot.ClickSort(1);
                        });
                        break;
                    case "2":// 百姓生活
                        $(".p_tjbx").eq(1).append('<div id="btn_gxq" class="btn cs">评论次数↓</div><div id="btn_cjrs" class="btn cs">阅读次数↓</div>');
                        $("#btn_gxq").bind("click", function () {
                            Ihot.ClickSort(2);
                        });
                        $("#btn_cjrs").bind("click", function () {
                            Ihot.ClickSort(1);
                        });
                        break;
                    case "3":// 旅游热点
                        $(".p_tjbx").eq(1).append('<div id="btn_gxq" class="btn cs">评论次数↓</div><div id="btn_cjrs" class="btn cs">购票次数↓</div>');
                        $("#btn_gxq").bind("click", function () {
                            Ihot.ClickSort(2);
                        });
                        $("#btn_cjrs").bind("click", function () {
                            Ihot.ClickSort(1);
                        });
                        break;
                    case "4":// 房屋交易
                        $("#div_tj2").show();
                        $(".p_tjbx").eq(1).append('<div id="btn_jfsj" class="btn cs">交房时间↓</div>');
                        $("#btn_jfsj").bind("click", function () {
                            Ihot.ClickSort(1);
                        });
                        break;
                    case "5":// 打折促销
                        $(".p_tjbx").eq(1).append('<div id="btn_gxq" class="btn cs">回复次数↓</div><div id="btn_cjrs" class="btn cs">阅读次数↓</div>');
                        $("#btn_gxq").bind("click", function () {
                            Ihot.ClickSort(2);
                        });
                        $("#btn_cjrs").bind("click", function () {
                            Ihot.ClickSort(1);
                        });
                        break;
                }
                Ilist.Para.key_word = $.trim($("#key").val());
                Ilist.Para.start_date = "";
                Ilist.Para.end_date = "";
                Ilist.Init();
                Obj.Oper = { start_date: "", end_date: "" };
                TJ.InitTj(Obj, xt);
            }
        });
        $(".switch").bind("click", function () {
            var title = $(this).attr("title");
            if (title == "隐藏") {
                $(".pright").hide();
                $(".pmap").width($(".pmap").width() + $(".pright").width() + 3);
                $(this).attr("title", "显示");
                map.resize(true);
                map.reposition();
            } else {
                $(".pright").show();
                $(".pmap").width($(".pmap").width() - $(".pright").width() - 3);
                $(this).attr("title", "隐藏");
                map.resize(true);
                map.reposition();
            }
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
        $("#btn_query").bind("click", function () {
            var key = $.trim($("#key").val());
            var start = $.trim($("#txt_start").val());
            var end = $.trim($("#txt_end").val());
            Ilist.Para.start_date = start;
            Ilist.Para.end_date = end;
            Ilist.Para.key_word = $.trim($("#key").val());
            Ilist.Init();
        });
        $(".pswitch").bind("click", function () {
            var xt = $(this).attr("xt");
            if (xt == "1") {
                $(".pcx").hide();
                $(".rdtj").show();
                $(this).attr("title", "查询");
                $(this).attr("xt", "2");
            } else {
                $("#txt_tjks").val("");
                $("#txt_tjjs").val("");
                $(".rdtj").hide();
                $(".pcx").show();
                $(this).attr("title", "统计");
                $(this).attr("xt", "1");
            }
        });
        $("#div_tjcx").bind("click", function () {
            var start = $.trim($("#txt_tjks").val());
            var end = $.trim($("#txt_tjjs").val());
            var Obj = {};
            var xt = $(".menu.ss").attr("xt");
            Obj.Url = Config.HotTJ[parseInt(xt)];
            Obj.Oper = { start_date: start, end_date: end };
            TJ.InitTj(Obj, xt);
        });
        $("#slt_year").bind("change", function () {
            TJ.GetFWJYTJ();
        });
    },
    ClickSort: function (type) {
        Ilist.Para.order_type = type;
        Ilist.ajaxData();
    },
    GetLy: function (id) {
        var tmpstr = ""
        id = id + "";
        switch (id) {
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
        return tmpstr;
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
    MenuXt: "",
    ListUrl: "",
    Para: {},
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
    Init: function () {
        Ilist.pagenum = 1;
        Ilist.record = Math.floor($(".p_lbbx").height() / 146);
        $("#my").html(Ilist.record);
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
                    $(".plist").html('');
                    return;
                }
                Ilist.count = parseInt(data[0].total_count);
                $("#div_zs").html(Ilist.count);
                Ilist.pageTotal = ((Ilist.count + Ilist.record - 1) / Ilist.record) | 0;
                Ilist.list = data;
                Ilist.ShowList();
            },
            error: function (data) {
                alert("获取列表信息失败！")
            }
        });
    },
    ShowList: function () {
        var data = Ilist.list;
        var html = '', tmpstr = "";
        var id = "", img = "", bt = "", sj = "", nr = "", ly = "", tmp = "", loc_x = "", loc_y = "", xq = "";
        var eImg = Config.Imgurl + Config.HotImg[parseInt(Ilist.MenuXt)];
        for (var i = 0; i < data.length; i++) {
            loc_x = data[i].Loc_x;
            loc_y = data[i].Loc_y;
            switch (Ilist.MenuXt) {
                case "0":
                    id = data[i].douban_id;
                    img = data[i].douban_img;
                    bt = data[i].douban_title;
                    sj = data[i].douban_date;
                    nr = data[i].douban_pos;
                    ly = Ihot.GetLy(data[i].douban_type);
                    xq = data[i].douban_url;
                    tmp = '<div class="plyd"><div class="plcs">' + data[i].douban_interest_times + '</div><div class="pl">趣</div><div class="plcs">' + data[i].douban_join_times + '</div><div class="pl">参</div></div>';
                    break;
                case "1":
                    id = data[i].weibo_id;
                    bt = "新浪微博";
                    img = data[i].image_url;
                    sj = data[i].pub_time;
                    nr = data[i].weibo_content;
                    ly = Ihot.GetLy(data[i].web_from);
                    xq = data[i].info_url;
                    tmp = '<div class="plyd"><div class="plcs">' + data[i].relay_number + '</div><div class="pl">转</div><div class="plcs">' + data[i].support_number + '</div><div class="pl">赞</div><div class="plcs">' + data[i].comment_number + '</div><div class="pl">评</div></div>';
                    break;
                case "2":
                    id = data[i].bangbang_id;
                    img = data[i].bb_img_url;
                    bt = data[i].bangbang_title;
                    sj = data[i].bb_pub_time;
                    nr = data[i].bb_content;
                    ly = Ihot.GetLy(data[i].web_from);
                    xq = data[i].bangbang_url;
                    tmp = '<div class="plyd"><div class="plcs">' + data[i].bb_response_times + '</div><div class="pl">评</div><div class="plcs">' + data[i].bb_read_times + '</div><div class="pl">阅</div></div>';
                    break;
                case "3":
                    id = data[i].tuniu_id;
                    img = data[i].tuniu_img_url;
                    bt = data[i].tuniu_name;
                    sj = data[i].tuniu_opentime;
                    nr = data[i].tuniu_title;
                    ly = Ihot.GetLy(data[i].Web_from);
                    xq = data[i].tuniu_url;
                    tmp = '<div class="plyd"><div class="plcs">' + data[i].tuniu_comment_num + '</div><div class="pl">评</div><div class="plcs">' + data[i].tuniu_buy_num + '</div><div class="pl">购</div></div>';
                    break;
                case "4":
                    id = data[i].house_id;
                    img = data[i].image_url;
                    bt = data[i].house_title;
                    sj = data[i].kiapantime_start;
                    nr = data[i].house_place;
                    ly = Ihot.GetLy(data[i].web_from);
                    xq = data[i].house_url;
                    //tmp = '<div class="plyd"><div class="plcs">' + 0 + '</div><div class="pl">评</div><div class="plcs">' + 0 + '</div><div class="pl">购</div></div>';
                    break;
                case "5":
                    id = data[i].deyi_id;
                    img = data[i].img_url;
                    bt = data[i].title;
                    sj = data[i].pub_date;
                    nr = data[i].detail_info;
                    ly = Ihot.GetLy(data[i].web_from);
                    xq = data[i].info_url;
                    tmp = '<div class="plyd"><div class="plcs">' + data[i].response_num + '</div><div class="pl">回</div><div class="plcs">' + data[i].read_num + '</div><div class="pl">阅</div></div>';
                    break;
            }
            html += '<div class="ptr" xid="' + i + '"><div class="ptp"><img src="' + Config.Imgurl + id + Config.Imgtype + '" ';
            html += 'onerror="this.onerror=\'\';this.src=\'' + eImg + '\'"/></div>';
            html += '<div class="pnr">';
            html += '<div class="pbt" title="' + bt + '" xurl="' + xq + '">' + bt + '</div>';
            html += '<div class="pxq" title="' + nr + '">' + nr + '</div>';
            html += '<div class="ply">【' + ly + '】' + sj + '</div>';
            html += tmp + "</div></div>";

            ///TODO:地图打点，根据loc_x,loc_y,显示当前页的点
        }
        $(".plist").html(html);
        $("#zys").html(Ilist.pageTotal);
        $("#dqy").html(Ilist.pagenum);
        showHotPOI(data,Ilist.MenuXt); $("#myid").html("okoko")
        $(".ptr .pbt").bind("click", function () {
            var xurl = $(this).attr("xurl");
            Ihot.OpenUrl(xurl);
        });
        $(".ptr").bind("mousemove", function () {
            ///TODO:列表中一行鼠标滑过，相应地图上的点高亮显示,并位于地图中心点
            var xid = $(this).attr("xid");
            var obj = Ilist.list[parseInt(xid)];
            lightMap(obj);
        }).bind("mouseout", function () {
            ///TODO:列表中一行鼠标滑过，相应地图上的取消高亮显示
            var xid = $(this).attr("xid");
            closelightLayer();
        });
        Ilist.SetPage();
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

var TJ = {
    InitTj: function (Obj, xt) {
 //       $("#div_tj2").html("类型统计");
        $.ajax({
            type: "get",
            url: Obj.Url,
            data: Obj.Oper,
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                //#region 区域分布 饼状图
                var qyPie = echarts.init($('#fl_bzt').get(0));
                var qyTitle = ["黄陂区", "汉南区", "汉阳区", "江夏区", "江岸区", "江汉区", "洪山区", "硚口区", "蔡甸区", "东湖生态旅游风景区","东湖新技术开发区", "新洲区", "武昌区", "青山区", "东西湖区", "化学工业分局", "开发区分局", "水上分局","其它"];
                var qySerieData = [
                    { value: data[0].huangpi_num, name: '黄陂区' },
                    { value: data[0].hannan_num, name: '汉南区' },
                    { value: data[0].hanyang_num, name: '汉阳区' },
                    { value: data[0].jiangxia_num, name: '江夏区' },
                    { value: data[0].jiangan_num, name: '江岸区' },
                    { value: data[0].jianghan_num, name: '江汉区' },
                    { value: data[0].hongshang_num, name: '洪山区' },	
		            { value: data[0].qiaokou_num, name: '硚口区' },
                    { value: data[0].caidian_num, name: '蔡甸区' },
                    { value: data[0].donghu_lvyou_num, name: '东湖生态旅游风景区' },
                    { value: data[0].donghu_xinjishu_num, name: '东湖新技术开发区' },
		            { value: data[0].xinzhou_num, name: '新洲区' },
                    { value: data[0].wuchang_num, name: '武昌区' },
                    { value: data[0].qingshan_num, name: '青山区' },
                    { value: data[0].dongxihu_num, name: '东西湖区' },
                    { value: data[0].huaxue_num, name: '化学工业分局' },
                    { value: data[0].kaifaqu_num, name: '开发区分局' },
		            { value: data[0].shuishang_num, name: '水上分局' },
                    { value: data[0].others_num, name: '其它' }

                ];
                //qySerieData = [
                //    { value: 10, name: '汉阳区' },
                //    { value: 20, name: '洪山区' },
                //    { value: 10, name: '江岸区' },
                //    { value: 10, name: '江汉区' },
                //    { value: 50, name: '硚口区' },
                //    { value: 10, name: '青山区' },
                //    { value: 10, name: '武昌区' },
                //    { value: 10, name: '其他' }
                //];
                // 区域分布 柱状图
                var tmp = [
	            data[0].huangpi_num, 
                    data[0].hannan_num, 
                    data[0].hanyang_num,
                    data[0].jiangxia_num,
                    data[0].jiangan_num,
                    data[0].jianghan_num,
                    data[0].hongshang_num, 
		    data[0].qiaokou_num,
                    data[0].caidian_num,
                    data[0].qingshan_num,
                    data[0].donghu_xinjishu_num,
		    data[0].xinzhou_num, 
                    data[0].wuchang_num,
                    data[0].donghu_lvyou_num,
                    data[0].dongxihu_num,
                    data[0].huaxue_num,
                    data[0].kaifaqu_num,
		    data[0].shuishang_num,
                    data[0].others_num
                ];
                //tmp = [10, 20, 10, 10, 50, 10, 10, 10];
                var barStyle = {
                    fontSize: 12,
                    fontFamily: "Arial",
                    color: 'white'
                };
                qyPie.setOption(TJ.InitPie(qyTitle, qySerieData));
                var qyBar = echarts.init($('#fl_zzt').get(0));
                qyBar.setOption(TJ.InitBar("统计", qyTitle, tmp, barStyle));
                //#endregion
                //#region 特色统计
                switch (xt) {
                    case "0":// 演出活动
                        $('#qb_bzt,#qb_zzt').width(Ihot.TjWidth).show();
                        var title = ["度假休闲", "儿童亲子", "话剧歌剧", "曲苑杂坛", "体育活动", "演唱会", "音乐会"];
                        var serieData = [
                                { value: data[1].djxx_num, name: '度假休闲' },
                                { value: data[1].etqz_num, name: '儿童亲子' },
                                { value: data[1].hj_num, name: '话剧歌剧' },
                                { value: data[1].qyzt_num, name: '曲苑杂坛' },
                                { value: data[1].tybs_num, name: '体育活动' },
                                { value: data[1].ych_num, name: '演唱会' },
                                { value: data[1].yyh_num, name: '音乐会' }
                        ];
                        var Pie = echarts.init($('#qb_bzt').get(0), "macarons");
                        Pie.setOption(TJ.InitPie(title, serieData));
                        var Bar = echarts.init($('#qb_zzt').get(0), "macarons");
                        var BarData = [data[1].djxx_num, data[1].etqz_num, data[1].hj_num, data[1].qyzt_num, data[1].tybs_num, data[1].ych_num, data[1].yyh_num];
                        Bar.setOption(TJ.InitBar("统计", title, BarData, barStyle));
                        break;
                    case "1":// 社会新闻
                        $('#qb_zzt').width(Ihot.TjWidth * 2);
                        $('#qb_bzt').width(0).hide();
                        var title = ["社会经济", "政府管理", "自然灾害", "重大事故", "公共安全", "劳动就业", "军事外交", "公共卫生", "教育", "医疗", "三农", "交通", "体育", "情感", "娱乐", "其它"];
                        var BarData = [data[1].social_eco, data[1].gov_mng, data[1].disaster, data[1].accident, data[1].public_security, data[1].labour_job, data[1].military,
                        data[1].public_health, data[1].education, data[1].medical_issue, data[1].agri_issue, data[1].traffic, data[1].sports, data[1].emotion, data[1].entertainment, data[1].others];
                        var Bar = echarts.init($('#qb_zzt').get(0), "macarons");
                        Bar.setOption(TJ.InitBar("统计", title, BarData, barStyle));
                        break;
                    case "2":// 百姓生活
                        $('#qb_zzt').width(Ihot.TjWidth * 2);
                        $('#qb_bzt').width(0).hide();
                        var title = ["公共设施", "受骗事件", "社区物业", "生态文明", "产品服务", "寻人寻物", "房产问题", "寻求帮助", "噪音困扰", "三农问题", "收费问题", "交通事件", "暴力恐吓", "盗窃", "政府管理", "劳动就业", "公共卫生", "教育", "其它"];
                        var BarData = [data[1].public_facility, data[1].cheated, data[1].estate_mng, data[1].eco_civil, data[1].product, data[1].search_event, data[1].house_issue,
                        data[1].seek_help, data[1].noise_issue, data[1].argri_issue, data[1].charge_issue, data[1].traffic_issue, data[1].violence_issue, data[1].steal_issue, data[1].gov_mng, data[1].labour,
                        data[1].pub_health, data[1].edu_issue, data[1].others];
                        var Bar = echarts.init($('#qb_zzt').get(0), "macarons");
                        Bar.setOption(TJ.InitBar("统计", title, BarData, barStyle));
                        break;
                    case "3"://旅游热点
                    case "5":// 打折促销
                        $('#qb_zzt').width(Ihot.TjWidth * 2);
                        $('#qb_zzt').html("");
                        $('#qb_bzt').width(0).hide();
                        break;
                    case "4":// 房屋交易
                        $('#qb_zzt').width(Ihot.TjWidth * 2);
                        $('#qb_bzt').width(0).hide();
                        TJ.GetFWJYTJ();
                        break;
                }
                //#endregion
            },
            error: function (data) {
                alert("获取热点统计信息失败！")
            }
        });
    },
    GetFWJYTJ: function () {
        var year = $("#slt_year").val();
                        $.ajax({
                            type: "get",
                            url: Config.HotFWJY,
                            data: { year: year },
                            dataType: "text",
                            success: function (result) {
                                var Data = eval(result);
                                var legData = ["均值交房数", "环比数", "同比数", "交房数"];
                                var xData = [];
                                var seriesData = [
                                    { name: '均值交房数', type: 'line', data: [] },
                                    { name: '环比数', type: 'line', data: [] },
                                    { name: '同比数', type: 'line', data: [] },
                                    { name: '交房数', type: 'bar', data: [] }
                                ];
                                for (var i = 0; i < Data.length; i++) {
                                    xData.push((i + 1) + "月");
                                    seriesData[0].data.push(Data[i].average);
                                    seriesData[1].data.push(Data[i].huanbi);
                                    seriesData[2].data.push(Data[i].tongbi);
                                    seriesData[3].data.push(Data[i].house_count);
                                }
                                var Line = echarts.init($('#qb_zzt').get(0));
                                Line.setOption(TJ.InitLine(legData, xData, seriesData), "macarons");

            }
        });
    },
    // 柱状图
    InitBar: function (title, xData, yData, barStyle) {
        var option = {
            title: {
                text: '',
                subtext: ''
            },
            grid: { x: 40, y: 40, x2: 40, y2: 60 },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: false,
                data: [title]
            },
            toolbox: {
                show: false
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        lineStyle: { color: '#617fb1', width: 1 }
                    },
                    axisTick: {
                        lineStyle: { color: '#a6b2c8', width: 1 }
                    },
                    axisLine: {
                        lineStyle: { color: '#a6b2c8', width: 1 }
                    },
                    axisLabel: {
                        show: true,
                        interval: '0',    // {number}
                        margin:5,
                        rotate:45,
                        textStyle: barStyle
                    },
                    data: xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        lineStyle: { color: '#617fb1', width: 1 }
                    },
                    axisLine: {
                        lineStyle: { color: '#a6b2c8', width: 1 }
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',    // {number}
                        textStyle: barStyle
                    },
                }
            ],
            series: [
                {
                    name: title,
                    type: 'bar',
                    data: yData,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]
        };
        return option;
    },
    // 饼状图
    InitPie: function (title, serieData) {
        var option = {
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: true,
                textStyle: { color: "#fff" },
                x: 'left',
                orient: 'vertical',
                data: title
            },
            toolbox: {
                show: false
            },
            calculable: true,
            series: [
                {
                    name: '统计',
                    type: 'pie',
                    radius: '80%',
                    center: ['60%', '50%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        }
                    },
                    data: serieData
                }
            ]
        };
        return option;
    },
    // 线状图
    InitLine: function (legData, xData, seriesData){ 
        var option = {
            title: {
                text: '',
                subtext: ''
            },
            grid: { x: 40, y: 40, x2: 40, y2: 60 },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                textStyle: { color: "#fff" },
                data: legData
            },
            toolbox: {
                show: false
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    splitLine: {
                        lineStyle: { color: '#617fb1', width: 1 }
                    },
                    axisTick: {
                        lineStyle: { color: '#a6b2c8', width: 1 }
                    },
                    axisLine: {
                        lineStyle: { color: '#a6b2c8', width: 1 }
                    },
                    axisLabel: {
                        show: true,
                        interval: '0',    // {number}
                        margin: 5,
                        rotate: 45,
                        textStyle: {
                            fontSize: 12,
                            fontFamily: "Arial",
                            color: 'white'
                        }
                    },
                    //boundaryGap: false,
                    data: xData
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitLine: {
                        lineStyle: { color: '#617fb1', width: 1 }
                    },
                    axisLine: {
                        lineStyle: { color: '#a6b2c8', width: 1 }
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
        return option;
    }
};