<template>
    <div class="help">
        <img style="width:100%" src="../../assets/images/call.jpg">
        <div class="help_container">
            
            <Col span="7">
               <div>
                <img src="../../assets/images/consult.png">
                </div>
                 <router-link to="/notice">
                <h2>{{$t('cms.noticecenter')}}</h2>
                 </router-link>
                <!-- <a href="tencent://message/?uin=924499270&site=qq&menu=yes">
                  
                </a> -->
            </Col>
            <Col span="7">
            <div>
                <img src="../../assets/images/help.png">
                </div>
                 <router-link to="/newhelp">
                <h2>{{$t('cms.newshelp')}}</h2>
                 </router-link>           
            </Col>
            <Col span="7">
                <div>
                <img src="../../assets/images/wechats.png">
                </div>
                <h2  @click="showEwm">{{$t('cms.appdownload')}}</h2>
            </Col>
            <div v-show="isShowWeChat" style="position: absolute;right: 66px;">
              <img src="../../assets/images/wechats.png">
            </div>
            <!-- <Col span="24" style="padding:0 2%;color:#fff;font-size:18px;">
                <p style="line-height:50px;">{{$t('cms.faq')}}</p>
                <span v-html="this.FAQContent"></span>
                <div v-for="item in FAQList" class="faqlist">
                    <p>{{item.title}}</p>
                    <div v-html="item.content">{{item.content}}</div>
                </div>
                <Table disabled-hover :columns="columns1" :data="data1"></Table>
            </Col> -->
        </div>
    </div>
</template>
<style>
.help {
  background: #fff;
  /* background:url(/assets/images/help_bg.png) no-repeat center; */
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  color:#000;
  min-height: 750px;
}
.help_container {
  padding: 0 12%;
  height: 100%;
}
.ivu-col-span-7 {
  text-align: center;
  border: 1px solid #ececec;
      padding: 47px 0;
  margin: 50px 2% 10px 2%;
  color: #000;
}
.ivu-col-span-7 h2 {
  padding-top: 5px;
  line-height: 35px;
  font-size: 22px;
  font-weight: 500;
  color:#000;
}
.ivu-col-span-7 p {
  font-size: 15px;
  line-height: 35px;
  padding-bottom: 15px;
}
.ivu-col-span-7 img {
  margin: 15px 0;
      height: 42px;
      background: #fff;
}
.ivu-col-span-7 button {
  width: 50%;
  margin: 10px 0;
  color: #000;
  background: #fff;
  font-size: 15px;
}
.ivu-col-span-7 button:hover {
  background: #464650;
}
.help_container .ivu-table th {
  text-align: center;
  background: #a3a3a3;
  color: #28313e;
  border: 0;
}
.help_container .ivu-table td {
  background: none;
  text-align: center;
  background: #7c7c7c;
  opacity: 0.5;
}
.help_container .ivu-table tr:last-child td {
  border: 0;
}
.faqlist{
text-align: left;

}
h2:hover{
cursor:pointer
}
.faqlist p{
    background:#2B2F38;
    line-height: 51px;
    padding:0 15px;
}
.faqlist div{
    color:#000;
    font-size: 14px;
    line-height:26px;
    padding:15px 15px;
    word-wrap: break-word;
}
</style>
<script>
export default {
  data() {
   
    return {
      isShowWeChat:false,
      FAQContent:'',
      FAQList: [
        // {
        //   title: "人民币提现",
        //   key: "rmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixianrmbTixian"
        // },
        // {
        //   title: "转入/转出虚拟币",
        //   key: "inOutXnb"
        // },
        // {
        //   title: "虚拟币交易",
        //   key: "xnbDeal"
        // },
        // {
        //   title: "人民币提现",
        //   key: "rmbTixian"
        // },
        // {
        //   title: "转入/转出虚拟币",
        //   key: "inOutXnb"
        // },
        // {
        //   title: "虚拟币交易",
        //   key: "xnbDeal"
        // }
      ],
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit('navigate','nav-service');
      this.$store.state.HeaderActiveName = "1-7";

      // this.loadFAQData();
    },
    loadFAQData(){
      let param = {};
      param["sysHelpClassification"] = 1;
      this.$http.post(this.host + "/uc/ancillary/system/help").then(response => {
        var resp = response.body;
        console.log(resp.code)
        if(resp.code==0){
          this.FAQList = resp.data;
          this.FAQContent=resp.data.content;
          
        }
      });
    },
    showEwm() {
            // this.isShowWeChat = !this.isShowWeChat;
      const title = this.$t('common.tips');
      const content = '<p>'+this.$t('common.expect')+'</p>';
      const okText = this.$t('common.confirm');
          this.$Modal.info({
            title: title,
            content: content,
            okText: okText,
            closable: true
          });
    }
  }
};
</script>
