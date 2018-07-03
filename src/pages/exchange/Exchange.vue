<template>
    <div class="exchange">
        <div class="sidebar">
            <div class="sc">
                {{$t('exchange.market')}}
            </div>
            <div class="sc_filter">
                <span v-if="currentCoin.base=='USDT'" class="active">USDT</span>
                <span v-else>USDT</span>
                <span v-if="currentCoin.base=='BTC'" class="active">BTC</span>
                <span v-else>BTC</span>
                <span v-if="currentCoin.base=='ETH'" class="active">ETH</span>
                <span v-else>ETH</span>
                <span v-if="currentCoin.base=='bitCNY'" class="active">bitCNY</span>
                <span v-else>bitCNY</span>
                <Icon style="line-height:32px;" type="android-star"></Icon>
            </div>
            <Table @on-current-change="gohref" highlight-row id="USDT" v-if="currentCoin.base=='USDT'" v-show="true" :columns="coins.columns" :data="coins.USDT" :no-data-text="$t('common.nodata')"></Table>
            <Table @on-current-change="gohref" highlight-row id="USDT" v-else v-show="false" :columns="coins.columns" :data="coins.USDT" :no-data-text="$t('common.nodata')"></Table>
            <Table @on-current-change="gohref" highlight-row id="BTC" v-if="currentCoin.base=='BTC'" v-show="true" :columns="coins.columns" :data="coins.BTC" :no-data-text="$t('common.nodata')"></Table>
            <Table @on-current-change="gohref" highlight-row id="BTC" v-else v-show="false" :columns="coins.columns" :data="coins.BTC" :no-data-text="$t('common.nodata')"></Table>
            <Table @on-current-change="gohref" highlight-row id="ETH" v-if="currentCoin.base=='ETH'" v-show="true" :columns="coins.columns" :data="coins.ETH" :no-data-text="$t('common.nodata')"></Table>
            <Table @on-current-change="gohref" highlight-row id="ETH" v-else  v-show="false" :columns="coins.columns" :data="coins.ETH" :no-data-text="$t('common.nodata')"></Table>
            <Table @on-current-change="gohref" highlight-row id="bitCNY" v-if="currentCoin.base=='bitCNY'" v-show="true" :columns="coins.columns" :data="coins.bitCNY" :no-data-text="$t('common.nodata')"></Table>
            <Table @on-current-change="gohref" highlight-row id="bitCNY" v-else  v-show="false" :columns="coins.columns" :data="coins.bitCNY" :no-data-text="$t('common.nodata')"></Table>
            <Table @on-current-change="gohref" highlight-row id="collect" v-show="false" :columns="coins.columns" :data="coins.favor" :no-data-text="$t('common.nodata')"></Table>
        </div>
        <div class="kline">
            <div class="mod_hd">
                <dl>
                    <dt>
                        {{currentCoin.symbol}}
                        <span>{{currentCoin.close | toFixed(baseCoinScale)}}</span>
                    </dt>
                    <dd>
                        <span>≈ {{currentCoin.close*CNYRate | toFixed(2)}} CNY</span>
                    </dd>
                    <dd>
                        <span>{{$t('exchange.rose')}} <label :class="{buy:currentCoin.change>0,sell:currentCoin.change<0}">{{currentCoin.rose}}</label></span>
                    </dd>
                    <dd>
                        <span>{{$t('exchange.high')}} {{currentCoin.high}}</span>
                    </dd>
                    <dd>
                        <span>{{$t('exchange.low')}} {{currentCoin.low}}</span>
                    </dd>
                    <dd>
                        <span>24H{{$t('exchange.vol')}} {{currentCoin.volume}} {{currentCoin.coin}}</span>
                    </dd>
                </dl>
            </div>
            <div id="kline_container">
            
            </div>
            <div class="trade_wrap">
                <div class="trade_panel trade_panel_logout">
                    <div class="trade_hd">
                        <div class="mod_tab">
                            <ul>
                                <li id="limited_price" @click="limited_price" class="active">{{$t('exchange.limited')}}</li>
                                <li id="market_price" @click="market_price">{{$t('exchange.marketed')}}</li>
                            </ul>
                        </div>
                        <!-- <div class="feesRate">
                            <router-link to="/about-fee">{{$t('exchange.fees')}}</router-link>
                        </div>                     -->
                    </div>
                    <div class="trade_bd">
                        <div class="panel panel_buy">
                            <div v-if="isLogin" class="hd hd_login">
                                <span>{{$t('exchange.available')}}</span>
                                <b>{{wallet.base}}</b>
                                <span>{{currentCoin.base}}</span>
                                <a :href="rechargeUSDTUrl">{{$t('common.deposit')}}</a>
                            </div>
                            <div class="hd" v-else>
                                <router-link to="/login">{{$t('common.login')}}</router-link>
                                {{$t('common.or')}}<router-link to="/register">{{$t('common.register')}}</router-link>{{$t('exchange.toTrade')}}
                            </div>
                            <div class="bd bd_limited" v-show="!showMarket">
                                <Form ref="formValidate">
                                    <p style="font-size:14px;color:#153679;line-height:35px;">
                                        {{$t('exchange.buyPrice')}}
                                    </p>
                                    <FormItem>
                                        <Input :maxlength='maxlength' @on-keyup="keyEvent" v-model="form.buy.limitPrice"></Input>
                                        <label>{{currentCoin.base}}</label>
                                        <p class="math_price">≈ {{form.buy.limitPrice*CNYRate|toFixed(2)}} CNY</p>
                                    </FormItem>
                                    <p style="font-size:14px;color:#153679;line-height:35px;">
                                        {{$t('exchange.buyAmount')}}
                                    </p>
                                    <FormItem>
                                        <Input :maxlength='maxlength' @on-keyup="keyEvent" v-model="form.buy.limitAmount"></Input>
                                        <label>{{currentCoin.coin}}</label>
                                    </FormItem>
                                    <div class="total buy_total"> 
                                        {{$t('exchange.turnover')}} <span>{{form.buy.limitTurnover}}</span> {{currentCoin.base}}
                                    </div>
                                    <Button class="buy" type="primary" @click="buyWithLimitPrice" :disabled=isBuyWithLimitPrice v-show="isLogin">{{$t('common.buy')}} {{currentCoin.coin}}</Button>
                                </Form>
                            </div>
                            <div class="bd bd_market" v-show="showMarket">
                                <Form ref="formValidate">
                                    <p style="font-size:14px;color:#153679;line-height:35px;">
                                        {{$t('exchange.buyPrice')}}
                                    </p>
                                    <FormItem>
                                        <Input disabled :placeholder="$t('exchange.marketBuyTips')"></Input>
                                        <label>{{currentCoin.base}}</label>
                                    </FormItem>
                                    <p style="font-size:14px;color:#153679;line-height:35px;">
                                        {{$t('exchange.turnover')}}
                                    </p>
                                    <FormItem>
                                        <Input :maxlength='maxlength' @on-keyup="keyEvent" v-model="form.buy.marketAmount"></Input>
                                        <label>{{currentCoin.base}}</label>
                                    </FormItem>
                                    <Button class="buy" type="primary"  @click="buyWithMarketPrice" :disabled=isBuyWithMarketPrice  v-show="isLogin">{{$t('common.buy')}} {{currentCoin.coin}}</Button>
                                </Form>
                            </div>
                        </div>
                        <div class="panel panel_sell">
                            <div v-if="isLogin" class="hd hd_login">
                                <span>{{$t('exchange.available')}}</span>
                                <b>{{wallet.coin}}</b>
                                <span>{{currentCoin.coin}}</span>
                                <a :href="rechargeCoinUrl">{{$t('common.deposit')}}</a>
                            </div>
                            <div class="hd" v-else>
                                <router-link to="/login">{{$t('common.login')}}</router-link>
                                {{$t('common.or')}}<router-link to="/register">{{$t('common.register')}}</router-link>{{$t('exchange.toTrade')}}
                            </div>
                            <div class="bd bd_limited" v-show="!showMarket">
                                <Form ref="formValidate">
                                    <p style="font-size:14px;color:#153679;line-height:35px;">
                                        {{$t('exchange.sellPrice')}}
                                    </p>
                                    <FormItem>
                                        <Input :maxlength='maxlength' @on-keyup="keyEvent" v-model="form.sell.limitPrice"></Input>
                                        <label>{{currentCoin.base}}</label>
                                        <p class="math_price">≈ {{form.sell.limitPrice*CNYRate|toFixed(2)}} CNY</p>
                                    </FormItem>
                                    <p style="font-size:14px;color:#153679;line-height:35px;">
                                        {{$t('exchange.sellAmount')}}
                                    </p>
                                    <FormItem>
                                        <Input :maxlength='maxlength' @on-keyup="keyEvent" v-model="form.sell.limitAmount"></Input>
                                        <label>{{currentCoin.coin}}</label>
                                    </FormItem>
                                    <div class="total sell_total"> 
                                        {{$t('exchange.turnover')}} <span>{{form.sell.limitTurnover}}</span> {{currentCoin.base}}
                                    </div>
                                    <Button class="sell" type="primary"  @click="sellLimitPrice"  :disabled=isSellLimitPrice  v-show="isLogin">{{$t('common.sell')}} {{currentCoin.coin}}</Button>
                                </Form>
                            </div>
                            <div class="bd bd_market" v-show="showMarket">
                                <Form ref="formValidate">
                                    <p style="font-size:14px;color:#153679;line-height:35px;">
                                        {{$t('exchange.sellPrice')}}
                                    </p>
                                    <FormItem>
                                        <Input disabled :placeholder="$t('exchange.marketSellTips')"></Input>
                                        <label>{{currentCoin.base}}</label>
                                    </FormItem>
                                    <p style="font-size:14px;color:#153679;line-height:35px;">
                                        {{$t('exchange.sellAmount')}}
                                    </p>
                                    <FormItem>
                                        <Input :maxlength='maxlength' @on-keyup="keyEvent" v-model="form.sell.marketAmount"></Input>
                                        <label>{{currentCoin.coin}}</label>
                                    </FormItem>
                                    <Button class="sell"  type="primary" @click="sellMarketPrice" :disabled=isSellMarketPrice  v-show="isLogin">{{$t('common.sell')}} {{currentCoin.coin}}</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order_book">
                    <div class="order_book_hd">
                        {{$t('exchange.lastPrice')}}&nbsp;&nbsp;{{currentCoin.price | toFixed(baseCoinScale)}}&nbsp;&nbsp;{{currentCoin.base}}<span style="font-size: 12px;color: #61688A;"> ≈ {{currentCoin.close*CNYRate | toFixed(2)}} CNY</span>
                    </div>
                    <Table :height="200" @on-current-change="buyPlate" highlight-row ref="currentRowTable" class="sell_table" :columns="plate.columns" :data="plate.askRows" :no-data-text="$t('common.nodata')"></Table>
                    <Table :height="175" @on-current-change="sellPlate" highlight-row class="buy_table" :columns="plate.columns" :data="plate.bidRows" :no-data-text="$t('common.nodata')"></Table>
                </div>
            </div>
            <div class="open_orders" v-show="isLogin">
                <Tabs>
                    <TabPane :label="$t('exchange.currentOrder')">
                        <Table height="295" :columns="currentOrder.columns" :data="currentOrder.rows" :no-data-text="$t('common.nodata')"></Table>
                    </TabPane>
                    <TabPane :label="$t('exchange.historyOrder')">
                        <Table :height="fixHistoryHeight" :columns="historyOrder.columns" :data="historyOrder.rows" :no-data-text="$t('common.nodata')"></Table>
                        <div style="float: right;margin-top:15px;">
                            <Page v-if="historyOrder.rows.length>0" :total="historyOrder.total" :page-size="historyOrder.pageSize" :current="historyOrder.page" size="small" @on-change="changeHistoryOrder"></Page>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
            <div class="deal_record">
                <div class="deal_record_hd">
                    {{$t('exchange.realtimeTrade')}}
                </div>
                <Table height="305" :columns="trade.columns" :data="trade.rows" :no-data-text="$t('common.nodata')"></Table>
            </div>
            <div class="open_orders" v-show="isLogin" style="width:64%;margin-top:15px;">
                <Tabs>
                    <TabPane :label="'深度图'">
                        <depth :depData='depData'></depth>
                    </TabPane>
                    
                </Tabs>
            </div>
        </div>
    </div>
</template>
<style>
   @import url(../../assets/css/exchange.css);
</style>
<script>
import expandRow from '@components/exchange/expand.vue';
import depth from "@components/exchange/depth.vue";
import Datafeeds from '@js/charting_library/datafeed/bitrade.js';
var Stomp = require('stompjs');
var SockJS = require('sockjs-client');
var moment = require('moment');
//var $ = require('jquery');

require.ensure([],function(require){
  require('jquery');
});

export default {
    components: { expandRow, depth},
    data () {
        let self = this;
        return {
            CNYRate:null,
            datafeed:null,
            defaultPath:'btc_usdt',
            coinScale:4,
            baseCoinScale:4,
            depData:{},
            currentCoin:{
                symbol:''
            },
            isBuyWithLimitPrice:false,
            isBuyWithMarketPrice:false,
            isSellMarketPrice:false,
            isSellLimitPrice:false,
            //当前市场上的交易币种，按交易对分
            coins:{
                _map:[],
                USDT:[],
                bitCNY:[],
                BTC:[],
                ETH:[],
                favor:[],
                columns: [
                    {
                        title: self.$t('common.coin'),
                        key: 'coin',
                        sortable:false
                    },
                    {
                        title: self.$t('exchange.lastPrice'),
                        key: 'close',
                        sortable:true,
                        sortMethod:function(a,b,type){
                            let a1=parseFloat(a);
                            let b1=parseFloat(b);
                            if(type=='asc'){
                                return a1-b1
                            }else{
                                return b1-a1
                            }
                        }
                    },
                    {
                        title: self.$t('exchange.rose'),
                        key: 'rose',
                        sortable:true,
                        sortMethod:function(a,b,type){
                            let a1=a.replace(/[^\d|.|-]/g, '') - 0
                            let b1=b.replace(/[^\d|.|-]/g, '') - 0
                            if(type=='asc'){
                                return a1-b1
                            }else{
                                return b1-a1
                            }
                        },
                        render: (h,params) => {
                            const row=params.row;
                            const className=parseFloat(row.rose)<0?'sell':'buy';
                            return h('span',{   
                                attrs:{
                                class:className
                                }
                            },row.rose)  
                        }
                    },
                    {
                        title: self.$t('exchange.collect'),
                        key: 'collection',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type:params.row.isFavor?'android-star':'android-star-outline'
                                    },
                                    nativeOn: {
                                        click: () => {
                                            if(self.isLogin){
                                                event.stopPropagation();//阻止事件冒泡
                                                if(event.currentTarget.className=='ivu-icon ivu-icon-android-star'){
                                                    self.cancelCollect(params.index,params.row);
                                                    event.currentTarget.className=='ivu-icon ivu-icon-android-star-outline';
                                                }else{
                                                    self.collect(params.index,params.row);
                                                    event.currentTarget.className='ivu-icon ivu-icon-android-star';
                                                }
                                            }
                                        }
                                    }
                                })
                            ])
                        }
                    }
                ]
            },
            wallet:{
                base:0.00,
                coin:0.00,
            },
            showMarket:false,
            maxlength:14,
            fixHistoryHeight:295,
            form: {
                buy:{
                    limitPrice:0.00,
                    limitAmount:0.00,
                    marketAmount:0.00,
                    limitTurnover:0.00
                },
                sell:{
                    limitPrice:0.00,
                    limitAmount:0.00,
                    marketAmount:0.00,
                    limitTurnover:0.00
                }
            },
            trade:{
                rows:[],
                columns:[
                    {
                        title: self.$t('common.amount'),
                        key: 'amount',
                        render:(h,params)=>{
                            // return params.row.amount.toFixed(self.coinScale);
                            var  amount=params.row.amount.toFixed(this.coinScale);
                            return h('span',{

                            },amount);
                        }
                    },
                    {
                        title: self.$t('common.price'),
                        key: 'price',
                        render: (h,params) => {
                            const row=params.row;
                            const className=row.direction=='BUY'?'buy':'sell';

                            return h('span',{   
                                attrs:{
                                    class:className
                                }
                            },params.row.price.toFixed(self.baseCoinScale))
                        }
                    },
                    

                    {
                        title: self.$t('exchange.direction'),
                        key: 'direction',
                        render: (h,params) => {
                            const row=params.row;
                            const className=row.direction=='BUY'?'buy':'sell';
                            const direction=row.direction=='BUY'?self.$t('common.buy'):self.$t('common.sell');
                            return h('span',{   
                                attrs:{
                                    class:className
                                }
                            },direction)  
                        }
                    },
                    {   
                        title: self.$t('exchange.time'),
                        key: 'time',
                        render:(h,params)=>{
                          
                            // return self.timeFormat(params.row.time);
                             return h('span',{
                            },moment(params.row.time).format("HH:mm:ss"));
                        }
                    }
                ]
            },  
            plate:{
                maxPostion:7,
                columns:[
                    {
                        title: self.$t('exchange.gear'),
                        key: 'postion',
                        render: (h,params) => {
                            const row=params.row;
                            const className = row.direction.toLowerCase();
                            const title =  (row.direction=='BUY'?self.$t('common.buy'):self.$t('common.sell')) +' '+ row.position;
                            return h('span',{   
                                attrs:{
                                    class:className
                                }
                            },title)
                        }
                    },
                    {
                        title: self.$t('common.price'),
                        key: 'price',
                        render:(h,params)=>{
                            // if(params.row.price == 0)  return "--";
                            // return params.row.price.toFixed(self.baseCoinScale);
                            const price= params.row.price == 0? "--":params.row.price.toFixed(self.baseCoinScale);
                            return h("span" ,{}, price);
                        }
                    },
                    {
                        title: self.$t('common.amount'),
                        key: 'amount',
                        render:(h,params)=>{
                            // if(params.row.amount == 0) return "--";
                            // return params.row.amount.toFixed(self.coinScale);
                            const amount =  (params.row.amount==0)?'--':params.row.amount.toFixed(this.coinScale);
                            return h('span',{
                            },amount)
                        }
                    },
                    {   
                        title: self.$t('exchange.total'),
                        key: 'totalAmount',
                        render:(h,params)=>{
                            // if(params.row.totalAmount == 0) return "--";
                            // return params.row.totalAmount.toFixed(self.coinScale);
                            const price =  (params.row.price==0 || params.row.totalAmount == 0)?'--':params.row.totalAmount.toFixed(this.baseCoinScale);
                            return h('span',{
                            },price)
                        }
                    }
                ],
                askRows:[],
                bidRows:[]
            },
            currentOrder:{
                columns:[
                    {
                        title: self.$t('exchange.time'),
                        key: 'time',
                        render:(h,params)=>{
                            // return self.timeFormat(params.row.time);
                            return h('span',{
                            },moment(params.row.time).format("YYYY-MM-DD HH:mm:ss"))
                        }
                    },
                    {
                        title: self.$t('exchange.direction'),
                        key: 'direction',
                        render: (h,params) => {
                            const row=params.row;
                            const className=row.direction.toLowerCase();
                            return h('span',{
                                attrs:{
                                    class:className
                                }
                            },row.direction == 'BUY' ? self.$t('common.buy') : self.$t('common.sell'))
                        }
                    },
                    {
                        title: self.$t('common.price'),
                        key: 'price'
                    },
                    {   
                        title: self.$t('common.amount'),
                        key: 'amount'
                    },
                    {   
                        title: self.$t('exchange.tradedAmount'),
                        key: 'tradedAmount'
                    },
                    {   
                        title: self.$t('common.operate'),
                        key: 'operate',
                        width:110,
                        render: (h, params) => {
                            return h('Button', {
                                    props: {
                                        size: 'small'
                                    },
                                    style: {
                                        background:'#54677F',
                                        borderColor:'#54677F',
                                        height:'20px',
                                        lineHeight:'15px'
                                    },
                                    on: {
                                        click: () => {
                                            self.cancel(params.index)
                                        }
                                    }
                            }, self.$t('exchange.cancel'))
                        }
                    }
                ],
                rows:[]
            },
            historyOrder:{
                pageSize:10,
                total:10,
                page:1,
                columns: [
                    {
                        type: 'expand',
                        width: 40,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    rows: params.row.detail
                                }
                            })
                        }
                    },
                    {
                        title: self.$t('exchange.time'),
                        key: 'time',
                        render:(h,params)=>{
                            // return self.dateFormat(params.row.time);
                             return h('span',{
                            },moment(params.row.time).format("YYYY-MM-DD HH:mm:ss"))
                        }
                    },
                    {
                        title: self.$t('exchange.direction'),
                        key: 'direction',
                        render: (h,params) => {
                            const row=params.row;
                            const className=row.direction.toLowerCase();
                            return h('span',{   
                                attrs:{
                                    class:className
                                }
                            },row.direction=='BUY'?self.$t('common.buy'):self.$t('common.sell'))  
                        }
                    },
                    {
                        title: self.$t('common.price'),
                        key: 'price'
                    },
                    {   
                        title: self.$t('exchange.entrust'),
                        key: 'amount'
                    },
                    {   
                        title: self.$t('exchange.tradedAmount'),
                        key: 'tradedAmount'
                    },
                    {
                        title: self.$t('common.status'),
                        key: 'status',
                        render:(h,params)=>{
                            // const status = params.row.status;
                            // if(status == 'COMPLETED'){
                            //     return self.$t('common.completed');
                            // }
                            // else if(status == 'CANCELED'){
                            //     return self.$t('common.cancelled');
                            // }
                            // else {
                            //     return '';
                            // }
                            const status = params.row.status;
                            if(status == 'COMPLETED'){
                                // return self.$t('exchange.finished');
                                return h('span',{
                                },self.$t('common.completed'))
                            }
                            else if(status == 'CANCELED'){
                                return h('span',{
                                },self.$t('common.cancelled'))
                                // return self.$t('exchange.canceled');
                            }
                            else {
                                 return h('span',{
                                },'')
                            }
                        }
                    }
                ],
                rows:[]
            }
        }
    },
    computed:{
        'rechargeUSDTUrl':function () {
            if(this.currentCoin.base=='bitCNY'){
                return "#/finance/legalRecharge?name="+this.currentCoin.base;
            }else{
                return "#/finance/recharge?name="+this.currentCoin.base;
            }
        },
        'rechargeCoinUrl':function () {
          return '#/finance/recharge?name='+this.currentCoin.coin;
        },
        'isLogin':function(){
            return this.$store.getters.isLogin;
        },
        'member':function(){
            return this.$store.getters.member;
        },
        'lang': function () {
          return this.$store.state.lang;
        },
        'usdcny':function(){
            return this.$store.getters.usdcny;
        }
    },
    watch:{
        'form.buy.limitPrice':function(val){
            this.form.buy.limitTurnover = (val*this.form.buy.limitAmount).toFixed(8);
　　　　 },
        'form.buy.limitAmount':function(val){
            this.form.buy.limitTurnover = (val*this.form.buy.limitPrice).toFixed(8);
　　　　 },
        'form.sell.limitPrice':function(val){
            this.form.sell.limitTurnover = (val*this.form.sell.limitAmount).toFixed(8);
　　　　 },
        'form.sell.limitAmount':function(val){
            this.form.sell.limitTurnover = (val*this.form.sell.limitPrice).toFixed(8);
　　　　 },
        "currentOrder.rows":function(){
            this.getDep(this.currentCoin.symbol)
        },
        'lang':function () {
          this.updateLangData();
        },
        'currentCoin':function () {
          this.updateTitle();
          this.updateCNYRate()
        },
        'currentCoin.price':function () {
          this.updateTitle();
        }
    },
    created:function(){
        this.init();
    },
    mounted:function(){
        this.getSymbolScale();
        this.getCNYRate();
        this.getSymbol();
        this.getPlate();
        this.getTrade();
        if(this.isLogin){
            this.getFavor();
            this.getWallet();
            this.getCurrentOrder();
            this.getHistoryOrder();
        }
    },
    methods:{
        updateTitle(){
          let title = this.currentCoin.price + " " + this.currentCoin.rose + " " + this.currentCoin.coin + "/" + this.currentCoin.base;
          title += "领衔全球的数字资产交易平台 -- 【mybtcsafe】";
          window.document.title = title;
        },
        updateLangData(){
          this.coins.columns[0].title = this.$t("common.coin");
          this.coins.columns[1].title = this.$t("exchange.lastPrice");
          this.coins.columns[2].title = this.$t("exchange.rose");
          this.coins.columns[3].title = this.$t("exchange.collect");

          this.trade.columns[0].title = this.$t('common.amount');
          this.trade.columns[1].title = this.$t('common.price');
          this.trade.columns[2].title = this.$t('exchange.direction');
          this.trade.columns[3].title = this.$t('exchange.time');

          this.plate.columns[0].title = this.$t("exchange.gear");
          this.plate.columns[1].title = this.$t("common.price");
          this.plate.columns[2].title = this.$t("common.amount");
          this.plate.columns[3].title = this.$t("exchange.total");

          this.currentOrder.columns[0].title = this.$t("exchange.time");
          this.currentOrder.columns[1].title = this.$t("exchange.direction");
          this.currentOrder.columns[2].title = this.$t("common.price");
          this.currentOrder.columns[3].title = this.$t("common.amount");
          this.currentOrder.columns[4].title = this.$t("exchange.tradedAmount");
          this.currentOrder.columns[5].title = this.$t("common.operate");

          this.historyOrder.columns[1].title = this.$t("exchange.time");
          this.historyOrder.columns[2].title = this.$t("exchange.direction");
          this.historyOrder.columns[3].title = this.$t("common.price");
          this.historyOrder.columns[4].title = this.$t("exchange.entrust");
          this.historyOrder.columns[5].title = this.$t("exchange.tradedAmount");
          this.historyOrder.columns[6].title = this.$t("common.status");

          // window.tvWidget.options.time_frames[0].title = this.$t("exchange.realtime");
      },
      updateCNYRate(){
           this.CNYRate=this.currentCoin.baseUsdRate*this.usdcny;
      },
        init(){
            this.$store.commit('navigate','nav-exchange');
            
            var params=this.$route.params[0];
            if(params==undefined){
                this.$router.push('/exchange/'+this.defaultPath);
                params = this.defaultPath;
            }

            var coin = params.toUpperCase().split('_')[0];
            if(params.split('_')[1]=='bitcny'){
                var base= 'bitCNY';
            }else{
                var base = params.toUpperCase().split('_')[1];
            }
            this.currentCoin.symbol = coin+'/'+base;
            this.currentCoin.coin = coin;
            this.currentCoin.base = base;
           
            this.getSymbolScale();
        },
        getCNYRate(){
          this.$http.post(this.host + '/market/exchange-rate/usd-cny').then(response => {
            var resp = response.body;
            // this.CNYRate=this.currentCoin.baseUsdRate*resp.data;
            this.$store.commit('setUsdcny',resp.data);
          });
        },
        getDep(coin) {
            let data = {}
            data.symbol=coin
            this.$http
                .post(this.host + "/market/exchange-plate-full",data)
                .then(response => {
                    var resp = response.body;
                    this.depData=resp
                    this.depData.coin=this.currentCoin.coin
                });
        },
        getCoin(symbol){
            return this.coins._map[symbol];
        },
        getKline(){
            var that = this;
            require(["@js/charting_library/charting_library.min.js"],function(tv){
                var widget = window.tvWidget = new TradingView.widget({
                        fullscreen: true,
                        symbol: that.symbol,
                        interval: '1',
                        timezone: 'Asia/Shanghai',
                        toolbar_bg: '#18202a',
                        container_id: "kline_container",
                        // datafeed: new Datafeeds.WebsockFeed(that.host+'/market',that.currentCoin),
                        datafeed: that.datafeed,
                        library_path: process.env.NODE_ENV === 'production'?"/assets/charting_library/":'src/assets/js/charting_library/',
                        locale: "zh", 
                        debug: false,
                        drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
                        disabled_features: ["header_resolutions","header_symbol_search","header_chart_type","header_compare","header_undo_redo","header_screenshot","header_saveload","use_localstorage_for_settings","volume_force_overlay"],
                        enabled_features: ["hide_last_na_study_output","move_logo_to_main_pane"],
                        custom_css_url:'bundles/common.css',
                        supported_resolutions: ["1","5","15","30","60","240","1D","1W","1M"],
                        charts_storage_url: 'http://saveload.tradingview.com',
                        charts_storage_api_version: "1.1",
                        client_id: 'tradingview.com',
                        user_id: 'public_user_id',
                        overrides: {
                            "paneProperties.background": "#1B1E2E",
                            "paneProperties.vertGridProperties.color": "#102238",
                            "paneProperties.horzGridProperties.color": "#102238",
                            "scalesProperties.textColor" : "#AAA", 
                            "mainSeriesProperties.candleStyle.upColor": "#589065",
                            "mainSeriesProperties.candleStyle.downColor": "#AE4E54",
                            "mainSeriesProperties.candleStyle.drawBorder": false,
                            "mainSeriesProperties.candleStyle.wickUpColor": "#589065",
                            "mainSeriesProperties.candleStyle.wickDownColor": "#AE4E54",
                            "paneProperties.legendProperties.showLegend": false,

                            "mainSeriesProperties.areaStyle.color1": "rgba(71, 78, 112, 0.5)",
                            "mainSeriesProperties.areaStyle.color2": "rgba(71, 78, 112, 0.5)",
                            "mainSeriesProperties.areaStyle.linecolor": "#9194a4",                        
                        },
                        time_frames: [
                            { text: "1min", resolution: "1", description: "realtime",title:that.$t('exchange.realtime') },
                            { text: "1min", resolution: "1", description: "1min" },
                            { text: "5min", resolution: "5", description: "5min" },
                            { text: "15min", resolution: "15", description: "15min" },
                            { text: "30min", resolution: "30", description: "30min" },
                            { text: "1hour", resolution: "60", description: "1hour",title: "1hour" },
                            { text: "1day", resolution: "1D", description: "1day",title: "1day" },
                            { text: "1week", resolution: "1W", description: "1week",title: "1week" },
                            { text: "1mon", resolution: "1M", description: "1mon" }
                        ] 
                });
                widget.onChartReady(function() {
                    widget.chart().createStudy("Moving Average", false, false, [5], null, { "plot.color": "#965FC4" });
                    widget.chart().createStudy("Moving Average", false, false, [10], null, { "plot.color": "#84AAD5" });
                })
            });
        },
        getFavor(){ //查询自选
            this.$http.post(this.host+this.api.exchange.favorFind,{}).then(response => {
                var resp=response.body;
                for(var i=0;i<resp.length;i++){
                    var coin = this.getCoin(resp[i].symbol)
                    if(coin != null){
                        coin.isFavor = true;
                        this.coins.favor.push(coin);
                    }
                }
            });
        },
        getSymbol(){
            this.$http.post(this.host+this.api.market.thumb,{}).then(response => {
                var resp=response.body;
                for(var i=0;i<resp.length;i++){
                    var coin=resp[i];
                    coin.price=(resp[i].close).toFixed(this.baseCoinScale);
                    coin.rose=resp[i].chg>0 ? ('+'+(resp[i].chg*100).toFixed(2)+'%') : ((resp[i].chg*100).toFixed(2)+'%');
                    coin.close=(resp[i].close).toFixed(2);
                    coin.high=(resp[i].high).toFixed(2);
                    coin.low=(resp[i].low).toFixed(2);
                    coin.volume=parseInt(resp[i].volume);

                    coin.coin=(resp[i].symbol).split('/')[0];
                    coin.base=(resp[i].symbol).split('/')[1];
                    coin.href=(coin.coin+'_'+coin.base).toLowerCase();
                    coin.isFavor = false;
                    this.coins._map[coin.symbol] = coin;
                    this.coins[coin.base].push(coin);
                    
                    if(coin.symbol==this.currentCoin.symbol){
                        this.currentCoin = coin;
                        this.getDep(this.currentCoin.symbol)
                        this.form.buy.limitPrice = this.form.sell.limitPrice = coin.price;
                        
                        this.currentCoin.baseUsdRate=coin.baseUsdRate;
                    }
                }
                require(["../../assets/js/exchange.js"],function(e){
                    e.clickScTab();
                });
                this.startWebsock();
                // console.log(this.coins.USDT);
                // var usdt=this.coins.USDT;
                // for(var j=0;j<usdt.length;j++){
                //     usdt[j].href=(usdt[j].coin).toLowerCase()+'_cny';
                //     usdt[j].base='CNY';
                // }
            })
        },
        getSymbolScale(){ //获取精度
            this.$http.post(this.host+this.api.market.symbolInfo,{symbol:this.currentCoin.symbol}).then(response => {
                var resp=response.body;
                if(resp != null){
                    this.coinScale=resp.coinScale;
                    this.baseCoinScale=resp.baseCoinScale;
                }
            })
        },
        // getPlate(){
        //     var params={};
        //     params['symbol']=this.currentCoin.symbol;
        //     this.$http.post(this.host+this.api.market.plate,params).then(response => {
        //         var resp=response.body;
        //         if(resp.ask && resp.ask.length>0){
        //         	if(resp.ask.length >= this.plate.maxPostion) {
        //         		for(var i = this.plate.maxPostion; i > 0 ;i--) {
        //         			var ask = resp.ask[i-1];
        //         			ask.direction = 'SELL';
        //                 	ask.position = i;
        //                 	this.plate.askRows.push(ask);
        //         		}
        //         	}else {
        //         		for(var i = resp.ask.length; i > 0 ;i--) {
        //         			var ask = resp.ask[i-1];
        //         			ask.direction = 'SELL';
        //                 	ask.position = i;
        //                 	this.plate.askRows.push(ask);
        //         		}
        //         	}
        //         };
        //         if(resp.bid && resp.bid.length>0){
        //             for(var i=0;i<resp.bid.length;i++){
        //                 var bid = resp.bid[i];
        //                 bid.direction = 'BUY';
        //                 bid.position = i + 1;
        //                 this.plate.bidRows.push(bid);
        //                 if(i == this.plate.maxPostion - 1) break;
        //             }
        //             //this.plate.bidRows = this.plate.bidRows.slice(0,this.plate.maxPostion);
        //         }
        //     })
        // },
        getPlate(){
            var params={};
            params['symbol']=this.currentCoin.symbol;
            this.$http.post(this.host+this.api.market.platemini,params).then(response => {
                var resp=response.body;
                if(resp.ask && resp.ask.items){
                    for (var i=0;i<resp.ask.items.length;i++){
                      if (i==0) resp.ask.items[i].totalAmount = resp.ask.items[i].amount;
                      else resp.ask.items[i].totalAmount = resp.ask.items[i-1].totalAmount + resp.ask.items[i].amount;
                    }

                	if(resp.ask.items.length >= this.plate.maxPostion) {
                		for(var i = this.plate.maxPostion; i > 0 ;i--) {
                			  var ask = resp.ask.items[i-1];
                			  ask.direction = 'SELL';
                        ask.position = i;
                        this.plate.askRows.push(ask);
                		}
                	}else {
                	  for (var i=7;i>resp.ask.items.length;i--){
                	    var ask = {price:0,amount:0};
                	    ask.direction = 'SELL';
                	    ask.position = i;
                      ask.totalAmount = ask.amount;
                      this.plate.askRows.push(ask);
                    }
                		for(var i = resp.ask.items.length; i > 0 ;i--) {
                			  var ask = resp.ask.items[i-1];
                			  ask.direction = 'SELL';
                        ask.position = i;
                        this.plate.askRows.push(ask);
                		}
                	}
                };
                if(resp.bid && resp.bid.items){
                    for (var i=0;i<resp.bid.items.length;i++){
                      if (i==0) resp.bid.items[i].totalAmount = resp.bid.items[i].amount;
                      else resp.bid.items[i].totalAmount = resp.bid.items[i-1].totalAmount + resp.bid.items[i].amount;
                    }
                    for(var i=0;i<resp.bid.items.length;i++){
                        var bid = resp.bid.items[i];
                        bid.direction = 'BUY';
                        bid.position = i + 1;
                        this.plate.bidRows.push(bid);
                        if(i == this.plate.maxPostion - 1) break;
                    }
                    if (resp.bid.items.length < this.plate.maxPostion)
                    {
                      for (var i=resp.bid.items.length;i<this.plate.maxPostion;i++){
                        var bid = {price:0,amount:0}
                        bid.direction = 'BUY';
                        bid.position = i+1;
                        bid.totalAmount = 0;
                        this.plate.bidRows.push(bid);
                      }
                    }
                    //this.plate.bidRows = this.plate.bidRows.slice(0,this.plate.maxPostion);
                }
            })
        },
        getTrade(){
            var params={};
            params['symbol']=this.currentCoin.symbol;
            params['size']=20;
            this.$http.post(this.host+this.api.market.trade,params).then(response => {
                var resp=response.body;
                // console.log(resp);
                for(var i=0;i<resp.length;i++){
                    this.trade.rows.push(resp[i]);
                }
            })
        },
        startWebsock(){
            var stompClient  = null;
            var that=this;
            var socket = new SockJS(that.host+that.api.market.ws);
            stompClient = Stomp.over(socket);
            stompClient.debug=false;
            // this.datafeed = new Datafeeds.WebsockFeed(that.host+'/market',this.currentCoin,stompClient);
            // this.getKline();
            stompClient.connect({}, function(frame) {
              that.datafeed = new Datafeeds.WebsockFeed(that.host+'/market',that.currentCoin,stompClient);
              that.getKline();
                //订阅价格变化消息
                stompClient.subscribe('/topic/market/thumb', function(msg) {
                    var resp = JSON.parse(msg.body);
                    var coin = that.getCoin(resp.symbol);
                    if(coin != null){
                        coin.price=(resp.close).toFixed(2);
                        coin.rose=resp.chg>0 ? ('+'+(resp.chg*100).toFixed(2)+'%') : ((resp.chg*100).toFixed(2)+'%');
                        coin.close=(resp.close).toFixed(2);
                        coin.high=(resp.high).toFixed(2);
                        coin.low=(resp.low).toFixed(2);
                        coin.volume=parseInt(resp.volume);
                    }
                });
                //订阅实时成交信息
                stompClient.subscribe('/topic/market/trade/'+that.currentCoin.symbol, function(msg) {
                    var resp = JSON.parse(msg.body);
                    // console.log(resp);
                    if(resp.length > 0){
                        for(var i=0;i<resp.length;i++){
                            that.trade.rows.unshift(resp[i]);
                        }
                    }
                    if(that.trade.rows.length > 30){
                        that.trade.rows=that.trade.rows.slice(0,30);
                    }
                });
                if(that.isLogin){
                 //订阅委托取消信息
                    stompClient.subscribe('/topic/market/order-canceled/'+that.currentCoin.symbol+"/"+that.member.id, function(msg) {
                        var resp = JSON.parse(msg.body);
                        that.refreshAccount();
                    });
                    //订阅委托交易完成
                    stompClient.subscribe('/topic/market/order-completed/'+that.currentCoin.symbol+"/"+that.member.id, function(msg) {
                        var resp = JSON.parse(msg.body);
                        that.refreshAccount();
                    });
                }

                //订阅盘口消息
                stompClient.subscribe('/topic/market/trade-plate/'+that.currentCoin.symbol, function(msg) {
                    var resp = JSON.parse(msg.body);
                    // console.log(resp);
                    if(resp.direction == 'SELL'){
                        var asks = resp.items;
                        that.plate.askRows = [];

                        for(var i=0;i<asks.length;i++){
                          if (i == 0) asks[i].totalAmount = asks[i].amount;
                          else asks[i].totalAmount = asks[i-1].totalAmount + asks[i].amount;
                        }

                        if(asks.length >= that.plate.maxPostion) {
                          for(var i = that.plate.maxPostion; i > 0 ;i--) {
                            var ask = asks[i-1];
                            ask.direction = 'SELL';
                            ask.position = i;
                            that.plate.askRows.push(ask);
                          }
                        }else {
                          for(var i = asks.length; i > 0 ;i--) {
                            var ask = asks[i-1];
                            ask.direction = 'SELL';
                            ask.position = i;
                            that.plate.askRows.push(ask);
                          }
                        }
                    }
                    else{
                        var bids = resp.items;
                        that.plate.bidRows = [];
                        for(var i=0;i<bids.length;i++){
                          if (i == 0) bids[i].totalAmount = bids[i].amount;
                          else bids[i].totalAmount = bids[i-1].totalAmount + bids[i].amount;
                        }
                        for(var i=0;i<bids.length;i++){
                            var bid = bids[i];
                            bid.direction = 'BUY';
                            bid.position = i + 1;
                            that.plate.bidRows.push(bid);
                            if(i == that.plate.maxPostion - 1) break;
                        }
                        // that.plate.bidRows = that.plate.bidRows.slice(0,that.plate.maxPostion);
                    }
                })
            });
        },
        limited_price(){
            this.showMarket=false;
        },
        market_price(){
            this.showMarket=true;
        },
        collect(index,row){
            if(!this.isLogin){
              this.$Message.info(this.$t("common.logintip"));
              return;
            }
            var params={};
            params['symbol']=row.symbol;
            this.$http.post(this.host+this.api.exchange.favorAdd,params).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.$Message.info(this.$t("exchange.do_favorite"));
                    this.getCoin(row.symbol).isFavor = true;
                    row.isFavor = true;
                    this.coins.favor.push(row);
                }
            })
        },
        cancelCollect(index,row){
            if(!this.isLogin){
              this.$Message.info(this.$t("common.logintip"));
              return;
            }
            var params={};
            params['symbol'] = row.symbol;
            this.$http.post(this.host+this.api.exchange.favorDelete,params).then(response => {
                var resp=response.body;
                if(resp.code==0){
                    this.$Message.info(this.$t("exchange.cancel_favorite"));
                    this.getCoin(row.symbol).isFavor = false;
                    for (var i=0;i<this.coins.favor.length;i++){
                      var favorCoin = this.coins.favor[i];
                      if (favorCoin.symbol == row.symbol) {
                        this.coins.favor.splice(i,1);
                        break;
                      }
                    }
                }
            })
        },
        gohref(currentRow,oldCurrentRow){
            location.href='/#exchange/'+currentRow.href;
            location.reload();
        },
        buyWithLimitPrice(){
            this.isBuyWithLimitPrice=true;
            // console.log('1',this.isBuyWithLimitPrice)
            if(this.form.buy.limitAmount==''){
                this.isBuyWithLimitPrice=false;
                //  console.log('2',this.isBuyWithLimitPrice)
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.buyAmountRule1')
                });
               
                return;
            }
            var maxAmount = this.wallet.base/this.form.buy.limitPrice;
            if(this.form.buy.limitAmount>maxAmount){
                this.isBuyWithLimitPrice=false;
                // console.log('3',this.isBuyWithLimitPrice)
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.buyAmountRule2')+maxAmount
                });
                
                return;
            }
            var that = this;
            var params={};
            params['symbol']=this.currentCoin.symbol;
            params['price']=this.form.buy.limitPrice;
            params['amount']=this.form.buy.limitAmount;
            params['direction']='BUY';
            params['type']='LIMIT_PRICE';
            this.$http.post(this.host+this.api.exchange.orderAdd,params).then(response => {
                var resp=response.body;
                this.isBuyWithLimitPrice=true;
                //  console.log('4',this.isBuyWithLimitPrice)
                if(resp.code==0){
                    this.isBuyWithLimitPrice=true;
                    //  console.log('5',this.isBuyWithLimitPrice)
                    this.$Notice.success({
                        title: that.$t('common.tips'),
                        desc: that.$t('exchange.tradeSuccess')
                    });
                    this.refreshAccount();
                    this.form.buy.limitAmount = 0;
                    // console.log('wochengogng1')
                     this.isBuyWithLimitPrice=false;
                    //   console.log('6',this.isBuyWithLimitPrice)
                    
                  
                }else{
                    this.$Notice.error({
                        title: this.$t('common.tips'),
                        desc: resp.message
                    });
                   
                    this.isBuyWithLimitPrice=false;
                    //  console.log('7',this.isBuyWithLimitPrice)
                }
            })
        },
        buyWithMarketPrice(){
            this.isBuyWithMarketPrice=true;
            if(this.form.buy.marketAmount==''){
                this.isBuyWithMarketPrice=false;
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.turnoverRule1')
                });
                return;
            }
            if(this.form.buy.marketAmount>parseFloat(this.wallet.base)){
                this.isBuyWithMarketPrice=false;
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.turnoverRule2')+this.wallet.base
                });
                return;
            }
            var params={};
            params['symbol']=this.currentCoin.symbol;
            params['price']=0;
            params['amount']=this.form.buy.marketAmount;
            params['direction']='BUY';
            params['type']='MARKET_PRICE';
            var that = this;
            this.$http.post(this.host+this.api.exchange.orderAdd,params).then(response => {
                this.isBuyWithMarketPrice=true;
                var resp=response.body;
                if(resp.code==0){
                    this.$Notice.success({
                        title: that.$t('common.tips'),
                        desc: that.$t('exchange.tradeSuccess')
                    });
                    this.isBuyWithMarketPrice=true;
                    this.refreshAccount();
                    this.form.buy.marketAmount = 0;
                    this.isBuyWithMarketPrice=false;
                }else{
                    this.$Notice.error({
                        title: that.$t('common.tips'),
                        desc: resp.message
                    });
                    this.isBuyWithMarketPrice=false;
                }
            })
        },
        sellLimitPrice(){
            this.isSellLimitPrice=true;
            if(this.form.sell.limitAmount==''){
                this.isSellLimitPrice=false;
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.sellAmountRule1')
                });
                return;
            }
            if(this.form.sell.limitPrice==''){
                this.isSellLimitPrice=false;
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.sellPriceRule')
                });
                
                return;
            }
            if(this.form.sell.limitAmount > parseFloat(this.wallet.coin)){
                this.isSellLimitPrice=false;
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.sellAmountRule2')+this.wallet.coin
                });
                
                return;
            }
            var params={};
            params['symbol'] = this.currentCoin.symbol;
            params['price'] = this.form.sell.limitPrice;
            params['amount'] = this.form.sell.limitAmount;
            params['direction']='SELL';
            params['type']='LIMIT_PRICE';
            var that = this;
            this.$http.post(this.host+this.api.exchange.orderAdd,params).then(response => {
                var resp=response.body;
                this.isSellLimitPrice=true;
                if(resp.code==0){
                    this.$Notice.success({
                        title: that.$t('common.tips'),
                        desc: that.$t('exchange.tradeSuccess')
                    });
                    this.refreshAccount();
                  
                    this.form.sell.limitAmount = 0;
                    this.isSellLimitPrice=false;
                }else{
                    this.$Notice.error({
                        title: that.$t('common.tips'),
                        desc: resp.message
                    });
                      this.isSellLimitPrice=false;
                }
            })
        },
        sellMarketPrice(){
            this.isSellMarketPrice=true;
            if(this.form.sell.marketAmount==''){
                this.isSellMarketPrice=false;
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.sellAmountRule1')
                });
                return;
            }
           if(this.form.sell.marketAmount > parseFloat(this.wallet.coin)){
                this.isSellMarketPrice=false;
                this.$Notice.error({
                    title: this.$t('common.tips'),
                    desc: this.$t('exchange.sellAmountRule2')+this.wallet.coin
                });
                return;
            }
            var params={};
            params['symbol']=this.currentCoin.symbol;
            params['price']=0;
            params['amount'] = this.form.sell.marketAmount;
            params['direction']='SELL';
            params['type']='MARKET_PRICE';
            var that = this;
            this.$http.post(this.host+this.api.exchange.orderAdd,params).then(response => {
                var resp=response.body;
                this.isSellMarketPrice=true;
                if(resp.code==0){
                    this.isSellMarketPrice=true;
                    this.$Notice.success({
                        title: that.$t('common.tips'),
                        desc: that.$t('exchange.tradeSuccess')
                    });
                    
                    this.refreshAccount();
                    this.form.sell.marketAmount = 0;
                    this.isSellMarketPrice=false;
                }else{
                    this.$Notice.error({
                        title: that.$t('common.tips'),
                        desc: resp.message
                    });
                     this.isSellMarketPrice=false;
                }
            })
        },
        buyPlate(currentRow){
            this.form.buy.limitPrice = currentRow.price;
            this.form.sell.limitPrice = currentRow.price;
        },
        sellPlate(currentRow){
            this.form.buy.limitPrice = currentRow.price;
            this.form.sell.limitPrice = currentRow.price;
        },
        /**
         * 获取钱包信息
         */
        getWallet(){
            this.$http.post(this.host+this.api.uc.wallet+this.currentCoin.base,{}).then(response => {
                var resp=response.body;
                this.wallet.base = resp.data.balance;
            })
            this.$http.post(this.host+this.api.uc.wallet+this.currentCoin.coin,{}).then(response => {
                var resp=response.body;
                this.wallet.coin = resp.data.balance;
            })
        },
        getCurrentOrder(){ //查询当前委托
            var params={};
            params['pageNo']=0;
            params['pageSize']=100;
            params['symbol']=this.currentCoin.symbol;
            this.currentOrder.rows = [];
            var that = this;
            this.$http.post(this.host+this.api.exchange.current,params).then(response => {
                var resp=response.body;
             
                if(resp.content.length>0){
                    this.currentOrder.rows = resp.content;
                    this.currentOrder.rows.forEach((row,index)=>{
                        row.price = row.type=='MARKET_PRICE'?that.$t('exchange.marketPrice'):row.price;
                    })
                }
            })
        },
        getHistoryOrder(pageNo){ //查询历史委托
            if(pageNo == undefined){
                pageNo = this.historyOrder.page;
            }
            else{
                 pageNo = pageNo;
            }
            this.historyOrder.rows=[];
            var params={};
            params['pageNo'] = pageNo-1;
            params['pageSize'] = this.historyOrder.pageSize;
            params['symbol']=this.currentCoin.symbol;
            var that = this;
            this.$http.post(this.host+this.api.exchange.history,params).then(response => {
                var resp=response.body;
                if(resp.content.length>0){
                    this.historyOrder.total = resp.totalElements;
                    this.historyOrder.page = resp.number+1;
                    for(var i=0;i<resp.content.length;i++){
                        var row = resp.content[i];
                        row.price = row.type=='MARKET_PRICE'?this.$t('exchange.marketPrice'):row.price;
                        this.historyOrder.rows.push(row);
                    }
                }
            });
        },
        cancel(index){
            var order = this.currentOrder.rows[index];
            this.$Modal.confirm({
                content: this.$t('exchange.confrimCancel')+'?',
                onOk: () => {
                    this.$http.post(this.host+this.api.exchange.orderCancel+"/"+order.orderId,{}).then(response => {
                        var resp=response.body;
                        if(resp.code==0){
                        //    this.refreshAccount();
                        }else if(resp.message=='you have already cancel 2 times today'){
                            this.$Notice.error({
                                title: this.$t('common.tips'),
                                desc: this.$t('exchange.cancelTip')
                            });
                        }else{
                            this.$Notice.error({
                                title: this.$t('common.tips'),
                                desc: resp.message
                            });
                        }
                    })
                }
            })
        },
        refreshAccount:function(){
            this.getCurrentOrder();
            this.getHistoryOrder();
            this.getWallet();
        },
        timeFormat:function(tick){
            return moment(tick).format("HH:mm:ss");
        },
        dateFormat:function(tick){
            return moment(tick).format("YYYY-MM-DD HH:mm:ss");
        },
        keyEvent(event){
            var re1 = new RegExp("\([0-9]+\.[0-9]{"+this.baseCoinScale+"})[0-9]*","");
            this.form.buy.limitPrice=this.form.buy.limitPrice.toString().replace(re1,'$1');
            this.form.sell.limitPrice=this.form.sell.limitPrice.toString().replace(re1,'$1');
            this.form.buy.marketAmount=this.form.buy.marketAmount.toString().replace(re1,'$1');

            var re2 = new RegExp("\([0-9]+\.[0-9]{"+this.coinScale+"})[0-9]*","");
            this.form.buy.limitAmount=this.form.buy.limitAmount.toString().replace(re2,'$1');
            this.form.sell.limitAmount=this.form.sell.limitAmount.toString().replace(re2,'$1');
            this.form.sell.marketAmount=this.form.sell.marketAmount.toString().replace(re2,'$1');
        },
        changeHistoryOrder(page){
            this.getHistoryOrder(page)
        }
   
    }
}
</script>