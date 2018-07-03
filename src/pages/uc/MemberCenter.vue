<template>
    <div class="content-wrap">
            <div class="container" id="List">
                <Row>
                    <Col span="4">
                    <div class="leftmenu">
                        <ul class="nav nav-pills nav-stacked">
                            <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1">
                                <i class="lefticon icon6"></i>
                                {{$t('uc.safeCenter')}}
                            </span>
                            <li class="">
                                <router-link to="/uc/safe">{{$t('uc.safeSetting')}}</router-link>
                            </li>
                            <li class="">
                                <router-link to="/uc/account">{{$t('uc.accountSetting')}}</router-link>
                            </li>
                            <li class="">
                                <router-link to="/uc/myextension">{{$t('uc.myextension')}}</router-link>
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
    created: function() {
        this.init();
    },
    methods: {
        init() {
            this.$store.commit('navigate','nav-uc');
            if (!localStorage.TOKEN || !localStorage.MEMBER) {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
        },
    },
}
</script>
<style>

.icon6 {
    background: url('../../assets/img/membericon1.png') no-repeat 0 0;
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

