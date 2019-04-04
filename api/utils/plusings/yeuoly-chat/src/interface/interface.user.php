<?php
/**
 * Created by PhpStorm.
 * User: Yeuoly
 * Date: 2019/4/5
 * Time: 1:40
 */

/**
 * This interface is for class-user
 */

interface _YeuolyChatUser{
    /**
     * @param string user's name
     * @param integer user's own sign
     * @param string user's email
     * @param integer user's level , it's not very useful , use it to get some extra function
     * @param integer user's power , There's something a user can do , and something couldn't do
     * */
    public function __construct($userID,$userUID,$userEmail,$userLevel,$userPower);

    /**
     * those following functions is used to get User's component
     * */

    public function getUserID();

    public function getUserUID();

    public function getUserEmail();

    public function getUserLevel();

    public function getUserPower();
}