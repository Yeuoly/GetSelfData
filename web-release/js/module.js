﻿var static_data=new NotForgetData();function NotForgetData(){this.m_URL_DOMAIN_API_DIR=0;this.m_URL_DOMAIN_WEB_DIR=1;this.m_URL_DOMAIN_IMG_DIR=2;this.m_ADD_BLOCK_TYPE_TABLE=1;this.m_ADD_BLOCK_TYPE_URL=2;this.m_ADD_BLOCK_TYPE_PIC=3;this.response=new c();this.url=new d();this.baseinfo=new a();this.userblock=new b();function b(){this.m_MAX_MENU_LEFT=0;this.m_MIN_MENU_LEFT=-300;this.m_MENU_WIDTH=300;this.m_MAX_BLACK_COVER_OPACITY=0.5;this.m_MIN_BLACK_COVER_OPACITY=0}function a(){this.m_COPYRIGHT="© 2019 - Yeuoly";this.m_WEB_TITLE="YeuolyBlog";this.m_WLECOME_SAYING="欢迎回来!";this.m_VERIFICATION_SUCCESS="验证码已发送（可能在您邮箱的垃圾箱里orz)";this.m_DEFAULT_USER_INFO={user_id:"未登录，点击登录",user_uid:"-1",user_email:"example@google.com",user_lv:"0",user_exp:"0",user_class:"",avatar:"https://img.srmxy.cn/ylday/avatar/default.webp",srm_jct:"",login_time:"0",online:false};this.img_404="httpss://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549907902647&di=2a7c027baeaa4e7519e50f6a780acf1a&imgtype=0&src=https%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01565959e6bcfda80121bea5beef4c.jpg%401280w_1l_2o_100sh.jpg"}function d(){this.m_URL_DOMAIN_API="https://api.ylday.srmxy.cn/";this.m_URL_DOMAIN_WEB="https://ylday.srmxy.cn/";this.m_URL_DOMAIN_IMG="https://img.srmxy.cn/ylday/"}function c(){this.requestSuccess=666;this.requestFail=-250;this.login=new i();this.passjct=new h();this.register=new g();this.requestVerification=new f();function i(){this.success=666;this.failed=-250}function h(){this.failed=-250;this.success=666}function f(){this.success=666;this.failed=-250}function g(){this.success=666;this.failed=-250}function e(){this.success=666;this.failed=-250}}this.getUrlPath=function(f,e){switch(e){case this.m_URL_DOMAIN_API_DIR:return this.url.m_URL_DOMAIN_API+f;case this.m_URL_DOMAIN_WEB_DIR:return this.url.m_URL_DOMAIN_WEB+f;case this.m_URL_DOMAIN_IMG_DIR:return this.url.m_URL_DOMAIN_IMG+f}};this.getWebTitle=function(){return this.baseinfo.m_WEB_TITLE};this.getWelcomeSaying=function(){return this.baseinfo.m_WLECOME_SAYING}};