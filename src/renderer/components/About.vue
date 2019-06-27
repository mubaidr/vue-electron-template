<template>
  <div class="section">
    <h1 class="title is-4">About</h1>
    <div class="box">
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p>
              <h2 class="subtitle is-6">Developed By: </h2>
              <strong>Muhammad Ubaid Raza</strong>
              <br/>
              <a
                href="//github.com/mubaidr"
                target="_blank"
              >mubaidr@gmail.com</a>
            </p>
          </div>
        </div>
      </article>
    </div>

    <h2 class="subtitle is-4">System Information</h2>
    <SystemInformation/>
    <br>
  </div>
</template>

<script>
import SystemInformation from './About/SystemInformation.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'About',
  components: { SystemInformation },
})
</script>

<style>
.block.has-text-centered figure {
  margin: 0 auto;
}
</style>
