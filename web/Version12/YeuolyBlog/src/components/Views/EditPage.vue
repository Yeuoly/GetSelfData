<template>
    <div class="post-card">
        <div class="post-card-head">
            <h3 class="post-title">
                <NormalEditor
                        placeholder="填写标题"
                        v-model="post.title"
                        id-name="post-title-input"
                        :disable-break-word="true"
                />
            </h3>
            <div class="post-introduction">
                <NormalEditor
                        v-model="post.about"
                        placeholder="简介"
                        class-name="post-introduction-text"
                />
            </div>
        </div>
        <div class="post-card-body">
            <ul class="post-card-body-ul">
                <li :id="bodyDep.liID" class="post-card-body-li" v-for="bodyDep in post.body">
                    <div v-if="bodyDep.html === 'blog'">
                        <NormalEditor
                                v-model="bodyDep.src"
                                :id-name="'focus-id-'+bodyDep.liID"
                        />
                    </div>
                    <table v-else-if="bodyDep.html === 'table'" class="post-card-body-table">
                        <tr v-for="dep in bodyDep.src">
                            <td v-for="(value,key) in dep" :tdKey="key">
                                {{value}}
                            </td>
                        </tr>
                    </table>
                    <div v-else-if="bodyDep.html === 'picture'" class="post-card-body-picture">
                        <PictureEditor
                                image-class="post-card-body-img"
                                v-model="bodyDep.src"
                                :id="'focus-id-'+bodyDep.liID"
                        />
                    </div>
                    <div v-else-if="bodyDep.html === 'url'" class="post-card-body-url">
                        <UrlEditor
                                v-model="bodyDep.src"
                        />
                    </div>
                </li>
            </ul>
        </div>
        <div class="post-sender">
            <CommonButton
                    enable="true"
                    class-name="a"
                    @VClick="send"
                    content="发送"
            />
        </div>
    </div>
</template>

<script>
    import { GlobalCommunication } from "../../js/GlobalCommunication"
    import { BaseModule } from "../../js/module"
    import { router } from "../../router"

    import PictureEditor from '../Common/PictureInput'
    import UrlEditor from '../Common/UrlInput'
    import NormalEditor from '../Common/NormalInput'
    import CommonButton from '../Common/CommonButton'

    export default {
        name: "EditPage",
        components : {
            CommonButton,
            PictureEditor,
            UrlEditor,
            NormalEditor
        },
        data () {
            let self = this;
            return {
                postDefaultImg : '您这图我tm加载不出来啊',
                post : {
                    currentLine : 1,
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
            toString(src) {
                return src.toString();
            },
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

    .post-card{
        padding-top: 10px;
        padding-bottom: 10px;
        width: 70%;
        overflow:auto;
        background-color: rgba(238, 238, 238, 0.315);
        margin: 0 auto;
        border-radius:5px;
        position: relative;
    }

    .post-card-operate{
        position: absolute;
        top: 20px;
        right: 30px;
    }

    .post-card-operate-content{
        display: inline-block;
    }

    .post-card-operate-content::before{
        content: "\e606";
        cursor: pointer;
    }

    .post-card-operate-dropdown{
        display: none;
        position: absolute;
        border: 1px solid #d7dfeab8;
        min-width: 60px;
        margin-left: -80px;
        border-radius: 8px;
        text-align: center;
        overflow: auto;
    }

    .post-card-operate-content:hover .post-card-operate-dropdown{
        display: block;
    }

    .post-card-operate-item{
        padding-top: 8px;
        background: rgba( 244 , 244 , 244 , 0.3);
        width: 100px;
        height: 30px;
        cursor: pointer;
    }

    .post-card-operate-item:hover{
        color: #00b5e5;
    }

    /*下面是post-card-body的样式*/

    .post-card-body-li{
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
        background-color: white;
        padding: 5px;
    }

    .post-introduction{
        margin: 0 auto;
        overflow: hidden;
        width: 95%;
        min-height: 50px;
        text-align: justify;
        background-color: white;
        border-radius: 5px;
        word-wrap: break-word;
        word-break: break-all;
        letter-spacing: 1px;
        line-height: 22px;
        padding: 5px;
    }

    .post-introduction-text{
        font-size: 30px;
    }

    .post-title{
        margin: 10px auto;
        padding: 5px;
        width: 95%;
        background-color: white;
        height: 30px;
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
        color:rgb(37, 37, 37);
    }

    .post-card-body-img{
        width: 100%;
    }


    .post-sender{
        margin: 0 auto;
        width: 95%;
        padding: 5px;
    }

</style>