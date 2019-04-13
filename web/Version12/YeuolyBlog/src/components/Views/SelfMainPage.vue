<template>
    <div class="wrap" id="includes">
        <ul class="post-card-ul">
            <li class="post-card-li" v-for="ev in postDepartment">
                <div class="post-card">
                        <div class="post-card-operate yb-icon-font">
                            <common-drop-down-list>
                                <div @click="editPost(ev.postID)">编辑</div>
                                <div @click="deletePost(ev.postID)">删除</div>
                            </common-drop-down-list>
                        </div>
                        <div class="post-card-head">
                            <h3 class="post-title">
                                {{ev.title}}
                            </h3>
                            <div class="post-card-userblock">
                                <div class="post-card-userblock-avatar"
                                     :style="{ backgroundImage : 'url(' + ev.avatarUrl + ')'}"
                                >
                                </div>
                                <div class="post-card-userblock-id">
                                    {{ev.user}}
                                </div>
                            </div>
                            <div class="post-introduction">
                                {{ev.introduction}}
                            </div>
                        </div>
                        <div class="post-card-body">
                            <ul class="post-card-body-ul">
                                <li class="post-card-body-li" v-for="bodyDep in ev.body">
                                    <div v-if="bodyDep.html === 'blog' " class="post-card-body-blog">
                                        <common-text-area :src="bodyDep.src"/>
                                    </div>
                                    <div v-else-if="bodyDep.html === 'table'" class="post-card-body-table">
                                        <common-table :src="bodyDep.src"/>
                                    </div>
                                    <div v-else-if="bodyDep.html === 'picture' " class="post-card-body-picture">
                                        <common-picture-holder :src="bodyDep.src"/>
                                    </div>
                                    <div v-else-if="bodyDep.html === 'url' " class="post-card-body-url">
                                        <common-url-link :src="bodyDep.src"/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="extra-function">
                            <top-tool-bar class-name="dep">
                                <common-btn :enable="true" class-name="dep-btn">
                                    <i class="yb-icon-font dep-icon">&#xe6c4;</i>
                                    <span class="dep-text font--small">转发</span>
                                </common-btn>
                                <common-btn :enable="true" class-name="dep-btn">
                                    <i class="yb-icon-font dep-icon">&#xe60f;</i>
                                    <span class="dep-text font--small">评论</span>
                                </common-btn>
                                <common-btn :enable="true" class-name="dep-btn">
                                    <i class="yb-icon-font dep-icon">&#xe6f1;</i>
                                    <span class="dep-text font--small">点赞</span>
                                </common-btn>
                            </top-tool-bar>
                        </div>
                    </div>
                <hr>
            </li>
        </ul>
        <div class="load-more yb-icon-font" style="width: 50%;margin: 0 auto">
            <common-btn
                    content="&#xe601; 再多一点。。拜托了"
                    :enable="loadMoreFlag"
                    @VClick="loadMore"
            />
        </div>
    </div>
</template>

<script>

    import { InfoModule } from "../../js/module-alpha"
    import { GlobalCommunication } from "../../js/GlobalCommunication"
    import CommonTextArea from "../Common/CommonTextArea"
    import CommonPictureHolder from "../Common/CommonPictureHolder"
    import CommonTable from "../Common/CommonTable"
    import CommonUrlLink from "../Common/CommonUrlLink"
    import CommonDropDownList from "../Common/CommonDropDownList"
    import TopToolBar from '../Common/TopToolBar'
    import CommonBtn from '../Common/CommonButton'

    export default {
        components: {
            CommonBtn,
            CommonDropDownList,
            CommonUrlLink,
            CommonTable,
            CommonPictureHolder,
            CommonTextArea,
            TopToolBar
        },
        data () {
            return {
                postDepartment : [],
                page : 1,
                isEnd : false,
                firstMounted : false,
                isLoading : false,
                extraPostFunction : {

                }
            }
        },
        computed : {
            loadMoreFlag(){
                return !this.isEnd && !this.isLoading;
            }
        },
        methods : {
            deletePost (postID) {
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('dataAction/private/operate.php',InfoModule.dir_api),
                    {
                        postID : postID,
                        method : 'delete'
                    },
                    (data) => {
                        if(data['data']['res'] === InfoModule.response.requestSuccess)
                        {
                            this.$utils.messageBox('删除成功');
                            for(let i in this.postDepartment)
                            {
                                if(this.postDepartment[i].postID === postID)
                                {
                                    this.postDepartment.splice(i,1);
                                }
                            }
                        }
                        else
                            this.$utils.messageBox(data['data']['error'],'warn');
                    },
                    () => {
                        this.$utils.messageBox('发生了意外的错误','warn');
                    }
                )
            },
            //跳转编辑界面
            editPost (postID) {
                this.$router.push({ name : 'edit' , params : { pid : postID } })
            },
            //类型、标题、用户信息、数据、简介
            addPostCard : function(post_title, post_user, post_user_id , post_data, post_introduction ,postID){
                this.postDepartment.push({
                    title : post_title,
                    user : post_user,
                    userId : post_user_id,
                    avatarUrl : InfoModule.getUrlPath('avatar/'+post_user_id+'.jpg',InfoModule.dir_img),
                    introduction : post_introduction,
                    postID : postID,
                    body : post_data
                });
            },
            //获取近期post，page是页面数，afterSuccess是一个function，在success中被调用，afterFail是在所有事情做完之后被调用
            getRecentPost :function (page , afterSuccess , afterFail) {
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('dataAction/private/getMyRecent.php',InfoModule.dir_api),
                    {
                        page : page
                    },
                    (value) => {
                        if(parseInt(value['data']['res']) === InfoModule.response.requestSuccess)
                            afterSuccess(value);
                        else
                            this.$utils.messageBox('获取博客失败','warn');
                    },
                    () => {
                        if(typeof afterFail === 'function')
                            afterFail();
                    }
                );
            },
            //重载msg数据
            reloadMsg : function (data) {
                this.postDepartment = [];
                this.loadNewMsg(data);
            },
            //装载新消息
            loadNewMsg : function (wholeData) {
                if(typeof wholeData['data']['isOver'] !== 'undefined')
                {
                    //消息到底了
                    this.isEnd = true;
                }
                let data = wholeData['data']['data'];
                for(let i in data){
                    let post_data;
                    try{
                        let each_data = data[i].post_data.replace(/[\n\r]/g,'\\n');
                        post_data = JSON.parse(each_data);
                    }catch (e) {
                        post_data = [{
                                html : 'blog',
                                src : data[i].post_data
                            }]
                    }
                    this.addPostCard(
                        data[i].post_title,
                        data[i].post_userID,
                        data[i].post_userUID,
                        post_data,
                        data[i].post_about,
                        data[i].post_ID
                    );
                }
            },
            loadMore() {
                //进入加载状态
                this.isLoading = true;
                this.getRecentPost(this.page + 1 , (data) => {
                    this.loadNewMsg(data);
                    //翻面
                    this.page++;
                    //加载完成
                    this.isLoading = false;

                },() => {
                    //加载完成
                    this.isLoading = false;
                });
            }
        },
        //挂载时检测是否是第一次挂载，第一次挂载时加载数据
        mounted() {
            if(!this.firstMounted)
            {
                this.firstMounted = true;
                setTimeout(() => {
                    this.getRecentPost(this.page,this.loadNewMsg);
                }, 100);
            }
        },
        created() {
            GlobalCommunication.$on('refreshHomePage',()=>{
                this.firstLoad = false;
                this.page = 1;
                this.isEnd = false;
                this.getRecentPost(this.page,this.reloadMsg);
            });
        }
    }
</script>

<style scoped>
    li{
        list-style: none;
    }

    hr{
        border-color: #80808030;
    }

    .wrap{
        width: 100%;
        margin: 0 auto;
        padding-bottom: 10px;
        border-radius: 5px;
    }

    .post-card{
        width: 70%;
        overflow:auto;
        margin: 0 auto;
        border-radius:5px;
        position: relative;
    }

    /*下面是post-card-body的样式*/

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

    .post-card-operate{
        display: inline-block;
        position: absolute;
        top: 20px;
        right: 15px;
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
        text-align: left;
        padding-bottom: 10px;
        margin-left: 25px;
        width: 65%;
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

    .post-card-body-blog{
        word-wrap: break-word;
        word-break: break-all;
    }

    .extra-function{
        height: 50px;
    }

    .extra-function .dep{
        height: 35px;
        border: 0;
    }

    .extra-function div{
        box-shadow: none;
    }

    .dep-icon{
        padding-left: 5px;
        padding-right: 5px;
    }

    .dep-text{

    }

    @media (max-width: 768px) {
        .post-card{
            position: relative;
        }

        .post-introduction{
            width: 90%;
            margin-left: 2.5%;
        }

        .post-card-userblock{
            width: 80%;
            padding-bottom: 10px;
        }

        .post-card-userblock-id{
            float: right;
        }

        .post-card-body:before{
            height: 60px;
        }

        .post-card-body{
            width: 90%;
            margin-left: 2.5%;
            padding: 10px;
        }
    }

    @media (max-width: 600px) {
        .post-card{
            width: 100%;
        }
    }

    @media (max-width: 450px) {
        .dep-text{
            display: none;
        }
    }
</style>