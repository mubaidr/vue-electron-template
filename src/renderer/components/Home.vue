<template>
  <div>
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <br />
        <div class="block has-text-centered">
          <figure class="image is-128x128">
            <img
              alt="Placeholder image"
              src="../../../_icons/512icontype11.png"
            />
          </figure>
        </div>
        <div class="content has-text-centered">
          <h1 class="title is-4">
            Image Parsing
          </h1>
          <p class="subtitle is-6">
            Generate answeer sheets and extract results from the scanned answer
            sheets.
          </p>
          <RouterLink class="button is-light" to="generate">
            <i class="material-icons">view_carousel</i>
            <span>Generate</span>
          </RouterLink>
          <RouterLink class="button is-light" to="process">
            <i class="material-icons">flash_on</i>
            <span>Process</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
})
</script>

<style>
.hero-body {
  height: 100vh;
}
</style>
