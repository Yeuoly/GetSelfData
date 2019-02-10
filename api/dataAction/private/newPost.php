<?php
    /**
     * Created by PhpStorm.
     * User: Yeuoly SRM_XY
     * Date: 2019/2/10
     * Time: 20:37
     */

    //第一步引入配置文件
    include_once (dirname(__FILE__) . "/../../Config.php");

    /**
     *
     * 引入User.php验证用户身份
     * 如果身份验证失败会直接返回failed，成功则继续执行本文件的步骤
     *
     * */
    include_once (FILEPATH . "/User.php");

    /**
     *
     * newPost主程序入口
     * 预处理参数
     *
     * */

    date_default_timezone_set('Asia/Shanghai');

    $post_data = @$_POST['data'];
    $post_user = $_SESSION[SESSION_USERDATA][SESSION_USER_ID];
    $post_user_uid = $_SESSION[SESSION_USERDATA][SESSION_USER_UID];
    $post_title = @$_POST['title'];
    $post_about = @$_POST['about'];
    $post_date = date('Y-m-d');

    /**
     *
     * 引入格式验证类
     * 这里的$res是在User.php里就创建好了的
     *
     * */
    include_once (FILEPATH . "/utils/class/class.format.php");

    $formater = new FormatChecker();
    if(!$formater->FromNormalStr($post_data)||!$formater->FromNormalStr($post_title)||!$formater->FromNormalStr($post_about))
    {
        $res->set('res',FAILED);
        $res->set('error',passport_wrong_format , true);
    }

    /**
     *
     * 引入postAction类
     *
     * */
    include_once (FILEPATH . "/utils/class/class.postAction.php");

    $poster = new privatePostAction($post_user , $post_user_uid);
    $result = $poster->newPost($post_title , $post_date , $post_data , $post_about);
    if($poster->_is_failed($result))
    {
        $res->set('res',FAILED);
        $res->set('error',$result ,true);
    }
    $res->output();