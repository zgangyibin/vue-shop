<script>

export default {
  
}
</script>
<template>
    <div class="buyok">
        <van-icon color="red" size="2rem" name="passed"/>
        <h3>购买成功</h3>
        
        <van-button to="/" block type="warning">返回首页</van-button><br/>
        <van-button to="/orders" block type="default">订单中心</van-button>
    </div>
</template>
<style  scoped>
.buyok {
    width: 100vw;
    height: 100vh;
    margin-top: .50rem;
    padding: .24rem;
    text-align: center;
    color: red;
}

.buyok h3 {
    font-size: .4rem;
    margin-bottom: 2rem;
}
</style>