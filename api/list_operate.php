<?php

    //import necessary file
    include_once("./constant/config.php");
    //import post data
    $client_post_db_list  = @$_POST['db_list'];
    $client_post_method   = @$_POST['method'];
    $client_post_srm_jct  = @$_POST['srm_jct'];
    $client_post_time     = @$_POST['tim'];
    $client_post_rnd      = @$_POST['rnd'];
    //create response json
    $response = array(
        'msg'  => constant('success'),
        'data' => array(
            'error' => '',
            'res'   => ''
            )
        );
    //verificate post data
    if(!$client_post_db_list || !$client_post_method || !$client_post_rnd || !$client_post_srm_jct || !$client_post_time){
        $response['data']['error'] = constant('list_operate_wrongformat');
        $response['data']['res']   = constant('list_operate_failed');
        exit(json_encode($response));
    }