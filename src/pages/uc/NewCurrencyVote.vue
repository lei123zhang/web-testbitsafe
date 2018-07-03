<template>
    <div class="content-wrap" style="padding:40px 10%;">
        <div class="vote_header">
            <span>{{$t('header.newCurrencyVote')}}</span>
            <!-- <Button>我的投票记录</Button> -->
        </div>
        <Table :columns='columns' :data='data' :no-data-text="$t('common.nodata')"></Table>
        <Modal v-model="modal">
            <p slot="header" style="color:#f60;text-align:center">
                <span>{{$t('newCurrencyVote.pleaseVote')}}</span>
            </p>
            <div style="text-align:center">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                    <FormItem :label="$t('newCurrencyVote.enterVote')" prop="amount">
                        <span>{{$t('newCurrencyVote.voteLimit')}}{{voteLimit}}</span>
                        <Input v-model="formValidate.amount" size="large"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="handleSubmit('formValidate')">{{$t('newCurrencyVote.vote')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    data(){
        let self = this;
        return{
            voteLimit:'',
            id:'',
            columns:[
                {
                    title:'ID',
                    key:'id',
                    width:'60px',
                    render:(h,params)=>{
                            return params.row.preCoins[params.index].id;
                        }
                },
                {
                    title:this.$t('newCurrencyVote.unit'),
                    key:'unit',
                    render:(h,params)=>{
                            return params.row.preCoins[params.index].unit;
                        }
                },
                {
                    title:this.$t('newCurrencyVote.name'),
                    key:'name',
                    render:(h,params)=>{
                            return params.row.preCoins[params.index].name;
                        }
                },
                // {
                //     title:'赞成/反对',
                //     key:'opinion',
                //     render:(h,params)=>{
                //         return h('Progress',{
                //             props:{
                //                 percent:85,
                //                 'hide-info':''
                //             }
                //         })
                //     }
                // },
                {
                    title:this.$t('newCurrencyVote.amount'),
                    key:'amount',
                    render:(h,params)=>{
                            return params.row.preCoins[params.index].amount;
                        }
                },
                {
                    title:this.$t('common.status'),
                    key:'status',
                    render:(h,params)=>{
                        let txt='';
                        txt=params.row.status==1?this.$t('newCurrencyVote.being'):this.$t('newCurrencyVote.over')
                        return h('span',{

                        },txt)
                    }
                },
                {
                    title:this.$t('common.operate'),
                    key:'operate',
                    render:(h,params)=>{
                        if(params.row.status==1){
                            return h('p',[
                                // h('a',{
                                //     style:{
                                //         marginRight:'5px'
                                //     },
                                //     on:{
                                //         click:function(){
                                //             self.agree();        
                                //         }
                                //     }
                                // },'赞成'),
                                // h('a',{
                                //     on:{
                                //         click:function(){
                                //             self.oppose();        
                                //         }
                                //     }
                                // },'反对')
                                h('a',{
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:function(){
                                            self.id=params.row.id;
                                            self.vote();        
                                        }
                                    }
                                },this.$t('newCurrencyVote.vote'))
                            ])
                        }
                    }
                }
            ],
            data:[
                // {
                //     id:'1',
                //     coin:'BYC',
                //     name:'BYC币缘币',
                //     amount:'724400',
                //     operate:'赞成'
                // }
            ],
            modal:false,
            formValidate: {
                amount:''
            },
            ruleValidate: {
                amount: [
                    { required: true, message: this.$t('newCurrencyVote.enterVote'), trigger: 'blur' }
                ]
            }
        }
    },
    created:function(){
        this.init();
        this.getVoteInfo();
    },
    computed:{
        'lang': function () {
          return this.$store.state.lang;
        }
    },
    watch:{
        'lang':function () {
          this.updateLangData();
        },
    },
    methods:{
        updateLangData(){
            this.columns[1].title=this.$t('newCurrencyVote.unit');
            this.columns[2].title=this.$t('newCurrencyVote.name');
            this.columns[3].title=this.$t('newCurrencyVote.amount');
            this.columns[4].title=this.$t('common.status');
            this.columns[5].title=this.$t('common.operate');
        },
        init() {
            this.$store.commit('navigate','nav-newCurrencyVote');
        },
        getVoteInfo(){
            this.data=[];
            this.$http.post(this.host + '/uc/vote/info').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.data.push(resp.data);
                    this.voteLimit=resp.data.voteLimit;
                }
            })
        },
        vote(){
            this.modal=true;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.submit(name)
                } else {
                    this.$Message.error(this.$t('newCurrencyVote.voteFail'));
                }
            })
        },
        submit(name) {
            if(!/^\d+$/.test(this.formValidate.amount)){
                this.$Message.error(this.$t('newCurrencyVote.amountRule'));
                return;
            }
            if(this.formValidate.amount==0){
                this.$Message.error(this.$t('newCurrencyVote.amountRule1'));
                return;
            }
            let param = {}
            param['preCoinId'] = this.id
            param['amount'] = this.formValidate.amount

            this.$http.post(this.host + '/uc/vote', param).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(this.$t('newCurrencyVote.voteSuccess'));
                    this.modal = false;
                    this.getVoteInfo();
                } else if(resp.code == 4000){

                }else if(resp.message=='Insufficient balance'){
                    this.$Message.error(this.$t('common.nobalance'));
                }else {
                    this.$Message.error(resp.message);
                }
            })

        }
        // agree(){

        // },
        // oppose(){

        // }
    }
    
}
</script>

<style>
    .content-wrap {
    min-height: 750px;
    /* padding:40px 10%; */
}
.vote_header>span{
    color: #fff;
    font-size: 16px;
    margin-right:40px;
}
.content-wrap .ivu-progress-inner{
    background-color: #B04C42;
    border-radius: 0;
}
.content-wrap .ivu-progress-bg{
    background-color: #03AE2A;
    border-radius: 0;
}

</style>
