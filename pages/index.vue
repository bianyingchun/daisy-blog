<template>
  <div class="home-page">
    <div class="aside">
      <div class="aside-box">
        <div class="mask"></div>
        <div class="aside-content">
          <a href="#"><img src="~assets/img/avatar.jpg" alt=""></a>
          <h1>
            Daisy
            <p>面朝大海 春暖花开</p>
          </h1>
        </div>
      </div>
    </div>
    <div class="home-view">
      <div class="about-me">
        <div class="about-nav">
          <nuxt-link to="/article">
            <span class="lt1">文章</span>
            <span class="lt2">Article</span>
          </nuxt-link>
          <nuxt-link to="/music">
            <span class="lt1">音乐</span>
            <span class="lt2">Music</span>
          </nuxt-link>
        </div>
        <div class="about-nav">
          <nuxt-link to="/project">
            <span class="lt1">项目</span>
            <span class="lt2">Project</span>
          </nuxt-link>
          <nuxt-link to="/about">
            <span class="lt1">关于</span>
            <span class="lt2">About</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title:"Daisy | 首页"
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  --fontColor: #5e5e5e;
  --titleColor: #3e3e3e;
  --lineColor: #3fb76c; 
}
.home-page{
  position: absolute;
  left:0;
  top:0;
  right:0;
  display: flex;
  bottom:0;
  .aside{
    flex:1;
    height: 100%;
    background:url("~assets/img/aside-bg.jpg") no-repeat center;
    background-size: 100% 100%;
    transition:width 0.3s;
    .aside-box{
      overflow:hidden;
      display: flex;
      height:100%;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.7) url("~assets/img/aside-bg.jpg") no-repeat center center;
      background-size: auto 100%;
      .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
      }
      .aside-content{
        width:400px;
        height: 400px;
        text-align:center;
        position: relative;
        z-index:2;
        img{
          width:100px;
          height: 100px;
          border-radius: 50%;
          transition: transform .5s ease-in-out;
          cursor: pointer;
          &:hover{
            transform: rotate(360deg);
            box-shadow: 0 0 30px rgba(0, 255, 249, 0.57);
          }
        }
        h1{
          color: var(--titleColor);
          font-size: 22px;
          padding:16px 0 30px 0;
          p{
            font-size: 12px;
            padding:10px 0;
            color: var(--fontColor);
          }
        }
      }
    }
  }
  .home-view{
    display: flex;
    justify-content: center;
    align-items: center;
    flex:1;
    height: 100%;
    position: relative;
    .about-me{
      width: 260px;
      height: 300px;
      .about-nav{
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        a{
          width:100px;
          height: 100px;
          border-radius:50%;
          border:1px solid  #8cb2bf;
          text-align: center;
          line-height: 100px;
          font-size: 18px;
          color: #8cb2bf;
          text-decoration: none;
          transition:background ease-in-out 0.4s;
          &:hover{
            background: #8cb2bf;
            color:#fff;
            border-color:#8cb2bf;
            .lt2{
              display: inline;
              display: none;
            }
          }
          .lt2{
            display: none;
          }
        }
      }
    }
  }
}
</style>