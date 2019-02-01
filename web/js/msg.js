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
    var appHandle = new InitWeb();
    mainHandle = this;

    //post wrap的Vue实例，body内如果isList为真则创建一个带有v-for的<li></li>dom对象，其中数据对应li，
    //html为body内的dom对象字符串，list为wrap中一个节点的子循环列表，必须是一个二维的表
    //html 结构：
    //<table>
    //  <tr v-for="ev in body.list">
    //    <td v-for="evx in ev">
    //      {{exv}}
    //    </td>
    //  </tr>
    //</td>
    //<div v-else v-html="ev.body.html">
    //</div>
    this.includes = new Vue({
        el : '#includes',
        data : {
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
    });

    this.functionGroup = {
        //类型、标题、用户信息、数据、简介
        addBlock : function(type,post_title,post_user,post_user_id,post_data,post_introduction){
            //新建Vue的data对象
            var post_card = {
                title : post_title,
                user : post_user,
                userId : post_user_id,
                introduction : post_introduction,
                body : {
                    isList : false,
                    html : ''
                }
            };
            //创建
            switch(type)
            {
                case 'table':
                    post_card.body.list = [
                        {name : 'Are you ok?',id : 'I\'m very ok!'}
                    ];
                    post_card.body.isList = true;
                    break;
                case 'url':
                    break;
                case 'picture':
                    break;
            }
            mainHandle.includes.postDepartment.push(post_card);
        }
    };
};

var mainHandle;