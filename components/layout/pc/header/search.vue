<template>
  <div class="search">
    <div class="search-box">
      <input
        type="text"
        v-model.trim="searchText"
        @focus="showDropMenu = true"
        @blur="showDropMenu = false"
        :placeholder="$i18n.text.search"
        @keyup.enter="handleSearch()"
        ref="searchBox"
      />
      <button class="search-btn" @click="handleSearch()">
        <i class="iconfont icon-search"></i>
      </button>
    </div>
    <transition name="fade">
      <div class="smart-box" v-show="showDropMenu">
        <dl class="hot-search">
          <dt>热门搜索</dt>
          <dd
            v-for="(item, index) in hot"
            :key="index"
            @mousedown.prevent
            @click="handleSearch(item)"
          >
            {{ item }}
          </dd>
        </dl>
        <dl class="history">
          <dt>历史记录</dt>
          <dd
            v-for="(item, index) in history"
            :key="index"
            @mousedown.prevent
            @click="handleSearch(item)"
          >
            {{ item }}
          </dd>
        </dl>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      searchText: "",
      showDropMenu: false,
      // hot: ['算法', '二叉树', '测试'],
      // history: ['h01', 'ho2', 'ho3']
    };
  },
  mouted() {
    this.initHistory();
  },
  computed: {
    ...mapState("search", ["hot", "history"]),
  },
  methods: {
    ...mapMutations("search", ["initHistory", "updateHistory"]),
    handleSearch(text) {
      const keywords = text || this.searchText;
      this.$refs.searchBox.blur();
      this.searchText = "";
      const isSearchPage = this.$route.name === "search";
      const queryKeywords = this.$route.query.keywords;
      if (keywords && (isSearchPage ? queryKeywords !== keywords : true)) {
        this.$router.push({
          name: "search",
          query: {
            keywords,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  $search-box-height: 2.5rem;
  .search-box {
    background-color: $box-bg;
    border-radius: $search-box-height;
    overflow: hidden;
    display: flex;
    align-items: center;
    input {
      flex: 1;
      height: $search-box-height;
      line-height: $search-box-height;
      padding-left: $box-padding-md;
    }
    button {
      height: $search-box-height;
      line-height: $search-box-height;
      width: $search-box-height;
      &:hover {
        color: $primary;
      }
    }
  }
  .smart-box {
    position: absolute;
    background: $box-bg;
    width: 100%;
    box-shadow: $box-shadow-thin;
    transform-origin: top center;
    top: $header-height/2 + $search-box-height/2;
    left: 0;
    border-radius: $radius;
    > dl {
      margin: 1rem 0;
      dt,
      dd {
        padding: 0.5rem 1rem;
        margin: 0;
      }
      dt {
        color: $text-secondary;
        font-size: $font-size-small;
      }
      dd {
        cursor: pointer;
        &:hover {
          background: $body-bg;
          color: $primary;
        }
      }
    }
  }
}
</style>