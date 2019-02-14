<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019/2/14
 * Time: 22:37
 */

class HookFunc{
    /*
     * 传这个钩子对象所在的父级对象进来
     *
     * */
    public function __construct($object)
    {
        $this->object = $object;
    }

    //缓存钩子
    protected $hookList = [

    ];

    //缓存
    protected $object = null;

    //注册添加钩子，params可以是数组也可以是普通的对象或者参数
    final public function add($func , $params){
        array_push($this->hookList,[
            'func' => $func,
            'params' => $params
        ]);
    }

    //运行钩子
    final public function run(){

        foreach ($this->hookList as $k => $v)
        {
            call_user_func([$this->object ,$this->hookList[$k]['func']] , $this->hookList[$k]['params']);
        }
    }
}