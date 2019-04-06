<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/16
 * Time: 18:23
 */

    //第一步引入配置文件
    include_once (dirname(__FILE__) . "/../../Config.php");

    /**
     *
     * 引入User.php验证用户身份
     * 如果身份验证失败会直接返回failed，成功则继续执行本文件的步骤
     *
     * */
    include_once(FILEPATH . "/account/v1/User.php");

    /**
     *
     * newPost主程序入口
     * 预处理参数
     *
     * */
    $postID = @$_POST['postID'];
    $post_user = $_SESSION[SESSION_USERDATA][SESSION_USER_ID];
    $post_user_uid = $_SESSION[SESSION_USERDATA][SESSION_USER_UID];
    if(!$postID)
    {
        $res->set('res',FAILED);
        $res->set('error',wrong_params,true);
    }

    include_once (FILEPATH . "/utils/class/class.PostAction.php");
    $postActor = new privatePostAction($post_user,$post_user_uid);
    $result = $postActor->FindPostByHashIDInMyList($postID);
    if($postActor->_is_failed($result))
    {
        $res->set('res',FAILED);
        $res->set('error',$result,true);
    }
    $result = $postActor->getDataByHashID($postID);
    if($postActor->_is_failed($result))
    {
        $res->set('res',FAILED);
        $res->set('error',$result,true);
    }
    $res->set('data',$result,true);