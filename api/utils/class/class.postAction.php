<?php
/**
 * Created by PhpStorm.
 * User: Yeuoly SRM_XY
 * Date: 2019/2/2
 * Time: 22:27
 *
 * 这是两个个用来操作post的类
 *
 */

include_once (dirname(__FILE__) . "/../../Config.php");
include_once (FILEPATH . "/utils/class/class.db_controller.php");
include_once (FILEPATH . "/utils/class/class.base.php");

//公共查询用的类
class publicPostAction extends Base
{
    //必须要的数据库
    protected $DB;
    //连接数据库
    protected function ConnectDB(){

    }
}

//私人查询用的类
class privatePostAction extends publicPostAction{
    //用户参数，总所周知每个post肯定多有发这个post的人对叭
    protected $userID , $userUID;

    //这个类的构造器，用户id与uid是基本参数
    public function __construct($userID,$userUID){
        $this->userID = $userID;
        $this->userUID = $userUID;
    }

    //获取用户最近的post，返回数据为一个最长为5，最短为0的数组，其中包含了用户post的数据或表格名
    //数组的每个元素中会有一个post_type参数，若此参数为list，则根据该元素中的data去查询对应的表，然后使用表中的数据替换掉data
    //若此参数为pictrue，则data是它的网页地址，就交给前端处理了
    public function getRecent($page){

    }
}

