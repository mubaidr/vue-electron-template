<template>
  <div class="modal is-active">
    <div @click="closeModal" class="modal-background" />
    <button
      @click="closeModal"
      aria-label="close"
      class="delete is-large is-top-right"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="columns is-mobile">
          <div class="column is-3">
            <a @click="previous" class="button is-pulled-left is-info">
              <i class="material-icons">skip_previous</i>
            </a>
          </div>
          <div class="column">
            <div class="field">
              <p class="control">
                <input
                  ref="txt_roll_no"
                  :class="{ 'is-danger': !row.hasValidRollNo }"
                  :readonly="row.hasValidRollNo"
                  v-model="row.rollNo"
                  class="input has-text-centered is-uppercase has-text-weight-bold is-family-code"
                  placeholder="Roll No"
                  type="text"
                />
              </p>
            </div>
          </div>
          <div class="column is-3">
            <a @click="next" class="button is-pulled-right is-info">
              <i class="material-icons">skip_next</i>
            </a>
          </div>
        </div>
      </header>

      <section class="modal-card-body">
        <!-- Preview -->
        <img :src="imageSource" v-show="imageSource" />
      </section>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'ModalPreview',

  props: {
    selectedRow: {
      type: Object,
      default() {
        return null
      },
    },

    imageSource: {
      type: String,
      default() {
        return ''
      },
    },
  },

  data() {
    return {
      row: null,
    }
  },

  watch: {
    selectedRow(val) {
      this.row = val

      const el = this.$refs.txt_roll_no
      el.focus()
    },
  },

  created() {
    // @ts-ignore
    this.row = this.selectedRow
  },

  mounted() {
    const el = this.$refs.txt_roll_no
    el.focus()
  },

  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.row = null
    },

    next() {
      this.$emit('next')
    },

    previous() {
      this.$emit('previous')
    },
  },
})
</script>

<style lang="scss">
.modal-card-head {
  .columns {
    width: calc(100% + 1.5rem);
  }
}

.delete.is-top-right {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99999;
}
</style>
