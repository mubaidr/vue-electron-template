<template>
  <div>
    <h1 class="title is-5">
      Process
    </h1>
    <h2 class="subtitle is-6">
      Process scanned images to generate result.
    </h2>
    <div class="field">
      <label class="label">Scanned Images Directory</label>
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <button
            :disabled="running"
            @click="chooseImageDirectory"
            class="file-input"
            name="resume"
          />
          <span class="file-cta">
            <i class="material-icons">folder_open</i>
            <span class="file-label">Choose directory</span>
          </span>
          <span class="file-name">{{ imageDirectory }}</span>
        </label>
      </div>
      <p class="help">
        Choose the directory which contains scanned answer sheets.
      </p>
    </div>

    <br />

    <div class="buttons">
      <button
        :disabled="running || !inputIsValid"
        @click="toggleProcess"
        class="button is-primary"
      >
        <i class="material-icons">flash_on</i>
        <span>Process</span>
      </button>

      <button
        :disabled="!running"
        @click="toggleProcess"
        class="button is-danger"
      >
        <i class="material-icons">stop</i>
        <span>Stop</span>
      </button>
    </div>

    <br />
    <br />
    <br />

    <Transition mode="out-in" name="slide-down">
      <table v-if="running" class="table is-fullwidth">
        <thead>
          <tr>
            <th />
            <th>Total</th>
            <th>Processed</th>
            <th>Remaining Time</th>
          </tr>
        </thead>
        <tr>
          <td>
            <i class="material-icons rotating">fiber_smart_record</i>
          </td>
          <td>{{ totalImages }}</td>
          <td>{{ processedImages }}</td>
          <td>{{ remainingTime }}</td>
        </tr>
      </table>
    </Transition>
  </div>
</template>

<script>
const mainWindow = require('electron').remote.getCurrentWindow()
import { openDirectory } from '../../../utilities/electron-dialog'
import * as processingModule from '../../../utilities/process'

import Vue from 'vue'

export default Vue.extend({
  name: 'ExtractResult',

  data() {
    return {
      imageDirectory:
        'D:\\current\\image-parsing\\__tests__\\test-data\\images-qrcode',
      running: false,
      processedImages: 0,
      totalImages: 0,
      totalWorkers: 0,
      perImageTime: 0,
      startTime: 0,
      endTime: 0,
    }
  },

  computed: {
    inputIsValid() {
      return this.imageDirectory
    },

    remainingTime() {
      const ms =
        (this.totalImages - this.processedImages) * (this.perImageTime || 500)
      return this.toHHMMSS(ms)
    },
  },

  watch: {
    running() {
      mainWindow.setProgressBar(0)
    },
  },

  created() {
    processingModule.stop()
  },

  methods: {
    toggleProcess() {
      if (this.running) {
        processingModule.stop()

        this.processedImages = 0
        this.totalImages = 0
        this.totalWorkers = 0
        this.perImageTime = 0
      } else {
        if (this.imageDirectory === undefined) return

        processingModule
          .start(this.listner, this.imageDirectory)
          .then(({ totalImages, totalWorkers }) => {
            this.totalImages = totalImages
            this.totalWorkers = totalWorkers
          })
          .catch(err => {
            console.error(err)

            this.$toasted.show(err, {
              type: 'error',
            })
          })
      }

      this.running = !this.running
    },

    listner(m) {
      if (m.progress) {
        this.processedImages += 1
        if (m.time) {
          this.perImageTime = m.time
        }

        // set taskbar progress and
        mainWindow.setProgressBar(this.processedImages / this.totalImages)
        // flash taskbar when done
        mainWindow.once('focus', () => mainWindow.flashFrame(false))
        mainWindow.flashFrame(true)
      } else if (m.completed) {
        this.running = false

        this.$emit('results', m) // m contains both key and results
      } else if (m.error) {
        this.$toasted.show(
          'A critical error has occured, please contact developer. ',
          {
            type: 'error',
          }
        )
      }
    },

    async chooseImageDirectory() {
      this.imageDirectory = await openDirectory()
    },

    toHHMMSS(s) {
      let str = ''
      const input = s / 1000
      const hours = Math.floor(input / 3600)
      const minutes = Math.floor((input - hours * 3600) / 60)
      const seconds = (input - hours * 3600 - minutes * 60).toFixed(2)

      if (hours) {
        str += `${hours} hours `
      }

      if (minutes) {
        str += `${minutes} minutes `
      }

      if (seconds) {
        str += `${seconds} seconds `
      }

      return str
    },
  },
})
</script>

<style scoped lang="scss">
table {
  th,
  td {
    text-align: center;
  }
}
</style>
