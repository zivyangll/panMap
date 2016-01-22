/// <reference path="jquery-1.7.2.min.js" />
var map;
jQuery.support.cors = true;
$(document).ready(function () {
    Ihome.Init();
    // 百度地图API功能
    initMap();
});
var Ihome = {
    Init: function () {
        this.Size();
        this.InitNews();
        this.Btn();
        $(".sjitme").eq(0).click();    //开启鼠标滚轮缩放
        this.InitTime();
    },
    HF: false,
    WF:false,
    Size: function () {
        $(".p_body").width(parent.$("#MFrame").width()).height(parent.$("#MFrame").height());
        var _height = $(".p_body").height() - 12;
        var _width = $(".p_body").width() - 22;
        if (Math.floor(_height * 0.06) > 42) {
            $(".p_top").height(Math.floor(_height * 0.06));
            $(".p_menubx,.maqueebx").css("margin-top", (Math.floor((_height * 0.06 - 42) / 2)) + "px");
            $(".p_top *").css("font-size", "16px");
            Ihome.HF = true;
        }
        $(".p_top").width($(".p_body").width() - 12);
        $(".p_info").width($(".p_top").width()).height($(".p_body").height() - $(".p_top").height() - 12);
        $(".maqueebx").width($(".p_top").width() - $(".p_menubx").width() - 10);
        $(".p_left,.p_right,.p_center").height($(".p_info").height());
        if (Math.floor(_width * 0.175) > 250) {
            $(".p_left,.p_right").width(_width * 0.25);
            $("#fl_tb,#qb_tb").width($(".p_left").width());
            $(".p_left *,.p_right *").css("font-size", "16px");
            Ihome.WF = true;
        }
        $(".p_center").width($(".p_info").width() - $(".p_left").width() - $(".p_right").width() - 10);
        $(".pzztbx").height(($(".p_left").height() - $(".psltqy").height() * 2 - 10) / 2);
        $(".cmk,.pmap").width($(".p_center").width());
        $(".mk").width(Math.floor(($(".cmk").width() - 20) / 6));
        if ($(".mk").width() - $(".sz").width() > 90) {
            $(".mc,.sz").width($(".mk").width() / 2);
        } else {
            $(".mc").width($(".mk").width() - $(".sz").width());
        }
        $(".pmap").height($(".p_center").height() - $(".cmk").height() - 3);
        $(".sgzbx").height($(".p_right").height() - 15);
        $(".weather").css("right", ($(".p_right").width() + 25) + "px");
        $(".weather").dragDrop({
            fixarea: [0, $('.pmap').width()-450, 0, $('.pmap').height()-250], callback: function (params) { }
        });
    },
    DTurl: Config.Ztlxfb,
    SGZurl: Config.SGZurl,
    // 滚动新闻
    InitNews: function () {
        ///TODO:滚动新闻
        $.ajax({
            type: "get",
            url: Config.scroll,
            data: {},
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                var html = '截止今日，共获取<span class="hs">' + data[0].num_service + '</span>条服务信息，<span class="hs">' + data[0].num_others;
                html += '</span>条其他信息，<span class="hs">' + data[0].num_life + '</span>条民生信息，<span class="hs">' + data[0].num_society;
                html += '</span>条社会信息，<span class="hs">' + data[0].num_case + '</span>条案件信息，<span class="hs">' + data[0].num_manage;
                html += '</span>条管理信息，<span class="hs">' + data[0].num_people + '</span>条人员信息';
                $("#affiche").html(html);
                if (Ihome.HF) {
                    $(".p_top .hs").css("font-size", "16px");
                }
            }
        });
    },
    // 滚动时光轴
    InitTime: function () {
        $.ajax({
            type: "get",
            url: Ihome.SGZurl,
            data: {},
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                var html =  '<marquee direction=up behavior=scroll loop=-1 scrollamount=10 scrolldelay=200  height=100% width=100% hspace=0 vspace=0 onmouseover=this.stop() onmouseout=this.start()><ul class="ulsgz">';
                var tmprq = '1997-01-01', tmpstr = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pub_time.substring(0, 10) != tmprq) {
                        tmprq = data[i].pub_time.substring(0, 10);
                        html += '<li class="ptr1"';
                        if (i == 0) {
                            html += ' style="margin-top:15px;"';
                        }
                        html += '><div class="zsj"></div><div class="ztbt"></div>';
                        html += '<div class="zbt">' + tmprq + '</div></li>';
                    }
                    html += '<li class="ptr">';
                    tmpstr = $.trim(tmprq.substring(10));
                    if (tmpstr == "") {
                        tmpstr = "18:23";
                    }

                    ///
                    var tmpCat = data[i].web_from+"";
                    //alert(tmpstr);
                    var tmpImg;
                    var tmpName;
                    switch(tmpCat){
                        case "0":
                            tmpName = "58同城";tmpImg = "img_58.png";
                            tmpImg = "img_58.png";
                            break;
                        case "1":
                            tmpName = "百姓网";tmpImg = "img_baixing.png";
                            break;
                        case "2":
                            tmpName = "赶集网";tmpImg = "img_ganji.jpg";
                            break;
                        case "3":
                            tmpName = "跳骚市场";tmpImg = "img_58.png";
                            break;
                        case "4":
                            tmpName = "淘宝二手";tmpImg = "img_58.png";
                            break;
                        case "5":
                            tmpName = "得意生活"; tmpImg = "img_discount.jpg";
                            break;
                        case "6":
                            tmpName = "本地宝";tmpImg = "img_58.png";
                            break;
                        case "7":
                            tmpName = "豆瓣同城";tmpImg = "img_58.png";
                            break;
                        case "8":
                            tmpName = "大麦网";tmpImg = "img_show.jpg";
                            break;
                        case "9":
                            tmpName = "新浪微博";tmpImg = "img_weibo.jpg";
                            break;
                        case "10":
                            tmpName = "今日头条";tmpImg = "pr_source.jpg";
                            break;
                        case "11":
                            tmpName = "途牛网";tmpImg = "img_travel.jpg";
                            break;
                        case "12":
                            tmpName = "阿里旅游";tmpImg = "img_58.png";
                            break;
                        case "13":
                            tmpName = "帮帮网";tmpImg = "img_peopleliving.png";
                            break;
                        case "14":
                            tmpName = "亿房网";tmpImg = "img_house.jpg";
                            break;
                    }

                    html += '<div class="zsj">' + tmpstr + '</div>';
                    html += '<div class="ztb"></div><div class="znr"><div class="kbx">';
                    html += '<div class="xwbt" title="' + data[i].title + '">' + data[i].title + '</div>';
                    html += '<img src="' + Config.Imgurl + data[i].id + Config.Imgtype + '"';
                    tmpPath = Config.Imgurl + tmpImg;
                    html += ' onerror="this.onerror=\'\';this.src=\'' + tmpPath + '\'"class="gdtp" width="145" height="100"/>';

                  //  html += '<div class="catp"><img src="' + Config.Imgurl + data[i].q_id + Config.Imgtype + '"';
                   // tmpstr = Config.Imgurl + Config.HomeImg[parseInt(data[i].q_source_category) - 1];
                   // html += ' onerror="this.onerror=\'\';this.src=\'' + tmpstr + '\'"';

                    html += '<div class="xwly"><div class="ly">来源：' + tmpName + '</div><div class="gt">' + data[i].read_time + '跟帖</div>';
                    html += '</div></div></div></li>';
                }
                html += '</ul>';
                html += '</marquee>';
                $(".sgzbx").html(html);
                if (Ihome.WF) {
                    $(".zsj").width(52);
                    $(".sgzbx").css("background-position-x", "58px");
                    $(".sgzbx *").css("font-size", "16px");
                    $(".kbx").css({ "width": ($(".p_right").width() - 90) + "px", "margin-left": "18px", "margin-top": "-25px" });
                    $(".xwbt,.xwly").width($(".kbx").width() - 20);
                    $(".sgzbx img").attr("width", $(".kbx").width() - 20);
                    $(".sgzbx img").attr("height", Math.floor(($(".kbx").width() - 20)*100/145));
                    $(".sgzbx .ly,.sgzbx .gt").width(($(".kbx").width() - 20) / 2 - 1);
                }
            },
            error: function (data) {
                alert("获取时光轴信息失败！")
            }
        });
    },
    Btn: function () {
        $(".sjitme").bind("click", function () {
            var xt = $(this).attr("xt") + "";
            if (!$(this).hasClass("sjss")) {
                $(".sjss").removeClass("sjss");
                $(this).addClass("sjss");
                $(".zdybx").hide();
                // 自定义
                if (xt == "7") {
                    $(".zdybx").show();
                    return;
                }
                var para = null;
                switch (xt) {
                    case "0":
                        // 昨天
                        para = { day_num: -1, day_type: 0 };
                        break;
                    case "1":
                        // 今天
                        para = { day_num: 1, day_type: 0 };
                        break;
                    case "2":
                        // 本周
                        para = { day_num: 7, day_type: 1 };
                        break;
                    case "3":
                        // 本月
                        para = { day_num: 30, day_type: 1 };
                        break;
                    case "4":
                        // 近7天
                        para = { day_num: 7, day_type: 0 };
                        break;
                    case "5":
                        // 近30天
                        para = { day_num: 30, day_type: 0 };
                        break;
                    case "6":
                        // 近90天
                        para = { day_num: 90, day_type: 0 };
                        break;
                }
                // 获取服务数据
                Ihome.Iztlxfb(para);
            }
        });
        $(".cx").bind("click", function () {
            var zdy = $.trim($("#txt_zdy").val());
            if (zdy == "") {
                alert("请输入自定义天数！");
                return;
            }
            if (isNaN(zdy)) {
                alert("自定义天数只能是数字！");
                return;
            }
            Ihome.Iztlxfb({ day_num: zdy, day_type: 0 });
        });
    },
    Iztlxfb: function (para) {
        $.ajax({
            type: "get",
            url: Ihome.DTurl,
            data: para,
            dataType: "text",
            success: function (result) {
                var data = eval(result);
                // 左侧雷达图统计
                var indicatData = [], seriesData = [];
                indicatData[0] = { text: '案件', max: data[1].num_case + 50 };
                indicatData[1] = { text: '民生', max: data[1].num_life + 50};
                indicatData[2] = { text: '社会', max: data[1].num_society + 50};
                indicatData[3] = { text: '人员', max: data[1].num_people + 50};
                indicatData[4] = { text: '服务', max: data[1].num_service + 50};
                indicatData[5] = { text: '管理', max: data[1].num_manage + 50};
                indicatData[6] = { text: '其它', max: data[1].num_others + 50};
                var tmp = [data[1].num_case, data[1].num_life, data[1].num_society, data[1].num_people, data[1].num_service, data[1].num_manage, data[1].num_others];
                var xData = ['案件', '民生', '社会', '人员', '服务', '管理', '其它'];
                seriesData[0] = {
                    name: '类型分布',
                    value: tmp
                };
                var style = { color: '#fff', fontSize: 12 };
                var barStyle = {
                    fontSize: 12,
                    fontFamily: "Arial",
                    color: 'white'
                };
                if (Ihome.WF) {
                    style.fontSize = 16;
                    barStyle.fontSize = 16;
                }
                Ihome.InitLD(['类型分布'], indicatData, seriesData, style);
                // 左侧柱状图统计
                Ihome.InitBar("类型统计", xData, tmp, barStyle);
                // 中间新闻变更
                $(".sz").eq(0).html(data[0].num_city_news);
                $(".sz").eq(1).html(data[0].num_show);
                $(".sz").eq(2).html(data[0].num_trade);
                $(".sz").eq(3).html(data[0].num_people_living);
                $(".sz").eq(4).html(data[0].num_house);
                $(".sz").eq(5).html(data[0].num_sales);
                // 清空点
                showPOIOnMap();
            },
            error: function (data) {
                alert("获取主题类型分布失败！")
            }
        });
    },
    InitLD: function (legendData, indicatData, seriesData, style) {
        var option = {
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                show: false,
                data: legendData
            },
            toolbox: {
                show: false
            },
            polar: [
               {
                   indicator: indicatData,
                   name: {
                       formatter: '{value}',
                       textStyle: style
                   }
               }
            ],
            calculable: true,
            series: [
                {
                    name: '',
                    type: 'radar',
                    data: seriesData
                }
            ]
        };
        var myChart = echarts.init($('#fl_tb').get(0));
        myChart.setOption(option);
    },
    InitBar: function (title, xData, yData, barStyle) {
        var option = {
            title: {
                text: '',
                subtext: ''
            },
            grid: { x: 40, y: 40, x2: 40, y2: 40 },
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
                        interval: 'auto',    // {number}
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
        var myChart = echarts.init($('#qb_tb').get(0));
        myChart.setOption(option);
    },
    MapTmp:0,
    MapSec:null,
    InitEvent: function (data) {
        ///TODO:每半秒在地图上累加点
        Ihome.MapSec = setInterval(function () {
            if (Ihome.MapTmp < data.length) {
                var i = Ihome.MapTmp;
                var point = new BMap.Point(data[i].x, data[i].y);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
                var label = new BMap.Label(data[i].title, { offset: new BMap.Size(20, -10) });
                marker.setLabel(label);
                marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                Ihome.MapTmp++;
            } else {
                clearInterval(Ihome.MapSec);
            }
        }, 500);
    }
}

var Idata = {
    Scroll: "天津爆炸事故已致112人遇难 95人失踪；   陕西山阳山体滑坡64人被埋 尚未发现生命迹象；  北京通州住房限购全国首例 \"北京人\"也是\"外地人\"",
    
    GetRandom: function () {
        var arr = [];
        for (var i = 0; i < 6; i++) {
            arr[i] = Math.round(Math.random() * 300);
        }
        return arr;
    },
    GetMax: function (index, arr, categories) {
        var max = 0, xt = "";
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
                xt = "情报" + index + "在" + categories[i];
            }
        }
        return xt;
    }

};