export let BaseUrl = {
    "localhost":{
        "api" : "http://localhost:100/website/pif_mana/api/",
        "web" : "http://localhost:8080/",
        "img" : "http://localhost:100/website/pif_mana/img/"
    },
    "remoteserver" : {
        "api" : "https://api.ylday.srmxy.cn/",
        "web" : "https://ylday.srmxy.cn/",
        "img" : "https://img.srmxy.cn/ylday/"
    },
    "defaultAvatar" :{
        get(index){
            if(typeof index !== 'number'){
                index = parseInt(Math.random() * 5);
            }
            return this.src[index]
        },
        src : [
            'https://t1.picb.cc/uploads/2019/04/12/VLyv4v.jpg',
            'https://t1.picb.cc/uploads/2019/04/12/VLyWAa.jpg',
            'https://t1.picb.cc/uploads/2019/04/12/VLyhJD.jpg',
            'https://t1.picb.cc/uploads/2019/04/12/VLyqFu.jpg',
            'https://t1.picb.cc/uploads/2019/04/12/VLyOwd.jpg'
        ]
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
        document.location.origin + '/' === BaseUrl.localhost['web']
        ? BaseUrl.localhost
        : BaseUrl.remoteserver
};

export {
    InfoModule
}