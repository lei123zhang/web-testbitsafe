<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear">
                <div class="order-table">
                    <div class="rmb">
                        <div class="rmb_header">{{$t('finance.LegalMoney')}}</div>
                        <!-- <h2>{{$t('finance.totalLegalMoney')}}：{{totalLegalMoney}}</h2> -->
                        <Table stripe :columns="tableColumnsMoney" :data="tableLegalMoney" :loading="loading" :no-data-text="$t('common.nodata')"></Table>
                        <div class="rmb_header">{{$t('finance.financeIndex')}}</div>
                        <!-- <h2>{{$t('finance.totalMoney')}}：{{totalMoney}}</h2> -->
                        <Table stripe :columns="tableColumnsMoney" :data="tableMoney" :loading="loading" :no-data-text="$t('common.nodata')"></Table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.rmb{
    width: 100%;
    margin:15px;
}
.rmb .rmb_header{
    text-align: left;
    font-size: 16px;
    padding:5px 0;
    border-bottom: 1px solid #eee;
}
.yue{
    float: left;
}
.yue b{
    font-size: 20px;
    display: block;
    text-align: left;
    color: #00b5f6; 
}
.recharge_withdraw{
    float: left;
    margin-top:10px;
}
.recharge_withdraw Button{
    margin:0 10px;
}
.nav-right {
    width: 1000px;
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}

.bill_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.rightarea {
    padding-left: 15px !important;
    padding-right: 15px !important;
    margin-bottom: 60px !important;
}

.rightarea .rightarea-top {
    line-height: 75px;
    border-bottom: #f1f1f1 solid 1px;
}

.rightarea .rightarea-con {
    padding-top: 30px;
    padding-bottom: 125px;
}

.rightarea .trade-process {
    line-height: 30px;
    padding: 0 15px;
    background: #f1f1f1;
    display: inline-block;
    position: relative;
    margin-right: 20px;
}

.rightarea .trade-process.active {
    color: #eb6f6c;
    background: #f9f5eb;
}

.rightarea .trade-process .icon {
    background: #fff;
    border-radius: 20px;
    height: 20px;
    width: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-right: 10px;
}

.rightarea .trade-process .arrow {
    position: absolute;
    top: 10px;
    right: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #f1f1f1;
}

.rightarea .trade-process.active .arrow {
    border-left: 5px solid #f9f5eb;
}

.rightarea .rightarea-tabs {
    border: none;
}

.rightarea .rightarea-tabs li>a {
    width: 100%;
    height: 100%;
    padding: 0;
    margin-right: 0;
    font-size: 14px;
    color: #646464;
    border-radius: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rightarea .rightarea-tabs li>a:hover {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li {
    width: 125px;
    height: 40px;
    position: relative;
    margin: -1px 0 0 -1px;
    border: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.rightarea .rightarea-tabs li.active {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li:last-child {
    border-right: 1px solid #f1f1f1;
}

.rightarea .rightarea-tabs li.active>a,
.rightarea .rightarea-tabs li:hover>a {
    color: #da2e22;
    border: none;
}

.rightarea .panel-tips {
    border: 3px solid #fdfaf3;
    color: #9e9e9e;
    font-size: 12px;
}

.rightarea .panel-tips .panel-header {
    background: #fdfaf3;
    line-height: 40px;
    margin-bottom: 15px;
}

.rightarea .panel-tips .panel-title {
    font-size: 16px;
}

.rightarea .recordtitle {
    cursor: pointer;
}

.nav-right {
    width: 1000px;
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}

.order_box {
    width: 100%;
    background: #fff;
    height: 56px;
    line-height: 56px;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccf2ff;
    position: relative;
    text-align: left;
}

.order_box a {
    color: #8994A3;
    font-size: 16px;
    padding: 0 30px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: 54px;
    display: inline-block;
}

.order_box .active {
    border-bottom: 2px solid #00b5f6;
}

.order_box .search {
    position: absolute;
    width: 300px;
    height: 32px;
    top: 12px;
    right: 0;
    display: flex;
    /* border: #c5cdd7 solid 1px; */
}
</style>
<script>
export default {
    components: {
    },
    data() {
        return {
            totalLegalMoney:0,
            totalMoney:0,
            loading: true,
            ordKeyword: '',
            tableMoney: [],
            tableLegalMoney: []
        }
    },
    methods: {
        getMoney() {
            //获取
            this.$http.post(this.host + '/uc/asset/wallet').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    // this.tableMoney = resp.data;
                   
                    for (let j = 0; j < resp.data.length; j++) {
                        if(resp.data[j].coin.hasLegal==false){
                            this.tableMoney.push(resp.data[j]);
                            this.totalMoney=this.totalMoney+resp.data[j].balance;  
                        }else{
                            this.tableLegalMoney.push(resp.data[j]);
                            this.totalLegalMoney=this.totalLegalMoney+resp.data[j].balance;  
                        }
                                              
                    }

                    for (let i = 0; i < this.tableMoney.length; i++) {
                        this.tableMoney[i]['coinType'] = this.tableMoney[i].coin.unit
                    }

                    for (let k = 0; k < this.tableLegalMoney.length; k++) {
                        this.tableLegalMoney[k]['coinType'] = this.tableLegalMoney[k].coin.unit
                    }
                    this.loading = false
                } else {
                    // this.$Message.error(resp.message);
                }
            })
        },
        resetAddress(unit){
            let params = {};
            params["unit"] = unit;
            this.$http.post(this.host + '/uc/asset/wallet/reset-address',params).then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                this.$Message.success(this.$t('finance.resetsuccess'));
                setTimeout(function () {
                  window.location.reload();
                },3000);
              } else {
                this.$Message.error(resp.message);
              }
            })
        }

    },
    created() {
        this.getMoney()
    },
    computed: {
        tableColumnsMoney() {
            let self = this;
            let columns = [];
            columns.push({
                title: this.$t('finance.coinType'),
                key: 'coinType',
            });
            columns.push({
                title: this.$t('finance.balance'),
                key: 'balance',
                // render:function(h,params){
                //     return h('p',params.row.balance+'≈')
                // }
            });
            columns.push({
                title: this.$t('finance.frozenBalance'),
                key: 'frozenBalance',
            });
            columns.push({
                title: this.$t('common.operate'),
                key: 'price1',
                render: function(h, params) {
                    var actions = [];
                    if(params.row.coin.canRecharge == 1){
                        if (params.row.address != null && params.row.address != "") {
                            actions.push(h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: function() {
                                            if(params.row.coin.hasLegal==false){
                                                self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                                            }else{
                                                self.$router.push('/finance/legalRecharge?name=' + params.row.coin.unit);
                                            }
                                        }
                                    },
                                    style: {
                                        marginRight: '8px',
                                        width:'70px'
                                    },
                            }, self.$t('common.recharge')));
                        }else if(params.row.coin.hasLegal==false){
                            actions.push(h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small'
                            },
                            on: {
                                click: function() {
                                self.resetAddress(params.row.coin.unit)
                                }
                            },
                            style: {
                                marginRight: '8px',
                            },
                            }, self.$t('finance.getaddress')));
                        }
                    }
                    if(params.row.coin.canWithdraw == 1){
                        actions.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: function() {
                                        if(params.row.coin.hasLegal==false){
                                            self.$router.push('/finance/withdraw?name=' + params.row.coin.unit);
                                        }else{
                                            self.$router.push('/finance/legalWithdraw?name=' + params.row.coin.unit);
                                        }
                                    }
                                },
                                style: {
                                    marginRight: '8px',
                                    width:'70px'
                                },
                            }, self.$t('common.withdraw')));
                    }
                    return h('p',actions);
                }
            });
            return columns;
        }
    }
}
</script>
