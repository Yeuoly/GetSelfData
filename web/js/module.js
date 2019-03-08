var static_data = new NotForgetData();

function NotForgetData()
{
    this.m_URL_DOMAIN_API_DIR   = 0;
    this.m_URL_DOMAIN_WEB_DIR   = 1;
    this.m_URL_DOMAIN_IMG_DIR   = 2;
    this.m_ADD_BLOCK_TYPE_TABLE = 1;
    this.m_ADD_BLOCK_TYPE_URL   = 2;
    this.m_ADD_BLOCK_TYPE_PIC   = 3;
    this.response               = new Response();
    this.url                    = new Url();
    this.baseinfo               = new BaseInfo();
    this.userblock              = new UserBlock();

    function UserBlock()
    {
        this.m_MAX_MENU_LEFT           = 0;
        this.m_MIN_MENU_LEFT           = -300;
        this.m_MENU_WIDTH              = 300;
        this.m_MAX_BLACK_COVER_OPACITY = 0.5;
        this.m_MIN_BLACK_COVER_OPACITY = 0;
    }

    function BaseInfo()
    {
        this.m_COPYRIGHT            = "© 2019 - Yeuoly";
        this.m_WEB_TITLE            = "YeuolyBlog";
        this.m_WLECOME_SAYING       = "欢迎回来!";
        this.m_VERIFICATION_SUCCESS = "验证码已发送（可能在您邮箱的垃圾箱里orz)";
        this.m_DEFAULT_USER_INFO    = {
            user_id: '未登录，点击登录',
            user_uid: '-1',
            user_email: 'example@google.com',
            user_lv: '0',
            user_exp: '0',
            user_class: '',
            avatar: '',
            srm_jct: '',
            login_time: '0',
            online: false
        };
        this.img_404 = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549907902647&di=2a7c027baeaa4e7519e50f6a780acf1a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01565959e6bcfda80121bea5beef4c.jpg%401280w_1l_2o_100sh.jpg';
    }
    
    function Url()
    {
        this.m_URL_DOMAIN_API       = "http://localhost:100/website/pif_mana/api/";
        this.m_URL_DOMAIN_WEB       = "http://localhost:100/website/pif_mana/web/";
        this.m_URL_DOMAIN_IMG       = "http://localhost:100/website/pif_mana/img/";
    }

    function Response()
    {
        this.requestSuccess = 666;
        this.requestFail = -250;
        this.login = new Login();
        this.passjct = new PassJct();
        this.register = new Register();
        this.requestVerification = new RequestVerification();
        function Login()
        {
            this.success = 666;
            this.failed  = -250;
        }
        function PassJct()
        {
            this.failed = -250;
            this.success = 666;
        }
        function RequestVerification()
        {
            this.success = 666;
            this.failed = -250;
        }
        function Register()
        {
            this.success = 666;
            this.failed = -250;
        }
        function getData()
        {
            this.success = 666;
            this.failed = -250;
        }
    }

    this.getUrlPath = function (path,dtn)
    {
        switch(dtn)
        {
        case this.dir_api:
            return this.url.m_URL_DOMAIN_API + path;
        case this.dir_web:
            return this.url.m_URL_DOMAIN_WEB + path;
        case this.dir_img:
            return this.url.m_URL_DOMAIN_IMG + path;
        }
    }
    
    this.getWebTitle = function(){
        return this.baseinfo.m_WEB_TITLE;
    }
    this.getWelcomeSaying = function(){
        return this.baseinfo.m_WLECOME_SAYING;
    }
}