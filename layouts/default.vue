<template>
  <div class="app_main">
    <header>
      <section>
        <div class="logo">NEVER EVER</div>
        <nav>
          <nuxt-link v-for="(item ,index) in navs" :key="index" :to="item.path" :class="['nav_item',nav_index === index ? 'active':'']">{{item.title}}</nuxt-link>
        </nav>
      </section>
    </header>
    <main>
        <nuxt />
    </main>
    <footer></footer>
  </div>
</template>
<script>
export default {
  data(){
    return {
      nav_index:0,
      navs:[
        {
          path:'/',
          title:'首页'
        },
        {
          path:'/article',
          title:'文章'
        },
        {
          path:'/project',
          title:'项目'
        },
        {
          path:'/about',
          title:'关于'
        },
        {
          path:'/music',
          title:'音乐'
        }
      ]
    }
  },
  methods:{
    changeRouter(router) {
      let index = 0;
      for(let i = 0; i < this.navs.length; i++) {
        if(this.navs[i].path === router.path) {
          index = i;
          break;
        }
      }
      this.nav_index = index;
    }
  },
  watch:{
    $route(router) {
      this.changeRouter(router)
    }
  }
}
</script>
<style lang="scss" scoped>
.app_main{
  padding-top:70px;
  header{
    position: fixed;
    left:0;
    top:0;
    right:0;
    height:60px;
    z-index:999;
    border-bottom: 1px solid #ccc;
    section{
      height:100%;
      padding:0 20px;
      min-width: 900px;
      display: flex;
      align-items: center;;
      .logo{
        margin-right: 20px;
      }
      nav{
        height:60px;
        line-height: 60px;
        .nav_item{
          padding:0 10px;
          position:relative;
          display: inline-block;
          box-sizing: border-box;
          &.active{
            color:burlywood;
            &::after{
              content: '';
              position: absolute;
              left:0;
              width:100%;
              bottom: 0;
              height: 4px;
              background:burlywood;
            }
          }
        }
      }
    }
  }
  main{
    padding: 0 20px;
    width:1050px;
  }
}
</style>
