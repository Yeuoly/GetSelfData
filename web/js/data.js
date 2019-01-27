const static_data = new NotForgetData();

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
        this.m_MENU_WIDTH              = 300;
        this.m_MAX_BLACK_COVER_OPACITY = 0.5;
    }

    function BaseInfo()
    {
        this.m_WEB_TITLE            = "NotForget";
        this.m_WLECOME_SAYING       = "欢迎回来!";
        this.m_VERIFICATION_SUCCESS = "验证码已发送（可能在您邮箱的垃圾箱里orz)";
    }
    
    function Url()
    {
        this.m_URL_DOMAIN_API       = "http://localhost:100/website/pif_mana/api/";
        this.m_URL_DOMAIN_WEB       = "http://localhost:100/website/pif_mana/web/";
        this.m_URL_DOMAIN_IMG       = "http://localhost:100/website/pif_mana/img/";
    }

    function Response()
    {
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
    }

    this.getUrlPath = function (path,dtn)
    {
        switch(dtn)
        {
        case this.m_URL_DOMAIN_API_DIR:
            return this.url.m_URL_DOMAIN_API + path;
        case this.m_URL_DOMAIN_WEB_DIR:
            return this.url.m_URL_DOMAIN_WEB + path;
        case this.m_URL_DOMAIN_IMG_DIR:
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