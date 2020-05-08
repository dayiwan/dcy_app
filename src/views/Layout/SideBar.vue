<template>
  <div id="sidebar">
    <div class="sidebar-item">

    </div>
  </div>
</template>

<script>
import { routes } from '@/router';
export default {
  data() {
    return {
       routes
    }
  },
  mounted() {
    console.log(this.routes)
  }
}
</script>

<style lang="scss">
#sidebar {
  width: 240px;
  height: 100%;
  background-color: black;
}
</style>