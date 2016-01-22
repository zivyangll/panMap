if (!window.Config) { window.Config = {}; }
// 首页-滚动新闻服务
Config.scroll = "http://202.114.114.34:8878/yuqing/main_scroll_info";
// 首页-主题类型分布/统计
Config.Ztlxfb = "http://202.114.114.34:8878/yuqing/query_main_stats";
// 首页-时光轴
Config.SGZurl = "http://202.114.114.34:8878/yuqing/main_show_dynInfo";
// 分类查询-条件查询
Config.FLtj = "http://202.114.114.34:8878/yuqing/category_by_conditions";
// 分类查询-关键字查询
Config.FLKey = "http://202.114.114.34:8878/yuqing/category_by_keyword";
// 主题分析-获取年份数据
Config.GetYear = "http://202.114.114.34:8878/yuqing/theme_query_total_year";
// 主题分析-销售分析列表
Config.XSList = "http://202.114.114.34:8878/yuqing/theme_query_userinfo";
// 主题分析-销售分析详细列表
Config.XXList = "http://202.114.114.34:8878/yuqing/theme_show_detail_info";
// 主题分析-统计分析-卖家信息统计
Config.MJlist = "http://202.114.114.34:8878/yuqing/theme_show_all_stats";
// 主题分析-统计分析-个人信息统计
Config.GRlist = "http://202.114.114.34:8878/yuqing/theme_show_user_stats";
// 热点分析
Config.Hot = [
        "http://202.114.114.34:8878/yuqing/hotspot_query_show",
        "http://202.114.114.34:8878/yuqing/hotspot_query_citynews",
        "http://202.114.114.34:8878/yuqing/hotspot_query_people_living",
        "http://202.114.114.34:8878/yuqing/hotspot_query_travel",
        "http://202.114.114.34:8878/yuqing/hotspot_query_house",
        "http://202.114.114.34:8878/yuqing/hotspot_query_discount",
];

//当图片不存在时，首页的默认图片
//Config.HomeImg = ["img_show.jpg", "img_weibo.jpg", "img_peopleliving.png", "img_travel.jpg", "img_house.jpg", "img_discount.jpg"];
// 热点分析的默认图片
Config.HotImg = ["img_show.jpg", "img_weibo.jpg", "img_peopleliving.png", "img_travel.jpg", "img_house.jpg", "img_discount.jpg"];
// 分类查询左侧列表的默认图片
Config.CataImg = ["img_weibo.jpg", "img_house.jpg", "img_discount.jpg", "img_peopleliving.png", "img_show.jpg", "img_travel.jpg", "img_58.png"];
// 主题分析地图列表默认图片
Config.ThemeImg = ["img_58.png", "img_baixing.png", "img_ganji.jpg"];
// 主题分析关键字查询服务
Config.ZTGJZList = "http://202.114.114.34:8878/yuqing/theme_by_keyword";
// 图片路径
Config.Imgurl = "../../temp_imgs/";
// 图片后缀
Config.Imgtype = ".jpg";
// 分类查询保存或删除服务
Config.UpdateUrl = "http://202.114.114.34:8878/yuqing/category_update_theme";
Config.HotTJ = [
 "http://202.114.114.34:8878/yuqing/hotspot_stat_show",// 热点分析统计-社会新闻
"http://202.114.114.34:8878/yuqing/hotspot_stat_citynews",// 热点分析统计-百姓生活
"http://202.114.114.34:8878/yuqing/hotspot_stat_people_living",// 热点分析统计-演出活动
"http://202.114.114.34:8878/yuqing/hotspot_stat_travel",// 热点分析统计-商品促销
"http://202.114.114.34:8878/yuqing/hotspot_stat_house",// 热点分析统计-旅游热点
"http://202.114.114.34:8878/yuqing/hotspot_stat_discount"// 热点分析统计-楼盘交房
];
// 房屋交易统计
Config.HotFWJY = "http://202.114.114.34:8878/yuqing/hotspot_stat_house_data";
// 天气预报
Config.Weather = "http://202.114.114.34:8878/yuqing/main_get_weatherInfo";