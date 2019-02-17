<?php
    include_once (dirname(__FILE__) . "/Config.php");
    include_once(FILEPATH . "/utils/class/class.ResponseAjax.php");
    include_once (FILEPATH . "/utils/functions.php");
    include_once(FILEPATH . "/utils/class/class.Account.php");
    \NFG\InitCommunicate();

    //回文头部设定
    \NFG\HeaderSetting::SetTextJson();
    \NFG\HeaderSetting::SetAllowCredentials();
    \NFG\HeaderSetting::SetCharset();
    \NFG\HeaderSetting::SetAllowOrigin();

    //回文主体
    $res = new ResponseAjax();
    $user_data = null;

    //如果用户的cookie里没有jct，则为离线
    if(!isset($_COOKIE[COOKIE_SRM_JCT]))
    {
        $res->set('res',FAILED);
        $res->set('error',passport_jct_offline,true);
    }

    //检测用户的jct是否有效
    $result = AccountAction::CheckJct($_COOKIE[COOKIE_SRM_JCT],$user_data);
    if(AccountAction::_is_failed($result))
    {
        $res->set('res',FAILED);
        $res->set('error',$result,true);
    }
    if(php_self() == 'User.php')
    {
        $res->set('res',SUCCESS);
        $res->set('data',$user_data,true);
    }

    function php_self(){
        $php_self=substr($_SERVER['PHP_SELF'],strrpos($_SERVER['PHP_SELF'],'/')+1);
        return $php_self;
    }

    /**粪山**/
    /*session_name("HTPP_S_V_NFG");
    session_start();

    $res = array(
        'msg'=>success,
        'data'=>array(
            'res'=>'',
            'error' => ''
        )
    );
    $jct = @$_POST['srm_jct'];
    $sign_ex = false;
    if(!$jct || strlen($jct)!=32 || !preg_match("/^[a-zA-Z0-9\s]+$/",$jct)){
        $res['msg'] = success;
        $res['data']['res'] = passport_wrong_format;
    }else{
        /*$con = mysqli_connect("127.0.0.1",$account[0],$account[1]);
        if(!$con){
            ServerErrorSetting();
            return;
        }
        $db = mysqli_select_db($con,constant('mysqli_db_manausr'));
        if(!$db){
            ServerErrorSetting();
            return;
        }
        $list = mysqli_query($con,"SELECT * FROM ".constant('mysql_list_usrs'));
        if(!$list){
            ServerErrorSetting();
            return;
        }
        while($row = mysqli_fetch_array($list)){
            if($row['srm_jct'] == $jct){
                $res['msg'] = constant('success');
                $res['data']['res'] = constant('passport_pass_success');
                $res['data'] = array_merge($res['data'],array('act' => $row['act']));
                if(empty($_SESSION['login_statue']) || empty($_SESSION['expiretime']) ||
                $_SESSION['login_statue'] == false || $_SESSION['expiretime'] + 1440 < time()){
                    $_SESSION['login_statue'] = true;
                    $_SESSION['expiretime'] = time();
                }
                $sign_ex = true;
                break;
            }
        }
        if(!$sign_ex){
            $res['msg'] = constant('success');
            $res['data']['res'] = constant('passport_jct_offline');
        }*/
        /*
        define('SERVER_ERROR',$res['data']['res'] = failed,
                              $res['data']['error'] = passport_server_error
        );

        //初始化数据库
        $DB = new DB_Controller("127.0.0.1",mysql_user_list ,mysql_password,mysql_dbname);
        if(!$DB->Start()) {
            SERVER_ERROR;
            exit(json_encode($res));
        }
        //获取目标字段
        $res = $DB->GetRowFromList(mysql_user_list,"srm_jct",$jct);
        if($res == false){
            SERVER_ERROR;
            exit(json_encode($res));
        }elseif($res == -2){
            //不存在这个登录标识
            $res['data']['res'] = failed;
            $res['data']['error'] = passport_jct_offline;
        }else{
            //成功通过检测
            $res['data']['res'] = success;
            $_SESSION['jct'] = $jct;
            $_SESSION['expiretime'] = time();
        }
    }
    echo json_encode($res);*/