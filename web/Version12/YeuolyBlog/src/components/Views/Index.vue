<template>
    <div id="index">
        <div class="logo">
            <img src="../../assets/YeuolyBlog-Logo-Text.png" alt="" style="width: 100%">
        </div>
        <div class="visitor">
            <div id="charts" class="charts"></div>
        </div>
    </div>
</template>

<script>
    import { GlobalCommunication } from "../../js/GlobalCommunication";
    import { InfoModule } from "../../js/module-alpha";

    export default {
        data () {
            return {
                visitStatistics : []
            }
        },
        methods : {
            getVisitStatisticsData(){
                GlobalCommunication.$emit('httpPost',
                    InfoModule.getUrlPath('extra/count/get.php',InfoModule.dir_api), {},
                    (data) => {
                        if(data.data['res'] !== InfoModule.response.requestSuccess)
                        {
                            this.$utils.messageBox('页面初始化失败','warn');
                            return;
                        }
                        let visitorDataCharts = this.$echarts.init(document.getElementById('charts'));
                        //x轴坐标
                        let xAxis = [];
                        //访问数据
                        let visitingData = [];
                        //数组长度
                        let len = this.$utils.valueCounter(data.data['data']);
                        for(let i in data.data['data']){
                            if(typeof data.data['data'][len - i - 2] !== 'object')
                                continue;
                            xAxis.splice(i,0, this.$utils.date('M-D',data.data['data'][len - i - 2]['begin_time']));
                            visitingData.splice(i,0,data.data['data'][len - i - 2]['count']);
                        }
                        visitorDataCharts.setOption({
                            title : { text : '近期访问量', subtext : '最近来小破站的有多少人呐。。' },
                            tooltip : { trigger: 'axis' },
                            xAxis : {
                                type : 'category',
                                data : xAxis
                            },
                            yAxis : {
                                type : 'value'
                            },
                            legend: {
                                data:['最高访问','最低访问']
                            },
                            series : [
                                {
                                    name : '访问量',
                                    type : 'line',
                                    itemStyle : {
                                        normal : {
                                            color : '#607d8b'
                                        }
                                    },
                                    data : visitingData,
                                    markLine : {
                                        data : [
                                            { type : 'average' , name : '平均值' }
                                        ]
                                    },
                                    markPoint : {
                                        data : [
                                            { type : 'max', name: '今天人怎么这么多' },
                                            { type : 'min', name: '最冷却的一天'}
                                        ]
                                    }
                                },
                            ]
                        });
                    },
                    () => {
                        this.$emit('好像服务器挂掉惹','warn');
                    }
                )
            }
        },
        mounted() {
            setTimeout(this.getVisitStatisticsData,100);
        }
}
</script>

<style>
    #index {
        width: 100%;
        height: 95vh;
    }

    .logo{
        padding-top: 50px;
        height: 8vw;
        width: 25vw;
        margin: 0 auto;
    }

    .visitor{
        padding-top: 100px;
        width: 54%;
        height: 300px;
        margin: 0 auto;
    }

    .charts{
        width: 100%;
        height: 100%;
        box-shadow: rgba(0,0,0,.15) 1px 1px 1px;
    }

    @media (max-width: 600px) {
        .logo{
            padding-top: 10px;
            width: 60vw;
        }

        .visitor{
            width: 100%;
        }
    }
</style>