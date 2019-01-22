/* 
    last update : 
        date : 2018/12/29
        new  : rewrite
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
    checkStatue();
}