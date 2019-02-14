<?php
    /**
     * Created by PhpStorm.
     * User: Yueoly SRM_XY
     * Date: 2019/1/11
     * Time: 22:01
     */
    include_once(dirname(__FILE__) . "/class.Base.php");


    class DB_Controller extends Base
    {
        const unexist_data = -2;        //不存在数据
        const server_error = false;     //服务器大姨妈了

        private $root = "";             //sql root              数据库用户名
        private $pswd = "";             //sql password          数据库密码
        private $host = "";             //sql host link         数据库链接
        private $db_name = "";          //sql database name     数据库名
        private $con  = null;           //sql connection        数据库链接handle
        private $con_sign = false;      //sign for connection   连上数据库的标识

        /*
         * 初始化数据操作类
         * */
        public function __construct($host,$root,$password,$dbname){
            $this->Init($host,$root,$password,$dbname);
        }

        public function Init($host, $root, $password, $dbname){
            $this->host = $host;
            $this->pswd = $password;
            $this->root = $root;
            $this->db_name = $dbname;
            return $this;
        }

        /*
         * 连接数据库，开始查询
         * */
        public function Start(){
            $this->con = mysqli_connect($this->host,$this->root,$this->pswd);   //链接mysql
            if(!$this->con)return false;                                        //连上，将连接标识赋为true
            $this->con_sign = true;                                             //打开数据库
            if(!mysqli_select_db($this->con,$this->db_name)) {                  //失败，关闭mysql
                $this->end();
                return false;
            }

            return $this;
        }

        /*
         * 断开连接
         * */
        public function End(){                                                  //关闭mysql
            if($this->con_sign)
            {
                mysqli_close($this->con);
                $this->con_sign = false;
            }
        }

        /*
         * 从表中获取一行数据，若存在多行满足条件的数据，返回第一行，将总行数保存在rows中
         * datalist为数据key值加value值组成的字典eg:
         * { { 'key' : 'id' , 'value' : 'root' } , { 'key' : 'password' , 'value' : 'helloworld' } }
         * sign表示‘且’或‘或’
         * ‘或’表示只要这个dalist的第一数据满足条件就返回，‘且’表示要同时满足才返回
         * 查询过程发送错误返回false
         * 无目标数据返回-2
         * 成功返回目标数据的字典
         * */

        public function GetRowFromList($list, $datalist, $sign = "or",&$rows = 0){
            if(!$this->con_sign)return false;                                   //需要先连接数据库再查询

            $sql = "SELECT * FROM $list";
            $full_list = mysqli_query($this->con,$sql);                         //查询全表
            if(!$full_list)
            {
                return self::server_error;                                      //错误则返回false
            }
            $row = mysqli_fetch_array($full_list);                              //判断键值是否存在，不存在返回false
            foreach ($datalist as $key => $val)
            {
                if(!isset($row[$key]) && $row != null)
                {
                    return self::server_error;
                }
            }
            $rows = mysqli_num_rows($full_list);                                //获取表行数
            switch ($sign)
            {
                case 'or':
                    do{
                        /* if($row[$key] == $val) return $row;                   //返回目标字段*/
                        foreach ($datalist as $key => $val)                      //开始对比查找
                        {
                            if($row[$key] == $val)
                            {
                                return $row;
                            }
                        }
                    }while($row = mysqli_fetch_array($full_list));
                    break;
                case 'and':
                    $size_datalist = count($datalist);                                  //需要对比的次数
                    do{
                        /* if($row[$key] == $val) return $row;                          //返回目标字段*/
                        $found_times = 0;
                        foreach ($datalist as $key => $val)                              //开始对比查找
                        {
                            if($row[$key] == $val)
                            {
                                return $row;
                            }
                        }
                        if($found_times == $size_datalist)                              //如果匹配次数和datalist长度相同则返回字段
                        {
                            return $row;
                        }
                    }while($row = mysqli_fetch_array($full_list));
                    break;
            }
            /*if(!isset($row[$key]))return false;*/
            return self::unexist_data;                                                  //无数据
        }

        /*
         * 更改表中一个数据
         * 失败返回原因
         * 成功返回true
         * */
        public function SetInList($list,$key,$val,$original_key,$originnal_val){
            if(!$this->con_sign)return false;                                   //需要先连接数据库再查询
            $sql = "UPDATE $list SET $key='$val' WHERE $original_key='$originnal_val'";
            if(!mysqli_query($this->con,$sql))
            {
                return passport_server_error;
            }
            return true;
        }

        /*
         * 向数据库里插入一行数据，传入参数为一个字典，key与val相对应
         * 错误返回server_error，成功返回true
         *
         * */
        public function InsertIntoList($list,$datalist){
            if(!$this->con_sign)return false;                                   //需要先连接数据库再查询
            $keys = "";
            $vals = "";
            foreach ($datalist as $key => $val)
            {
                if(is_string($val))
                {
                    $vals .= "'$val',";
                }else {
                    $vals .= $val.",";
                }
                $keys .= "`".$key."`,";
            }
            $vals = substr($vals,0,strlen($vals)-1);
            $keys = substr($keys,0,strlen($keys)-1);
            $sql = "INSERT INTO $list ($keys) VALUES ($vals)";
            if(!mysqli_query($this->con,$sql))
            {
                return passport_server_error;
            }
            return true;
        }

        /*
         * 自定义sql语句，就是一个query，直接返回就完事了
         *
         * */
        public function Query($sql){
            if(!$this->con_sign)return false;                                   //需要先连接数据库再查询
            return mysqli_query($this->con, $sql);
        }

        /*
         * 输出全表的字典
         *
         * */
        public function GetWholeList($list){
            if(!$this->con_sign)return false;                                   //需要先连接数据库再查询
            //保存DBCon的返回数据
            $result = null;
            //表格的临时缓存
            $ary_buf = null;
            $result = mysqli_query($this->con,"SELECT * FROM $list");
            if(!$result)
            {
                return server_error;
            }
            $first_dist = array();
            while ($row = mysqli_fetch_array($result))
            {
                $second_dist = array();
                foreach ($row as $key => $val)
                {
                    if(!is_int($key))
                    {
                        $second_dist = array_merge($second_dist , array($key => $val));
                    }
                }
                array_push($first_dist , $second_dist);
            }
            return $first_dist;
        }

        /*
         * 获取表的后面几行内容
         * 具体行数由参数limit决定，起始点由参数start决定
         *
         * */
        public function GetLastFewData($list,$start,$limit){
            if(!$this->con_sign)return false;                                   //需要先连接数据库再查询
            $sql = "SELECT * FROM $list ORDER BY `post_order` DESC LIMIT $start,$limit";
            $res = mysqli_query($this->con,$sql);
            if(!$res)
            {
                return server_error;
            }
            $ary_buf = array();
            while ($row = mysqli_fetch_array($res))
            {
                array_push($ary_buf,$row);
            }
            return $ary_buf;
        }

        /*
         * 删除表内的一行
         *
         * */
        public function DeleteRowFromList($list,$key,$val){
            if(!$this->con_sign)return false;                                   //需要先连接数据库再查询
            $sql = "DELETE FROM $list WHERE $key = ";
            if(is_string($val))
                $sql .= "'$val'";
            else
                $sql .= $val;
            $res = mysqli_query($this->con,$sql);
            if(!$res)return server_error;
            return true;
        }
    }