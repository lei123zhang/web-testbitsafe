<template>
<div style=" background: #ececec;padding: 81px;">
  <div class="content">
   <div class="tit">{{$t('identBusiness.title')}}</div>
   <div class="plancon">
   <span></span>
   
   <div class="plan">
     <!-- //这里如果activestepindex等于i就是当前的步骤 如果是第三步 那么0 1 2 是有图标的6666草-->
     <div v-for="(step,i) in steps" :key="step" :class="{action:activeStepIndex>=i}">
       {{activeStepIndex>=i?'':i+1}}
      </div>
   </div>

   <!--  -->
   <div class="plans">
      <div v-for="step in steps" :key="step">
       {{step}}
      </div>
     
   </div>
   </div>
   <div class="xian">

   </div>
   <!-- 认证商家 -->
   <div class="ipshang" v-show="activeStepIndex === 0">
  <Row style="margin-top:43px;">
        <Col span="8">
         <div>
           <img src="../../assets/img/Exclusive booth.png" alt="">
           <p>{{$t('identBusiness.exclusiveBooth')}}</p>
         </div>
        </Col>
         <Col span="8">
         <div>
           <img src="../../assets/img/One-to-one.png" alt="">
           <p>{{$t('identBusiness.oneToOne')}}</p>
         </div>
        </Col>
        <Col span="8">
         <div>
           <img src="../../assets/img/lowest.png" alt="">
           <p>{{$t('identBusiness.lowestFee')}}</p>
         </div>
        </Col>
    </Row>
    <div class="peakfire">
      {{$t("identBusiness.mailboxleft")}}<span>{{$t("identBusiness.mailboxcenter")}},</span>{{$t("identBusiness.mailboxright")}}
    </div>
     <Row style="margin-top:50px;line-height: 33px;" class="ip">
        <Col span="8">
        <img src="../../assets/img/accomplish.png" alt="">{{$t("common.phone")}}
        </Col>
        <Col span="8">
        <img src="../../assets/img/accomplish.png" alt="">{{$t("identBusiness.personalAssets")}}
        </Col>
        <Col span="8">
        <img src="../../assets/img/accomplish.png" alt="">{{$t("identBusiness.idCardFrontBack")}}
        </Col>
        <Col span="8">
        <img src="../../assets/img/accomplish.png" alt="">{{$t("common.wechat")}}
        </Col>
        <Col span="8">
        <img src="../../assets/img/accomplish.png" alt="">{{$t("identBusiness.whetherExchange")}}
        </Col>
        <Col span="8">
        <img src="../../assets/img/accomplish.png" alt="">{{$t("identBusiness.idCardHand")}}
        </Col>
        <Col span="8">
        <img src="../../assets/img/accomplish.png" alt="">QQ
        </Col>
        <Col span="8">
        <img src="../../assets/img/accomplish.png" alt="">{{$t("identBusiness.whetherRisk")}}
        </Col>
    </Row>
     <div style="    text-align: center;font-size: 16px;margin-top:50px">
      <Checkbox v-model="single" ></Checkbox> <a href="">{{$t("identBusiness.agreeProtocol")}}</a>
    
     </div>
     <div class="sq">
      <Button type="info"  @click="apply">{{$t("identBusiness.confirmApply")}}</Button>
      </div>
   </div>
  
<!-- 商家end -->
<!-- 发送邮件 -->
 <div class="mail" v-show="isShowMailt">
     <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input><br/>
     <Input v-model="value" placeholder="Enter something..." style="width:202px"></Input>
     <Button type="info">{{$t("common.sendCode")}}</Button><br/>
     <Button type="info" style="margin-top: 25px; width: 297px;">{{$t("common.confirm")}}</Button>
 </div>
 <!-- 邮件end -->
 </div>
 <!-- 提交审核中 -->
 <div class="submittedAudit"v-show="activeStepIndex === 1">
  <img src="../../assets/img/accomplish.png" alt="">
 </div>
  <!-- end -->
 <!-- 审核成功 -->
 <div class="auditSuccess" v-show="activeStepIndex === 2">
  <img src="../../assets/img/accomplish.png" alt="">
 </div>
</div>


</template>
<<script>
export default {
   data(){
       return {
          single: false,
          value:'',
          isShowShang:true,
          isShowMailt:false,
          isShowSubmitted:false,
          isShowSuccess:false,
          activeStepIndex:0,
          steps:[this.$t("identBusiness.prepareMaterial"),this.$t("identBusiness.submitAudit"),this.$t("identBusiness.auditPass")]
    }
   },
 methods: {
   init(){
     this.$store.commit('navigate','nav-identbusiness');
   },
   islogin(){
     this.$http.post(this.host + '/otc/order/pay', { orderSn: this.$route.query.tradeId }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.getDetail()
                } else {
                    //this.$Message.error(resp.message);
                }
            })
   },
    timer() {
        setInterval(()=>{ 
            this.getSetting();
        },10000)
    },
    getSetting() {
         this.$http.get(this.host + this.api.uc.identification)
         .then(res =>{
              console.log(res.data)
              let certifiedBusinessStatus = res.data.data.certifiedBusinessStatus;
            this.activeStepIndex =certifiedBusinessStatus;
            
         })
        .catch(function (error) {
              console.log(error,999);
         });
    },
     apply(){
       let stasingle =  this.single 
       if(stasingle == false){
          this.$Message.success(this.$t("identBusiness.agreeProtocolRule")); 
          return;
       }
     this.$http.get(this.host + this.api.uc.apply)
         .then(res =>{
              let suc = res.body.message;
              //console.log(suc,666)
             this.$Message.success(suc);        
         })
        .catch(function (error) {
             this.$Message.success(error);
         });
  },
    
},
  created(){
    this.init();
 this.timer();
 this.islogin();
}

};
</script>

<style scoped>
.content {
  margin-top: 25px;
  width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  height: 100%;
  background: #fff;
}
.ip .ivu-col {
  line-height: 37px;
  text-align: left;
  padding-left: 139px;
}
.ipshang {
}
.sq {
  width: 1200px;
  margin-top: 50px;
  text-align: center;
  margin-bottom: 50px;
}
.xian {
  width: 100%;
  height: 1px;
  margin-top: 105px;
  border-top: 1px #ececec dotted;
}
.sq button {
  height: 50px;
  font-size: 18px;
  width: 450px;
}
.tit {
  font-size: 16px;
  line-height: 25px;
  border-left: 5px solid #FF8B1A;
  padding-left: 15px;
}
.plancon {
  width: 64%;
  margin: 49px auto;
  position: relative;
}
.plan {
  position: absolute;
  height: 36px;
  width: 100%;
  top: -13px;
}
.plans {
  position: absolute;
  height: 36px;
  width: 100%;
  top: 13px;
}
.plan div {
  z-index: 99;
  float: left;
  width: 33.33%;
  color: white;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background: url("../../assets/img/2.png") center no-repeat;
  background-size: contain;
}
.action {
  z-index: 99999 !important;
  float: left;
  width: 25%;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background-size: contain;
  background: url("../../assets/img/1.png") center no-repeat !important;
}
.plans div {
  z-index: 99;
  float: left;
  width: 33.333%;
  height: 53px;
  line-height: 53px;
  font-size: 14px;
  text-align: center;
  background-size: contain;
}
.plancon span {
  background: #ececec;
  height: 1px;
  width: 65%;
  display: inherit;
  margin: 0 auto;
}
.ivu-col-span-8 p {
  font-size: 19px;
}
.peakfire {
  width: 1000px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  border: 1px solid #eaeaea;
  margin-top: 43px;
  padding-left: 25px;
}
.peakfire span {
  color: #3faef5;
}
.mail {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  line-height: 50px;
  display: none;
}
.submittedAudit {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  display: none;
}
.auditSuccess {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  display: none;
}
</style>


