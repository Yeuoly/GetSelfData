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
    //hash表前缀
    const hashListHead = "hash_data_";
    //连接数据库
    //返回一个DBcontroller对象
    protected function GetBDCon(){
        $DB = new DB_Controller(MYSQL_DB_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DBNAME);
        //如果连接失败就返回false
        if($DB->_is_failed($DB->Start()))
        {
            return false;
        }
        return $DB;
    }
    //通过hashID获取数据
    //返回值是一个字典，键值为
    //type(这则post的类型) , title(这则post的标题) , about(关于这则post) , userID(谁发的) ,
    //userUID(发的人的UID) , postID(每则post都有自己专属的编号) , data(数据本体了)
    public function getDataByHashID($hashID , $DBCon = null){
        //三段运算符获取DBCon对象
        $DB = $DBCon ? $DBCon : $this->GetBDCon();
        if(!$DB)
        {
            return failed_query;
        }
        //获取hash表名
        $list_name = self::hashListHead.$hashID[0];
        //通过hashID获取data数据
        $result = $DB->GetRowFromList($list_name,array('hashID' => $hashID),'or');
        if($DB->_is_failed($result))
        {
            return failed_query;
        }
        //用于缓存post数据
        $dataDist = array(
            'type'  => $result['type'],
            'title' => $result['title'],
            'about' => $result['about'],
            'userID' => $result['userID'],
            'userUID' => $result['userUID'],
            'postID' => $result['hashID'],
            'data' => null
        );
        switch ($result['type'])
        {
            case 'list':
                $dataDist['data'] = $this->fromListToJson($result['data']);
                break;
            default:
                $dataDist['data'];
        }
        return $dataDist;
    }

    //将一个表的数据转换成json
    //返回一个json数据（php对象）
    protected function fromListToJson($listID , $DBCon = null){
        $DB = $DBCon ? $DBCon : $this->GetBDCon();
        if(!$DB)
        {
            return failed_query;
        }
        $list = $DB->GetWholeList($listID);
        return $list;
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

    //获取用户最近的post，返回数据为一个最长为5，最短为0的数组，其中包含了用户post的数据的表名或表格名
    //数组的每个元素中会有一个post_type参数，若此参数为list，则根据该元素中的data去查询对应的表，然后使用表中的数据替换掉data
    //若此参数为pictrue，则data是它的网页地址，就交给前端处理了
    //详情看主目录里的/guide/YeuolyBlog数据库查询思维导图.jpg
    //这里约定一个数据结构：
    //index : type , hashID
    public function getRecent($page){

    }
}

