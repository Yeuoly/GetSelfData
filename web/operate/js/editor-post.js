window.onload = function () {
    this.constDom = new InitWeb();
    mainHandle = this;

    this.constDom.functionGroup.bindUserOnloadNextTick(initEditor);

    function initEditor(){
        var utils = {
            getLiID : function () {
                var p1 = (new Date()).getTime();
                var p2 = parseInt(Math.random() * 1000);
                var p3 = p1 | p2;
                var p4 = p1 & p2;
                return p3 << 2 + p4 << 4;
            }
        };

        //创建编辑器的Vue构造器
        var editorConstructor = Vue.extend({
            template :
                '<div class="post-card">' +
                '   <div class="post-card-head">' +
                '       <h3 class="post-title">' +
                '           <input type="text" placeholder="填写标题" v-model="post.title">' +
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
                '       <textarea placeholder="填写简介" v-model="post.about"></textarea>' +
                '   </div>' +
                '   </div>' +
                '   <div class="post-card-body">' +
                '       <ul class="post-card-body-ul">' +
                '           <li :id="bodyDep.liID" class="post-card-body-li" v-for="bodyDep in post.body">' +
                '               <div v-if="bodyDep.html === \'blog\'">' +
                '                   <div class="post-card-body-blog">' +
                '                       <input type="text" v-model="bodyDep.src" :id="\'focus-id-\'+bodyDep.liID"' +
                '                           @keydown.enter="onInputEnter(bodyDep.liID)"></input>' +
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
                '                   <input type="text" placeholder="填写图片链接地址" ' +
                '                       v-model.lazy="bodyDep.src" :id="\'focus-id-\'+bodyDep.liID">' +
                '               </div>' +
                '               <div v-else-if="bodyDep.html === \'url\'" class="post-card-body-url">' +
                '                   <input type="text" placeholder="填写链接地址" :id="\'focus-id-\'+bodyDep.liID" v-model="bodyDep.src">' +
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
                '               <input type="button" @click="addNewBlock(bodyDep.liID)" value="添加一个新的编辑区块">' +
                '               <input type="button" @click="deleteBlock(bodyDep.liID)" value="删除这个区块">' +
                '           </li>' +
                '       </ul>' +
                '   </div>' +
                '   <div style="width: 100% ; overflow: auto" class="post-sender">' +
                '       <input style="float: right ; margin-right: 10px" type="button" @click="send" value="发送">' +
                '   </div>' +
                '</div>' ,
            data : function () {
                var firstLiID = utils.getLiID();
                return {
                    postDefaultImg : '您这图我tm加载不出来啊',
                    //缓存新建的区块的Id
                    newLiID : firstLiID,
                    post : {
                        user_id : mainHandle.constDom.functionGroup.getUserInfo('user_id'),
                        user_uid : mainHandle.constDom.functionGroup.getUserInfo('user_uid'),
                        avatar : mainHandle.constDom.functionGroup.getUserInfo('avatar'),
                        title : '',
                        about : '',
                        body : [
                            {
                                html : 'blog',
                                src : '',
                                liID : firstLiID
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
                //这个用于给后面的区块数组操作寻找指定区块
                ___searchBlock : function(liID,deletionCount,addition){
                    for(var i in this.post.body)
                    {
                        if(this.post.body[i].liID === liID)
                        {
                            if(typeof addition !== 'undefined')
                                this.post.body.splice(i + 1,deletionCount,addition);
                            else
                                this.post.body.splice(i,deletionCount);
                            return;
                        }
                    }
                    console.log('failed to find index in ___searchBlock()');
                },
                addNewBlock : function (liID) {
                    var newLiID = utils.getLiID();
                    this.___searchBlock(liID,0,{
                        src : '',
                        html : 'blog',
                        liID : newLiID
                    });
                    editor.newLiID = newLiID;
                },
                onInputEnter : function(liID){
                    this.addNewBlock(liID);
                },
                deleteBlock : function (liID) {
                    this.___searchBlock(liID,1);
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
            },
            watch : {
                //添加一个监控，检测到有数据更新时自动对准焦点
                'post.body' : {
                    handler: function (newVal) {
                        Vue.nextTick(function () {
                            document.getElementById('focus-id-' + editor.newLiID).focus();
                        })
                    },
                    immediate : false,
                    deep : true
                }
            }
        });

        //创建Vue对象
        this.editor = new editorConstructor();
        var editor = this.editor;

        //挂载Vue对象
        this.editor.$mount('#editorNode');
    }
};

var mainHandle;