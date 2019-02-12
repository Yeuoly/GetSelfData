window.onload = function () {
    this.constDom = new InitWeb();
    mainHandle = this;

    this.constDom.functionGroup.bindUserOnloadNextTick(initEditor);

    function initEditor(){
        //创建编辑器的Vue构造器
        var editorConstructor = Vue.extend({
            template :
                '<div class="post-card">' +
                '   <div class="post-card-head">' +
                '       <h3 class="post-title">' +
                '           <input type="text" v-model="post.title">' +
                '       </h3>' +
                '   <div class="post-card-userblock">' +
                '       <div class="post-card-userblock-avatar"' +
                '       :style="{backgroundImage : \'url(  \' + post.avatar + \'  ) \'}"' +
                '       >' +
                '       </div>' +
                '       <div class="post-card-userblock-id">' +
                '           {{post.user_id}}' +
                '       </div>' +
                '   </div>' +
                '   <div class="post-introduction">' +
                '       <textarea v-model="post.about"></textarea>' +
                '   </div>' +
                '   </div>' +
                '   <div class="post-card-body">' +
                '       <ul class="post-card-body-ul">' +
                '           <li :id="bodyDep.liID" class="post-card-body-li" v-for="bodyDep in post.body">' +
                '               <div v-if="bodyDep.html === \'blog\'">' +
                '                   <div class="post-card-body-blog">' +
                '                       <input type="text" v-model="bodyDep.src"></input>' +
                '                   </div>' +
                '               </div>' +
                '               <table v-else-if="bodyDep.html === \'table\'" class="post-card-body-table">' +
                '                   <tr v-for="dep in bodyDep.src">' +
                '                       <td v-for="(value,key) in dep" :tdKey="key">' +
                '                           {{value}}' +
                '                       </td>' +
                '                   </tr>' +
                '               </table>' +
                '               <div v-else-if="bodyDep.html === \'picture\'" class="post-card-body-picture">' +
                '                   <img class="post-card-body-img" :src="bodyDep.src" :alt="postDefaultImg">' +
                '                   <input type="text" placeholder="填写图片链接地址" v-model.lazy="bodyDep.src">' +
                '               </div>' +
                '               <div v-else-if="bodyDep.html === \'url\'" class="post-card-body-url">' +
                '                   <input type="text" placeholder="填写链接地址" v-model="bodyDep.src">' +
                '                   <input type="text" placeholder="填写链接文字" v-model="bodyDep.about">' +
                '               </div>' +
                '               <div style="height: 10px;"></div>' +
                '               <label style="float: left;height: 25px;vertical-align: middle">类别：</label>' +
                '               <select style="float: left;height: 25px; outline: none" :name="bodyDep.liID" v-model="bodyDep.html">' +
                '                   <option value="blog">blog</option>' +
                '                   <option value="picture">picture</option>' +
                '                   <option value="url">url</option>' +
                '                   <option value="table">table</option>' +
                '               </select>' +
                '               <input type="button" @click="addNewBlock" value="添加一个新的编辑区块">' +
                '               <input type="button" @click="deleteBlock(bodyDep.liID)" value="删除这个区块">' +
                '           </li>' +
                '       </ul>' +
                '   </div>' +
                '   <div style="width: 100% ; overflow: auto" class="post-sender">' +
                '       <input style="float: right ; margin-right: 10px" type="button" @click="send" value="发送">' +
                '   </div>' +
                '</div>' ,
            data : function () {
                return {
                    postDefaultImg : '您这图我tm加载不出来啊',
                    post : {
                        user_id : mainHandle.constDom.functionGroup.getUserInfo('user_id'),
                        user_uid : mainHandle.constDom.functionGroup.getUserInfo('user_uid'),
                        avatar : mainHandle.constDom.functionGroup.getUserInfo('avatar'),
                        title : '填写标题',
                        about : '填写关于这则post的介绍',
                        body : [
                            {
                                html : 'blog',
                                src : '',
                                liID : Date.parse(new Date()).toString() + parseInt(Math.random() * 10000)
                            }
                        ]
                    },
                    status : {
                        mode : 'new',
                        postID : ''
                    }
                }
            },
            methods : {
                addNewBlock : function () {
                    this.post.body.push({
                        html : 'blog',
                        src : '',
                        liID : Date.parse(new Date()).toString() + parseInt(Math.random() * 10000)
                    })
                },
                deleteBlock : function (liID) {
                    for(var i in this.post.body)
                    {
                        if(this.post.body[i].liID === liID)
                        {
                            this.post.body.splice(i,1);
                            return;
                        }
                    }
                    console.log('failed to find index in deleteBlock()');
                },
                send : function () {
                    var api;
                    if(this.status.mode === 'new')
                        api = 'newPost.php';
                    else if(this.status.mode === 're')
                        api = 'rePost.php';
                    $.ajax({
                        url : static_data.getUrlPath('/dataAction/private/'+api,static_data.m_URL_DOMAIN_API_DIR),
                        async : true,
                        type : "post",
                        dataType : "json",
                        contentType : "application/x-www-form-urlencoded",
                        xhrFields: {
                            withCredentials: true
                        },
                        data : {
                            title : this.post.title,
                            about : this.post.about,
                            data : JSON.stringify(this.post.body),
                            postID : this.status.postID
                        },
                        success : function(data)
                        {
                            if(data['data']['res'] === static_data.response.requestSuccess)
                                location.href = static_data.getUrlPath('msg.html',static_data.m_URL_DOMAIN_WEB_DIR);
                            else
                                mainHandle.constDom.functionGroup.alertBox(data['data']['error']);
                        }
                    });
                }
            }
        });

        //创建Vue对象
        this.editor = new editorConstructor();

        //挂载Vue对象
        this.editor.$mount('#editorNode');
    }
};

var mainHandle;