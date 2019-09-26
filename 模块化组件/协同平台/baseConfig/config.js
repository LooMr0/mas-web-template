// 二开页面配置文件
var baseAPI='',         //API接口地址 like  http://10.10.100.3:8867
    wlwUrl='',          //物联网平台web地址
    xtAPI='',           //协同API
    MapConfig = {
        hasUnit:false,  //是否显示单位
        removeAble:true,//是否可移动
    },
    treeAPI ='',        // 致远OA服务器地址
    threeDUrl = '',      //3D集成页面地址
    OACardAPI = '',      //三单两卡API接口地址
    CompanyNameConfig = '新沂市开发区安监局',//第一级树名称
    CompanyID='670869647114347', // 安监局ID
    TOKEN='',
    initUserName ='masajpt',
    initPassWord = 'mas123456';
if(window.location.host.indexOf('192.168.1.133')>=0){//物联网内网
    baseAPI = 'http://192.168.1.133:21903';
    wlwUrl = 'http://192.168.1.133:21902';
    xtAPI="http://192.168.1.33:1891";
}else {//物联网内网
    baseAPI = 'http://192.168.1.133:21903';
    wlwUrl = 'http://192.168.1.133:21902';
    xtAPI="http://192.168.1.33:1891";
    threeDUrl = 'http://218.92.104.98:3080';
}
if(window.location.host.indexOf('10.155.72.3')>=0){//OA内网
    treeAPI = 'http://10.155.72.3:9999';
    OACardAPI = 'http://192.168.1.33:1891'
}else {
    treeAPI = 'http://192.168.1.33:1889';
    OACardAPI = 'http://192.168.1.33:1891'
}
//地图中心点
var mapCenter = [118.76112613858525, 34.379480605441157];

/**
 * 树结构点击单位跳转配置
 * @type {{mineCode: string | string, systemCode: string | string, type: number, targetUrl: string}}
 */
var PageCifig = {
    type:1,
    mineCode:getParam('mineCode')||'',
    targetUrl:'',
    systemCode:getParam('systemCode')||'',
};
if(window.location.href.indexOf('targetUrl')>=0 && getParam('targetUrl').length>=10){
    PageCifig.targetUrl = decodeURIComponent(getParam('targetUrl'));
}else {
    switch (Number(getParam('targetUrl'))){
        case 1: // 联动报警
            PageCifig.targetUrl = wlwUrl+'/alarmAction/index.html';
            break;
        case 2: // 视频全景图预览
            PageCifig.targetUrl = wlwUrl+'/DesignerView/GraphDesigner/GraphDesignerPreview/index.html';
            break;
        case 3: // 全部系统预览
            PageCifig.targetUrl = wlwUrl+'/DesignerView/GraphDesigner/multipleSystemView/tabView.html';
            break;
        case 4: // 报警预警统计
            PageCifig.targetUrl = wlwUrl+'/video/treeVideo/view/index.html';
            break;
        case 5: // 三维场景预览
            PageCifig.targetUrl = treeAPI+'/seeyon/mas/oaPage/3dMultipleView/index.html';
            break;
        case 6: // 视频列表  allShow:显示全部
            PageCifig.targetUrl = wlwUrl+'/video/treeVideo/view/treeVideo.html';
            break;
        case 7: // 模拟量图表页面
            PageCifig.targetUrl = wlwUrl+'/DesignerView/GraphDesigner/DataPresentation/AnalogCurveEcharts.html';
            break;
        case 8: // 开关量图表页面
            PageCifig.targetUrl = wlwUrl+'/DesignerView/GraphDesigner/DataPresentation/SwitchingVolumeEchanrts.html';
            break;
        case 9: // 综合图表页面
            PageCifig.targetUrl = wlwUrl+'/DesignerView/GraphDesigner/DataPresentation/AnalogAndSwitchingQuantities.html';
            break;
    }
}
/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getParam("name")
 * 返回值:tyler
 */
function getParam(paramName){var reg=new RegExp("(^|&)"+paramName+"=([^&]*)(&|$)","i");if(window.location.search.indexOf('?')>=0&&window.location.search.split('?').length>2){var URLtext=window.location.search,urlLen=window.location.search.lastIndexOf('?');var currURL=replacepos(URLtext,urlLen,urlLen+1,'&');window.location.search=currURL}var r=window.location.search.substr(1).match(reg);if(r!=null){return decodeURI(r[2])}else{return null}}
function replacepos(text,start,stop,replacetext){mystr=text.substring(0,stop-1)+replacetext+text.substring(stop+1);return mystr}
function getEnterpriseByName(loginName,fn){
    $.ajax(xtAPI + "/api/HgCustomer/GetWholeName", {
        type: "GET",
        data: {
            loginName:loginName
        },
        success: function (result) {
            var Result = JSON.parse(result);
            var code = Result.result.code || "";
            Result.complaycode=code.substr(0,20);
            fn(Result);
        }
    });
}
function getCipCode()
{
    if(window.location.href.indexOf('code=')>=0 && getParam('code').length>=0 && window.location.href.indexOf('loginname=')>=0 && getParam('loginname').length>=0 )
    {
        getEnterpriseByName(getParam('loginname'),function(data){
            //{"Code":"1","Message":"修改成功","result":{"wholeName":"重庆梅安森,应用设计","code":"mas"},"complaycode":"mas"}
            switch (Number(getParam('code'))){
                case 3012: // 地图报警预警页
                    window.location.href = treeAPI+'/seeyon/mas/map/MapIndex.html?code=3012&loginname='+getParam('loginname');
                    break;
                case 3013: // 报警联动
                    window.location.href = wlwUrl+'/alarmAction/index.html?mineCode='+data.complaycode+'&systemCode=90';
                    break;
                case 3014: // 视频全景图预览
                    window.location.href = wlwUrl+'/DesignerView/GraphDesigner/GraphDesignerPreview/index.html?mineCode='+data.complaycode+'&systemCode=72';
                    break;
                case 3015: // HT系统预览
                    window.location.href =  wlwUrl+'/DesignerView/GraphDesigner/multipleSystemView/tabView.html?mineCode='+data.complaycode+'&systemCode=90';
                    break;
                default:
                    $("#shwowerr").show();
                    break;
            }
        });
    }else
    {
        $("#shwowerr").show();
    }
}
console.log(PageCifig.targetUrl)
