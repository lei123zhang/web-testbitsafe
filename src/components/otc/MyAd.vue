<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div style="text-align:left;margin:10px 0;">
                <Button icon="plus-round" type="primary" @click="publish">{{$t('otc.publishAd')}}</Button>
            </div>
            
            <Alert>{{$t('otc.myAdAlert')}}</Alert>
            <div class="order-table">
                <Table stripe :columns="tableColumnsAdv" :data="tableAdv" :loading="loading" :no-data-text="$t('common.nodata')"></Table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        let self = this;
        return {
            dataCount: 0,
            tableAdv: [],
            loading: true,
            tableColumnsAdv: [
                {
                    title: this.$t('otc.adId'),
                    key: 'id',
                },
                {
                    title: this.$t('otc.advertiseType'),
                    key: 'advertiseType',
                    render: (h, params) => {
                        let text = ''
                        if (params.row.advertiseType == 0) {
                            text = this.$t('otc.onlinePurchase')
                        } else if (params.row.advertiseType == 1) {
                            text = this.$t('otc.onlineSale')
                        }
                        return h('div', [
                            h('p', text),
                        ]);
                    }
                },
                {
                    title: this.$t('otc.orderLimit'),
                    key: 'limit',
                    render: (h, params) => {
                        return h('div', [
                            h('p', params.row.minLimit + '~' + params.row.maxLimit),
                        ]);
                    }
                },
                {
                    title: this.$t('otc.remainAmount'),
                    key: 'remainAmount',
                },
                {
                    title: this.$t('common.coin'),
                    key: 'coinUnit',
                },
                {
                    title: this.$t('otc.createTime'),
                    key: 'createTime',
                    width: 160,
                },
                {
                    title: this.$t('common.operate'),
                    key: 'buyBtn',
                    width: '180',
                    render: function(h, params) {
                        return h('p', [
                            h('a', {
                                on: {
                                    click: function() {
                                        if (params.row.status == 0) {
                                            self.$Message.error('广告下架后才可编辑修改');
                                        } else {
                                            self.$router.push('/otc/ad/update?id=' + params.row.id);
                                        }

                                    }
                                }

                            }, [
                                    h('Button', {
                                        props: {
                                            type: 'ghost',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '8px',
                                        },
                                    }, self.$t('common.modify')),
                                ]),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '8px',
                                },
                                on: {
                                    click: () => {
                                        //要上架
                                        if (params.row.status == 1) {
                                            let canshu = {};
                                            canshu['id'] = params.row.id
                                            // canshu['status'] = params.row.status == 0 ? 1 : 0
                                            self.$http.post(self.host + '/otc/advertise/on/shelves', canshu).then(response => {
                                                var resp = response.body;
                                                if (resp.code == 0) {
                                                    self.$Message.success(resp.message);
                                                    // self.$router.go(0)
                                                    self.getAd()
                                                } else {
                                                    self.$Message.error(resp.message);
                                                }
                                            })
                                        } else if (params.row.status == 0) {
                                            let canshu = {};
                                            canshu['id'] = params.row.id
                                            // canshu['status'] = params.row.status == 0 ? 1 : 0
                                            self.$http.post(self.host + '/otc/advertise/off/shelves', canshu).then(response => {
                                                var resp = response.body;
                                                if (resp.code == 0) {
                                                    self.$Message.success(resp.message);
                                                    // self.$router.go(0)
                                                    self.getAd()
                                                } else {
                                                    self.$Message.error(resp.message);
                                                }
                                            })
                                        }

                                    }
                                }
                            }, params.row.status == 0 ? self.$t('otc.offShelf'):self.$t('otc.onShelf')),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let canshu = {};
                                        canshu['id'] = params.row.id
                                        self.$http.post(self.host + '/otc/advertise/delete', canshu).then(response => {
                                            var resp = response.body;
                                            if (resp.code == 0) {
                                                self.$Message.success(resp.message);
                                                self.remove(params.index)
                                            } else {
                                                self.$Message.error(resp.message);
                                            }
                                        })
                                    }
                                }
                            }, self.$t('common.delete'))
                        ]);
                    }
                },
            ],
        }
    },
    methods: {
        init() {
            this.$store.commit('leftmenu','ad');
        },
        remove(index) {
            this.tableAdv.splice(index, 1);
        },
        changePage() {
            // console.log(this.tradeWay)
        },
        getAd() {
            //获取个人广告
            this.$http.post(this.host + '/otc/advertise/all').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableAdv = resp.data;
                    this.loading = false
                    this.dataCount = resp.data.length
                    // console.log(this.tableAdv)
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        publish(){
            this.$router.push(this.api.otc.createAd);
        }

    },
    computed: {

    },
    created() {
        this.init();
        this.getAd();
    }
}
</script>
<style scoped>
.bill_box {
    width: 100%;
    height: auto;
    overflow: hidden;
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
    color: #0B0D1B;
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
