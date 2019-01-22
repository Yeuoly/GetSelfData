<?php
    include("utils/functions.php");
    include_once("./utils/class.encryption.php");
    //获取请求form
    $queue_head = @$_POST['queue_h'];
    $queue_len  = @$_POST['queue_l'];
    $jct        = @$_POST['srm_jct'];
    $tim        = @$_POST['tim'];
    $rnd        = @$_POST['rnd'];
    $db_list    = SRMencode::encode(@$_POST['list'],constant('offset_dblist'));
    
    //初始化数据
    $res = array(                                   //输出json
        'msg' => '',
        'data' => array(
            'res' => '',
            'data' => array()
        )
    );

    $res['msg'] = constant('success');
    $time = time();                                 //时间戳
    $con = null;                                    //数据库链接

    //验证身份
    $usr_info = null;
    if(!$jct || strlen($jct)!=32 || !preg_match("/^[a-zA-Z0-9\s]+$/",$jct) ||
        !($time >= $tim && $tim >= $time - 2) || !$queue_head || !$queue_len ||
        $queue_len > 5 || !$rnd ||  !$db_list)
    {                                                                                   //检查表单数据是否满足要求
        $res['data']['res'] = constant('passport_wrong_format');
    }elseif(!$usr_info = GetUsrInfo($jct,true,"jct")){                                  //获取用户信息，检测用户是否登录
        $res['data']['res'] = constant('passport_jct_offline');
    }else{                                                                              //获取表内数据      
        $root = json_decode(constant("mysql_account_root"));                            //获取数据库管理员账户
        $con = mysqli_connect("127.0.0.1",$root[0],$root[1]);                           //连接数据库
        if(!$con || !mysqli_select_db($con,constant("mysqli_db_manausr")))
        {
            $res['data']['res'] = constant('failed_query');
        }else{
            $list = mysqli_query($con,"SELECT * FROM ".$usr_info['act']."_$db_list");   //连接表
            if(!$list)
            {
                $res['data']['res'] = constant('failed_query');
            }else{
                $row = mysqli_fetch_array($list);
                $col_num = count($row);
                do{
                    $buf_ary = array();                                                 //构建次级字典
                    foreach($row as $key => $val)
                        if(!is_int($key))
                            $buf_ary=array_merge($buf_ary,array($key => $val));         //填充次级词典
                    array_push($res['data']['data'],$buf_ary);                          //将次级字典push进主词典
                }while($row = mysqli_fetch_array($list));                         
            }
        }
    }
    exit(json_encode($res));