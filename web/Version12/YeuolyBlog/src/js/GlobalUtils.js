import { BaseModule } from "./module";
import Vue from 'vue';

export let FunctionGroup = {
//获取屏幕大小、尺寸
    getWindowSize : function(){
        let xScroll, yScroll, windowWidth, windowHeight, pageWidth, pageHeight;
        // innerHeight获取的是可视窗口的高度，IE不支持此属性
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = document.body.scrollWidth;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }

        if (self.innerHeight) {    // all except Explorer
            windowWidth = self.innerWidth;
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }

        // for small pages with total width less then width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = windowWidth;
        } else {
            pageWidth = xScroll;
        }

        return{
            pageWidth : pageWidth,
            pageHeight : pageHeight,
            windowWidth : windowWidth,
            windowHeight : windowHeight
        }
    },
//到网站主页去
    goToIndex : function () {
        location.href = BaseModule.getUrlPath('',BaseModule.dir_web);
    },
//到自己的主页去
    goToMyIndex : function () {
        location.href = BaseModule.getUrlPath("msg.html",BaseModule.dir_web);
    },
//移动到更新日志
    goToUpdateLog : function () {
        if(document.location.href === BaseModule.getUrlPath('',BaseModule.dir_web) ||
            document.location.href === BaseModule.getUrlPath('index.html',BaseModule.dir_web))
            FunctionGroup.smoothScrollMove('updates-log-list');
        else
            document.location = BaseModule.getUrlPath('#updates-log-list',BaseModule.dir_web);
    },
//跳转页面到登录界面
    goToLogin : function () {
        location.href = BaseModule.getUrlPath('passport.html',BaseModule.dir_web);
    },
//硬核翻译，发博客去
    goToSendPost : function () {
        location.href = BaseModule.getUrlPath('operate/editor-post.html',BaseModule.dir_web);
    },
/*//锚点平滑移动
    smoothScrollMove : function(id){
        $("html,body").animate({
            scrollTop : $("#" + id).offset().top
        }, 200);
    },*/
//注销
    logOff : function () {
        if(FunctionGroup.isOnline())
        {
            FunctionGroup.http.get(
                BaseModule.getUrlPath("LogOff.php",BaseModule.dir_api),
                {},
                {},
                function(data)
                {
                    if(data['data']['res'] === BaseModule.response.passjct.success)
                    {
                        FunctionGroup.clearUserInfo();
                    }
                }
            );
        }
    },
/*//设置用户信息，键值与值相对应
    setUserInfo : function (key, val) {
        //app_self.constDom.menu.user[key] = val;
    },
//设置用户信息，传入值为一个数组，键值与值相对应
    setUserInfoArray : function (ary) {
        for(let key in ary){
            //FunctionGroup.setUserInfo(key,ary[key]);
        }
    },*/

//清除用户信息
//这里肯定要优化的，只是现阶段被这个js的引用型变量搞得很烦。。
    clearUserInfo : function () {
        /*app_self.constDom.menu.user = {
            user_id: '未登录，点击登录',
            user_uid: '-1',
            user_email: 'example@google.com',
            user_lv: '0',
            user_exp: '0',
            user_class: '',
            avatar: 'http://hbimg.b0.upaiyun.com/a12f24e688c1cda3ff4cc453f3486a88adaf08cc2cdb-tQvJqX_fw658',
            srm_jct: '',
            login_time: '0',
            online: false
        }*/
    },
//登录检测
    passJct : function() {
        FunctionGroup.http.post(
            BaseModule.getUrlPath("User.php",BaseModule.dir_api),
            {},
            {},
            function(data)
            {
                if(data['data']['res'] === BaseModule.response.passjct.success)
                {
                    FunctionGroup.setUserInfoArray(data['data']['data']);
                    FunctionGroup.setUserInfo('online',true);
                    FunctionGroup.setUserInfo(
                        'avatar' ,
                        BaseModule.getUrlPath('avatar/'+data['data']['data']['user_uid']+'.jpg',BaseModule.dir_img)
                    );
                    let handle_user_id_txt = document.getElementById("menu-user-block-id-txt");
                    handle_user_id_txt.style.setProperty('cursor','default');
                    //执行用户数据更新完之后的跟随事件
                    for(let i in DataGroup.userOnloadNextTick)
                    {
                        DataGroup.userOnloadNextTick[i]();
                    }
                }

            }
        );
    },
//添加用户信息加载完之后的跟随事件
/*    bindUserOnloadNextTick : function(src){
        if(typeof src === 'function')
            dataGroup.userOnloadNextTick.push(src);
        else
            console.error('userOnloadNextTick : wrong type');
    },
//解绑所有绑定事件，这里不分什么固定事件不固定事件啥的
    unbindUserOnloadNextTick : function(){
        //直接覆盖就完事了，剩下的任务留给浏览器
        dataGroup.userOnloadNextTick = [];
    },*/
//获取用户信息
    getUserInfo :  (index) => {
        /**
        *  PointOut
        * */

        if(typeof index === 'undefined'){
            alert();
        }
           // return app_self.constDom.menu.user;
        //if(typeof app_self.constDom.menu.user[index] !== 'undefined'){}
            //return app_self.constDom.menu.user[index];
        //console.error('illegal index in getUserInfo(index)');
    },
//
    isPC : function() {
        let userAgentInfo = navigator.userAgent;
        let Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
        let flag = true;
        for (let v = 0; v < Agents.length; v++)
        {
            if (userAgentInfo.indexOf(Agents[v]) > 0)
            {
                flag = false;
                break;
            }
        }
        return flag;
    },
//获取当前cookies的字典
    getParamsArray : function () {
        let url = document.location.toString();
        let urlParamsStr = url.split('?')[1];
        if(typeof urlParamsStr === 'undefined')return;
        let urlParamsAry = urlParamsStr.split('&');
        let _urlParamsAry = [];
        for(let i in urlParamsAry)
        {
            let buf = urlParamsAry[i].split('=');
            _urlParamsAry[buf[0]] = buf[1];
            _urlParamsAry.length++;
        }
        return _urlParamsAry;
    },
//mode为空，即只有一个确认按钮，mode为1时有确认和取消两个按钮
//网上抄的消息框，自己修改了一下样式和弹出动画，删除了原本的遮罩层
//原地址https://blog.csdn.net/java_goodstudy/article/details/51482324
    alertBox : function (msg, mode) {
        msg = msg || '';
        mode = mode || 0;
        let winSize = FunctionGroup.getWindowSize();
        //弹出框
        let styleStr1 = 'display:block;position:fixed;_position:absolute;left:' + (winSize.windowWidth / 2 - 200) + 'px;top:' + (winSize.windowHeight / 2 - 150) + 'px;_top:' + (winSize.windowHeight / 2 + top - 150)+ 'px;'; //弹出框的位置
        let alertBox = document.createElement('div');
        alertBox.id = 'alertMsg';
        alertBox.style.cssText = styleStr1;
        //创建弹出框里面的内容P标签
        let alertMsg_info = document.createElement('P');
        alertMsg_info.id = 'alertMsg_info';
        alertMsg_info.innerHTML = msg;
        alertBox.appendChild(alertMsg_info);
        //创建按钮
        let btn1 = document.createElement('a');
        btn1.id = 'alertMsg_btn1';
        btn1.href = 'javascript:void(0)';
        btn1.innerHTML = '<cite>确定</cite>';
        btn1.onclick = function () {
            closeAlertBox();
            return true;
        };
        alertBox.appendChild(btn1);
        if (mode === 1) {
            let btn2 = document.createElement('a');
            btn2.id = 'alertMsg_btn2';
            btn2.href = 'javascript:void(0)';
            btn2.innerHTML = '<cite>取消</cite>';
            btn2.onclick = function () {
                closeAlertBox();
                return false;
            };
            alertBox.appendChild(btn2);
        }
        document.body.appendChild(alertBox);

        //逐渐消失的动画
        function closeAlertBox(){
            alertBox.style.setProperty('opacity','1');
            let timer = setInterval(function () {
                let opacity = alertBox.style.opacity;
                alertBox.style.opacity = opacity - 0.02;
                if(opacity + 0.02 <= 1)
                {
                    document.body.removeChild(alertBox);
                    clearInterval(timer);
                }
            } , 2);
        }
    },

    setWebIcon : function() {
        let link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = BaseModule.getUrlPath('img/shortcut.ico',BaseModule.dir_web);
        document.head.appendChild(link);
    },
//设置标题
    setTitle : function(){
        document.title = BaseModule.getWebTitle();
    },
//获取指定cookie
    getDestinationCookie : function (cookieName) {
        let strCookie = document.cookie;
        let arrCookie = strCookie.split("; ");
        for(let i = 0; i < arrCookie.length; i++)
        {
            let arr = arrCookie[i].split("=");
            if(cookieName === arr[0])return arr[1];
        }
        return false;
    },
//向black_cover中添加点击事件，传入值需要是一个字典，其中的func成员将会被绑定到black_cover的onclick事件中
//传入值还可以是个function
//需要注意的是，当触发了onclick事件之后所有的绑定都会被清理
    /*blackCoverBindClick : function(src) {
        app_self.constDom.black_cover.bind(src);
    },*/
//给页眉加一点功能，算是个钩子叭~
    addHeaderFunc :function (innerHtml, handler, className, id) {
        if(typeof innerHtml !== 'string')return;
        handler = typeof handler === 'function' ? handler : function () {};
        className = className ? className : 'headerList-default';
        id = id ? id : '#';
        /**
        *   PointOut
        * **/
        if (typeof id === 'undefined'){
            alert();
        }
        /*app_self.constDom.header.headerFunctionList.push({
            className : className,
            click : handler,
            id : id,
            innerHtml : innerHtml
        });*/
    },
//post get 请求封装
    http : {
        get : function (url, params, options, success , error) {
            if(typeof options !== 'object')
                console.warn('wrong type in function : get - params : options type should be "object"');
            //let vm = new VueResource();
            options.credentials = true;
            options.emulateJSON = true;
            Vue.http.get(url,params,options).then(function (value) {
                success(value.data);
            }).catch(function (reason) {
                if(typeof error === 'function')
                    error(reason);
                else if(typeof error !== 'undefined')
                    console.warn('wrong type in function : get - params : error type should be "function"');
            });
        },
        post : function (url, params, options, success, error) {
            if(typeof options !== 'object')
                console.warn('wrong type in function : post - params : options type should be "object"');
            //let vm = new VueResource();
            options.emulateJSON = true;
            Vue.http.interceptors.push(function (request, next) {
                request.credentials = true;
                next();
            });
            Vue.http.post(url,params,options).then(function (value) {
                success(value.data);
            }).catch(function (reason) {
                if(typeof error === 'function')
                    error(reason);
                else if(typeof error !== 'undefined')
                    console.warn('wrong type in function : post - params : error type should be "function"');
            });
        }
    }
};

export let DataGroup = {
    //登录检测成功之后执行
    userOnloadNextTick : [

    ]
};

export let Pattern = {
    account : /^[a-zA-Z0-9_]{0,}$/,
    password : /^[a-zA-Z0-[\.*\+_\@#&\$!=\(\)\^-]{0,}$/,
    email : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\\.-])+\.([A-Za-z]{2,4})$/,
    phoneNumber : /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
    length6To16 : /^.{6,16}$/
};