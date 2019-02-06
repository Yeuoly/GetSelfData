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
    var includesConstrutor = Vue.extend({
        temptale : 
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
                            '<div class="post-card-body" v-for="bodyDep in ev.body">' +
                                '<div v-html="bodyDep.html"></div>' +
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
                        body : {
                            isList : false,
                            html : 'Test',
                            list : null
                        }
                    }
                ]
            }
        }
    });

    //创建Vue对象
    this.includes = new includesConstrutor();

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
            //最终储存在Vue data里的应该为{html:'',src:''} html中的v-html的参数为html，v-html生成的dom中的vue参数为src
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
                post_card.body.push(
                    createNode(post_data[i].class,post_data[i].src),
                );
            }

        },
        //创建post的节点(各板块的节点)，bodyDep为body数组的各个单元
        createNode : function(className,src){
            var group = {
                createTableNode : function(){
                    return
                            '<table class="post-card-body-table">' +
                                '<tr v-for="dep in bodyDep.src">' +
                                    '<td v-for="(value,key) in dep" :tdKey="key">' +
                                        '{{value}}' +
                                    '</td>' +
                                '</tr>' +
                            '</table>';
                },
                createBlogNode : function(){
                    return '<div class="post-card-body-blog">{{bodyDep.src}}</div>';
                },
                createPictrueNode : function(){
                    return '<img :src="bodyDep.src" class="post-card-body-image">';
                },
                createUrlNode : function(){
                    return '<a :href="bodyDep.src" class="post-card-body-url">';
                }
            }
            //html模板
            var templateObject = {
                html : ''
            }
            //data
            var data = {
                src : src
            }
            switch(className){
                case 'table':
                    templateObject.html = createTableNode();
                    break;
                case 'blog':
                    templateObject.html = createBlogNode();
                    break;
                case 'pictrue':
                    templateObject.html = createPictrueNode();
                    break;
                case 'url':
                    templateObject.html = createUrlNode();
                    break;
            }
            //返回bodyDep内的参数
            return {
                html : templateObject.html,
                src : data.src
            }
        }
        
    };

    //给外部一个访问函数集合的接口
    this.functionGroup = functionGroup;
};

var mainHandle;