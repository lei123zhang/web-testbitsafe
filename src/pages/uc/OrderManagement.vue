<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <Row>
                    <Col span="4">
                    <div class="leftmenu">
                        <ul class="nav nav-pills nav-stacked">

                            <span class="leftmenu-title leftmenu-folding top" data-folding="trademenu1">
                                <i class="lefticon icon3"></i>
                                订单中心
                            </span>
                            <li class="">
                                <router-link to="/otc/order">我的订单</router-link>
                            </li>
                            <li class="">
                                <router-link to="/otc/ad">我的广告</router-link>
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
            this.$store.state.HeaderActiveName = '1-4';
           if (!localStorage.TOKEN||!localStorage.MEMBER) {
                this.$Message.success('请先登录');
                this.$router.push('/login');
            }
        },
    }
}
</script>
<style>

.icon3 {
    background: url('../../assets/img/ordericon.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.content-wrap {
    min-height: 750px;
}

.container {

    padding-top: 30px;
    margin: 0 auto;
}
</style>

