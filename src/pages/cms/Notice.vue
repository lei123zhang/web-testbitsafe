<template>
    <div class="help">

        <div class="help_container">
            <div style="line-height: 40px;"><router-link to="/help">{{$t('cms.servicecenter')}}</router-link>->{{$t('cms.notice')}}</div>

            <Col span="24" style="padding:0 2%;color:#000;font-size:18px;">

                <div v-for="item in FAQList" class="faqlist">
                    <div class="faqitem" @click="noticedeail(item.id)">{{item.title}}
                        <span style="float:right">{{item.createTime}}</span>
                    </div>
                </div>

            </Col>

        </div>
        <Col span="24" style="padding:100px 0;">

           <Page :total="totalPages" :pageSize="pageSize" :current="pageNo" @on-change="loadDataPage"></Page>

         </Col>
    </div>
</template>
<style>
.help {
  color: #000;
  background: #fff;
  min-height: 750px;
  /* background:url(/assets/images/help_bg.png) no-repeat center; */
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.help_container {
  padding: 0 12%;
  height: 100%;
  min-height: 320px;
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
.faqlist p{
    line-height: 51px;
    padding:0 15px;
}
.faqlist div{
    color:#000;
    font-size: 14px;
    line-height:26px;
    padding:15px 15px;
    word-wrap: break-word;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
}
</style>
<script>
export default {
  data() {
    return {
      pageNo:1,
      pageSize:10,
      totalPages:0,
      FAQList: [
        // {
        //   title: "人民币提现",
        //   key: "123"
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

      this.loadDataPage(this.pageNo);
    },
    loadDataPage(pageIndex){
        var param = {};
        param["pageNo"] = pageIndex,
        param["pageSize"] = this.pageSize,
        this.$http.post(this.host + this.api.uc.announcement, param).then(response => {
          var resp = response.body;
          if(resp.code==0){
            this.FAQList = resp.data.content;
            this.totalPages = resp.data.totalElements;
          }else{
            this.$Notice.error({
              title: this.$t('common.tips'),
              desc: resp.message
            });
          }
        });
    },
    noticedeail(id){
        var path =  {path:'/notice/index',query:{id:id}};
        this.$router.push(path);
    }
  }
};
</script>
