<template>
  <div class="section">
    <!-- <h1 class="title is-5">Process</h1>
    <h2 class="subtitle is-6">Process scanned images to generate result.</h2>-->
    <Transition mode="out-in" name="slide-left">
      <review-result :results="extractedResult" v-if="extractedResult" />
      <extract-result @results="getExtractedResult" v-else />
    </Transition>
  </div>
</template>

<script>
import extractResult from './Process/Extract.vue'
import reviewResult from './Process/Review.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'Process',

  components: {
    extractResult,
    reviewResult,
  },

  data() {
    return {
      extractedResult: null,
      extractedKey: null,
    }
  },

  methods: {
    getExtractedResult(m) {
      this.$set(this, 'extractedResult', m.results)
    },
  },
})
</script>

<style></style>
