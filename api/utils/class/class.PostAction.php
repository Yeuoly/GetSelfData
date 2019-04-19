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
include_once(FILEPATH . "/utils/class/class.DBController.php");
include_once(FILEPATH . "/utils/class/class.Base.php");

//公共查询用的类
class publicPostAction extends Base
{
    //hash表前缀
    protected $hashListHead = "hash_data_";
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
    public function getDataByHashID($hashID , $lastDataDist = '', $DBCon = null ){
        //三段运算符获取DBCon对象
        $DB = $DBCon ? $DBCon : $this->GetBDCon();
        if($this->_is_failed($DB))
        {
            return server_error;
        }
        //获取hash表名
        $list_name = $this->hashListHead.$hashID[0];
        //通过hashID获取data数据
        $result = $DB->GetRowFromList($list_name,['postID' => $hashID],'or');
        if($DB->_is_failed($result))
        {
            switch ($result){
                case -2:
                    return data_action_unexist_data;
                default:
                    return server_error;
            }
        }
        //用于缓存post数据
        $dataDist = $lastDataDist ? $lastDataDist : [
            'title' => $result['title'],
            'about' => $result['about'],
            'userID' => $result['userID'],
            'userUID' => $result['userUID'],
            'postID' => $result['postID'],
            'data' => '',
            'isOver' => $result['isOver']
        ];

        //更新字典数据
        //$dataDist['data'] .= $this->fromListToJson($result['data']);
        $dataDist['data'] .= $result['data'];

        if($result['isOver'] == 'true')
        {
            return [
                'post_title' => $dataDist['title'],
                'post_about' => $dataDist['about'],
                'post_userID' => $dataDist['userID'],
                'post_userUID' => $dataDist['userUID'],
                'post_data' => $dataDist['data'],
                'post_ID' => $dataDist['postID']
            ];
        }
        return $this->getDataByHashID($result['isOver'],$dataDist,$DB);
    }

    //将一个表的数据转换成json
    //返回一个json数据（php对象）
    protected function fromListToJson($listID , $DBCon = null){
        $DB = $DBCon ? $DBCon : $this->GetBDCon();
        if(!$DB)
        {
            return server_error;
        }
        $list = $DB->GetWholeList($listID);
        return $list;
    }

    /*
     * 删除一个post，直接用ID删
     *
     * */
    public function deletePost($postID , $DB = null)
    {
        $DB = $DB ? $DB : $this->GetBDCon();
        if($this->_is_failed($DB))
        {
            return server_error;
        }
        $post = $DB->GetRowFromList($this->hashListHead.$postID[0],[
            'postID' => $postID
        ]);
        if($DB->_is_failed($post))
        {
            return server_error;
        }
        $DB->DeleteRowFromList($this->hashListHead.$postID[0],'postID',$postID);
        if($DB->_is_failed($post))
        {
            return server_error;
        }
        if($post['isOver'] != 'true')
            return $this->deletePost($postID['isOver'] , $DB);
        else
            return true;
    }

    /*
     * 为了避免递归函数一些判断造成的传参数炸裂，就给外面套层壳
     *
     * */
    public function modifyPost($postID,$post_title,$post_about,$post_data)
    {
        return $this->_modifyPost($postID,$post_title,$post_about,$post_data);
    }

    /*
     * 修改一个post，除了ID和日期以外其他的基本都要覆盖掉
     *
     * */
    protected function _modifyPost($postID,$post_title,$post_about,$post_data,$DB = null,$pos = 1)
    {
        //这句话说实话很烦，不能不加
        $DB = $DB ? $DB : $this->GetBDCon();
        $original_post = $DB->GetRowFromList($this->hashListHead.$postID[0],[
            'postID' => $postID
        ]);
        if($DB->_is_failed($original_post))
        {
            return server_error;
        }

        //验证用户身份,如果是私人修改请求，要求请求者的UID和POST内的USER_UID相对应的
        //如果是公共请求则需验证用户的权限，避免频繁判断，加了一个pos，只有第一次的时候才会判断
        if($pos == 1)
        {
            if((static::class == 'privatePostAction' && $original_post['userUID'] != strval($GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_UID]))||
                (static::class == 'publicPostAction' && $GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_CLASS] != 2))
            {
                return data_action_less_power;
            }
        }

        $isOver = $original_post['isOver'];
        if($post_data == '')
        {
            $DB->DeleteRowFromList($this->hashListHead.$postID[0] , 'postID',$postID);
        }else{
            $post_data_now = substr($post_data,0,1024);
            //这是给下面修改信息用的对应表
            $array_ready_modify = [
                'title' => $post_title ,
                'about' => $post_about ,
                'data' => $post_data_now
            ];
            foreach ($array_ready_modify as $key => $val)
            {
                $res = $DB->SetInList($this->hashListHead.$postID[0],$key,$val,'postID',$postID);
                if($DB->_is_failed($res))
                {
                    return server_error;
                }
            }
        }

        if($isOver != 'true')
        {
            $post_data_next = null;
            $post_data_len = strlen($post_data);
            if($post_data_len > 1024)
                $post_data_next = substr($post_data,1024,$post_data_len - 1024);
            else
                $post_data_next = '';
            return $this->_modifyPost($isOver, $post_title , $post_about , $post_data_next , $DB , $pos+1);
        }
        return true;
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
    public function getRecent($page){
        $DB = $this->GetBDCon();
        if($this->_is_failed($DB))
        {
            return server_error;
        }
        //小学数学计算查询表的起点和总查询长度
        $sql_fetch_start = ($page-1)*5;
        $sql_fetch_lenght = 5;
        //去用户的数据表里把我们要的数据的postID查出来
        $postIDList = $DB->GetLastFewData('user_self_hash_list_'.$this->userUID,$sql_fetch_start,$sql_fetch_lenght,'post_order');
        if($DB->_is_failed($postIDList) && !is_array($postIDList))
        {
            return server_error;
        }
        //缓存用户post数据
        $postList = [];

        foreach($postIDList as $postID)
        {
            $postData = $this->getDataByHashID($postID['postID'],null,$DB);
            //如果失败了的话，就直接把postData换成失败原因
            if(is_string($postData))
            {
                $postData = [
                    'post_ID' => $postID['postID'],
                    'post_title' => 'failed to get Data',
                    'post_about' => 'there is an error happened in sql server',
                    'post_userID' => '-404',
                    'post_userUID' => '-404',
                    'post_data' => $postData
                ];
            }
            array_push($postList,$postData);
        }
        return $postList;
    }

    public function newPost($post_title , $post_date , $post_data , $post_about){
        //生成post的hashID
        $DB = $this->GetBDCon();
        if($this->_is_failed($DB)){
            return server_error;
        }
        $data_lenght = mb_strlen($post_data);
        $times = 0;
        $postID = md5($post_title.$this->userID.time().$this->userUID.$post_date);
        $first_postID = $postID;
        while ($data_lenght > 0)
        {
            $post_data_department = mb_substr($post_data,$times * 1024 , 1024);
            $list_name = $this->hashListHead.$postID[0];
            $post_isOver = $data_lenght <= 1024 ? 'true' : md5($post_title.$this->userID.time().rand(0,999999).rand(0,999999));
            $res = $DB->InsertIntoList(
                $list_name,
                [
                    'title' => $post_title,
                    'about' => $post_about,
                    'userID' => $this->userID,
                    'userUID' => $this->userUID,
                    'postID' => $postID,
                    'data' => $post_data_department,
                    'isOver' => $post_isOver
                ]
            );
            if($DB->_is_failed($res))
                return server_error;
            $data_lenght -= 1024;
            $times++;
            $postID = $post_isOver;
        }
        $res = $DB->InsertIntoList(
            'user_self_hash_list_'.$this->userUID,
            [
                'postID' => $first_postID
            ]
        );
        if($DB->_is_failed($res))
            return server_error;
        return true;
    }

    /*
     * 删除一个post，只是里要多删一下用户数据库里的postID
     * */
    public function deletePost($postID , $DB = null){
        $DB = $DB ? $DB : $this->GetBDCon();
        if($this->_is_failed($DB))
        {
            return server_error;
        }
        $res = $DB->DeleteRowFromList('user_self_hash_list_'.$GLOBALS[GLOBAL_USERDATA][GLOBAL_USER_UID],'postID',$postID);
        if($DB->_is_failed($res))
        {
            return server_error;
        }
        return parent::deletePost($postID , $DB); // TODO: Change the autogenerated stub
    }

    public function FindPostByHashIDInMyList($postID,$DB = null){
        $DB = $DB ? $DB : $this->GetBDCon();
        if($this->_is_failed($DB))
        {
            return server_error;
        }
        $res = $DB->GetRowFromList('user_self_hash_list_'.$this->userUID,[mysql_key_postID => $postID]);
        if(!$res)return server_error;
        if($res == -2)return data_action_unexist_data;
        return $res;
    }
}