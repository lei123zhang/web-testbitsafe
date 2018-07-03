<template>
    <div>
        <div id="fullpage">
            <div class="section" id="page1">
                <!-- <Carousel :arrow="showArrow" :autoplay-speed="speed" v-model="valueCal" loop>
                    <CarouselItem>
                        <div class="demo-carousel">
                            <div class="demo-carousel-content">
                                <h1>{{$t("sectionPage.carouselTitle")}}</h1>
                                <h2>{{$t("sectionPage.carouselContent")}}</h2>
                            </div>
                            <div class="demo-carousel-btn">
                                <a class="purchase" @click="purchaseHref">{{$t("sectionPage.purchase")}}</a>
                            </div>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="demo-carousel">
                            
                        </div>
                    </CarouselItem>
                </Carousel> -->
                <carousel-show></carousel-show>
            </div>
            <div class="section" id="page2">
                <div class="page2nav">
                    <ul class="brclearfix">
                        <li v-for="(item,index) in indexBtn" @click="addClass(index)" :class="{'active':index==choseBtn,'ivu-btn-ghost':index!=choseBtn}">{{item.text}}</li>
                    </ul>
                </div>
                <div class="ptjy">
                    <Table id="USDT" v-show="true" :columns="coins.columns" :data="dataIndex" :no-data-text="$t('common.nodata')"></Table>
                </div>
            </div>
            <div class="section" id="page3">
                <div style="line-height: 40px;font-size:20px;color:#000;">{{$t('sectionPage.notice')}}</div>

                <Col span="24" style="padding:0 2%;color:#000;font-size:18px;text-align:left;">

                    <div v-for="item in FAQList" class="faqlist">
                        <div class="faqitem" @click="noticedeail(item.id)">{{item.title}}
                            <span style="float:right">{{item.createTime}}</span>
                        </div>
                    </div>

                </Col>
            </div>
            <div class="section" id="page4">
                <ul>
                    <li>
                        <img src="../../assets/images/index1.png" alt="">
                        <p>{{$t('description.message1')}}</p>
                    </li>
                    <li style="width: 30%;">
                        <img src="../../assets/images/index2.png" alt="">
                        <p>{{$t("description.message2")}}</p>
                    </li>
                    <li style="width: 45%;">
                        <img src="../../assets/images/index3.png" alt="" style="margin-bottom:10px;">
                        <p>{{$t("description.message3")}}</p>
                    </li>
                </ul>
            </div>
            <div class="section" id="page5">
                <h1>{{$t("description.message4")}}</h1>
                <h3>{{$t("description.message5")}}</h3>
                <ul>
                    <li>
                        <a @click="donwload(0)"><img src="../../assets/images/iosdown.png" alt=""></a>
                    </li>
                    <li>
                        <a @click="donwload(1)"><img src="../../assets/images/anddown.png" alt=""></a>
                    </li>
                </ul>
            </div>
            <!-- <div class="section" id="page3">
                <h2>{{$t("sectionPage.securityTitle")}}</h2>
                <div class="section_detail">
                    <p>{{$t("sectionPage.securityDetail1")}}</p>
                    <p>{{$t("sectionPage.securityDetail2")}}</p>
                    <p>{{$t("sectionPage.securityDetail3")}}</p>
                </div>
            </div>
            <div class="section" id="page4">
                <h2>{{$t("sectionPage.professionalTitle")}}</h2>
                <div class="section_detail">
                    <p>{{$t("sectionPage.professionalDetail1")}}</p>
                    <p>{{$t("sectionPage.professionalDetail2")}}</p>
                    <p>{{$t("sectionPage.professionalDetail3")}}</p>
                </div>
            </div>
            <div class="section" id="page5">
                <h2>{{$t("sectionPage.quicklyTitle")}}</h2>
                <div class="section_detail">
                    <p>{{$t("sectionPage.quicklyDetail1")}}</p>
                    <p>{{$t("sectionPage.quicklyDetail2")}}</p>
                    <p>{{$t("sectionPage.quicklyDetail3")}}</p>
                </div>
            </div> -->
        </div>
        <!-- <div id="onlineservice">
            <a href="https://fmkj.qiyukf.com/client?k=a89fdeb0d7b5d166c655c5d5533f1b55&wp=1" target="_blank"></a>
        </div> -->
    </div>
</template>
<style>
#page2 .ivu-table-header table,#page2 .ivu-table-body table{
    width:100% !important;
}

.indexicon {
    width: 25px;
    height: 25px;
    background-image: url(../../assets/images/gccicon.png);
    background-size: 100% 100%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
}

.gcc_usdticon {
    background-image: url(../../assets/images/gccicon.png);
}

.btc_usdticon {
    background-image: url(../../assets/images/btcicon.png);
}

.eth_usdticon {
    background-image: url(../../assets/images/ethicon.png);
}

.green {
    color: #589065 !important;
}

.red {
    color: #AE4E54 !important;
}

.brclearfix:after {
    content: '';
    display: block;
    height: 0;
    overflow: hidden;
    clear: both;
}

#page2 {
    background: #fff;
    height: auto;
    min-height: 320px;
}

.page2nav {
    padding: 0 4%;
    background: #265394;
    line-height: 60px;
    font-size: 20px;
}

.page2nav li {
    width: 20%;
    float: left;
    cursor: pointer;
    color: #fff;
}

.page2nav li.active {
    background: #1A60C0;
    position: relative;
    color: #FCD759;
}

.page2nav li.active::after {
    content: "";
    border-top: 10px solid #1A60C0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    position: absolute;
    bottom: -10px;
    left: 43%;
}
    #fullpage{
        background:#fff;
    }
    .section{
        height:640px;
        text-align:center;
        color:#fff;
    }
    .demo-carousel{
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        height:640px;
    }
    /* .demo-carousel-content{
        padding-top:230px;
    }
    .demo-carousel-content h1,.demo-carousel-content h2{
        font-weight: normal;
    }
    .demo-carousel-content h1{
        font-size: 3.5em;
    }
    .demo-carousel-content h2{
        font-size: 2em;
    }
    .demo-carousel-btn{
        width:100%;
        height:100%;
        padding-top:45px;
    }
    .demo-carousel a{
        display:inline-block;
        width:250px;
        height:45px;
        line-height: 45px;
        margin:0 15px;
        color: #fff;
        font-size:18px;
    }
    .purchase{
        background: #5983FB;
    } */
    .ptjy{
        height:100%;
        margin:50px 4% 80px 4%;
    }
    .usdt{
        float:left;
        width:100%;
    }
    .usdt_icon{
        float:left;
        width:18%;
        height:290px;
        background:#1d293a;
        padding-top:125px;
        margin:5px;
    }
    .ptjy ul{
        float:left;
        width:80%;
    }
    .ptjy ul li{
        float:left;
        width:15%;
        height:140px;
        background:#1d293a;
        margin:5px;
        cursor:pointer;
    }
    .ptjy ul li a{
        color:#fff;
    }
    .ptjy ul li:hover{
        box-shadow:0 8px 16px rgba(29, 41, 255, 0.4)
    }
    .ptjy ul li.rise label{
        color:#32b114;
    }
    .ptjy ul li.drop label{
        color:#e01a1a;
    }
    .ptjy ul li span,.ptjy ul li label{
        display:block;
        padding:10px 0;
        cursor:pointer;
    }
    .ptjy ul li label img{
        vertical-align:middle;
    }
    
    .btc,.eth{
        float:left;
        width:100%;
        margin-top:10px;
    }
    .btc_icon,.eth_icon{
        float:left;
        width:18%;
        height:140px;
        background:#1d293a;
        padding-top:50px;
        margin:5px;
    }
    .ptjy .ivu-table th{
        background: #f8f8f9;
    }
    .ptjy .ivu-table td{
        background: #fff;
    }
    /* #page3{
        position: relative;
        background: url('../../assets/images/page3_bg.jpg') center no-repeat;
        background-size: cover;
    }
    #page3 h2{
        position: absolute;
        left: 20%;
        top:35%;
    }
    #page3 .section_detail{
        position: absolute;
        left: 20%;
        top:45%;
        text-align: left;
    } */
    .section .section_detail p{
        line-height: 30px;
    }
    h1{
        font-size: 3.3em;
        color: #fff;
    }
    #page3{
        color: #8b8b8d;
        background: #f8f8fb;
        padding:0 12%;
        height: 320px;
    }
    #page4 {
    position: relative;
    color: #8b8b8d;
    height: 510px;
}

#page4 label {
    position: absolute;
    top: 30%;
    left: 70%;
    font-size: 30px;
}

#page4 ul{
    width: 88%;
    /* background: pink; */
    margin: 0 auto;
    padding: 140px 0;
}

#page4 ul li {
    display: inline-block;
    width: 25%;
    /* background: lavender; */
    float: left;
    padding: 0 15px;
}

#page4 p {
    font-size: 15px;
    margin: 30px 0;
    text-align: left;
}

#page5 {
    position: relative;
    color: #fff;
    background: #0a2c59;
    padding: 0 10%;
    text-align: center;
    padding: 130px 0px;
}

#page5 h1 {
    font-size: 50px;
    line-height: 100px;
    font-weight: normal;
}

#page5 h3 {
    font-size: 30px;
    font-weight: normal;
    line-height: 60px;
    margin-bottom: 30px;
}

#page5 ul li {
    display: inline-block;
    margin: 0 20px;
}

.page5_title {
    font-size: 30px;
    line-height: 200px;
}

.page5_content {
    text-align: left;
}

.page5_content ul {
    float: left;
    width: 27%;
}

.page5_content ul li {
    height: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.page5_content ul li span {
    margin-right: 10px;
}

.news_1 {
    color: #202b3c;
    font-size: 12px;
}

.news_2 {
    color: #505c6f;
    font-size: 13px;
}

.news_3 {
    color: #fff;
    font-size: 18px;
}

.news_title {
    color: #fff;
    font-size: 20px;
}

.news_date {
    color: #505c6f;
}

.news_detail {
    color: #98999f;
    margin-top: 10px;
}
.faqlist div{
    color:#000;
    font-size: 14px;
    line-height:26px;
    padding:15px 15px;
    word-wrap: break-word;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
}
    /* #page4{
        position:relative;
        background: url('../../assets/images/page4_bg.jpg') center no-repeat;
        background-size:cover;
    }
    #page4 h2{
        position: absolute;
        right: 20%;
        top:35%;
    }
    #page4 .section_detail{
        position: absolute;
        right: 20%;
        top:45%;
        text-align: right;
    }
    #page5{
        position:relative;
        background: url('../../assets/images/page5_bg.jpg') center no-repeat;
        background-size:cover;
    }
    #page5 h2{
        position: absolute;
        left: 20%;
        top:35%;
    }
    #page5 .section_detail{
        position: absolute;
        left: 20%;
        top:45%;
        text-align: left;
    } */
</style>
<script>
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var moment = require('moment');
import carouselShow from '../../components/otc/carousel';
import SvgLine from '@components/exchange/SvgLine.vue';

export default {
    components:{carouselShow,SvgLine},
    data() {
        let self = this;
        return {
            dataIndex: [],
            //当前市场上的交易币种，按交易对分
            coins: {
                _map: [],
                USDT: [],
                bitCNY:[],
                BTC: [],
                ETH: [],
                favor: [],
                columns: [
                    {

                        title: self.$t('common.coin'),
                        align: 'center',
                        key: 'coin',
                        render: function(h, params) {
                            return h('div', [
                                h('span', {
                                    // style:{
                                    //     color:'#FCD759'
                                    // }
                                }, params.row.coin)
                            ])
                        },
                    },
                    {
                        title: self.$t('exchange.lastPrice'),
                        align: 'center',
                        key: 'price',
                        width: '190',
                        sortable: true,
                        sortMethod: function(a, b, type) {
                            let a1 = parseFloat(a);
                            let b1 = parseFloat(b);
                            if (type == 'asc') {
                                return a1 - b1
                            } else {
                                return b1 - a1
                            }
                        },
                        render: function(h, params) {
                            var rmb = self.round(self.mul(params.row.price, 6.5), 2)
                            const isgreen = parseFloat(params.row.rose) < 0 ? 'none' : 'inline-block';
                            const nogreen = parseFloat(params.row.rose) < 0 ? 'inline-block' : 'none';
                            const className = parseFloat(params.row.rose) < 0 ? 'red' : 'green';
                            if(params.row.base=='CNY'){
                                return h('div', [
                                    h('span', {
                                        // attrs:{
                                        //     class:className
                                        // }
                                    }, '￥' + params.row.price),
                                    h('Icon', {
                                        props: {
                                            type: "arrow-up-c",
                                        },
                                        style: {
                                            display: isgreen,
                                            fontSize: '20px',
                                            marginLeft: '5px',
                                            verticalAlign: 'middle',
                                        },
                                        class: {
                                            green: true
                                        }
                                    }, '↑'),
                                    h('Icon', {
                                        props: {
                                            type: "arrow-down-c",
                                        },
                                        style: {
                                            display: nogreen,
                                            fontSize: '20px',
                                            marginLeft: '5px',
                                            verticalAlign: 'middle',
                                        },
                                        class: {
                                            red: true
                                        }
                                    }, '↓'),
                                ])
                            }else{
                                return h('div', [
                                    h('span', {
                                        // attrs:{
                                        //     class:className
                                        // }
                                    }, '$' + params.row.price + ' /￥' + rmb),
                                    h('Icon', {
                                        props: {
                                            type: "arrow-up-c",
                                        },
                                        style: {
                                            display: isgreen,
                                            fontSize: '20px',
                                            marginLeft: '5px',
                                            verticalAlign: 'middle',
                                        },
                                        class: {
                                            green: true
                                        }
                                    }, '↑'),
                                    h('Icon', {
                                        props: {
                                            type: "arrow-down-c",
                                        },
                                        style: {
                                            display: nogreen,
                                            fontSize: '20x',
                                            marginLeft: '5px',
                                            verticalAlign: 'middle',
                                        },
                                        class: {
                                            red: true
                                        }
                                    }, '↓'),
                                ])
                            }
                        },
                    },
                    {
                        title: self.$t('exchange.volume'),
                        align: 'center',
                        key: 'volume',
                        sortable: true,
                        sortMethod: function(a, b, type) {
                            let a1 = parseFloat(a);
                            let b1 = parseFloat(b);
                            if (type == 'asc') {
                                return a1 - b1
                            } else {
                                return b1 - a1
                            }
                        }
                    },
                    {
                        title: self.$t('exchange.open'),
                        align: 'center',
                        key: 'open',
                        sortable: true,
                        sortMethod: function(a, b, type) {
                            let a1 = parseFloat(a);
                            let b1 = parseFloat(b);
                            if (type == 'asc') {
                                return a1 - b1
                            } else {
                                return b1 - a1
                            }
                        }
                    },
                    {
                        title: self.$t('exchange.dayRose'),
                        align: 'center',
                        key: 'rose',
                        sortable: true,
                        sortMethod: function(a, b, type) {
                            let a1 = a.replace(/[^\d|.|-]/g, '') - 0
                            let b1 = b.replace(/[^\d|.|-]/g, '') - 0
                            if (type == 'asc') {
                                return a1 - b1
                            } else {
                                return b1 - a1
                            }
                        },
                        render: (h, params) => {
                            const row = params.row;
                            const className = parseFloat(row.rose) < 0 ? 'red' : 'green';
                            return h('span', {
                                attrs: {
                                    class: className
                                }
                            }, row.rose)
                        }
                    },
                    {
                        title:self.$t('exchange.trend'),
                        render:function(h,params){
                            return h(SvgLine,{
                                props:{
                                    values:params.row.trend,
                                    width:100,
                                    height:40
                                }
                            });
                        }
                    },
                    
                    {
                        title: self.$t('common.operate'),
                        align: 'center',
                        key: 'buyBtn',
                        render: function(h, params) {
                            return h('p', [
                                h('a', {
                                    style: {
                                        color: '#fff'
                                    },
                                    on: {
                                        click: function() {
                                            self.$router.push('/exchange/' + params.row.href);
                                        }
                                    }

                                }, [
                                        h('Button', {
                                            props: {
                                                type: 'info',
                                                long: true,
                                                shape: "circle",
                                            },
                                            style: {
                                                marginRight: '8px',
                                                width: '80%',
                                                background: '#27abe2',
                                                border: '#27abe2',
                                            },
                                        }, self.$t('exchange.goTrade'))
                                    ]),
                            ]);
                        }
                    },

                ]
            },
            indexBtn: [
                {
                    text: this.$t('sectionPage.usdt')
                },
                {
                    text: this.$t('sectionPage.btc')
                },
                {
                    text: this.$t('sectionPage.eth')
                },
                {
                    text: this.$t('sectionPage.bitCNY')
                },
                {
                    text: this.$t('sectionPage.custom')
                },
            ],
            choseBtn: 0,
            valueCal: 0,
            showArrow: 'never',
            speed: 5000,
            symbol: '',
            usdtData: [],
            usdtList: [

            ],
            bitCNYList:[

            ],
            btcList: [

            ],
            ethList: [

            ],
            FAQList: []
        }
    },
    created: function() {
        this.init();
    },
    computed: {
        'isLogin': function() {
            return this.$store.getters.isLogin;
        },
        'lang': function () {
          return this.$store.state.lang;
        }
    },
    watch:{
        'lang':function () {
          this.updateLangData();
        }
    },
    mounted: function() {
        this.getSymbol();
    },

    methods: {
        updateLangData(){
          this.indexBtn = [
                {
                    text: this.$t('sectionPage.usdt')
                },
                {
                    text: this.$t('sectionPage.btc')
                },
                {
                    text: this.$t('sectionPage.eth')
                },
                {
                    text: this.$t('sectionPage.bitCNY')
                },
                {
                    text: this.$t('sectionPage.custom')
                }
          ];

          this.coins.columns[0].title = this.$t('common.coin');
          this.coins.columns[1].title = this.$t('exchange.lastPrice');
          this.coins.columns[2].title = this.$t('exchange.volume');
          this.coins.columns[3].title = this.$t('exchange.open');
          this.coins.columns[4].title = this.$t('exchange.dayRose');
          this.coins.columns[5].title = this.$t('exchange.trend');
          this.coins.columns[6].title = this.$t('common.operate');
        },
        init() {
            this.$store.commit('navigate','nav-index');
            this.addClass(0);
            this.loadDataPage(1);
        },
        getCoin(symbol) {
            return this.coins._map[symbol];
        },
        startWebsock() {
            var stompClient = null;
            var that = this;
            var socket = new SockJS(that.host + that.api.market.ws);
            stompClient = Stomp.over(socket);
            stompClient.debug = false;
            stompClient.connect({}, function(frame) {
                //订阅价格变化消息
                stompClient.subscribe('/topic/market/thumb', function(msg) {
                    var resp = JSON.parse(msg.body);
                    var coin = that.getCoin(resp.symbol);
                    if (coin != null) {
                        coin.price = (resp.close).toFixed(2);
                        coin.rose = resp.chg > 0 ? ('+' + (resp.chg * 100).toFixed(2) + '%') : ((resp.chg * 100).toFixed(2) + '%');
                        coin.close = (resp.close).toFixed(2);
                        coin.volume = parseInt(resp.volume);
                        coin.open = (resp.open).toFixed(2);
                    }
                });
            });
        },
        round(v, e) {
            var t = 1;
            for (; e > 0; t *= 10, e--);
            for (; e < 0; t /= 10, e++);
            return Math.round(v * t) / t;
        },
        mul(a, b) {
            var c = 0,
                d = a.toString(),
                e = b.toString();
            try {
                c += d.split(".")[1].length;
            } catch (f) { }
            try {
                c += e.split(".")[1].length;
            } catch (f) { }
            return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
        },
        addClass(index) {
            this.choseBtn = index;
            if (index == 0) {
                this.dataIndex = this.coins.USDT
            } else if (index == 1) {
                this.dataIndex = this.coins.BTC
            } else if (index == 2) {
                this.dataIndex = this.coins.ETH
            } else if (index == 3) {
                this.dataIndex = this.coins.bitCNY
            } else if (index == 4) {
                if (this.isLogin) {
                    this.dataIndex = this.coins.favor;
                } else {
                    this.$router.push('/login');
                }
            }
        },
        getSymbol() {
            this.$http.post(this.host + this.api.market.thumbTrend, {}).then(response => {
                var resp = response.body;
                for (var i = 0; i < resp.length; i++) {
                    var coin = resp[i];
                    coin.price = (resp[i].close).toFixed(2);
                    coin.rose = resp[i].chg > 0 ? ('+' + (resp[i].chg * 100).toFixed(2) + '%') : ((resp[i].chg * 100).toFixed(2) + '%');
                    coin.coin = (resp[i].symbol).split('/')[0];
                    coin.base = (resp[i].symbol).split('/')[1];
                    coin.href = (coin.coin + '_' + coin.base).toLowerCase();
                    coin.volume = parseInt(resp[i].volume);
                    coin.open= (resp[i].open).toFixed(2);
                    coin.isFavor = false;
                    this.coins._map[coin.symbol] = coin;
                    if(this.coins[coin.base]!=undefined){
                        this.coins[coin.base].push(coin);
                    }
                    
                }
                if (this.isLogin) {
                  this.getFavor();
                }
                this.startWebsock();
                
            })
        },
        getFavor() { //查询自选
            this.$http.post(this.host + this.api.exchange.favorFind, {}).then(response => {
                var resp = response.body;
                for (var i = 0; i < resp.length; i++) {
                    var coin = this.getCoin(resp[i].symbol);
                    this.coins.favor.push(coin);
                }
            });
        },
        loadDataPage(pageIndex){
            var param = {};
            param["pageNo"] = pageIndex,
            param["pageSize"] = 10,
            this.$http.post(this.host + this.api.uc.announcement, param).then(response => {
            var resp = response.body;
            if(resp.code==0){
                this.FAQList = resp.data.content;
            }else{
                this.$Notice.error({
                title: this.$t('common.tips'),
                desc: resp.message
                });
            }
            });
        },
        noticedeail(id){
            var path =  {path:'/notice/index',query:{id:id}};
            this.$router.push(path);
        },
        donwload(type){
          const title = this.$t('common.tips');
          const content = '<p>'+this.$t('common.expect')+'</p>';
          this.$Modal.info({
            title: title,
            content: content,
            closable: true
          });
        }
    }

}
</script>