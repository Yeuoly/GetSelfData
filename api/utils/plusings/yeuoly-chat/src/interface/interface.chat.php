<?php
/**
 * Created by PhpStorm.
 * User: Yeuoly
 * Date: 2019/4/4
 * Time: 22:58
 */

/**
 *  This is a chat plusing for Yeuoly-Environment
 *  Yeuoly-Evironment is a Internet platform created by Yeuoly
 *  You can use it for any Yeuoly-Environment's platform
 *  Not Only Yeuoly-Envionment , but also some private website
 *  You can use this class to create your private chat platform
 *  This class offers some interfaces like "userSend"
 *  You can use it to insert a chatting log to your database
 *  We also support userID verify , it's a hook , you can define your
 *  custome verify function
 */


/**
 * Begin
 */

/**
 * import nesscessary class or struct
 * */
include_once (dirname(__FILE__) . "/../class/class.user.php");

interface _YeuolyChat{

    /**
     * Construct a new Object
     * @param integer $user every YeuolyChat-Object should have its controller You should tell who is he
     * @return _YeuolyChat an new Object
     */
    public function __construct($user);

    /**
     * Send a message to a user
     * @param YeuolyChatUser $to  A message should have its destination
     * @param string $message the main text of a message
     * @return boolean if succeed , it will return true
     * */
    public function sendMessageTo($to,$message);

    /**
     * Get User's recent chating log
     * @return array it will return a list including user's recent chating log
     * */
    public function getRecentChatingLog();

    /**
     * Get User's recent chating log with someone
     * @param YeuolyChatUser $user the user I chat with
     * @return array a list of the chating log
     * */
    public function getRecentChatingLogWithSb($user);
}