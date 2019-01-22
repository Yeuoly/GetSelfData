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
    define("SessionID","HTTP_S_V_");

//--------------------------------------------------------------------------//
    /*
     * 邮箱STMP配置
     *
     * */
    define("passport_email_server_user_330","srmnotforget@srmxy.cn");

    define("passport_email_server_token_330","rspeuxcjoveccida");

//--------------------------------------------------------------------------//
    /*
     * 密码哈希配置
     *
     * */
    define("private_password","[ZhOuYuTwoZeRoZeRoTwOPoinT]");

    define("private_salt","Nuozuomi2002.");

    define("private_hash256","c29e6499a8b13620502acb04f3e4278c51ca24163889a9caa7c15d0058b8913a");

    define("private_confirmation","liveintheworld.");


//--------------------------------------------------------------------------//
    /*
     * mysql配置
     *
     * */
    define("mysql_db_host","127.0.0.1");        //连接

    define('mysql_user','root');                //用户名

    define('mysql_password','root');            //密码

    define("mysql_dbname","manausr");           //数据库名

    define("mysql_user_list","usrs");           //用户表名前缀

//--------------------------------------------------------------------------//
    /*
     * 常用参数
     *
     * */
    define("FilePath",dirname(__FILE__));       //文件目录

    define("cookies_saving_time",864000);             //cookies保存时间

    define("offset_account",3);                       //加密偏移参数

    define("offset_email",5);

    define("offset_dblist",7);

    define("failed",-250);                            //json返回值

    define("success",666);

//--------------------------------------------------------------------------//
    /*
     * 乱七八糟的中文回复
     *
     * */
    include_once (FilePath . "/utils/static/static.response.php");