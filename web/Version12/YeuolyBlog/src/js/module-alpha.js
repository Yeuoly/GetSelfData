import axios from 'axios'


let url = {
    "localhost":{
        "api" : "http://localhost:100/website/pif_mana/api/",
        "web" : "http://localhost:8080/",
        "img" : "http://localhost:100/website/pif_mana/img/"
    },
    "remoteserver" : {
        "api" : "https://api.ylday.srmxy.cn/",
        "web" : "https://ylday.srmxy.cn/",
        "img" : "https://img.srmxy.cn/ylday/"
    }
};


let InfoModule = {
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
            case InfoModule.dir_api:
                return InfoModule.url.api + path;
            case InfoModule.dir_web:
                return InfoModule.url.web + path;
            case InfoModule.dir_img:
                return InfoModule.url.img + path;
        }
    },
    others : {
        copyright : "© 2019 - Yeuoly芸璃",
    },
    url :
        document.location.origin + '/' === url.localhost['web'] ?
        url.localhost :
        url.remoteserver
};

export {
    InfoModule
}