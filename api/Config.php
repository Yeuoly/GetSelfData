<?php
/**
 * Editor : SRM_XY Yeuoly
 *
 * Version : 1.0.2-alpha
 *
 *
 * */


//--------------------------------------------------------------------------//
    /*
     * 初始化设置
     *
     * */
    define("SESSIONID","HTTP_S_V_");

    define("APISERVER_HOST","api.ylday.srmxy.cn http://api.ylday.srmxy.cn/");

    define("CLIENT_HOST","ylday.srmxy.cn http://ylday.srmxy.cn/");

//--------------------------------------------------------------------------//
    /*
     * 邮箱STMP配置
     *
     * */
    define("EMAIL_SERVER_HOST","smtp.qq.com");

    define("EMAIL_SERVER_USER","srmnotforget@srmxy.cn");

    define("EMAIL_SERVER_PASSWORD","rspeuxcjoveccida");

//--------------------------------------------------------------------------//
    /*
     * 密码哈希配置
     *
     * */
    define("PASSWORD_HASH_FIR","[ZhOuYuTwoZeRoZeRoTwOPoinT]");

    define("PASSWORD_HASH_SALT","Nuozuomi2002.");

    define("PASSWORD_HASH_256","c29e6499a8b13620502acb04f3e4278c51ca24163889a9caa7c15d0058b8913a");

    define("PASSWORD_HASH_CONFIRM","liveintheworld.");


//--------------------------------------------------------------------------//
    /*
     * mysql配置
     *
     * */
    define("MYSQL_DB_HOST","127.0.0.1");        //连接

    define('MYSQL_USER','root');                //用户名

    define('MYSQL_PASSWORD','root');            //密码

    define("MYSQL_DBNAME","manausr");           //数据库名

    define("MYSQL_USER_LIST","usrs");           //用户表名前缀

//--------------------------------------------------------------------------//
    /*
     * 常用参数
     *
     * */
    define("FILEPATH",dirname(__FILE__));       //文件目录

    define("COOKIE_SAVING_TIME",864000);             //cookies保存时间

    define("JCT_MAX_TIME",COOKIE_SAVING_TIME);       //登录的最大时间限度

    define("OFFSET_ACCONT",3);                       //加密偏移参数

    define("OFFSET_EMAIL",5);

    define("OFFSET_DBLIST",7);

    define("FAILED",-250);                            //json返回值

    define("SUCCESS",666);
//--------------------------------------------------------------------------//
    /*
     * SESSION/COOKIE参数
     *
     * */
    define("SESSION_USERDATA","user_data");           //session用户数据组

    define("SESSION_SRM_JCT","srm_jct");              //用户登陆的jct在session中的id

    define("COOKIE_SRM_JCT","srm_jct");               //用户cookie的jct

    define("SESSION_LOGIN_TIME","login_time");        //用户登录时间的session id

    define("SESSION_USER_ID","user_id");              //用户名

    define("SESSION_USER_CLASS","user_class");        //用户类别

    define("SESSION_USER_EMAIL","user_email");        //用户邮箱

    define("SESSION_USER_LV","user_lv");              //用户等级

    define("SESSION_USER_EXP","user_exp");            //用户经验

    define("SESSION_USER_UID","user_uid");            //用户uid

//--------------------------------------------------------------------------//
    /*
     * 乱七八糟的中文回复
     *
     * */
    include_once (FILEPATH . "/utils/static/static.response.php");

//--------------------------------------------------------------------------//
    /*
     * 用户配置
     *
     * */
    include_once (FILEPATH . "/utils/static/static.user.config.php");