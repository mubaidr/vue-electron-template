<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <br />
        <div class="block has-text-centered">
          <figure class="image is-128x128">
            <img alt="Placeholder image" src="../../../_icons/512pxblue.png" />
          </figure>
        </div>
        <div class="content has-text-centered">
          <h1 class="title is-4">
            Vue-Electron-Template
          </h1>
          <p class="subtitle is-6">
            The boilerplate for making electron applications using vue.js.
          </p>
          <RouterLink class="button is-primary" to="about">
            <i class="material-icons">info</i>
            <span>About</span>
          </RouterLink>
          <RouterLink class="button is-primary" to="help">
            <i class="material-icons">help</i>
            <span>Help</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

enum TEST {}

export default Vue.extend({
  name: 'Home',
})
</script>

<style>
.hero-body {
  height: 100vh;
}
</style>
