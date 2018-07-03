<template>
  <div class="cms">
    <img src="../../assets/images/call.png">
    <div class="content-wrap">
      <Row>
        <Col span="4">
        <div class="leftmenu">
          <ul class="nav">
            <li class="divider">{{$t('cms.about')}}</li>
            <li class="cur"><router-link to="/about-us">{{$t('cms.aboutus')}}</router-link></li>
            <li><router-link to="/join-us">{{$t('cms.joinus')}}</router-link></li>
          </ul>
        </div>
        </Col>
        <Col span="20" class="content">
        <h1>BITE交易所</h1>
        <Row>
          <Col span="24">
          <span>
          <!-- 联系地址 -->
          <h3></h3>
          </span>
          </Col>
        </Row>
        <Row>
          <Col span="8">
          <span>
          <img src="../../assets/img/email.png" alt="">
          <a href="mailto:service@BITE.pro">
            <h3>service@BITE.pro</h3>
          </a>
        </span>
          </Col>
          <Col span="8">
          <span>
          <img src="../../assets/img/twitter.png" alt="">
          <a target="blank" href="https://twitter.com/BITE2?s=05">
            <h3>https://twitter.com/BITE2?s=05</h3>
          </a>
        </span>
          </Col>
          <Col span="8">
          <span>
          <img src="../../assets/img/telegraph.png" alt="">
          <a target="blank" href="https://t.me/joinchat/H9Eu7g8GE3vO8DTIAMlfpw">
            <h3>https://t.me/joinchat/H9Eu7g8GE3vO8DTIAMlfpw</h3>
          </a>
        </span>
          </Col>
        </Row>
        <Row>
          <Col span="8">
          <span>
          <img src="../../assets/img/qq.png" alt="">
          <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2746723827&site=qq&menu=yes">
            <h3>2746723827</h3>
          </a>
        </span>
          </Col>
          <Col span="8">
          <span>
          <!-- 传真 -->
          <h3></h3>
        </span>
          </Col>
          <Col span="8">
          <span>
          <!-- 微博 -->
          <h3></h3>
        </span>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <span>
          <!-- 微信 -->
          <p></p>
        </span>
         </Col>
        </Row>
      </Col>
    </Row>
    </div>
  </div>
</template>

<style scoped>
  .cms{
    background: #2E323D;
    min-height: 750px;
  }
  .content-wrap{
    padding-top: 20px;
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }
  .leftmenu{
    border: 1px solid #efefef;
  }
  .leftmenu .divider{
    font-size: 20px;
    padding: 5px;
  }
  .leftmenu li {
    font-size: 14px;
    line-height: 30px;
    padding: 5px;
  }
  .leftmenu li a:hover{
    color: #2d8cf0;
  }
  .leftmenu li.cur a {
    color: #2d8cf0;
  }
  .content {
    color: #fff;
    padding-top: 20px;
    padding-left: 200px;
  }
  .content h5 {
    font-size: 14px;
  }
  .content .row-0,
  .content .row-1,
  .content .row-2{
    padding-bottom: 20px;
  }
  .content .row-1{
    display: block;
  }
  .content .row-1:after{
    clear: both;
    content: ' ';
    display: block;
  }
  .content .row-1 span {
    width: 17%;
    float: left;
  }
</style>
