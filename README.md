# mas-web-template
mas 重庆元图web端模块化开发目录结构
# by mas
# 前端开发代码规范
1、前端业务开发完成后，一定要自测几遍，确保没有问题了再提交上传。更新至远程服务器上时，请先备份原来的文件，防止出现一些不可预料的BUG，导致一时解决不掉，又还原不了。

2、开发的业务需要支持IE内核的浏览器，所以js代码要使用[babel工具](BABEL工具)转成ES5语法；
## 一、加载优化
1. 减少HTTP请求。尽量减少页面的请求数(首次加载同时请求数不能超过4个)。
2. 无阻塞。样式放在头部并使用link方式引入，脚本放在尾部并使用异步方式加载。
3. 压缩图像。推荐使用CSS3、SVG、IconFont代替图像或者动画效果；使用[TinyPng](TinyPng)压缩图像。
4. 使用[v-cloak]{display:none} ，防止未完成渲染前的绑定语法。
5. 每个HTML文件的meta采用UTF-8编码减少乱码 设置成如下所示：
```    <meta charset="utf-8">
    <meta http-equiv="x-dns-prefetch-control" content="on">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="#303B4F">
    <meta content="telephone=no" name="format-detection"/>
    <meta content="email=no" name="format-detection"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <meta name="x5-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="HandheldFriendly" content="true">
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="browsermode" content="application">
    <meta name="msapplication-tap-highlight" content="no">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta name="msapplication-TileColor" content="#303B4F"/>
```
6.优化高频事件：scroll、touchmove等事件采用[函数防抖和节流](函数节流、函数防抖)
## 二、样式优化
1. 避免在HTML中书写style
2. 正确使用display：display会影响页面的渲染
display:inline后不应该再使用float、margin、padding、width和height
display:inline-block后不应该再使用float
display:block后不应该再使用vertical-align
display:table-*后不应该再使用float和margin
3. 不声明过多的font-size：过多的font-size影响CSS树的效率;尽量在基础CSS文件中定义html{font-size:10vw}
## 三、Vue 性能优化
1. v-if 和 v-show 区分使用场景;
2. computed 和 watch 区分使用场景;
3. v-for 遍历必须为 item 添加 key，且避免同时使用 v-if;
# 平台配置相关说明
1. 基础配置文件放在baseCofig/config.js下，不需要更新至平台中，只做本地使用；
2. 相关的项目说明查看附件MAS-项目工作资料；
3. baseConfig参数说明：
```
    var baseAPI='',             //API接口地址 like  http://10.10.100.3:8867
        wlwUrl='',              //物联网平台web地址
        StreamMediaUrl = '',    //流媒体服务器地址
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
    }else {
        IsInnerNetwork = false;
        baseAPI = 'http://180.104.97.238:8867';
        wlwUrl = 'http://180.104.97.238:8866';
        StreamMediaUrl = '180.104.97.240'
    }

```

