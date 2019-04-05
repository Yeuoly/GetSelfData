<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/4/5
 * Time: 18:24
 */

include_once ("./utils/plusings/visit-counter/autoInclude.php");

$p = new VisitCounter("127.0.0.1","manausr","root","root");

$p->count();
$a = $p->get(3);

echo '<pre>';
print_r($a);
echo '</pre>';