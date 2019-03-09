<template>
    <div class="wrap" id="includes">
        <ul class="post-card-ul">
            <li class="post-card-li" v-for="ev in postDepartment">
                <div class="vertical-blank-block"></div>
                <div class="post-card">
                    <div class="post-card-head">
                        <h3 class="post-title">
                            {{ev.title}}
                            <div class="post-card-deletion" @click="deletePost(ev.postID)">删除</div>
                            <div class="post-card-edition " @click="editPost(ev.postID)">编辑</div>
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
                                <div v-if="bodyDep.html === 'blog' ">
                                    <div class="post-card-body-blog">
                                        {{bodyDep.src}}
                                    </div>
                                </div>
                                <table v-else-if="bodyDep.html === 'table' " class="post-card-body-table">
                                    <tr v-for="dep in bodyDep.src">
                                        <td v-for="(value,key) in dep" :tdKey="key">
                                            {{value}}
                                        </td>
                                    </tr>
                                </table>
                                <div v-else-if="bodyDep.html === 'picture' " class="post-card-body-picture">
                                    <img class="post-card-body-img" :src="bodyDep.src" alt="/">
                                </div>
                                <div v-else-if="bodyDep.html === 'url' " class="post-card-body-url">
                                    <a :href="bodyDep.src">
                                        网页链接：{{bodyDep.about}}
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    import { BaseModule } from "../../js/module";
    import { GlobalCommunication } from "../../js/GlobalCommunication";

    export default {
        data () {
            return {
                postDepartment : [
                    //以下是测试内容
                    /*{
                        title : 'hello world',
                        user : 'tester',
                        userId : '10086',
                        avatarUrl : '',
                        introduction : 'introductions',
                        postID : '108861',
                        body : [
                            {
                                html : 'blog',
                                src : 'hello world'
                            }
                        ]
                    }*/
                ],
                page : 1,
                isLoading : false,
                flag : false,
                isEnd : false,
                firstMounted : false
            }
        },
        methods : {
            deletePost (postID) {
                GlobalCommunication.$emit('httpPost',
                    BaseModule.getUrlPath('dataAction/private/operate.php',BaseModule.dir_api),
                    {
                        postID : postID,
                        method : 'delete'
                    },
                    (data) => {
                        if(data['data']['res'] === BaseModule.response.requestSuccess)
                        {
                            this.$messageBox('删除成功');
                            for(let i in this.postDepartment)
                            {
                                if(this.postDepartment[i].postID === postID)
                                {
                                    this.postDepartment.splice(i,1);
                                }
                            }
                        }
                        else
                            this.$messageBox(data['data']['error'],'warn');
                    },
                    () => {
                        this.$messageBox('发生了意外的错误','warn');
                    }
                )
            },
            //跳转编辑界面
            editPost (postID) {
                this.$router.push({ name : 'edit' , params : { pid : postID } })
            },//类型、标题、用户信息、数据、简介
            addPostCard : function(post_title, post_user, post_user_id , post_data, post_introduction ,postID){
                //新建Vue的data对象
                //原本body内是单一的类型，后来想了想，一个post内应该有很多种不同类型的内容，所以将body改为了一个数组
                //body内学习wordpress的风格，用板块划分，一个板块内只允许一种类型的内容
                //使用数组记录body内的所有板块，html是最终要放到节点里的dom字符串
                //post_data里的数据是一个json字符串，其格式为
                //[
                //    {
                //        class : '',
                //        src : data for this class
                //    }
                //]
                //最终储存在Vue data里的应该为{html:'',src:''} html为给v-if判断类型的变量
                this.postDepartment.push({
                    title : post_title,
                    user : post_user,
                    userId : post_user_id,
                    avatarUrl : BaseModule.getUrlPath('avatar/'+post_user_id+'.jpg',BaseModule.dir_img),
                    introduction : post_introduction,
                    postID : postID,
                    body : post_data
                });
            },
            //获取近期post，page是页面数，afterSuccess是一个function，在success中被调用，afterFail是在所有事情做完之后被调用
            getRecentPost :function (page , afterSuccess , afterFail) {
                GlobalCommunication.$emit('httpPost',
                    BaseModule.getUrlPath('dataAction/private/getMyRecent.php',BaseModule.dir_api),
                    {
                        page : page
                    },
                    (value) => {
                        if(parseInt(value['data']['res']) === BaseModule.response.requestSuccess)
                            afterSuccess(value);
                        else
                            this.$messageBox('获取博客失败','warn');
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
                        post_data = JSON.parse(data[i].post_data);
                    }catch (e) {
                        post_data = [
                            {
                                html : 'blog',
                                src : data[i].post_data
                            }
                        ]
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
            onscroll() {
                function myTry() {
                    let documentTop = this.$getDocumentTop();
                    let scrollHeight = this.$getScrollHeight();
                    let windowHeight = this.$getWindowHeight();
                    if(scrollHeight === windowHeight + documentTop)
                    {
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
                }
                //防止频繁调用 ， 当第一次调用完之后将flag改为true，为了避免在第一次调用的执行期间有新的事件
                //触发而没有调用，则在第一次调用的最后再手动调用一次
                if(this.flag && !this.isLoading && !this.isEnd)
                {
                    this.flag = false;
                    myTry();
                    setTimeout(() => {
                        this.flag = true;
                        myTry();
                    } , 1000);
                }
            }
        },
        //挂载时检测是否是第一次挂载，第一次挂载时加载数据
        mounted() {
            window.onscroll = this.onscroll();
            if(!this.firstMounted)
            {
                this.firstMounted = true;
                setTimeout(() => {
                    this.getRecentPost(this.page,this.loadNewMsg);
                }, 100);
            }
        }
    }
</script>

<style>
    li{
        list-style: none;
    }

    .wrap{
        width: 100%;
        margin: 0 auto;
        padding-bottom: 10px;
        border-radius: 5px;
    }

    .oprate-box{
        height: 200px;
        width: 50%;
        margin: 0 auto;
    }

    .oprate-box input[type="text"]{
        height: 50px;
        background-color: transparent;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 2px;
        border-color: white;
        outline:none;
    }

    .oprate-box .oprate-box-infomana-showinfo input[type="text"]{
        color: white;
        font-family:  "微软雅黑";
        font-size: 200%;
        width: 80%;
    }

    .oprate-box .oprate-box-infomana-showinfo .oprate-box-button{
        float: right;
        padding-top: 20px;
        padding-right: 7%;
    }

    .oprate-box .oprate-box-infomana-showinfo .oprate-box-button input[type="submit"]{
        border: 0px;
        outline: 0px;
        background: white;
        width: 150px;
        height: 40px;
        font-family: "微软雅黑";
        font-size: 120%;
        opacity: 0.7;
    }

    .post-card-body-table td button{
        border: 0px;
        outline: 0px;
        height: 100%;
        width: 40%;
        opacity: 0.7;
    }

    .post-card-body-table td button:hover{
        cursor: pointer;
    }

    .oprate-box .oprate-box-infomana-showinfo .oprate-box-label{
        color: white;
        font-family: "微软雅黑";
        font-size: 200%;
        padding-right: 5px;
    }

    .help-box{
        width: 90%;
        margin: 0 auto;
        color: white;
        font-family: "微软雅黑";
        font-size: 120%;
        text-align: left;
    }
</style>