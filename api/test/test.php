<?php
    include_once (dirname(__FILE__) . "/../utils/class/class.postAction.php");

    $V = new publicPostAction();
    $res = $V->getDataByHashID('aaaa');
    echo json_encode($res,JSON_UNESCAPED_UNICODE);