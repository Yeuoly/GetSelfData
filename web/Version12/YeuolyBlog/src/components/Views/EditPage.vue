<template>
    <div class="post-card">
        <div class="vertical-blank-block"></div>
        <div class="post-card-head">
            <h3 class="post-title">
                <input type="text" placeholder="填写标题" v-model="post.title" id="post-title-input">
            </h3>
            <div class="post-card-userblock">
                <div class="post-card-userblock-avatar"
                     :style="{backgroundImage : 'url( ' + post.avatar +  ')'}"
                >
                </div>
                <div class="post-card-userblock-id">
                    {{post.userInfo.user_id}}
                </div>
            </div>
            <div class="post-introduction">
                <textarea placeholder="填写简介" v-model="post.about"></textarea>
            </div>
        </div>
        <div class="post-card-body">
            <ul class="post-card-body-ul">
                <li :id="bodyDep.liID" class="post-card-body-li" v-for="bodyDep in post.body">
                    <div v-if="bodyDep.html === 'blog'">
                        <div class="post-card-body-blog">
                            <input type="text" v-model="bodyDep.src" :id="'focus-id-'+bodyDep.liID"
                                   @keydown.enter="onInputEnter(bodyDep.liID)" />
                        </div>
                    </div>
                    <table v-else-if="bodyDep.html === 'table'" class="post-card-body-table">
                        <tr v-for="dep in bodyDep.src">
                            <td v-for="(value,key) in dep" :tdKey="key">
                                {{value}}
                            </td>
                        </tr>
                    </table>
                    <div v-else-if="bodyDep.html === 'picture'" class="post-card-body-picture">
                        <img class="post-card-body-img" :src="bodyDep.src" :alt="postDefaultImg">
                        <input type="text" placeholder="填写图片链接地址"
                               v-model.lazy="bodyDep.src" :id="'focus-id-'+bodyDep.liID" style="width: 80%;float: left">
                    </div>
                    <div v-else-if="bodyDep.html === 'url'" class="post-card-body-url">
                        <input type="text" placeholder="填写链接地址" :id="'focus-id-'+bodyDep.liID" v-model="bodyDep.src">
                        <input type="text" placeholder="填写链接文字" v-model="bodyDep.about">
                    </div>
                    <div style="height: 10px;"></div>
                    <label style="float: left;height: 25px;vertical-align: middle">类别：</label>
                    <select style="float: left;height: 25px; outline: none" :name="bodyDep.liID" v-model="bodyDep.html">
                        <option value="blog">文字</option>
                        <option value="picture">图片</option>
                        <option value="url">链接</option>
                        <option value="table">表格</option>
                    </select>
                    <input type="button" @click="addNewBlock(bodyDep.liID)" value="+">
                    <input type="button" @click="deleteBlock(bodyDep.liID)" value="-">
                </li>
            </ul>
        </div>
        <div style="width: 100% ; overflow: auto" class="post-sender">
            <input id="button-send" style="float: right ; margin-right: 10px ; width: 190px" type="button" @click="send" value="发送">
        </div>
    </div>
</template>

<script>
    import { GlobalCommunication } from "../../js/GlobalCommunication";
    import { BaseModule } from "../../js/module";
    import { router } from "../../router";

    export default {
        name: "EditPage",
        data () {
            let self = this;
            return {
                postDefaultImg : '您这图我tm加载不出来啊',
                post : {
                    maxLine : 1,
                    userInfo : self.$store.getters.userInfo,
                    title : '',
                    about : '',
                    body : [
                        {
                            html : 'blog',
                            src : '',
                            liID : 1
                        }
                    ]
                },
                status : {
                    mode : 'new',
                    postID : '0'
                }
            }
        },
        methods : {
            loadPost(postID){
                GlobalCommunication.$emit('httpPost',
                    BaseModule.getUrlPath('dataAction/private/getPost.php',BaseModule.dir_api),
                    { postID : postID },
                    (data) => {
                        if(data.data['res'] === BaseModule.response.requestSuccess)
                        {
                            this.status.postID = postID;
                            this.status.mode = 're';
                            let post = JSON.parse(data.data.data['post_data'])
                            let maxLineID = 1;
                            for (let i in post)
                            {
                                maxLineID = post[i].liID > maxLineID ? maxLineID : maxLineID;
                            }
                            this.post.maxLine = maxLineID;
                            this.post.title = data.data.data['post_title'];
                            this.post.about = data.data.data['post_about'];
                            this.post.body = post;
                        }else{
                            this.$utils.messageBox(data.data['error'], 'warn');
                        }
                    },
                    () => {
                        this.$utils.messageBox('发生了未知的错误', 'warn');
                    }
                );
            },
            //这个用于给后面的区块数组操作寻找指定区块
            _searchBlock_ (liID, deletionCount, addition){
                for(let i in this.post.body)
                {
                    if(this.post.body[i].liID === liID)
                    {
                        if(typeof addition !== 'undefined')
                            this.post.body.splice(parseInt(i) + 1,deletionCount,addition);
                        else
                            this.post.body.splice(parseInt(i) , deletionCount);
                        return;
                    }
                }
            },
            addNewBlock(liID, hook) {
                let newLiID = this.post.maxLine + 1;
                this.post.maxLine++;
                this._searchBlock_(liID, 0, { src : '', html : 'blog', liID : newLiID });
                this.newLiID = newLiID;
            },
            clearPostData(){

            },
            onInputEnter (liID){
                this.addNewBlock(liID);
            },
            deleteBlock (liID) {
                this._searchBlock_(liID,1);
            },
            send () {
                let method;
                if(this.status.mode === 'new')
                    method = 'newPost';
                else if(this.status.mode === 're')
                    method = 'modify';

                if(this.post.title === '' || this.post.about === '')
                {
                    this.$utils.messageBox('标题和简介不能为空','warn');
                    return;
                }

                GlobalCommunication.$emit('httpPost',
                    BaseModule.getUrlPath('dataAction/private/operate.php',BaseModule.dir_api),
                    {
                        title : this.post.title,
                        about : this.post.about,
                        data : JSON.stringify(this.post.body),
                        postID : this.status.postID,
                        method : method
                    },
                    (value) => {
                        if (value.data['res'] === BaseModule.response.requestSuccess)
                        {
                            this.clearPostData();
                            router.replace('/home');
                        }else{
                            this.$utils.messageBox(value.data['error']);
                        }
                    },
                    () => {
                        this.$utils.messageBox('发送了意外的错误','warn');
                    }
                );
            }
        },
        watch : {
            'post.maxLine' : {
                handler(){
                    this.$nextTick(function () {
                        document.getElementById('focus-id-'+this.post.maxLine).focus();
                        this.$nextTick(null);
                    })
                },
                immediate : false
            }
        },
        mounted() {
            console.log('fuck');
            setTimeout(()=>{
                let postID = this.$route.params['pid'];
                if(typeof postID === 'string')
                {
                    this.loadPost(postID);
                }
            } , 500);
        }
    }
</script>

<style scoped>

    .post-card-body-blog input[type="text"], .post-card-body-picture input[type="text"] , .post-card-body-url input[type="text"]{
        width: 100%;
        font-size: 18px;
    }

    .post-card input[type="button"]{
        overflow: paged-x;
        float: left;
        border: 0px;
        border-right: 10px;
        outline: 0px;
        background: rgba(255,255,255,0.4);
        width: 50px;
        margin-left: 10px;
        height: 25px;
        font-family: "微软雅黑";
        font-size: 18px;
        color: black;
        cursor: pointer;
    }

    .post-introduction textarea{
        width: 100%;
        font-size: 15px;
    }

    .post-title input[type="text"]{
        color: white;
        font-family:  "微软雅黑";
        font-size: 150%;
        width: 80%;
        text-align: center;
    }

    .post-card-body-li{
        margin-bottom: 40px;
        overflow: auto;
    }

    .post-card-head{
        width: 100%;
        overflow: auto;
        text-align: center;
        padding-bottom: 10px;
    }

    .post-card-body{
        width: 95%;
        margin: 0 auto;
        overflow: auto;
        text-align: left;
        padding-bottom: 10px;
    }

    .post-introduction{
        margin: 0 auto;
        overflow: hidden;
        padding: 10px;
        /* margin-left: -30px; */
        float: left;
        width: 68%;
        min-height: 50px;
        text-align: justify;
        background-color: rgba(255,255,255,0.135);
        border-radius: 5px;
        word-wrap: break-word;
        word-break: break-all;
        letter-spacing: 1px;
        line-height: 22px;
        border: 10px;
    }

    .post-title{
        margin: 0 auto;
        padding-bottom: 10px;
    }

    .post-card-userblock{
        padding-left: 25px;
        width: 17%;
        height: 50px;
        float: left;
    }

    .post-card-userblock-id{
        /* float: left; */
        width: 50%;
        padding-left: 10px;
        text-align: left;
        font-size: 15px;
        /* white-space: nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .post-card-userblock-avatar{
        float: left;
        width: 50px;
        height: 50px;
        background-color: white;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 50%;
    }

    #post-card-userblock-avatar-img{
        object-fit: cover;
        border: none;
        padding: 0px;
        margin: 0px;
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 25px;
    }

    .post-card-body-url a{
        font-size: 135%;
        color: black;
        /*text-decoration: none;*/
    }

    .post-card-body-table{
        width: 90%;
        margin: 0 auto;
        word-wrap: break-word;
        word-break: break-all;
    }

    .post-card-body-blog{
        word-wrap: break-word;
        word-break: break-all;
    }

    .post-card-body-table td{
        display: table-cell;
        text-align: center;
        font-family: "微软雅黑 Narrow";
        color:rgb(37, 37, 37);
    }

</style>