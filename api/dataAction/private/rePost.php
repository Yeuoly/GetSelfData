<?php
    //前面40多行和newPost一样
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

    $post_data = @$_POST['data'];
    $post_user = $_SESSION[SESSION_USERDATA][SESSION_USER_ID];
    $post_user_uid = $_SESSION[SESSION_USERDATA][SESSION_USER_UID];
    $post_title = @$_POST['title'];
    $post_about = @$_POST['about'];
    $post_id = @$_POST['postID'];

    /**
     *
     * 引入格式验证类
     * 这里的$res是在User.php里就创建好了的
     *
     * */
    include_once(FILEPATH . "/utils/class/class.Format.php");

    $formater = new FormatChecker();
    if(!$formater->FromNormalStr($post_data)||!$formater->FromNormalStr($post_title)||
        !$formater->FromNormalStr($post_about) || !$formater->FromNormalStr($post_id))
    {
        $res->set('res',FAILED);
        $res->set('error',passport_wrong_format , true);
    }

    /**
     *
     * 引入postAction类
     *
     * */
    include_once(FILEPATH . "/utils/class/class.PostAction.php");

    $postActor = new privatePostAction($post_user,$post_user_uid);
    $result = $postActor->modifyPost($post_id,$post_title,$post_about,$post_data);
    if($postActor->_is_failed($result))
    {
        $res->set('res',FAILED);
        $res->set('error',$result , true);
    }
    $res->output();
