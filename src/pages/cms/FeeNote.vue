<template>
  <div class="agreement">
    <img src="../../assets/images/call.png">
    <div class="agreement_tab">
      <div class="static_main">
        <router-link to="/about-rule">{{$t('cms.exchangerule')}}</router-link>
        <router-link to="/about-protocol">{{$t('cms.useprotocol')}}</router-link>
        <router-link to="/about-fee" class="cur">{{$t('cms.feenote')}}</router-link>
      </div>
    </div>
    <div class="content">
      <div class="agreen-cont ">
        <h3 class="tb_50" id="rate_1">交易手续费：</h3>
        <table class="table_s1 align_center">
          <colgroup data-filtered="filtered">
            <col style="width: 10%" data-filtered="filtered">
            <col style="width: 40%" data-filtered="filtered">
            <col style="width: 40%" data-filtered="filtered">
          </colgroup>
          <thead>

          <tr>
            <th class="table_slash">
              <span data-filtered="filtered"></span>
            </th>
            <th>吃单</th>
            <th>挂单</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>BTC</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>TRX</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>ACT</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>EOS</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>LTC</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          <tr>
            <td>DASH</td>
            <td>0.20%</td>
            <td>0.20%</td>
          </tr>
          </tbody>
        </table>

        <div class="fees_tips">
          <b>提醒：</b>
          <p>
            1.挂单是你所下的限价单并未与当前挂单成交，并被放在买卖盘中等待成交的摆单，它增加了买卖盘的流动性。<br data-filtered="filtered">2.当其他人的摆单主动与你所下的摆单成交，你将支付挂单交易手续费（请注意当其他人的限价单与你的限价单成交，而下单时间又早于你时，你将支付吃单费）。<br
            data-filtered="filtered">3.吃单是你所下的限价单或市价单与当前的挂单直接成交。<br data-filtered="filtered">4.当你所下的摆单主动与其他人的摆单成交，你将支付吃单交易手续费。<br
            data-filtered="filtered">5.交易手续费将从您的成交总额中扣除。若成交后获得人民币资产，则支付人民币交易手续费；反之，若成交后获得数字资产，则支付数字资产交易手续费。 </p>
          <p>
            例如：您以6300元卖出1BTC，会扣除12.6元手续费，获得6287.4元。<br data-filtered="filtered">您以6300元买入1BTC，会扣除0.002BTC手续费，获得0.998BTC。
          </p>
          <p>6.人民币提现费率为0.50%，人民币提现24小时内到账。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .agreement {
    background: #2E323D;
    padding-bottom: 20px;
    color: #fff;
    min-height: 750px;
  }

  .agreement_tab {
    height: 49px;
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }

  .agreement_tab a {
    padding: 0 4px 16px;
    margin: 0 32px;
    color: rgba(255,255,255,.7);
    font-size: 14px;
    line-height: 48px;
  }

  .agreement_tab a.cur {
    color: #27abe2;
    font-weight: bold;
    border-bottom: 2px solid #27abe2;
  }

  .content {
    width: 1200px;
    margin: 0 auto;
    font-size:12px;
  }
  .content h3{
    font-size: 16px;
    padding-top: 10px;
  }
  .content table{
    margin: 10px 0;
    width: 100%;
    border: 1px solid #e6e6e6;
    border-spacing: 0;
    border-collapse: collapse;
  }
  .content table th,
  .content table td{
    border: 1px solid #e6e6e6;
    font-weight: normal;
    padding: 0 24px;
    line-height: 36px;
    text-align: center;
  }
</style>
