<template>
  <div id="app">
    <!-- <nav-bar></nav-bar> -->
    <side-bar></side-bar>
    <div class="content-custom">
      <transition name="slide-right"
                  mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import SideBar from './components/Templates/SideBar'

export default {
  name: 'ImageParsing',

  components: { SideBar }
}
</script>

<style lang="sass">
</style>
