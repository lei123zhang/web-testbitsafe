import Vue from 'vue';
import "babel-polyfill";
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        member: null,
        activeNav: '',
        activeMenuName: '',
        lang: '',
        usdcny: ''
    },
    mutations: {
        navigate(state, nav) {
            state.activeNav = nav;
        },
        leftmenu(state, nav) {
            state.activeMenuName = nav;
        },
        setMember(state, member) {
            state.member = member;
            localStorage.setItem('MEMBER', JSON.stringify(member));
        },
        recoveryMember(state) {
            state.member = JSON.parse(localStorage.getItem('MEMBER'));
        },
        setlang(state, lang) {
            state.lang = lang;
            localStorage.setItem('LANGUAGE', JSON.stringify(lang));
        },
        initLang(state) {
            if (localStorage.getItem('LANGUAGE') == null) {
                state.lang = "繁体中文";
            } else {
                state.lang = JSON.parse(localStorage.getItem('LANGUAGE'));
            }
        },
        setUsdcny(state, usdcny) {
            state.usdcny = usdcny;
            localStorage.setItem('usdcny', JSON.stringify(usdcny));
        }
    },
    getters: {
        member(state) {
            return state.member;
        },
        isLogin(state) {
            return state.member != null;
        },
        lang(state) {
            return state.lang;
        },
        usdcny(state) {
            return state.usdcny;
        }
    }
});