<template>
    <div class="content-wrap">
            <div class="container" id="List">
                <Row>
                    <Col span="4">
                    <div class="leftmenu">
                        <ul class="nav nav-pills nav-stacked">
                            <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1">
                                <!-- <i class="lefticon icon4"></i> -->
                                {{$t('finance.finance')}}
                            </span>
                            <li class="">
                                <router-link to="/finance/index">{{$t('finance.financeIndex')}}</router-link>
                            </li>
                            <li class="">
                                <router-link to="/finance/record">{{$t('finance.financeRecord')}}</router-link>
                            </li>
                            <li class="">
                                <router-link to="/finance/recharge">{{$t('common.deposit')}}</router-link>
                            </li>
                            <li class="">
                                <router-link to="/finance/withdraw">{{$t('common.extract')}}</router-link>
                            </li>
                            <li class="">
                                <router-link to="/finance/legalRecharge">{{$t('common.legalRecharge')}}</router-link>
                            </li>
                            <li class="">
                                <router-link to="/finance/legalWithdraw">{{$t('common.legalWithdraw')}}</router-link>
                            </li>
                        </ul>
                    </div>
                    </Col>
                    <Col span="20">
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
                    </Col>
                </Row>
            </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {

        }
    },
    methods: {
        init() {
            this.$store.commit('navigate','nav-asset');
            if (!localStorage.TOKEN || !localStorage.MEMBER) {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
        },
        
    },
    created: function() {
        this.init();
    },
}
</script>
<style>
.icon4 {
    background: url('../../assets/img/moneyicon1.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.icon5 {
    background: url('../../assets/img/moneyicon2.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.order-table {
    margin-top: 20px;
}

.content-wrap {
    min-height: 750px;
    padding-top:20px;
}

.container {
    width: 85%;
    margin: 0 auto;
    min-width: 1200px;
    background:white;
}

</style>

