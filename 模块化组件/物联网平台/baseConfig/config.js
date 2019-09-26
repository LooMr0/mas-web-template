var baseAPI='',             //API接口地址 like  http://10.10.100.3:8867
    wlwUrl='',              //物联网平台web地址
    StreamMediaUrl = '',    //流媒体服务器地址
    base8700Url = '',       //8700流媒体服务器地址
    HlsPort = '8089',       //HLS流媒体播放端口号
    RtmpPort = '2935',      //RTMP流媒体播放端口号
    IsInnerNetwork=false,   //内网 外网
    MapConfig = {
        hasUnit:true,//是否显示单位
        removeAble:true,//是否可移动
    };

if(window.location.host.indexOf('10.155.72.2')>=0){//内网
    IsInnerNetwork = true;
    baseAPI = 'http://10.155.72.2:8867';
    wlwUrl = 'http://10.155.72.2:8866';
    StreamMediaUrl = '10.155.72.6';
    base8700Url = 'http://192.168.222.191:8388'
}else {
    IsInnerNetwork = false;
    baseAPI = 'http://180.104.97.238:8867';
    wlwUrl = 'http://180.104.97.238:8866';
    StreamMediaUrl = '180.104.97.240';
    base8700Url = 'http://218.92.104.98:8388'
}
