<template>
  <div id="sidebar">
    <router-link 
    class="sidebar-item" 
    v-for="(route, index) in routes" 
    :key="index" 
    :to="route.children[0].path"
    active-class="active">
     <i :class="`el-icon-${route.children[0].meta.icon}`"></i>  {{ route.children[0].meta.name }}
    </router-link>
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
  width: 200px;
  height: 100%;
  background-color: black;

  .sidebar-item {
    display: block;
    padding: 15px;
    width: 100%;
    text-align: center;
    color: white;
    position: relative;

    &::before {
      content: '';
      width: 6px;
      height: 100%;
      position: absolute;
      background-color: #ff3d3d;
      left: -6px;
      top: 0;
      transition: 0.2s;
    }

    &:hover {
      background-color: #444;
      &::before {
        left: 194px;
      }
    }

    &.active {
      border-right: 6px solid #ff3d3d;
    }
  }
}
</style>