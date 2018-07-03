<template>
    <div class="page-view">
        <div class="page-content">
            <div class="layout">
                <div class="layout-ceiling">
                    <router-link class="logo" to="/">
                        <div class="layout-logo"></div>
                        <div class="logo_title">
                            <p class="big">{{$t("header.logo")}}</p>
                            <p class="small">mybtcsafe</p>
                        </div>
                    </router-link>
                    <div class="layout-ceiling-main">
                        <div class="header_nav">
                            <Menu :active-name="activeNav" theme="dark" width="auto" :open-names="['1']">
                                <Submenu name="1" style="background:#0b0d1b;">
                                    <router-link to="/">
                                        <MenuItem name="nav-index">{{$t("header.index")}}</MenuItem>
                                    </router-link>
                                    <router-link to="/exchange">
                                        <MenuItem name="nav-exchange">{{$t("header.exchange")}}</MenuItem>
                                    </router-link>
                                    <router-link to="/finance">
                                        <MenuItem name="nav-asset">{{$t("header.asset")}}</MenuItem>
                                    </router-link>
                                    <router-link to="/uc/safe">
                                        <MenuItem name="nav-uc">{{$t("header.ucenter")}}</MenuItem>
                                    </router-link>
                                    <router-link to="/help">
                                        <MenuItem name="nav-service">{{$t("header.service")}}</MenuItem>
                                    </router-link>
                                </Submenu>
                            </Menu>
                        </div>
                        <div style="float:right;">
                            <div class="login_register" v-if="isLogin">
                                <Dropdown style="margin-right:20px;">
                                    <a href="javascript:void(0)">
                                        <img style="vertical-align:middle;width:15px;" src="./assets/images/user.png">
                                        <span>{{member.username}}</span>
                                        <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                        <div @click="logout">
                                            <DropdownItem>
                                                <img src="./assets/images/logout.png"> {{$t("common.logout")}}
                                            </DropdownItem>
                                        </div>
                                    </DropdownMenu>
                                </Dropdown>
                                <Button v-if="member.signInActivity&&member.signInAbility" size='small' @click="signIn">{{$t("header.signIn")}}</Button>
                                <Button v-else-if="member.signInActivity&&!member.signInAbility" size='small' disabled>{{$t("header.signedIn")}}</Button>
                            </div>
                            <div class="login_register" v-else>
                                <Menu active-name="1-1" theme="dark" width="auto" :open-names="['2']">
                                    <Submenu name="2" style="background:#0b0d1b;">
                                        <router-link to="/login" id="login">
                                            <MenuItem name="1-1">{{$t("common.login")}}</MenuItem>
                                        </router-link>
                                        <router-link to="/register" id="register">
                                            <MenuItem name="1-2">{{$t("common.register")}}</MenuItem>
                                        </router-link>
                                    </Submenu>
                                </Menu>
                            </div>
                            <Dropdown @on-click="changelanguage">
                                <a style="width:90px;height:20px;line-height:20px;border:1px solid;border-radius:20px;padding:0 12px;" href="javascript:void(0)">
                                    {{languageValue}}
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="en">English</DropdownItem>
                                    <DropdownItem name="cn">简体中文</DropdownItem>
                                    <DropdownItem name="tw">繁体中文</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            <router-view></router-view>
            <div class="footer">
                <div class="footer_content">
                    <div class="footer_top">
                        <img src="./assets/images/footer_logo.png"></img>
                        <ul>
                            <li>
                                <router-link to="/newhelp/index?id=1">{{$t("footer.xsrm")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/about-protocol">{{$t("footer.fwtk")}}</router-link>
                            </li>
                            <li>
                                <router-link to="/about-fee">{{$t("footer.fltk")}}</router-link>
                            </li>
                            <li>
                                <a href="mailto:support@mybtcsafe.com">{{$t("footer.lxyx")}}：support@mybtcsafe.com</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer_bottom">
                        <p>©2018 mybtcsafe.com</p>
                        <ul>
                            <li><img src="./assets/images/facebook.jpg" alt=""></li>
                            <li><img src="./assets/images/twitter.jpg" alt=""></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'app',
    data() {
        return {
            // languageValue: '简体中文'
        }
    },
    computed: {
        'activeNav': function() {
            return this.$store.state.activeNav;
        },
        'isLogin': function() {
            return this.$store.getters.isLogin;
        },
        'member':function(){
            return this.$store.getters.member;
        },
        'languageValue':function () {
            var curlang = this.$store.getters.lang;
            if(curlang == "English") this.$i18n.locale = 'en';
            if(curlang == "繁体中文") this.$i18n.locale = 'tw';
            return curlang;
        }
    },
    created: function() {
        // if (this.isMobileUserAgent()){
        //     location.href = "http://wap.bite-s.com";
        //     return;
        // }
        var that = this;
        if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) { // detect it's IE11
		  window.addEventListener("hashchange", function(event) {
		    var currentPath = window.location.hash.slice(1);
		    if (that.$router.path !== currentPath) {
		      that.$router.push(currentPath)
		    }
		  }, false)
		}
        this.initialize();
    },
    methods: {
        initialize() {
            this.$store.commit('navigate','nav-index');
            this.$store.commit('recoveryMember');
            this.$store.commit('initLang');
            this.checkLogin();
        },
        // isMobileUserAgent:function(){
        //     return (/iphone|ipod|android|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
        // },
        signIn(){
            this.$http.post(this.host + '/uc/member/sign-in', {}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success('签到成功');
                    let obj={};
                    obj=JSON.parse(localStorage.getItem('MEMBER'));
                    obj.signInAbility=false;
                    localStorage.setItem('MEMBER',JSON.stringify(obj));
                    this.$store.commit('setMember',obj);
                }else{
                    this.$Message.error(resp.message);
                }
            })
        },
        logout() {
            this.$http.post(this.host + '/uc/logout', {}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.$store.commit('setMember',null);
                    location.href = "/";
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        checkLogin() {
            this.$http.post(this.host + '/uc/check/login', {}).then(response => {
                var result = response.body;
                if(result.code == 0 && result.data == false){
                   this.$store.commit('setMember',null);
                }
            });
        },
        changelanguage: function(name) {
            if (name == 'en') {
                // this.languageValue = 'English';
                this.$store.commit('setlang','English');
                this.$i18n.locale = 'en';
            }
            if (name == 'cn') {
                // this.languageValue = '简体中文';
                this.$store.commit('setlang','简体中文');
                this.$i18n.locale = 'zh';
            }
            if (name == 'tw') {
                // this.languageValue = '简体中文';
                this.$store.commit('setlang','繁体中文');
                this.$i18n.locale = 'tw';
            }
        }
    }
}
</script>

<style>
ul li,ol li{
    list-style:none;
}

#onlineservice{
    position: fixed;
    right: 20px;
    bottom: 40px;
    background: transparent;
}
  #onlineservice>a{
    background: transparent url("assets/images/onlineservice.jpg") no-repeat;
    display: block;
    /*width: 80px;*/
    /*height: 80px;*/
    width: 64px;
    height: 66px;
    background-size: cover;
    /*border-radius: 100%;*/
  }

.ivu-table{
    font-size:16px;
}
.ptjy .ivu-table{
    /* font-size: 20px; */
}
.ivu-table-cell{
    padding: 0;
}
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: #253042;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}



/*自定义滚动条样式*/

::-webkit-scrollbar {
    width: 10px;
    background: #0b0d1b;
}

::-webkit-scrollbar-thumb {
    background: #1f1b2a;
    border-radius: 25px;
}

.hide {
    display: none;
}

.blue {
    color: #5469A1 !important;
}

.red {
    color: #AE4E54 !important;
}

.ivu-btn-info {
    color: #FCD759;
    background: #2AABFE;
    border-color: #2AABFE;
}

.ivu-btn-error,.ivu-btn-error:hover{
    background: #EFC032;
    border-color: #EFC032;
}

.ivu-btn-primary {
    /* background:#1855fd;
    border-color:#1855fd; */
}

.ivu-btn.active,
.ivu-btn:active {
    color: #FCD759;
    background: #2AABFE;
    border-color: #2AABFE;
}

.ivu-btn-text.active,
.ivu-btn-text:active {
    color: #2b85e4;
    background-color: transparent;
    border-color: transparent;
}

.ivu-btn.disabled,
.ivu-btn.disabled.active,
.ivu-btn.disabled:active,
.ivu-btn.disabled:focus,
.ivu-btn.disabled:hover,
.ivu-btn[disabled],
.ivu-btn[disabled].active,
.ivu-btn[disabled]:active,
.ivu-btn[disabled]:focus,
.ivu-btn[disabled]:hover,
fieldset[disabled] .ivu-btn,
fieldset[disabled] .ivu-btn.active,
fieldset[disabled] .ivu-btn:active,
fieldset[disabled] .ivu-btn:focus,
fieldset[disabled] .ivu-btn:hover {
    color: #fff;
    background: #54677F;
}

.ivu-carousel-dots li button {
    width: 30px;
    height: 10px;
    border-radius: 14px;
}

.ivu-menu-dark,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #0A2C59 !important;
}

#checkbox {
    width: 10px;
}

#sendCode {
    position: absolute;
    border: 0;
    top: 0;
    right: 0;
    width: 30%;
    color: #1279DE;
    cursor: pointer;
}

.login_form {
    background: url(./assets/images/login_bg.jpg) no-repeat center;
    height: 760px;
    background-size: cover;
    position: relative;
    overflow: hidden;
}

.login_left {
    width: 60%;
    height: 400px;
    margin: 0 auto;
    margin-top: 215px;
    background: rgba(30,33,37,0.7);
    position: relative;
    padding: 0 50px;
    color: #979797;
    font-size: 20px;
}

.login_right {
    position: absolute;
    background: #fff;
    width: 400px;
    height: 560px;
    top: -90px;
    right: 50px;
}

.login_title {
    text-align: center;
    height: 80px;
    font-size: 25px;
}



/* .login_right .ivu-select-selection{
        background:#EAEDEE;
} */

.login_right .ivu-select-dropdown {
    background: #fff;
}

.ivu-form-inline .ivu-form-item {
    display: block;
    margin-right: 0;
}

.modify .ivu-input-wrapper {
    width: 40%;
}

.ivu-btn-ghost {
    color:#fff;
}

.layout {
    position: relative;
}

.logo{
    color:#fff;
    line-height:83px;
    font-size:18px;
    float: left;
}
.logo:hover{
    color: #fff;
}
.layout-logo {
    width: 83px;
    height: 83px;
    background: url(./assets/images/logo.png) no-repeat;
    background-size: cover;
    float: left;
    position: relative;
}
.logo_title{
    float: left;
    height: 83px;
    line-height: 65px;
}
.logo_title p{
    height: 30px;

}
.logo_title p.big{
    font-weight: bold;
}
.logo_title p.small{
    font-size: 14px;
}
.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-ceiling {
    padding: 5px 4%;
    height: 90px;
    background: #0A2C59;
    overflow: hidden;
}

.layout-ceiling-main {
    height: 83px;
    line-height: 83px;
}

.layout-ceiling-main .ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 0;
}

.layout-ceiling-main .ivu-menu-item {
    font-size: 14px;
}

.layout-ceiling-main a {
    color: #fff;
    display: inline-block;
    line-height: 83px;
    height: 83px;
    text-align: center;
    margin-left: 44px;
}

.header_nav {
    float: left;
    /* margin: 0 60px 0 120px; */
}

.login_register .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.login_register .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #1855fd;
    border-radius: 5px;
}

.login_register {
    float: left;
}

#login,
#register {
    color: #fff;
    display: inline-block;
    line-height: 23px;
    width: 73px;
    height: 25px;
    text-align: center;
    margin: 0;
}

.login_register a {
    margin-left: 20px;
}

.ivu-dropdown-rel a {
    width: 100%;
}

.ivu-dropdown-menu {
    width: 100px;
}

.layout-ceiling-main .ivu-select-dropdown {
    background: #0b0d1b;
    margin-left: 44px;
    margin-top:-20px;
}

.ivu-select-dropdown a {
    width: 100%;
    text-align: left;
    margin: 0;
}

.ivu-dropdown-item:hover {
    background: #aaa;
}

.ivu-dropdown-item {
    color: #fff;
}

.ivu-dropdown-item img {
    vertical-align: middle;
}

.ivu-radio-inner:after {
    background: #18202A;
}



/*安全中心*/

.user_center {
    height: 900px;
}

.ivu-menu-submenu-title {
    display: none;
}

.ivu-menu-item {
    text-align: center;
}

.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding-left: 0 !important;
    padding-right: 0;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #0A2C59 !important;
    border-top:2px solid #EFC032;
}
.login_register .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active,
.login_register .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #0199E5 !important;
    border-radius:0;
    border:0;
}
.layout_menu_right {
    margin-left: 3%;
    background: #18202A;
    color: #fff;
    padding-bottom: 130px;
}

.menu_right_title {
    font-size: 16px;
    line-height: 45px;
    margin: 0 10px;
    padding-left: 20px;
    border-bottom: 1px solid #263142;
}

.ivu-form .ivu-form-item-label{
        color:#fff;
    }
.ivu-modal .ivu-form .ivu-form-item-label{
    color: #000;
}
.legalForm{
    font-size:16px;
}

.category .ivu-radio-group.ivu-radio-group-button {
    width: 100%;
}

.category .ivu-radio-group label {
    font-size: 14px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper {
    background: #28313E;
    color: #979797;
    border: 0;
    padding: 0 25px;
}

.category .ivu-radio-group-button .ivu-radio-wrapper-checked {
    color: #fff;
    background: #2F3D52;
    box-shadow: none;
}

.category .ivu-radio-wrapper span {
    padding-left: 0;
}

.purse_address_left {
    float: left;
    width: 86%;
}

.purse_address p {
    font-size: 10px;
    line-height: 25px;
    color: #979797;
}

.purse_address_left_icon {
    line-height: 40px;
    height: 40px;
    width: 100%;
}

.purse_address_left_icon img {
    vertical-align: middle;
    margin-right: 10px;
}

.purse_address span {
    font-size: 14px;
    float: left;
    color: #fff;
    padding: 0 20px;
    background: #28313E;
    width: 21%;
}

.purse_address_left_icon label {
    float: left;
    width: 72%;
    height: 40px;
    border: 2px solid #28313E;
    padding-left: 20px;
}

#qrcode canvas {
    width: 120px;
}

#qrcode img {
    width: 100%;
}

.ivu-select-item:hover {
    background: #aaa;
}

.ivu-select-item-selected,
.ivu-select-item-selected:hover {
    background: #aaa
}

.chart_container #chart_updated_time {
    float: left;
}

.footer {
    float: left;
    width: 100%;
    font-size: 18px;
    color: #B2BCCA;
    background: #0b0d1b;
}
.footer a{
    color: #B2BCCA;
}
.footer_content {
    height: 200px;
    padding: 0 4%;
}
.footer_top,.footer_bottom{
    height: 100px;
}
.footer_top{
    border-bottom: 2px solid #263241;
}
.footer_top img{
    float: left;
    margin-top: 20px;
}
.footer_content ul{
    float: right;
}
.footer_content ul li{
    float: left;
    line-height: 100px;
    margin-left: 50px;
}
.footer_bottom{
    line-height: 100px;
}
.footer_bottom p{
    float: left;
}
.footer_bottom img{
    margin-top:30px;
}
.ivu-select-selected-value {
    color: #bbbec4
}
.ivu-tabs {
    color: #fff;
}
.ivu-tabs-bar{
    border: 0;
}
.ivu-tabs-nav-container{
    line-height: 2.5;
}
.ivu-table {
    background: none;
}

/*法币交易*/

.ww {
    width: 85%;
    margin: 0 auto;
    min-width: 1200px;
}

.ivu-col {
    text-align: center;
}

#List {
    background: #1C314E;
    color: #fff;
}
.ivu-date-picker{
    color: #000;
} 
.nav-right .ivu-table{
    color: #fff;
}
.nav-right .ivu-table-wrapper{
    border: none;
}
.nav-right  .ivu-table th{
    background: #29405F;
}
.nav-right .ivu-table td{
    background: #1C314E;
}
.nav-right .ivu-table:before,
.nav-right .ivu-table:after {
    display: none;
}
.nav-right .ivu-table td,.nav-right .ivu-table th{
    text-align: center;
    border-bottom: 0;
}
.nav-right tr.ivu-table-row-hover td{
    background: #1C314E;
}
.nav-right .ivu-table-stripe .ivu-table-body tr.ivu-table-row-hover td, .ivu-table-stripe .ivu-table-fixed-body tr.ivu-table-row-hover td{
    background: #1C314E;
}
.nav-right .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
    background: #1C314E;
}
.content-wrap textarea{
    color: #fff;
    background-color: #1C314E;
}
.content-wrap input{
    background-color: #1C314E;
}
.content-wrap .ivu-input{
    background-color: #1C314E;
    color: #fff;
}
.login_form .ivu-input{
    background-color: #E9EDEE;
}
.content-wrap .ivu-input[disabled],.content-wrap fieldset[disabled] .ivu-input{
    background-color: #aaa;
}
.content-wrap .ivu-input-number-input{
    color: #fff;
}
.content-wrap .ivu-select-selection{
    background-color: #1C314E;
}
.login_form .ivu-select-selection{
    background-color: #E9EDEE;
}
.content-wrap .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
    color: #fff;
}


/* left */

.leftmenu {
    margin-bottom: 60px;
    position: relative;
    min-height: 1px;
    padding: 20px 0;
    color: #fff;
}

.nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
}

.nav>li {
    line-height: 50px;
}

.leftmenu .nav-stacked {

}

.leftmenu .leftmenu-title {
    line-height: 55px;
    font-size: 20px;
    background: 0 0;
    /* padding-left: 20px; */
    /*border-top: #f1f1f1 solid 1px;
	border-bottom: #f1f1f1 solid 1px;*/
    display: block;
    /* cursor: pointer; */
}

.leftmenu .nav>li>a {
    display: block;
    color: rgba(255,255,255,.7);
    font-size: 14px;
}

.leftmenu .nav-pills>li.active>a,
.leftmenu .nav>li>a:hover,
.nav-pills>li.active>a:focus,
.nav-pills>li.active>a:hover {
    background: #363e4f;
    color: #fff;
}

.leftmenu .leftmenu-title.top {
    border-top: 0;
}

.leftmenu .lefticon {
    width: 26px;
    height: 26px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: middle;
}
.leftmenu a.router-link-active {
    background: #1A60C0;
    color: #fff !important;
}
</style>