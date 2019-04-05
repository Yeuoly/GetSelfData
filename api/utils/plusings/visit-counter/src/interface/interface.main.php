<?php
/**
 * Created by PhpStorm.
 * User: Yeuoly
 * Date: 2019/4/5
 * Time: 17:30
 */

/**
 * Yeuoly-Environment-Visit-Counter is used for count the PV of your website
 */

/**
 * begin
 */
interface _VisitCounter{
    /**
     * We will create two lists in your website's db ,
     * so you should tell us what's your database name
     * the list name will be "yl_counter_pv" and "yl_counter_config"
     * @param string $host MySQL host
     * @param string $DBName The DataBase name of your website
     * @param string $name MySQL UserName
     * @param string $pswd MySQL UserPassword
     */
    public function __construct($host,$DBName,$name,$pswd);

    /**
     * @return mixed
     */
    public function createCounterList();

    /**
     * This function is used to increase the num of counting
     */
    public function count();

    /**
     * This function is used to get recent data
     * @param integer $count
     * @return boolean success or not
     */
    public function get($count);
}