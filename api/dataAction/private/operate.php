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
    include_once(FILEPATH . "/account/v1/User.php");

    /**
     *
     * newPost主程序入口
     * 预处理参数
     *
     * */
    $post_user = @$_SESSION[SESSION_USERDATA][SESSION_USER_ID];
    $post_user_uid = @$_SESSION[SESSION_USERDATA][SESSION_USER_UID];
    $post_method = @$_POST['method'];
    $post_data = @$_POST['data'];
    $post_title = @$_POST['title'];
    $post_about = @$_POST['about'];
    $post_id = @$_POST['postID'];

    /**
     *
     * 验证参数格式
     *
     * */
    include_once (FILEPATH . "/utils/class/class.Format.php");

    $f = new FormatChecker();

    if(!$f->FromNormalStr($post_method) || ($post_method != 'delete' && (!$f->FromNormalStr($post_data) ||
            !$f->FromNormalStr($post_title) || !$f->FromNormalStr($post_data))))
    {
        $res->set('res',FAILED);
        $res->set('error',wrong_params , true);
    }


    /**
     *
     * 引入postAction类
     *
     * */
    include_once(FILEPATH . "/utils/class/class.PostAction.php");

    $postActor = new privatePostAction($post_user,$post_user_uid);

    switch($post_method)
    {
        case 'modify':
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
                $res->set('error',wrong_params , true);
            }

            $result = $postActor->modifyPost($post_id,$post_title,$post_about,$post_data);
            if($postActor->_is_failed($result))
            {
                $res->set('res',FAILED);
                $res->set('error',$result , true);
            }
            $res->output();
            break;
        case 'newPost':
            date_default_timezone_set('Asia/Shanghai');
            $post_date = date('Y-m-d');

            include_once(FILEPATH . "/utils/class/class.Format.php");

            $formater = new FormatChecker();
            if(!$formater->FromNormalStr($post_data)||!$formater->FromNormalStr($post_title)||!$formater->FromNormalStr($post_about))
            {
                $res->set('res',FAILED);
                $res->set('error',wrong_params , true);
            }

            $result = $postActor->newPost($post_title , $post_date , $post_data , $post_about);
            if($postActor->_is_failed($result))
            {
                $res->set('res',FAILED);
                $res->set('error',$result ,true);
            }
            $res->output();
            break;
        case 'delete':
            if(!$post_id)
            {
                $res->set('res',FAILED);
                $res->set('error',wrong_params , true);
            }
            $result = $postActor->FindPostByHashIDInMyList($post_id);
            if($postActor->_is_failed($result))
            {
                $res->set('res',FAILED);
                $res->set('error',$result,true);
            }
            $result = $postActor->deletePost($post_id);
            if($postActor->_is_failed($result))
            {
                $res->set('res',FAILED);
                $res->set('error',$result ,true);
            }
            $res->output();
            break;
        default:
            $res->set('res',FAILED);
            $res->set('error',wrong_params , true);
    }
