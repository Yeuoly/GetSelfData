<template>
    <div class="post-card yb-icon-font">
        <div class="post-card-inner">
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
                            placeholder="输入简介"
                            class-name="post-introduction-text"
                    />
                </div>
            </div>
            <div class="post-tools-bar">
                <top-tool-bar>
                    <div title="上传图片" @click="uploadPicture">&#xe614;</div>
                    <div title="添加图片" @click="addNewBlock(post.maxLine,'picture')">&#xe678;</div>
                    <div title="添加链接" @click="addNewBlock(post.maxLine,'url')">&#xe604;</div>
                    <div title="添加表格" @click="addNewBlock(post.maxLine,'table')">&#xe796;</div>
                    <div title="添加文字" @click="addNewBlock(post.maxLine)">&#xe6ed;</div>
                </top-tool-bar>
            </div>
            <div class="post-card-body">
                <ul class="post-card-body-ul">
                    <li :id="bodyDep.liID" class="post-card-body-li" v-for="bodyDep in post.body">
                        <div v-if="bodyDep.html === 'blog'">
                            <NormalEditor
                                    v-model="bodyDep.src"
                                    :id-name="'focus-id-'+bodyDep.liID"
                                    placeholder="输入正文"
                                    @focus="onInputFocusIn"
                                    @blur="onInputFocusOut"
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
                            <picture-editor
                                    image-class="post-card-body-img"
                                    v-model="bodyDep.src"
                                    :id="'focus-id-'+bodyDep.liID"
                            />
                        </div>
                        <div v-else-if="bodyDep.html === 'url'" class="post-card-body-url">
                            <url-editor
                                    v-model="bodyDep.src"
                            />
                        </div>
                    </li>
                </ul>
            </div>
            <div class="post-sender">
                <CommonButton
                        :enable="true"
                        class-name="a"
                        @VClick="send"
                        content="发送"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { GlobalCommunication } from "../../js/GlobalCommunication"
    import { InfoModule } from "../../js/module-alpha"

    import PictureEditor from '../Common/PictureInput'
    import UrlEditor from '../Common/UrlInput'
    import NormalEditor from '../Common/NormalInput'
    import CommonButton from '../Common/CommonButton'
    import TopToolBar from '../Common/TopToolBar'

    export default {
        name: "EditPage",
        components : {
            CommonButton,
            PictureEditor,
            UrlEditor,
            NormalEditor,
            TopToolBar
        },
        data () {
            let self = this;
            return {
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
            onInputFocusIn(){
                if(!this.$utils.isPC())
                {
                    let _body = document.getElementsByTagName('body')[0];
                    _body.style.height = '30000px';
                }
            },
            onInputFocusOut(){
                let _body = document.getElementsByTagName('body')[0];
                _body.style.height = '100%';
            },
            uploadPicture: function () {
                window.open(
                    'https://www.picb.cc/upload',
                    '',
                    'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=850,height=400'
                );
            },
            loadPost(postID){
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('dataAction/private/getPost.php',InfoModule.dir_api),
                    { postID : postID },
                    (data) => {
                        if(data.data['res'] === InfoModule.response.requestSuccess)
                        {
                            this.status.postID = postID;
                            this.status.mode = 're';
                            let _data = data.data.data['post_data'].replace(/[\n\r]/g,'\\n');
                            let post = JSON.parse(_data);
                            let maxLineID = 1;
                            for (let i in post){
                                maxLineID = post[i].liID > maxLineID ? post[i].liID : maxLineID;
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
            clearPostData () {
                this.post.title = '';
                this.post.maxLine = 1;
                this.post.about = '';
                this.post.body = [];
                this.post.currentLine = 1;
            },
            addNewBlock(liID, type ,hook) {
                let newLiID = this.post.maxLine + 1;
                this.post.maxLine++;
                let object = {
                    src : '',
                    html : '',
                    liID : newLiID
                };
                if (typeof type === 'undefined')
                {
                    object.html = 'blog';
                }
                else if (type === 'url')
                {
                    object.html = 'url';
                    object.src = {
                        text : '',
                        url : ''
                    }
                }
                else
                {
                    object.html = type
                }
                this._searchBlock_(liID, 0, object);
                this.newLiID = newLiID;
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
                    InfoModule.getUrlPath('dataAction/private/operate.php',InfoModule.dir_api),
                    {
                        title : this.post.title,
                        about : this.post.about,
                        data : JSON.stringify(this.post.body),
                        postID : this.status.postID,
                        method : method
                    },
                    (value) => {
                        if (value.data['res'] === InfoModule.response.requestSuccess)
                        {
                            this.clearPostData();
                            this.$router.push({name : 'home'});
                            GlobalCommunication.$emit('refreshHomePage');
                        }else{
                            this.$utils.messageBox(value.data['error']);
                        }
                    },
                    () => {
                        this.$utils.messageBox('发生了意外的错误','warn');
                    }
                );
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
            //安卓虚拟键盘存在的输入框bug
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

    @media (max-width: 700px) {
        .post-card{
            width: 90%;
        }
    }

    @media (max-width: 400px) {
        .post-card{
            width: 100%;
        }
    }

    .post-card-inner{
        width: 95%;
        margin: 0 auto;
    }

    /*下面是post-card-body的样式*/

    .post-card-body-ul{
        padding: 5px;
    }

    .post-card-body-li{
        overflow: auto;
    }

    .post-card-head{
        width: 100%;
        overflow: hidden;
        text-align: center;
        padding-bottom: 10px;
    }

    .post-tools-bar{
        width: 190px;
    }

    .tools{

    }

    .post-card-body{
        width: 100%;
        margin: 0 auto;
        overflow: auto;
        text-align: left;
        line-height: 25px;
        background-color: white;
    }

    .post-introduction{
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
        min-height: 50px;
        text-align: justify;
        background-color: white;
        border-radius: 5px;
        word-wrap: break-word;
        word-break: break-all;
        line-height: 22px;
        padding: 5px;
    }

    .post-introduction-text{
        font-size: 30px;
    }

    .post-title{
        padding: 5px;
        width: 100%;
        background-color: white;
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

    .post-sender{
        margin: 0 auto;
        width: 100%;
        padding-top: 5px;
    }

</style>