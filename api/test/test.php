<?php
    include_once (dirname(__FILE__) . "/../utils/class/class.postAction.php");

    $V = new privatePostAction('nuozuomi','1');
    $res = $V->getRecent(1);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);