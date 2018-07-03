<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container chat-in-box" id="List">
                <Row class="chat-in">
                    <Col span="4">
                    <div class="leftmenu left-box chat-right">
                        <div class="chat-right-in">
                            <h6>
                                <span v-if="tradeType==0">{{$t('otc.seller')}}:</span>
                                <span v-else>{{$t('otc.buyer')}}:</span>
                                <router-link :to="{ path: '/checkuser', query: { 'id': msg.otherSide }}">{{msg.otherSide}}</router-link>
                            </h6>
                            <h6>
                                <span>{{$t('otc.buyer')}}:</span>
                                <span>{{msg.money}}&nbsp;CNY</span>
                            </h6>
                            <div class="mt20" v-if="tradeType==0">
                                <h5>{{$t('otc.operationTips')}}:</h5>
                                <div>
                                    <p>1、{{$t('otc.operationTipBuy1_1')}}
                                        <em>{{$t('otc.paymentCompleted')}}</em>”。{{$t('otc.operationTipBuy1_2')}}</p>
                                    <p>2、{{$t('otc.operationTipBuy2')}}</p>
                                </div>
                                <span>
                                    <b>{{$t('otc.notice')}}：</b>
                                </span><br>
                                <span>{{$t('otc.noticeTip')}}</span><br>
                            </div>
                            <div class="mt20" v-else>
                                <h5>{{$t('otc.operationTips')}}:</h5>
                                <div>
                                    <p>1、{{$t('otc.operationTipSell1_1')}}
                                        <em>{{$t('otc.confirmRelease')}}</em>”{{$t('otc.operationTipSell1_2')}}</p>
                                    <p>2、{{$t('otc.operationTipSell2')}}</p>
                                    <p>3、{{$t('otc.operationTipSell3')}}</p>
                                </div>
                                <span>
                                    <b>{{$t('otc.notice')}}：</b>
                                </span><br>
                                <span>{{$t('otc.noticeTip')}}</span><br>
                            </div>
                            <div class="bottom-btn">
                                <div style="padding-top:20px;">
                                    <h6 style="font-weight: 600">{{$t('otc.orderStatus')}}:
                                        <span>{{statusText}}</span>
                                    </h6>
                                    <ButtonGroup v-show="statusBtn==1&&tradeType==0">
                                        <Button type="primary" @click="modal1 = true">{{$t('otc.paymentCompleted')}}</Button>
                                        <Button @click="modal2 = true">{{$t('otc.cancelTrade')}}</Button>
                                    </ButtonGroup>
                                    <ButtonGroup v-show="statusBtn==2&&tradeType==0">
                                        <Button type="primary" @click="modal4 = true">{{$t('otc.orderAppeal')}}</Button>
                                        <Button @click="modal2 = true">{{$t('otc.cancelTrade')}}</Button>
                                    </ButtonGroup>
                                    <ButtonGroup v-show="statusBtn==2&&tradeType==1">
                                        <Button type="primary" @click="modal5 = true">{{$t('otc.confirmRelease')}}</Button>
                                        <Button @click="modal4 = true">{{$t('otc.orderAppeal')}}</Button>
                                    </ButtonGroup>
                                    <!-- <Button type="primary" v-show="statusBtn==2" @click="modal4 = true" long></Button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    </Col>
                    <Col span="20">
                    <div class="rightbox">
                        <Row class="chat-top" type="flex" justify="space-between">
                            <Col span="3" class="order-time">
                            <h5>{{statusText}}</h5>
                            </Col>
                            <Col span="8" class="order-info">
                            <h5>
                                <label class="order-name">{{$t('otc.order')}}</label>
                                <span>{{msg.orderSn}}</span>
                            </h5>
                            <p>
                                {{$t('otc.and')}}
                                <router-link :to="{ path: '/checkuser', query: { 'id': msg.otherSide }}">{{msg.otherSide}}</router-link>
                                {{$t('otc.sTrade')}}
                            </p>
                            </Col>
                            <Col span="3" class="order-info">
                            <h5>{{msg.price}}</h5>
                            <span>{{$t('otc.tradePrice')}}(CNY)</span>
                            </Col>
                            <Col span="3" class="order-info">
                            <h5>{{msg.amount}}</h5>
                            <span>{{$t('otc.tradeAmount')}}({{msg.unit}})</span>
                            </Col>
                            <Col span="3" class="order-info">
                            <h5>{{msg.money}}</h5>
                            <span>{{$t('otc.tradeMoney')}}(CNY)</span>
                            </Col>
                        </Row>
                        <Row class="chat-top" type="flex" justify="space-between" v-show="statusBtn!=0">
                            <Col span="8" class="order-info" v-if="bankInfo&&bankInfo!=null">
                            <i class="icons bankfor"></i>
                            <span>{{payInfo.realName}} </span>
                            <p>{{bankInfo.branch}}</p>
                            <p>{{bankInfo.cardNo}}</p>
                            </Col>
                            <Col span="8" class="order-info" v-else>
                            <i class="icons bankfor"></i>
                            <pre></pre>
                            <p style="color:rgb(145, 143, 143)">{{$t('otc.noBankCardTip')}}</p>
                            </Col>
                            <Col span="8" class="order-info" v-if="alipay&&alipay!=null">
                            <i class="icons alipay"></i>
                            <span>{{$t('common.alipay')}}</span>
                            <pre></pre>
                            <p>{{alipay.aliNo}}</p>
                            </Col>
                            <Col span="8" class="order-info" v-else>
                            <i class="icons alipay"></i>
                            <pre></pre>
                            <p style="color:rgb(145, 143, 143)">{{$t('otc.noAlipayTip')}}</p>
                            </Col>
                            <Col span="8" class="order-info" v-if="wechatPay&&wechatPay!=null">
                            <i class="icons wechat"></i>
                            <span>{{$t('common.wechat')}}</span>
                            <pre></pre>
                            <p>{{wechatPay.wechat}}</p>
                            </Col>
                            <Col span="8" class="order-info" v-else>
                            <i class="icons wechat"></i>
                            <pre></pre>
                            <p style="color:rgb(145, 143, 143)">{{$t('otc.noWechatTip')}}</p>
                            </Col>

                        </Row>
                        <chatline :msg="msg"></chatline>
                    </div>
                    </Col>
                </Row>
            </div>
        </div>
        <Modal v-model="modal1" :title="$t('common.tips')" @on-ok="ok1">
            <p style="color:red;font-weight: bold;">{{$t('otc.confirmPaidTip')}}</p>
        </Modal>
        <Modal v-model="modal2" :title="$t('common.tips')" @on-ok="ok2" :loading="isloading">
            <p style="color:red;font-weight: bold;">{{$t('otc.confirmCancelTip1')}}</p>
        </Modal>
        <Modal v-model="modal3" :title="$t('common.tips')" @on-ok="ok3">
            <p style="color:red;font-weight: bold;">{{$t('otc.confirmCancelTip2')}}</p>
        </Modal>
        <Modal v-model="modal4" :title="$t('common.tips')" @on-ok="ok4">
            <Form :model="formItem" :label-width="80">
                <FormItem :label="$t('otc.complaintType')">
                    <Select :placeholder="$t('common.pleaseSelect')" v-model="formItem.select">
                        <Option value="1">{{$t('otc.paidMonenyNoReceived')}}</Option>
                        <Option value="2">{{$t('otc.paidCoinNoReceived')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="$t('otc.complaintNote')">
                    <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('otc.iWantComplain')"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modal5" :title="$t('common.tips')" @on-ok="ok5">
            <p style="color:red;font-weight: bold;">{{$t('otc.whetherConfirmRelease')}}</p>
        </Modal>
    </div>
</template>
<script>
import chatline from '../../components/otc/Chatline'
export default {
    components: {
        chatline
    },
    data() {
        return {
            statusBtn: 0,
            tradeType: 0,
            isloading: true,
            payTime: '',
            statusText: '',
            modal1: false,
            modal2: false,
            modal3: false,
            modal4: false,
            modal5: false,
            formItem: {
                select: '',
                remark: ''
            },
            msg: {},
            payInfo: {},
            bankInfo: {},
            alipay: {},
            wechatPay: {},

        }
    },
    created() {
        this.init();
        this.getDetail()

    },
    computed: {
    },
    methods: {
        init(){
            this.$store.commit('navigate','nav-otc');
        },
        //让浏览器滚动条保持在最低部
        scrollToBottom: function() {
            // window.scrollTo(0, 900000);
        },
        ok1() {
            this.$http.post(this.host + '/otc/order/pay', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.getDetail()
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        ok2() {
            setTimeout(() => {
                this.isloading = false
                this.modal2 = false
                this.modal3 = true
            }, 10000)
        },
        ok3() {
            this.$http.post(this.host + '/otc/order/cancel', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.getDetail()
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        ok4() {
            //时间
            if (1 == 1) {
                var params = {};
                params['orderSn'] = this.$route.query.tradeId
                params['remark'] = this.formItem.remark

                this.$http.post(this.host + '/otc/order/appeal', params).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success(resp.message);
                        this.getDetail()
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
        },
        ok5() {
            this.$http.post(this.host + '/otc/order/release', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.getDetail()
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getDetail() {
            //获取个人广告
            this.$http.post(this.host + '/otc/order/detail', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.msg = resp.data
                    this.payInfo = this.msg.payInfo
                    if (this.payInfo == null) {
                        this.bankInfo = this.alipay = this.wechatPay == null
                    } else {
                        this.bankInfo = this.msg.payInfo.bankInfo
                        this.alipay = this.msg.payInfo.alipay
                        this.wechatPay = this.msg.payInfo.wechatPay
                    }

                    this.statusBtn = resp.data.status
                    this.tradeType = resp.data.type
                    // this.tradeType = resp.payTime
                    // console.log(this.tradeType)
                    if (resp.data.status == 1) {
                        this.statusText = this.$t('otc.waitPaid')
                    } else if (resp.data.status == 2) {
                        this.statusText = this.$t('otc.waitPaid')
                    } else if (resp.data.status == 3) {
                        this.statusText = this.$t('common.completed')
                    } else if (resp.data.status == 4) {
                        this.statusText = this.$t('otc.appealing')
                    } else if (resp.data.status == 0) {
                        this.statusText = this.$t('common.cancelled')
                    }

                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
    }
}
</script>
<style scoped>
/* right */

.rightbox {
    margin-left: 20px;
    padding-bottom: 20px;
    margin-bottom: 40px;
}

.chat-top {
    padding: 30px 0;
    font-size: 14px;
}

.order-time h5 {
    font-size: 16px;
    line-height: 40px;
}

.order-info h5 {
    font-weight: 600;
    font-size: 14px;
}

.icons.alipay {
    background-image: url(../../assets/img/alipay.png);
}

.icons.wechat {
    background-image: url(../../assets/img/wechat.png);
}

.icons {
    height: 17px;
    width: 17px;
    display: inline-block;
    margin-top: -1px;
    background-size: 100% 100%;
    vertical-align: middle;
}

.bankfor {
    background-image: url(../../assets/img/bankcard.png);
}






































/* chat */


/* left */

.mt20 {
    margin-top: 20px;
}

.leftmenu {
    margin-bottom: 60px;
    position: relative;
    min-height: 1px;
    padding: 50px 15px 50px 15px;
    text-align: left;
}

.chat-in-box .chat-in .chat-right .chat-right-in {
   
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 {
    font-size: 14px;
    font-weight: 100;
    color: #fff;
    min-width: 195px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 8px;
}

.chat-in-box .chat-in .chat-right .chat-right-in .seller {
    margin-left: 6px;
}

.chat-in-box .chat-in .chat-right .chat-right-in h6 span {
    margin-left: 6px;
}

.chat-in-box .chat-in .chat-right .chat-right-in p {
    color: #fff;
    font-size: 12px;
    margin-bottom: 8px;
    line-height: 1.5;
}

.chat-in-box .chat-in .chat-right .chat-right-in p em {
    color: #f40a0a;
    font-style: normal;
}









































/* -- */

.content-wrap {
    min-height: 515px;
}

.container {

    padding-top: 30px;
    margin: 0 auto;
}
</style>

