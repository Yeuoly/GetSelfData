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
                                //这里处理多个不同板块的html
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
            var post_card = {
                title : post_title,
                user : post_user,
                userId : post_user_id,
                introduction : post_introduction,
                body : [
                    //{
                    //    //html需要根据data里的src和class生成，最终丢到dom里的就是这个东西了，是一个字符串
                    //    html : ''
                    //},
                ]
            };
        },
        //创建post的节点
        createNode : function(className,type){
            var group = {
                createTableNode : function(src){
                    var str = 
                            '<table class="showinfo-table">' +
                                '<tr v-for="dep in bodyDep.list">' +
                                    '<td v-for="(value,key) in dep" :tdKey="key">' +
                                        '{{value}}' +
                                    '</td>' +
                                '</tr>' +
                            '</table>';
                },
                createBlogNode : function(src){
                    var str = 
                            '<div class="post-card-body-blog" v-html="bodyDep.html"></div>';
                },
                createPictrueNode : function(src){
                    
                },
                createUrlNode : function(src){
                    
                }
            }
            switch(className){
                case 'table':
                    break;
                case 'blog':
                    break;
                case 'pictrue':
                    break;
                case 'url':
                    break;
            }
        }
        
    };

    //给外部一个访问函数集合的接口
    this.functionGroup = functionGroup;
};

var mainHandle;