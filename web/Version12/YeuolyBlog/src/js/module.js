let BaseModule = {
    m_URL_DOMAIN_API_DIR : 0,
    m_URL_DOMAIN_WEB_DIR   : 1,
    m_URL_DOMAIN_IMG_DIR   : 2,
    m_ADD_BLOCK_TYPE_TABLE : 1,
    m_ADD_BLOCK_TYPE_URL   : 2,
    m_ADD_BLOCK_TYPE_PIC   : 3,
    response : {
        requestSuccess : 666,
        requestFail : -250
    },
    getUrlPath (path,dtn)
    {
        switch(dtn)
        {
            case BaseModule.m_URL_DOMAIN_API_DIR:
                return BaseModule.url.m_URL_DOMAIN_API + path;
            case BaseModule.m_URL_DOMAIN_WEB_DIR:
                return BaseModule.url.m_URL_DOMAIN_WEB + path;
            case BaseModule.m_URL_DOMAIN_IMG_DIR:
                return BaseModule.url.m_URL_DOMAIN_IMG + path;
        }
    },
    baseinfo : {
        m_COPYRIGHT            : "© 2019 - Yeuoly",
        m_WEB_TITLE            : "YeuolyBlog",
        m_WELCOME_SAYING       : "欢迎回来!",
        m_VERIFICATION_SUCCESS : "验证码已发送（可能在您邮箱的垃圾箱里orz)",
        m_DEFAULT_USER_INFO    : {
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
        }
    },
    url : {
        m_URL_DOMAIN_API       : "http://localhost:100/website/pif_mana/api/",
        m_URL_DOMAIN_WEB       : "http://localhost:8080/",
        m_URL_DOMAIN_IMG       : "http://localhost:100/website/pif_mana/img/"
    },

    getWebTitle : () => {
        return BaseModule.baseinfo.m_WEB_TITLE;
    },
    getWelcomeSaying : () => {
        return BaseModule.baseinfo.m_WELCOME_SAYING;
    }
};

export {
    BaseModule
}
