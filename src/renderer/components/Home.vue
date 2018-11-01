<template>
  <div>
    <section class="hero is-black is-medium">
      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1">
            Vue-Electron-Template
          </h1>
          <p>The boilerplate for making electron applications using vue.js </p>
        </div>
        <br>
        <div class="block has-text-centered">
          <a
            class="button is-info"
            href="https://github.com/mubaidr">
            <span class="icon">
              <i class="fab fa-github" />
            </span>
            <span>Follow me</span>
          </a>
          <a
            class="button is-info"
            href="https://github.com/mubaidr">
            <span class="icon">
              <i class="fa fa-star" />
            </span>
            <span>Star</span>
          </a>
        </div>
      </div>
    </section>
    <div class="section">
      <system-information/>
    </div>
  </div>
</template>

<script>
import SystemInformation from './Home/SystemInformation'

export default {
  name: 'Home',

  components: { SystemInformation },
}
</script>

<style></style>
