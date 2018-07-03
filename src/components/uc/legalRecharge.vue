<template>
    <div class="nav-right">
        <div class="col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record">
                <section class="trade-group merchant-top">
                    <i class="merchant-icon tips"></i>
                    <span class="tips-word">{{$t('common.recharge')}}</span>
                </section>
                <section>
                    <div class="table-inner action-box open">
                        <i class="angle" style="right: 71px;"></i>
                        <div class="action-inner">
                            <div class="inner-left">
                                <p class="describe">{{$t('common.coin')}}</p>
                                <Select :placeholder="$t('common.pleaseSelect')" v-model="legalCoinType" style="width:100px;margin-top: 23px;" @on-change="changeLegalCoin">
                                    <Option v-for="item in legalCoinList" :value="item.unit" :key="item.unit">{{ item.unit }}</Option>
                                </Select>
                            </div>
                            <div class="inner-box deposit-address">
                                <p class="describe">{{$t('common.rechargeMethod')}}</p>
                                <div class="title">
                                    <Select v-model="rechargeMethodValue" style="width:400px;" @on-change="changeRechargeMethodValue">
                                        <Option v-for="item in rechargeMethodList" :value="item.name" :key="item.value">{{ item.value }}</Option>
                                    </Select>
                                    <a style="font-size:14px;">{{$t('common.rechargeMethodTip')}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Form class="legalForm" ref="formValidate" style="margin-top:50px;" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <Col span="12">  
                                <FormItem :label="$t('common.payee')" prop="payee">
                                    <!-- <Input type="text" v-model="formValidate.payee"></Input> -->
                                    {{formValidate.payee}}
                                </FormItem>
                                <FormItem :label="$t('common.payeeAccount')" prop="payeeAccount">
                                    <!-- <Input type="text" v-model="formValidate.payeeAccount"></Input> -->
                                    {{formValidate.payeeAccount}}
                                </FormItem>
                                <FormItem :label="payeeUser" prop="payeeBank">
                                    <!-- <Input type="text" v-model="formValidate.payeeBank"></Input> -->
                                    {{formValidate.payeeUser}}
                                </FormItem>
                                <FormItem :label="$t('common.remark')" prop="remark">
                                    <Input type="text" v-model="formValidate.remark"></Input>
                                </FormItem>
                                <FormItem :label="$t('common.rechargeAmount')" prop="rechargeAmount">
                                    <Input type="text" v-model="formValidate.rechargeAmount">
                                        <span slot="append">{{legalCoinType}}</span>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="12"> 
                                <input type="hidden" name="paymentInstrument" :value="paymentInstrument" />
                                <div>{{$t('common.paymentInstrumentTip')}}</div>
                                <div style="background:#2E323D;width: 290px;height: 175px;margin:0 auto;">
                                    <img v-show="showInstrumentImg" style="width: 290px;height: 175px;" :src="paymentInstrumentSrc">
                                </div>
                                <div class="acc_sc">
                                    <Upload ref="upload" :show-upload-list="false" :on-success="paymentInstrumentSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                        <div style="padding:20px 0">
                                            <Icon type="plus" size="52"></Icon>
                                            <p>{{$t('common.voucherUpload')}}</p>          
                                        </div>
                                    </Upload>
                                </div>
                                <div style="width:290px;margin:0 auto;text-align:left;">
                                    <p>{{$t('common.precautions')}}</p>
                                    <p>{{$t('common.rechargePrecautions1')}}</p>
                                    <p>{{$t('common.rechargePrecautions2')}}</p>
                                    <p>{{$t('common.rechargePrecautions3')}}</p>
                                </div>
                            </Col>
                            <Col span="24" style="margin-top:50px;">
                                <FormItem style="text-align:center;">
                                    <Button style="width:60%;" type="primary" :disabled=isDisabled  @click="handleSubmit('formValidate')">{{$t('common.confirmRecharge')}}</Button>
                                </FormItem>
                            </Col>
                    </Form>
                    <div class="action-content">
                            <div class="action-body">
                                <p class="acb-p1">{{$t('finance.rechargeRecord')}}</p>
                                <div class="order-table">
                                    <Table stripe :columns="tableColumnsRecharge" :data="tableRecharge" :loading="loading" :no-data-text="$t('common.nodata')"></Table>
                                    <div style="margin: 10px;overflow: hidden">
                                        <div style="float: right;">
                                            <Page :total="dataCount" :current="1" @on-change="changePage"></Page>
                                        </div>
                                    </div>

                                </div>
                            </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('common.withdrawAmountRule2')));
            } else if (!/^\+?[1-9][0-9]*$/.test(value)) {
                callback(new Error(this.$t('common.withdrawAmountRule2')));
            } else {
                callback();
            }
        };
        return {
            showInstrumentImg:false,
            paymentInstrument:'',
            paymentInstrumentSrc:'',
            uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
            uploadUrl:this.host+'/uc/upload/oss/image',

            legalCoinType:'',
            legalCoinList: [

            ],
            rechargeMethodValue:'',
            rechargeMethodList:[
                {name:'BANK',value:this.$t('common.bank')},
                {name:'ALI',value:this.$t('common.alipay')},
                {name:'WECHAT',value:this.$t('common.wechat')}
            ],
            dataCount: 0,
            loading: true,
            tableRecharge: [],
            payeeUser:'',
            formValidate:{
                payee:'',
                payeeAccount:'',
                payeeUser:'',
                remark:'',
                rechargeAmount:''
            },
            isDisabled:false,
            ruleValidate: {
                payee: [

                ],
                payeeAccount: [

                ],
                payeeUser: [

                ],
                remark: [

                ],
                rechargeAmount: [
                    { required: true, message: this.$t('common.rechargeAmountRule1'), trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' },
                ]
            }
        }
    },
    computed:{
        'lang': function () {
          return this.$store.state.lang;
        },
        tableColumnsRecharge() {
            let columns = [];
            columns.push({
                title: this.$t('common.rechargeTime'),
                key: 'creationTime',
            });
            columns.push({
                title: this.$t('common.coin'),
                key: 'unit',
                render: (h, params) => {
                    return h('span', {

                    },params.row.coin.unit);
                }
            });
            columns.push({
                title: this.$t('finance.rechargeAmount'),
                key: 'amount',
            });
            columns.push({
                title: this.$t('common.status'),
                key: 'state',
                render: (h, params) => {
                    let txt='';
                    if(params.row.state=='APPLYING'){
                        txt=this.$t('finance.status_1')
                    }
                    if(params.row.state=='COMPLETE'){
                        txt=this.$t('finance.status_4')
                    }
                    if(params.row.state=='DEFEATED'){
                        txt=this.$t('finance.status_3')
                    }
                    return h('span', {

                    },txt);
                }
            });
            return columns;
        }
    },
    watch:{
        'lang':function () {
          this.updateLangData();
        },
    },
    methods: {
        changePage(index) {
            this.getList(index, 10)
        },
        updateLangData(){
            this.rechargeMethodList[0].value=this.$t('common.bank');
            this.rechargeMethodList[1].value=this.$t('common.alipay');
            this.rechargeMethodList[2].value=this.$t('common.wechat');

            this.payeeUser=this.$t('common.payeeBank');
        },
        paymentInstrumentSuccess (res, file) {
            this.showInstrumentImg=true;
            this.paymentInstrumentSrc=this.paymentInstrument=res.data;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.isDisabled=true;
         
                    this.submit(name)
                } else {
                    this.isDisabled=false;
                    //  console.log( this.isDisabled,'2')
                    this.$Message.error(this.$t('common.rechargeFail'));
                }
            })
        },
        submit(name) {
                if(this.legalCoinType==''||this.legalCoinType==undefined){
                    this.$Message.error(this.$t('finance.coinTypeTip'));
                    this.isDisabled=false;
                
                    return;
                    
                }
                if(this.rechargeMethodValue==''){
                    this.$Message.error(this.$t('common.rechargeMethodRule'));
                    this.isDisabled=false;
                    return;
                   
                }
                if(this.paymentInstrumentSrc==''){
                    this.$Message.error(this.$t('common.paymentInstrumentRule'));
                    this.isDisabled=false;
                    return;
                }
                let param = {}
                param['amount'] = this.formValidate.rechargeAmount
                param['paymentInstrument'] = this.paymentInstrumentSrc
                param['unit'] = this.legalCoinType
                param['payMode'] = this.rechargeMethodValue
                param['remark'] = this.formValidate.remark
                this.$http.post(this.host + '/uc/legal-wallet-recharge', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(this.$t('common.rechargeSuccess'));
                        var that=this;
                        this.isDisabled=true;
                        setTimeout(()=>{
                            
                            that.$router.go(0);
                            this.isDisabled=true;
                        },1000)
                         
                    } else {
                        this.$Message.error(resp.message);
                        this.isDisabled=false;
                    }
                })
        },
        changeLegalCoin(value){
            
        },
        // changeCoin(value) {
        //     for (var i = 0; i < this.coinList.length; i++) {
        //         if ((this.coinList[i].coin.unit == value)) {
        //             this.qrcode.value = this.coinList[i].address;
        //         }
        //     }
        // },
        changeRechargeMethodValue(value){
            if(value=='BANK'){
                this.$http.get(this.host + '/uc/data-dictionary/sys_bank').then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.formValidate.payeeAccount=resp.data;
                        this.payeeUser=this.$t('common.payeeBank');
                    }
                })
                this.$http.get(this.host + '/uc/data-dictionary/sys_bank_name').then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.formValidate.payeeUser=resp.data;
                    }
                })
            }
            if(value=='ALI'){
                this.$http.get(this.host + '/uc/data-dictionary/sys_ali').then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.formValidate.payeeAccount=resp.data;
                        this.payeeUser=this.$t('common.payeeUser');
                        this.formValidate.payeeUser=this.$t('common.alipay');
                    }
                })
            }
            if(value=='WECHAT'){
                this.$http.get(this.host + '/uc/data-dictionary/sys_WeChat').then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.formValidate.payeeAccount=resp.data;
                        this.payeeUser=this.$t('common.payeeUser');
                        this.formValidate.payeeUser=this.$t('common.wechat')
                    }
                })
            }
        },
        getMoney() {
            //获取
            this.$http.get(this.host + '/uc/coin/legal').then(response => {
                var resp = response.body;
                // console.log(resp);
                if (resp.code == 0) {
                    for (let i = 0; i < resp.data.length; i++) {
                        var coin = resp.data[i];
                        if(coin.canRecharge == 1){
                            this.legalCoinList.push(coin);
                        }
                    }
                    this.changeLegalCoin(this.legalCoinType)
                } else {
                    // this.$Message.error(resp.message);
                }
            })
        },
        getList(pageNo, pageSize) {
            //获取tableRecharge
            this.$http.get(this.host + '/uc/legal-wallet-recharge?pageNo='+pageNo+'&'+'pageSize='+pageSize+'&'+'direction=1&property=id').then(response => {
                var resp = response.body;
                if (resp.data) {
                    this.tableRecharge = resp.data.content
                    this.dataCount = resp.data.totalElements
                    this.loading = false
                }else {
                    // this.$Message.error(resp.message);
                }
            })
        }

    },
    created() {
        this.legalCoinType = this.$route.query.name
        this.getMoney()
        this.getList(1, 10)
        this.$http.get(this.host + '/uc/data-dictionary/sys_payee').then(response => {
            var resp = response.body;
            if (resp.code == 0) {
                this.formValidate.payee=resp.data;
            }
        })
    }
}
</script>
<style scoped>
.acc_sc{
    position: absolute;
    right: 198px;
    top:40px;
}
.legalForm .ivu-form-item{
    text-align: left;
}
.table-inner {
    position: relative;
    text-align: left;
    border-radius: 3px;
    padding: 23px 20px 20px;
}

.acb-p1 {
    font-size: 18px;
    font-weight: 600;
    line-height: 50px;
}

.acb-p2 {
    font-size: 14px;
    line-height: 24px;
}

.action-inner {
    width: 100%;
    display: table;
}

.action-inner .inner-box {
    display: table-cell;
    width: 100%;
}

.action-box .title .copy {
    user-select: text;
}

.action-box .title a.link-copy {
    font-size: 14px;
    margin-left: 20px;
}

.hb-night a {
    text-decoration: none;
    color: #7A98F7;
    transition: all .2s ease-in-out;
    cursor: pointer;
}

.action-box .title a.link-qrcode {
    margin-left: 20px;
    font-size: 14px;
    position: relative;
}

.hb-night a {
    text-decoration: none;
    color: #7A98F7;
    transition: all .2s ease-in-out;
    cursor: pointer;
}

.action-box .subtitle {
    font-size: 12px;
    margin-top: 30px;
}

.action-content {
    width: 100%;
    margin-top: 30px;
    overflow: hidden;
    display: table;
}

.action-box .title {
    margin-top: 20px;
    font-size: 20px;
    user-select: none;
}

.action-box .title .show-qrcode {
    position: absolute;
    top: -100px;
    left: 40px;
    padding: 10px;
}

.action-inner .inner-box.deposit-address {
    width: 80%;
}

p.describe {
    font-size: 16px;
    font-weight: 600;
}

.merchant-top {
    height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 15px;
    color: #fff;
}

.trade-group {
    margin-bottom: 20px;
    font-size: 14px;
}

.merchant-icon {
    display: inline-block;
    margin-left: 4px;
    background-size: 100% 100%;
}

.merchant-top .tips-word {
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    text-align: left;
}

.merchant-icon.tips {
    width: 4px;
    height: 22px;
    margin-right: 10px;
    background: #1755FD;
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
