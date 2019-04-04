<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/4/5
 * Time: 1:49
 */

include_once(dirname(__FILE__)."/../interface/interface.user.php");

class YeuolyChatUser implements _YeuolyChatUser{
    private $userID;
    private $userUID;
    private $userEmail;
    private $userLevel;
    private $userPower;

    public function __construct($userID, $userUID, $userEmail, $userLevel, $userPower)
    {
        $this->userID = $userID;
        $this->userUID = $userUID;
        $this->userEmail = $userEmail;
        $this->userLevel = $userLevel;
        $this->userPower = $userPower;
    }

    public function getUserID()
    {
        // TODO: Implement getUserID() method.
        return $this->userID;
    }

    public function getUserUID()
    {
        // TODO: Implement getUserUID() method.
        return $this->userUID;
    }

    public function getUserEmail()
    {
        // TODO: Implement getUserEmail() method.
        return $this->userEmail
    }

    public function getUserLevel()
    {
        // TODO: Implement getUserLevel() method.
        return $this->userLevel;
    }

    public function getUserPower()
    {
        // TODO: Implement getUserPower() method.
        return $this->userPower;
    }
}