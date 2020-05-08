<template>
  <div id="layout">
    <SideBar />
    <router-view id="container"></router-view>
  </div>
</template>

<script>
import SideBar from "./SideBar";
export default {
  components: {
    SideBar,
  }
};
</script>

<style lang="scss">
#layout {
  @include flex(flex-start);
  height: 100%;
}
#container {
  flex: 1;
  height: 100%;
  overflow: auto;
}
</style>

