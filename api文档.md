#GetSelfData网站API文档
##所有API的返回数据均为json字符串，格式为:
>	‘msg’ => ‘服务器对于请求的总反馈（成功与否）’

>	‘data’ => ‘关于这个请求的具体数据（json）’

###一．	操作类：
1. 	oprate.php (需要cookie:srm_jct)用于对表内数据进行操作
>表单：

>		query:		指令

>返回数据：

>		error:		错误原因

###二．	登录类：
* 	User.php(需要cookie:srm_jct)用于检测用户的登录状态，获取用户基础信息
>表单：

>		无

>返回数据：

>		res：		检测结果结果，666 或者 -250
>		data :
>       login_time  登录时间
>       srm_jct     登录标识
>       user_class  账号权限
>       user_email  邮箱地址
>       user_exp    账号经验
>       user_id     用户名
>       user_lv     用户等级
>       user_uid    用户uid
     


*	login.php 用于用户登录
>表单：
>
>		act:			账号，account
>		pswd:		密码，password
>		tim:			时间戳，time
>		rnd：		随机数，暂时未用到随机数加密

>返回数据：
>
>		res:			登录结果 成功返回666 失败返回失败原因;


*	register.php 用于用户注册
表单：
>		act:			账号，account
>		pswd:		    密码，password
>		email:		    邮箱，email
>		tim:			时间戳，time
>		rnd:			随机数，暂时无用


###三．	数据类：
*	avatar.php(获取用户头像)
>表单：
>
>		act:			账号，account
>		tim:			时间，time

>返回数据：
>
>		Jpg图片


