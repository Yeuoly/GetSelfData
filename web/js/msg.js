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

window.onload = function()
{
    var app = this.document.createElement("div");
    var wrap = this.document.createElement("div");
    var bcgd = this.document.createElement("img");
    app.className = "app";
    app.id = "map";
    wrap.className = "wrap";
    wrap.id = "includes";
    bcgd.id = "background";
    this.document.body.appendChild(bcgd);
    this.document.body.appendChild(app);
    app.appendChild(wrap);
    selectBackground();
    placeHeader();
}

function addBlock(type,post_title,post_user,post_user_id,data,introduction)   //类型、标题、用户信息、数据、简介
{
    var cell_master                          = document.getElementById("includes");
    var blank_block                          = document.createElement("div");
    var post_card                            = document.createElement("div");
    var post_card_head                       = document.createElement("div");
    var post_card_body                       = document.createElement("div");
    var post_introduction                    = document.createElement("div");
    var post_title_e                         = document.createElement("h3");
    var user_block                           = document.createElement("div");
    var user_block_avatar                    = document.createElement("div");
    var user_block_id                        = document.createElement("div");
    blank_block.className                    = "vertical-blank-block";
    post_card.className                      = "post-card";
    post_card_head.className                 = "post-card-head";
    post_card_body.className                 = "post-card-body";
    post_introduction.className              = "post-introduction";
    post_title_e.className                   = "post-title";
    user_block.className                     = "post-card-userblock";
    user_block_avatar.className              = "post-card-userblock-avatar";
    user_block_avatar.style.backgroundImage  = "url(\""+static_data.getUrlPath("avatar/"+post_user_id+".jpg",static_data.m_URL_DOMAIN_IMG_DIR)+"\")";
    user_block_id.className                  = "post-card-userblock-id";
    cell_master.appendChild(blank_block);
    cell_master.appendChild(post_card);
    post_card.appendChild(post_card_head);
    post_card.appendChild(post_card_body);
    post_card_head.appendChild(post_title_e);
    post_card_head.appendChild(user_block);
    user_block.appendChild(user_block_avatar);
    user_block.appendChild(user_block_id);
    post_card_head.appendChild(post_introduction);
    post_title_e.innerHTML      = post_title;
    user_block_id.innerHTML     = post_user;
    post_introduction.innerHTML = introduction;

    switch(type)
    {
    case static_data.m_ADD_BLOCK_TYPE_TABLE:
        post_card_body.appendChild(createTable(
            data = data,
            tableClass = "showinfo-table",
            serialize = true,
            tdID = "sec",
            trID = "cay"
        ));
        break;
    case static_data.m_ADD_BLOCK_TYPE_URL:
        post_card_body.appendChild(createURL(
            url = data
        ));
        break;
    case static_data.m_ADD_BLOCK_TYPE_PIC:
        break;
    }
}

//使用给出的json数据建立一个html表格，并返回
function createTable(data , tableClass = "" ,tableName = "" , 
                     serialize = false , trID = "",tdID = "")
{
    var table = document.createElement("table");
        table.className = tableClass;
        table.name = tableName;
    var s_info_body = JSON.parse(data);

    function MakeWord(main,flag = false , head_addition = "" , tail_addition = "")
    {
        if(flag)main = head_addition + "_" + main + "_" + tail_addition;
        return main;
    }

    for(var row in s_info_body)
    {
        var row_e = document.createElement("tr");
        row_e.id = MakeWord(trID , serialize , row , "");
        for(var col in s_info_body[row])
        {
            var col_e = document.createElement("td");
            col_e.id = MakeWord(tdID , serialize , col , "");
            col_e.innerHTML = s_info_body[row][col];
            row_e.appendChild(col_e);
        }
        table.appendChild(row_e);
    }
    return table;
}

function createURL(url)
{
    var on_click = document.createElement("a");
    on_click.className = "post-card-url-onclick";
    on_click.innerHTML = "网页链接";
    on_click.href = url;
    return on_click;
}

function tounicode(data)
{
    if(data == '') return '请输入汉字';
    var str =''; 
    for(var i=0;i<data.length;i++)
    {
        str+="\\u"+parseInt(data[i].charCodeAt(0),10).toString(16);
    }
    return str;
}