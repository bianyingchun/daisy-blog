<template>
  <div class="clipboard">
      <input type="text" class="clipboard-input" v-model="text">
  </div>
</template>

<script>
export default {
    data() {
        return {
            text:''
        }
    },
    mounted() {
        //将组件方法挂载到根vue实例上，方便调用,挂载到window上或许也可行
        this.$root.$copyToClipboard = this.copyToClipboard;
    },
    methods: {
        copyToClipboard(text) {
            this.text = text
            window.clickCopy = true
            setTimeout(() => {
                this.$refs.clipboard.select()
                document.execCommand('Copy')
                window.clickCopy = false;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.clipboard{
    height: 0px;
    opacity: 0;
}
</style>