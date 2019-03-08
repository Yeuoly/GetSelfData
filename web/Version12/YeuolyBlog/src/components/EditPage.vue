<template>
    <div class="post-card">
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
                        <option value="blog">blog</option>
                        <option value="picture">picture</option>
                        <option value="url">url</option>
                        <option value="table">table</option>
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
    import { GlobalCommunication } from "../js/GlobalCommunication";
    import { BaseModule } from "../js/module";
    import { router } from "../router";
    import { FunctionGroup } from "../js/GlobalUtils";

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
            //这个用于给后面的区块数组操作寻找指定区块
            ___searchBlock (liID,deletionCount,addition){
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
                this.___searchBlock(
                    liID,
                    0,
                    {
                        src : '',
                        html : 'blog',
                        liID : newLiID
                    });
                this.newLiID = newLiID;
            },
            clearPostData(){

            },
            onInputEnter (liID){
                this.addNewBlock(liID);
            },
            deleteBlock (liID) {
                this.___searchBlock(liID,1);
            },
            send () {
                let method;
                if(this.status.mode === 'new')
                    method = 'newPost';
                else if(this.status.mode === 're')
                    method = 'modify';

                GlobalCommunication.$emit('httpPost',
                    BaseModule.getUrlPath('/dataAction/private/operate.php',BaseModule.dir_api),
                    {
                        title : this.post.userInfo.title,
                        about : this.post.userInfo.about,
                        data : JSON.stringify(this.post.body),
                        postID : this.status.postID,
                        method : method
                    },
                    (value) => {
                        if (value.data['res'] === BaseModule.response.requestSuccess)
                        {
                            this.clearPostData();
                            router.replace('/home');
                        }
                    },
                    () => {
                        FunctionGroup.alertBox('发生了意外的错误');
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
        }
    }
</script>

<style scoped>

</style>