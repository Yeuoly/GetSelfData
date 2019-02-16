<?php
    /**
     * Created by PhpStorm.
     * User: Yeuoly SRM_XY
     * Date: 2019/2/2
     * Time: 21:30
     *
     * 这个api将用来给用户获取自己最近的post
     * 必要参数：
     *      page : 第几页，有最大值
     *      cookie : 必须得传cookie，里面必须要有srm_jct和HTTP_S_V，不然就返回-250
     */

    //先引入User.php验证身份，如果没通过检测都不会进入这个文件的主线程
    //已经默认开启了session
    include_once (dirname(__FILE__) . "/../../User.php");
    include_once(FILEPATH . "/utils/class/class.Format.php");

    //获取页面
    $formater = new FormatChecker();
    $post_par_page = @$_POST['page'];
    if(!$formater->FromNormalNum(intval($post_par_page))){
        $res->set('res',FAILED);
        $res->set('error',wrong_params,true);
    }
    if(!isset($_SESSION[SESSION_USERDATA])){
        $res->set('res',FAILED);
        $res->set('error',passport_jct_offline,true);
    }
    $user_data = $_SESSION[SESSION_USERDATA];
    $post_par_user_id = $user_data[SESSION_USER_ID];
    $post_par_user_uid = $user_data[SESSION_USER_UID];

    //创建post对象
    include_once(FILEPATH . "/utils/class/class.PostAction.php");
    $postActor = new privatePostAction($post_par_user_id,$post_par_user_uid);
    $recentPost = $postActor->getRecent($post_par_page);
    if($postActor->_is_failed($recentPost)){
        $res->set('res',FAILED);
        $res->set('error',server_error,true);
    }
    if(count($recentPost) != 5){
        $res->set('isOver',true);
    }
    $res->set('res',SUCCESS);
    $res->set('data',$recentPost,true);