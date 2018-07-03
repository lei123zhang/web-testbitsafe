<template>
  <div>
    <Carousel :autoplay="isAutoplay" v-model="value2" :loop="isLoop" :autoplay-speed="3000" id="carousel">
        <CarouselItem v-for="item in imgList" >
            <!-- <div class="demo-carousel">
              
                  <img  :src=item.url>
              
              
            </div> -->
            <div :style="'background-image: url('+item.url+')'" class="demo-carousel"><a v-show="item.linkUrl!=''&&item.linkUrl!='1'" style="display:block;width:100%;height: 100%;" :href="item.linkUrl" target="_blank"></a></div>
        </CarouselItem>
        <!-- <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/banner.jpg" alt=""></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/banner.jpg" alt=""></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><img src="../../assets/img/banner.jpg" alt=""></div>
        </CarouselItem> -->
    </Carousel>
  </div>
</template>
<script>
export default {
  data () {
      return {
            isAutoplay:false,
            isLoop:false,
            value2: 0,
            imgList:[]
      }
  },
  created:function(){
     this.getImg();
  },
  methods:{
      getImg(){
      
        this.$http.post(this.host+this.api.uc.banner,{sysAdvertiseLocation:1}).then(response => {
          var resp=response.body.data;
          if(resp.length>1){
              this.isAutoplay=true;
              this.isLoop=true;
          }
          this.imgList=resp;
        })
      }
   }
}
</script>
<style scoped>
#carousel img{
  width: 100%;
  height: 640px;
}
</style>


