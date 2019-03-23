let BaseModule = {
    dir_api : 0,
    dir_web : 1,
    dir_img : 2,
    response : {
        requestSuccess : 666,
        requestFail : -250
    },
    getUrlPath (path,dtn)
    {
        switch(dtn)
        {
            case BaseModule.dir_api:
                return BaseModule.url.m_URL_DOMAIN_API + path;
            case BaseModule.dir_web:
                return BaseModule.url.m_URL_DOMAIN_WEB + path;
            case BaseModule.dir_img:
                return BaseModule.url.m_URL_DOMAIN_IMG + path;
        }
    },
    BaseInfo : {
        m_COPYRIGHT            : "© 2019 - Yeuoly",
    },
    url : {
        m_URL_DOMAIN_API       : "http://localhost:100/website/pif_mana/api/",
        m_URL_DOMAIN_WEB       : "http:8080/",
        m_URL_DOMAIN_IMG       : "http://localhost:100/website/pif_mana/img/"
    },
};

export {
    BaseModule
}
