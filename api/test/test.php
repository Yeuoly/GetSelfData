<?php
/*
class HookFunc{
    public function __construct()
    {

    }

    //缓存钩子
    protected $hookList = [

    ];

    //注册添加钩子
    public function add($func , $params){
        array_push($this->hookList,[
            'func' => $func,
            'params' => $params
        ]);
    }

    //运行钩子
    public function run(){
        foreach ($this->hookList as $k => $v)
        {
            call_user_func($this->hookList[$k]['func'] , $this->hookList[$k]['params']);
        }
    }
}


class B{
    private $Hook;

    public function __construct()
    {
        $this->Hook = new HookFunc();
    }

    public function addHook($func,$parmas)
    {
        $this->Hook->add($func,$parmas);
    }

    public function mainInstance()
    {
        $this->Hook->run();
    }
}

function sayHello($p)
{
    echo "[$p] hello wolrd";
}

$C = new B();
$C->addHook('sayHello','I');
$C->mainInstance();

$D = new B();
$D->addHook('sayHello','You');
$D->mainInstance();

$C->mainInstance();*/