document.write("<script language=javascript src='../js/popup.js'></script>");
document.write("<script language=javascript src='../js/popupclass.js'></script>");

var map;
var graphicLayer;

var graphicLayer_crime;
var graphicLayer_life;
var graphicLayer_society;
var graphicLayer_people;
var graphicLayer_service;
var graphicLayer_manager;
var graphicLayer_other;
var heatLayer;
var highlightLayer;

jQuery.support.cors = true;

//初始化地图
var initMap = function () {
    require([
            "dojo/dom",
            "dojo/dom-construct",
            "esri/map",
            "tdlib/TDTLayer",
            "tdlib/TDTAnnoLayer",
            "tdlib/HeatmapLayer",
            "tdlib/InfoWindow",
            "esri/layers/FeatureLayer",
            "esri/geometry/Point",
            "esri/SpatialReference",
            "dojo/domReady!"],
        function (dom,
                  domConstruct,
                  Map,
                  TDTLayer,
                  TDTAnnoLayer,
                  HeatmapLayer,
                  InfoWindow,
                  FeatureLayer,
                  Point,
                  SpatialReference) {
            var infoWindow = new InfoWindow({
                domNode: domConstruct.create("div", null, dom.byId("map"))
            });

            map = new Map("map", {logo: false, infoWindow: infoWindow});
            var baselayer = new TDTLayer();
            var annolayer = new TDTAnnoLayer();
            map.addLayer(baselayer);
            map.addLayer(annolayer);

            graphicLayer_panMap = new esri.layers.GraphicsLayer();//全景图图层
            graphicLayer_case = new esri.layers.GraphicsLayer();//警情图层
            graphicLayer_crime = new esri.layers.GraphicsLayer();
            graphicLayer_life = new esri.layers.GraphicsLayer();
            graphicLayer_society = new esri.layers.GraphicsLayer();
            graphicLayer_people = new esri.layers.GraphicsLayer();
            graphicLayer_service = new esri.layers.GraphicsLayer();
            graphicLayer_manager = new esri.layers.GraphicsLayer();
            graphicLayer_other = new esri.layers.GraphicsLayer();
            highlightLayer = new esri.layers.GraphicsLayer();

            map.addLayer(graphicLayer_panMap);
            map.addLayer(graphicLayer_case);
            map.addLayer(graphicLayer_crime);
            map.addLayer(graphicLayer_life);
            map.addLayer(graphicLayer_society);
            map.addLayer(graphicLayer_people);
            map.addLayer(graphicLayer_service);
            map.addLayer(graphicLayer_manager);
            map.addLayer(graphicLayer_other);
            map.addLayer(highlightLayer);

            heatLayer = new HeatmapLayer({
                config: {
                    "useLocalMaximum": true,
                    "radius": 40,
                    "gradient": {
                        0.45: "rgb(000,000,255)",
                        0.55: "rgb(000,255,255)",
                        0.65: "rgb(000,255,000)",
                        0.95: "rgb(255,255,000)",
                        1.00: "rgb(255,000,000)"
                    }
                },
                "map": map,
                "domNodeId": "heatLayer",
                "opacity": 0.85
            });
            // 在地图中将热度图图层
            map.addLayer(heatLayer);

            ///添加lmars实验室定位图层，并展示“室内全景图”
            //alert('liesmars');
            var lmars_layer = new esri.layers.GraphicsLayer();
            var point = new esri.geometry.Point('114.35478', '30.52935', new esri.SpatialReference({wkid: 4326}));
            var content = "<input  type='button' style='float:top;' value='进入室内全景图' onclick='ShowIframe(\"室内全景图展示\",\"http://202.114.114.34:8088/lmars/lmarsPanoMap.html?panoid=71&yaw=145\",1024,768)'>";
            //var content = "<input  type='button' style='float:top;' value='进入室内全景图' onclick='parent.ShowDialog()'>";
            var infoTemplate = new esri.InfoTemplate("武汉大学测绘遥感信息工程国家重点实验室", content);
            var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol("../images/lmars.png", 48, 48), null, infoTemplate);
            lmars_layer.add(graphic);
            map.addLayer(lmars_layer);

            //map.centerAndZoom(new Point({ "x": 114.289, "y": 30.593, "spatialReference": { "wkid": 4326} }), 9);
            map.centerAndZoom(new Point({"x": 114.35478, "y": 30.52935, "spatialReference": {"wkid": 4326}}), 14);
            map.infoWindow.resize(350, null);
            map.resize(true);
            map.reposition();


        });
}

//初始化热点分析模块的地图
var initMap2 = function () {
    require([
            "dojo/dom",
            "dojo/dom-construct",
            "esri/map",
            "tdlib/TDTLayer",
            "tdlib/TDTAnnoLayer",
            "tdlib/HeatmapLayer",
            "tdlib/InfoWindow",
            "esri/layers/FeatureLayer",
            "esri/geometry/Point",
            "esri/SpatialReference",
            "dojo/domReady!"],
        function (dom,
                  domConstruct,
                  Map,
                  TDTLayer,
                  TDTAnnoLayer,
                  HeatmapLayer,
                  InfoWindow,
                  FeatureLayer,
                  Point,
                  SpatialReference) {
            var infoWindow = new InfoWindow({
                domNode: domConstruct.create("div", null, dom.byId("map"))
            });

            map = new Map("map", {logo: false, infoWindow: infoWindow});
            var baselayer = new TDTLayer();
            var annolayer = new TDTAnnoLayer();
            map.addLayer(baselayer);
            map.addLayer(annolayer);

            /// 始终显示实验室lmars图层
            //graphicLayer_lmars = new esri.layers.GraphicsLayer();
            //showlayer=graphicLayer_case;
            //showsymbol = new esri.symbol.PictureMarkerSymbol("../images/lmars.png", 26, 38);

            // alert('liesmars');
            graphicLayer_case = new esri.layers.GraphicsLayer();
            graphicLayer_crime = new esri.layers.GraphicsLayer();
            graphicLayer_life = new esri.layers.GraphicsLayer();
            graphicLayer_society = new esri.layers.GraphicsLayer();
            graphicLayer_people = new esri.layers.GraphicsLayer();
            graphicLayer_service = new esri.layers.GraphicsLayer();
            graphicLayer_manager = new esri.layers.GraphicsLayer();
            graphicLayer_other = new esri.layers.GraphicsLayer();
            highlightLayer = new esri.layers.GraphicsLayer();

            map.addLayer(graphicLayer_case);
            map.addLayer(graphicLayer_crime);
            map.addLayer(graphicLayer_life);
            map.addLayer(graphicLayer_society);
            map.addLayer(graphicLayer_people);
            map.addLayer(graphicLayer_service);
            map.addLayer(graphicLayer_manager);
            map.addLayer(graphicLayer_other);
            map.addLayer(highlightLayer);

            map.centerAndZoom(new Point({"x": 114.35478, "y": 30.52935, "spatialReference": {"wkid": 4326}}), 9);
            map.infoWindow.resize(350, null);

            map.on("load", Ihot.Init());
            map.resize(true);
            map.reposition();
        });
}


//根据主页map的下拉框，选择对应POI进行显示
var showPOIOnMap = function () {
    var maptype = document.getElementById("selectSS").options[document.getElementById("selectSS").selectedIndex].value;
    // alert(maptype);
    if (maptype == "请选择内容") {
        return;
    } else {
        changeMap(maptype);
    }
}


var changeMap = function (val) {
    //alert(val);
    var xt = $(".sjss").attr("xt") + "";
    var day_num;
    var theme_type;
    var type;
    var showlayer;
    var showsymbol;
    switch (xt) {
        case "0":
            // 昨天
            day_num = -1;
            break;
        case "1":
            // 今天
            day_num = 1;
            break;
        case "2":
            // 本周
            day_num = 7;
            break;
        case "3":
            // 本月
            day_num = 30;
            break;
        case "4":
            // 近7天
            day_num = 7;
            break;
        case "5":
            // 近30天
            day_num = 30;
            break;
        case "6":
            // 近90天
            day_num = 90;
            break;
        case "7":
            var zdy = $.trim($("#txt_zdy").val());
            day_num = zdy;
            break;
    }
    if (val == "请选择内容") {
        return;
    }
    if (val == "警情") { ////////////////////////////////////////

        showlayer = graphicLayer_case;
        theme_type = 7;
        showsymbol = new esri.symbol.PictureMarkerSymbol("../images/case1.png", 24, 24);
    }
    if (val == "案件") {
        showlayer = graphicLayer_crime;
        theme_type = 1;
        showsymbol = new esri.symbol.PictureMarkerSymbol("../images/crime.png", 22, 34);
    }
    if (val == "民生") {

        showlayer = graphicLayer_life;
        theme_type = 2;
        showsymbol = new esri.symbol.PictureMarkerSymbol("../images/life.png", 22, 34);
    }
    if (val == "社会") {
        showlayer = graphicLayer_society;
        theme_type = 6;
        showsymbol = new esri.symbol.PictureMarkerSymbol("../images/society.png", 22, 34);
    }
    if (val == "人员") {
        showlayer = graphicLayer_people;
        theme_type = 3;
        showsymbol = new esri.symbol.PictureMarkerSymbol("../images/people.png", 22, 34);
    }
    if (val == "服务") {
        showlayer = graphicLayer_service;
        theme_type = 4;
        showsymbol = new esri.symbol.PictureMarkerSymbol("../images/service.png", 22, 34);
    }
    if (val == "管理") {
        showlayer = graphicLayer_manager;
        theme_type = 5;
        showsymbol = new esri.symbol.PictureMarkerSymbol("../images/manager.png", 22, 34);
    }
    if (val == "其他") {
        showlayer = graphicLayer_other;
        theme_type = 0;
        showsymbol = new esri.symbol.PictureMarkerSymbol("../images/other.png", 22, 34);
    }
    var para = null;
    para = {day_num: day_num, theme_type: theme_type};
    getPOI(para, showlayer, showsymbol, theme_type);
}

//调用后台获取点位
var getPOI = function (para, showlayer, showsymbol, theme_type) {
    //alert(para)
    $.ajax({
        type: "post",
        url: "http://202.114.114.34:8878/yuqing/main_show_map_stats",
        data: para,
        dataType: "text",
        success: function (result) {
            var data = eval(result);

            clearLayer();
            //alert(data)
            for (i = 0; i < data.length; i++) {
                var point = new esri.geometry.Point(data[i].x, data[i].y, new esri.SpatialReference({wkid: 4326}));
                var content = null;

                if (theme_type == 7) //// 如果是警情数据，则按照列表形式显示数据
                    content = "<table border='1'><tr><td>警情类型：</td><td>" + data[i].title + "</td></tr> <tr><td>警情地址：</td><td>" + data[i].cjddxz + "</td></tr>"
                        + "<tr><td>报警电话：</td> <td>" + data[i].bjdh + "</td></td></tr>"
                        + " <tr><td>所属派出所：</td><td>" + data[i].sspcs + "</td></tr> <tr><td>详细信息：</td><td>" + data[i].cjxxqk + "</td></tr> </table> ";
                else
                    content = "名称：" + data[i].title + "</br> ";
                //alert(content)
                var infoTemplate = new esri.InfoTemplate("信息描述", content);
                var graphic = new esri.Graphic(point, showsymbol, null, infoTemplate);
                showlayer.add(graphic);
            }
            drawHeatLayer();
        },
        error: function (data) {
            alert("获取POI失败！")
        }
    });
}


//清理图层
var clearLayer = function () {
    if (typeof(heatLayer) != "undefined") {
        heatLayer.hide();
    }
    graphicLayer_case.clear();
    graphicLayer_crime.clear();
    graphicLayer_life.clear();
    graphicLayer_society.clear();
    graphicLayer_people.clear();
    graphicLayer_service.clear();
    graphicLayer_manager.clear();
    graphicLayer_other.clear();

    graphicLayer_panMap.clear(); /// 清楚全景图 图层
}

//将图片放在对应的图层中
var drawHeatLayer = function () {
    if (document.getElementById("vec3").checked) {
        var maptype = document.getElementById("selectSS").options[document.getElementById("selectSS").selectedIndex].value;
        if (maptype == "警情") {
            var datasource = graphicLayer_case.graphics;
            heatLayer.setData(datasource);
        }
        if (maptype == "案件") {
            var datasource = graphicLayer_crime.graphics;
            heatLayer.setData(datasource);
        }
        if (maptype == "民生") {
            var datasource = graphicLayer_life.graphics;
            heatLayer.setData(datasource);
        }
        if (maptype == "社会") {
            var datasource = graphicLayer_society.graphics;
            heatLayer.setData(datasource);
        }
        if (maptype == "人员") {
            var datasource = graphicLayer_people.graphics;
            heatLayer.setData(datasource);
        }
        if (maptype == "服务") {
            var datasource = graphicLayer_service.graphics;
            heatLayer.setData(datasource);
        }
        if (maptype == "管理") {
            var datasource = graphicLayer_manager.graphics;
            heatLayer.setData(datasource);
        }
        if (maptype == "其他") {
            var datasource = graphicLayer_other.graphics;
            heatLayer.setData(datasource);
        }
        heatLayer.show();
    }
    else {
        heatLayer.hide();
    }
}

//分类查询模块添加POI的方法
var showCataPOI = function (para) {
    clearLayer();
    for (i = 0; i < para.length; i++) {
        var point = new esri.geometry.Point(para[i].loc_x, para[i].loc_y, new esri.SpatialReference({wkid: 4326}));
        var infoTemplate = new esri.InfoTemplate("位置描述", "名称：" + para[i].q_content + "</br>");
        var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol("../images/crime.png", 22, 34), null, infoTemplate);
        graphicLayer_crime.add(graphic);
    }
}

//主题分析模块添加POI的方法（添加卖家的POI）
var showThemePOI = function (para) {
    clearLayer();
    for (i = 0; i < para.length; i++) {
        var point = new esri.geometry.Point(para[i].loc_x, para[i].loc_y, new esri.SpatialReference({wkid: 4326}));
        var infoTemplate = new esri.InfoTemplate("位置描述", "卖家：" + para[i].seller_name + "</br>" + "电话：" + para[i].seller_phone + "</br>");
        var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol("../images/life.png", 22, 34), null, infoTemplate);
        graphicLayer_crime.add(graphic);
    }
}

//主题分析模块添加POI的方法（添加所卖物品的交易地点POI）
var showThemePOI2 = function (para) {
    for (i = 0; i < para.length; i++) {
        if (para[i].loc_x != 0 && para[i].loc_y != 0) {
            var point = new esri.geometry.Point(para[i].loc_x, para[i].loc_y, new esri.SpatialReference({wkid: 4326}));
            var infoTemplate = new esri.InfoTemplate("位置描述", "卖家：" + para[i].seller_name + "</br>" + "电话：" + para[i].seller_phone + "</br>" + "交易地点：" + para[i].seller_location + "</br>");
            var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol("../images/crime.png", 22, 34), null, infoTemplate);
            graphicLayer_society.add(graphic);
        }
    }
}

//对POI元素进行高亮
var lightMap = function (para) {
    if (para.loc_x != 0 && para.loc_y != 0) {
        highlightLayer.clear();
        var point = new esri.geometry.Point(para.loc_x, para.loc_y, new esri.SpatialReference({wkid: 4326}));
        var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol("../images/highlight.png", 22, 34), null, null);
        highlightLayer.add(graphic);
        map.centerAndZoom(point, null);
    }
}

//对主题分析模块的POI元素进行高亮
var lightMap_Theme = function (para) {
    if (para.loc_x != 0 && para.loc_y != 0) {
        highlightLayer.clear();
        var point = new esri.geometry.Point(para.loc_x, para.loc_y, new esri.SpatialReference({wkid: 4326}));
        var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol("../images/highlight.png", 22, 34), null, null);
        highlightLayer.add(graphic);
        map.centerAndZoom(point, null);
    }
}

//关闭高亮效果
var closelightLayer = function () {
    highlightLayer.clear();
}

var closeSellLocationLayer = function () {
    graphicLayer_society.clear();
}

var showHotPOI = function (para, type) {
    //alert(para)
    //alert(type)
    clearLayer();
    for (i = 0; i < para.length; i++) {
        if (para[i].loc_x != 0 && para[i].loc_y != 0) {
            var point = new esri.geometry.Point(para[i].loc_x, para[i].loc_y, new esri.SpatialReference({wkid: 4326}));
            var content = getContent(para[i], type);
            var infoTemplate = new esri.InfoTemplate("信息描述", content);
            var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol("../images/manager.png", 22, 34), null, infoTemplate);
            graphicLayer_society.add(graphic);
        }
    }
}

var getContent = function (para, type) {
    var tmp;
    switch (type) {
        case "0":

            //tmp ="演出内容："+para.douban_title+"</br>"+"<input  type=&quot;button&quot; value=&quot;打开百度&quot; onclick=&quot;ShowIframe('百度','http://www.baidu.com',800,450)&quot;";
            // tmp ="演出内容："+para.douban_title+"<input  type='button' value='打开百度' onclick='ShowIframe(\"百度\",\"http://202.114.114.34:8088/lmars/lmarsPanoMap.html\",1024,768)'>";
            tmp = "演出内容：" + para.douban_title + "</br>" + "演出地点：" + para.douban_pos + "</br>";
            break;
        case "1":
            tmp = "微博内容：" + para.weibo_content + "</br>" + "发布时间：" + para.pub_time + "</br>";
            break;
        case "2":
            tmp = "新闻标题：" + para.bangbang_title + "</br>" + "新闻内容：" + para.bb_content + "</br>";
            break;
        case "3":
            tmp = "门票：" + para.tuniu_name + "</br>" + "开放时间：" + para.tuniu_opentime + "</br>" + "地址：" + para.tuniu_place + "</br>" + "门票内容：" + para.tuniu_title + "</br>";
            break;
        case "4":
            tmp = "标题：" + para.house_title + "</br>" + "<hr>" + "地址：" + para.house_place + "</br>" + "<hr>" + "内容：" + para.house_newmessage + "</br>" + "<hr>" + "联系方式：" + para.house_telephone + "</br>";
            //tmp = '<div class="plyd"><div class="plcs">' + 0 + '</div><div class="pl">评</div><div class="plcs">' + 0 + '</div><div class="pl">购</div></div>';
            break;
        case "5":
            tmp = "打折标题：" + para.title + "</br>" + "<hr>" + "打折内容：" + para.detail_info + "</br>" + "<hr>" + "发布时间：" + para.pub_date + "</br>";
            break;
    }
    return tmp;
}


var showPanImgs = function () {
    if (document.getElementById("pan_chk").checked) {
        var xmlFile = "http://localhost:8080/panMap/Paninfo.xml";
        //alert(xmlFile)
        var xmlDoc = loadXML(xmlFile);
        if (xmlDoc == null) {
            alert('加载全景图有问题!');

        }
        else {
            graphicLayer_panMap.show();
        }

        return xmlDoc;
    }else{
        graphicLayer_panMap.hide();
    }

}

/// 加载XML 文件
var loadXML = function (xmlFile) {
    var xmlDoc;
    if (window.ActiveXObject) {
        //alert("IE")
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE浏览器
        xmlDoc.async = false;
        xmlDoc.load(xmlFile);
    }
    else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) { //火狐浏览器
        //alert("firefox")
        //else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
        xmlDoc = document.implementation.createDocument('', '', null);
        xmlDoc.load(xmlFile);
    }
    else { //谷歌浏览器
        //alert("Google")
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", xmlFile, false);
        xmlhttp.send(null);
        if (xmlhttp.readyState == 4) {
            xmlDoc = xmlhttp.responseXML.documentElement;
            //alert(xmlDoc)
           // window.txt = " ";
            for (var i = 0; i < xmlDoc.childElementCount; i=i+3) {
                
                var id = xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
                var loc_x = xmlDoc.getElementsByTagName("x")[i].childNodes[0].nodeValue;
                var loc_y = xmlDoc.getElementsByTagName("y")[i].childNodes[0].nodeValue;

                var point = new esri.geometry.Point(loc_x, loc_y, new esri.SpatialReference({wkid: 4326}));
                //var infoTemplate = new esri.InfoTemplate("位置描述", "卖家：" + para[i].seller_name + "</br>" + "电话：" + para[i].seller_phone + "</br>"+"交易地点：" + para[i].seller_location + "</br>");
                var txt = "http://localhost:8080/Pano/MyServlet?Index=" + id;
                //alert(txt)
                //var content = "<input  type='button' style='float:top;' value='街景图'  onclick='ShowIframe(\"街景展示\",\""+encodeURI(txt)+"\" ,1024,768)'>";
                var content = "<div style='width:900px; height:600px'><iframe src=" + encodeURI(txt) +" width='100%' height='600px' scrolling='no' /></div>";

                var infoTemplate = new esri.InfoTemplate("街景展示", content);
                // var infoTemplate = new esri.InfoTemplate("http://localhost:8080/Pano/MyServlet?Index=1");
                var graphic = new esri.Graphic(point, new esri.symbol.PictureMarkerSymbol("../images/panImg.png", 32, 32), null, infoTemplate);
                graphicLayer_panMap.add(graphic)
            }
        }
    }
    return xmlDoc;
}

jQuery.support.cors = true;
var showWeatherInfo = function () {
    if (document.getElementById("weather_chk").checked) {
        $.ajax({
            type: "get",
            url: Config.Weather,
            data: {},
            dataType: "text",
            success: function (result) {
                var arr = eval(result);
                var max = [], min = [], rq = [];
                for (var i = 0; i < arr.length; i++) {
                    max.push(parseInt(arr[i].temp_high));
                    min.push(parseInt(arr[i].temp_low));
                    rq.push(arr[i].week_day);
                }
                var option = {
                    backgroundColor: '#ffffff',
                    title: {
                        text: '天气变化'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['最高气温', '最低气温']
                    },
                    toolbox: {
                        show: false
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: rq
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} °C'
                            }
                        }
                    ],
                    series: [
                        {
                            name: '最高气温',
                            type: 'line',
                            data: max,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '最低气温',
                            type: 'line',
                            data: min,
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };
                var myChart = echarts.init($('#div_weather').get(0));
                myChart.setOption(option);
                $('#div_weather').show();
            }
        });
        //var xmlFile = "http://localhost:8080/panMap/Paninfo.xml";
        ////alert(xmlFile)
        //var xmlDoc = loadXML(xmlFile);
        //if (xmlDoc == null) {
        //    alert('加载 天气信息 存在问题!');

        //}
        //else
        //{
        //    graphicLayer_panMap.show();
        //}

        //return xmlDoc;
    } else {
        $('#div_weather').hide();
    }

}



