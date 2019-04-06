<?php
/**
 * Created by PhpStorm.
 * User: Yeuoly
 * Date: 2019/4/5
 * Time: 17:43
 */

include_once (dirname(__FILE__) . "/../interface/interface.main.php");
include_once (dirname(__FILE__) . "/../_config/_config.php");

class VisitCounter implements _VisitCounter{
    public function __construct($host,$DBName,$name,$pswd)
    {
        $this->DBHost = $host;
        $this->DBName = $DBName;
        $this->DBUser = $name;
        $this->DBPswd = $pswd;
    }

    /**
     * The DB info of the main database
     */
    private $DBHost;
    private $DBName;
    private $DBUser;
    private $DBPswd;

    /**
     * If there's not a list named and "yl_counter_pv"
     * This function will be asked
     */
    public function createCounterList(){
        $con = mysqli_connect($this->DBHost,$this->DBUser,$this->DBPswd,$this->DBName);
        if(!$con)
            return false;
        $sql = "CREATE TABLE `".$this->DBName."`.`"._count_list_name."`  (
                  `begin_time` int(0) NOT NULL,
                  `count` int(0) NOT NULL,
                  `order` int(0) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
                  PRIMARY KEY (`order`)
                );";
        if(!mysqli_query($con,$sql))
            return false;
        return true;
    }

    /**
     * This function will increase the num of counting
     */
    protected function increase(){

        //get current time
        $time = time();
        //comput the section of currention
        $begin_time = $this->getBeginTime($time);
        //connect to database
        $con = mysqli_connect($this->DBHost,$this->DBUser,$this->DBPswd,$this->DBName);
        if(!$con)
            return false;
        $sql = "SELECT * FROM "._count_list_name." ORDER BY `order` DESC LIMIT 1";
        $res = null;
        if(!$res = mysqli_query($con,$sql)){
            return false;
        }
        $res = mysqli_fetch_array($res);
        if(!$res){
            $sql = "INSERT INTO "._count_list_name." (begin_time,count) VALUES ($begin_time,1)";
            if(!mysqli_query($con,$sql)){
                return false;
            }
        }else{
            if($res['begin_time'] == $begin_time){
                $sql = "UPDATE "._count_list_name." SET count = count + 1 WHERE begin_time = $begin_time";
                if(!mysqli_query($con,$sql)){
                    return false;
                }
            }else{
                $sql = "INSERT INTO "._count_list_name." (begin_time,count) VALUES ($begin_time,1)";
                if(!mysqli_query($con,$sql)){
                    return false;
                }
            }
        }
        return true;
    }

    protected function getBeginTime($timstamp){
        return $timstamp - $timstamp % interval - 28800;
    }

    public function count()
    {
        return $this->increase();
    }

    public function get($count)
    {
        $con = mysqli_connect($this->DBHost,$this->DBUser,$this->DBPswd,$this->DBName);
        if(!$con)
            return false;
        $sql = "SELECT * FROM "._count_list_name." ORDER BY `order` DESC LIMIT 0 , $count";
        $res = null;
        if(!$res = mysqli_query($con,$sql)){
            return false;
        }
        $dist = [
            'interval' => interval
        ];
        //sign current begin_time
        $l = -1;
        $time = time();
        $current_time = $this->getBeginTime($time);
        while ($row = mysqli_fetch_array($res)){
            while ($l++ < $count){
                $buf = [
                    'begin_time' => $current_time - $l * interval,
                    'count' => 0
                ];
                if($buf['begin_time'] == $row['begin_time']){
                    $buf['count'] = $row['count'];
                    array_push($dist,$buf);
                    break;
                }
                array_push($dist,$buf);
            }
        }
        $n = count($dist) - 1;
        while ($n < $count)
        {
            array_push($dist,['begin_time' => $current_time - $n * interval, 'count' => 0]);
            $n++;
        }
        return $dist;
    }
}