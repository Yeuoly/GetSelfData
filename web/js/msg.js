/* 
    last update : 
        date : 2018/12/22
        new  : post-card and so on
    author:
        SRM_XY Yeuoly
    group:
        VSOV
    website:
        NotForget
*/

window.onload = function () {
    //初始化界面
    this.constDom = new InitWeb();
    mainHandle = this;

    //创建Vue对象构造器
    //post wrap的Vue实例，body内如果isList为真则创建一个带有v-for的<li></li>dom对象，其中数据对应li，
    //html为body内的dom对象字符串，list为wrap中一个节点的子循环列表，必须是一个二维的表
    var includesConstructor = Vue.extend({
        template :
            '<div class="wrap" id="includes">' +
                '<ul class="post-card-ul">' +
                    '<li class="post-card-li" v-for="ev in postDepartment">' +
                        '<div class="vertical-blank-block"></div>' +
                        '<div class="post-card">' +
                            '<div class="post-card-head">' +
                                '<h3 class="post-title">' +
                                    '{{ev.title}}' +
                                '</h3>' +
                                '<div class="post-card-userblock">' +
                                    '<div class="post-card-userblock-avatar">' +
                                    '</div>' +
                                    '<div class="post-card-userblock-id">' +
                                        '{{ev.user}}' +
                                    '</div>' +
                                '</div>' +
                                '<div class="post-introduction">' +
                                    '{{ev.introduction}}' +
                                '</div>' +
                            '</div>' +
                            '<div class="post-card-body">' +
                                '<ul class="post-card-body-ul">' +
                                    '<li class="post-card-body-li" v-for="bodyDep in ev.body">' +
                                        '<div v-if="bodyDep.html === \'blog\'">' +
                                            '<div class="post-card-body-blog">' +
                                                '{{bodyDep.src}}' +
                                            '</div>' +
                                        '</div>' +
                                        '<table v-else-if="bodyDep.html === \'table\'" class="post-card-body-table">' +
                                            '<tr v-for="dep in bodyDep.src">' +
                                                '<td v-for="(value,key) in dep" :tdKey="key">' +
                                                    '{{value}}' +
                                                '</td>' +
                                            '</tr>' +
                                        '</table>' +
                                        '<div v-else-if="bodyDep.html === \'picture\'" class="post-card-body-picture">' +
                                            '<img :src="bodyDep.src" alt="/">' +
                                        '</div>' +
                                        '<div v-else-if="bodyDep.html === \'url\'" class="post-card-body-url">' +
                                            '<a :href="bodyDep.src.url">' +
                                                '{{bodyDep.src.about}}' +
                                            '</a>' +
                                        '</div>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                '</ul>' +
            '</div>',
        data : function() {
            return {
                postDepartment : [
                    {
                        title : 'Test',
                        user : 'Yeuoly',
                        userId : 1,
                        introduction : 'test',
                        body : [
                            {
                                src : 'test',
                                html : 'picture'
                            },
                            {
                                src : 'test',
                                html : 'blog'
                            }
                        ]
                    }
                ]
            }
        }
    });

    //创建Vue对象
    this.includes = new includesConstructor();

    //挂载Vue对象
    this.includes.$mount('#mountNode');

    //创建函数集合
    var functionGroup = {
        //类型、标题、用户信息、数据、简介
        addBlock : function(post_title,post_user,post_user_id,post_data,post_introduction){
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
            var post_card = {
                title : post_title,
                user : post_user,
                userId : post_user_id,
                introduction : post_introduction,
                body : [
                    //{
                    //    //html需要根据data里的src和class生成，最终丢到dom里的就是这个东西了，是一个字符串
                    //    html : ''
                    //    src : ''
                    //},
                ]
            };
            for(var i in post_data){
                post_card.body.push({
                    html : post_data[i].class,
                    src : post_data[i].src
                });
            }

        }
    };

    //给外部一个访问函数集合的接口
    this.functionGroup = functionGroup;
};

var mainHandle;