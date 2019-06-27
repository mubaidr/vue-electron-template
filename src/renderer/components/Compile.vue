<template>
  <div class="section">
    <h1 class="title is-4">
      Compile
    </h1>
    <h2 class="subtitle is-6">
      Compile result using extracted results and answer key.
    </h2>

    <form class="control">
      <div class="field">
        <label class="label">Result File</label>
        <div class="file has-name is-fullwidth">
          <label class="file-label">
            <button
              :disabled="running"
              @click="chooseResultFile"
              class="file-input"
              name="resume"
            />
            <span class="file-cta">
              <i class="material-icons">list</i>
              <span class="file-label">Choose File</span>
            </span>
            <span class="file-name">{{ resultFilePath }}</span>
          </label>
        </div>
        <!-- <p class="help">
          Choose the result file
        </p> -->
      </div>

      <div class="field">
        <label class="label">Key File</label>
        <div class="file has-name is-fullwidth">
          <label class="file-label">
            <button
              :disabled="running"
              @click="chooseKeyFile"
              class="file-input"
              name="resume"
            />
            <span class="file-cta">
              <i class="material-icons">insert_drive_file</i>
              <span class="file-label">Choose File</span>
            </span>
            <span class="file-name">{{ keyFilePath }}</span>
          </label>
        </div>
        <!-- <p class="help">
          Choose the key file
        </p> -->
      </div>

      <div class="columns is-multiline is-mobile">
        <div class="column is-6">
          <div class="field">
            <label class="label">Correct Marks</label>
            <div class="control">
              <input
                v-model="correctMarks"
                class="input"
                placeholder="Marks earned for each correct answer"
                type="number"
              />
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="field">
            <label class="label">Negative Marks</label>
            <div class="control">
              <input
                v-model="incorrectMarks"
                class="input"
                placeholder="Marks deducted for each incorrect answer"
                step="0.01"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="buttons">
        <button
          :disabled="running || !inputIsValid"
          @click="compile"
          class="button is-primary"
        >
          <i class="material-icons">assessment</i>
          <span>Compile Result</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { openFile, saveFile } from '../../utilities/electron-dialog'
import { compileResult } from '../../utilities/compile'
import { exportJsonToExcel } from '../../utilities/excel'
import * as VALIDTYPES from '../../utilities/validTypes'
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      resultFilePath:
        'D:\\Current\\image-parsing\\__tests__\\test-data\\result.xlsx',
      keyFilePath: 'D:\\Current\\image-parsing\\__tests__\\test-data\\key.jpg',
      correctMarks: 3,
      incorrectMarks: 1,
      running: false,
    }
  },

  computed: {
    inputIsValid() {
      return (
        this.resultFilePath !== null &&
        this.keyFilePath !== null &&
        this.correctMarks !== null &&
        this.incorrectMarks !== null
      )
    },
  },

  methods: {
    async compile() {
      this.running = true

      if (!this.resultFilePath || !this.keyFilePath) return

      const results = await compileResult(
        this.resultFilePath,
        this.keyFilePath,
        {
          correctMarks: this.correctMarks,
          incorrectMarks: this.incorrectMarks,
        }
      )

      await this.exportCompiledResults(results)
      this.running = false
    },

    async exportCompiledResults(json) {
      const destination = await saveFile([
        {
          name: 'Excel File',
          extensions: VALIDTYPES.NativeKeys,
        },
      ])

      if (destination) {
        await exportJsonToExcel(json, destination)
        this.$toasted.show('File saved succesfully. ')
      } else {
        this.$toasted.show('File cannot be saved. ', { type: 'warn' })
      }
    },

    async chooseResultFile() {
      this.resultFilePath = await openFile([
        {
          name: 'Excel File',
          extensions: VALIDTYPES.NativeKeys,
        },
      ])
    },

    async chooseKeyFile() {
      this.keyFilePath = await openFile([
        {
          name: 'Excel or Image File',
          extensions: VALIDTYPES.Key,
        },
      ])
    },
  },
})
</script>

<style></style>
