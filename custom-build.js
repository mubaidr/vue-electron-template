const builder = require('electron-builder') // eslint-disable-line
const { Platform } = builder

console.log('running build...')

// Promise is returned
builder
  .build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
      appId: 'org.mubaidr.vue-electron-template',
      directories: {
        output: 'build'
      },
      files: ['dist/electron/**/*'],
      productName: 'productName',
      win: {
        icon: 'build/icons/icon.ico',
        target: [
          {
            target: 'portable',
            arch: ['x64']
          }
        ]
      }
    }
  })
  .then((success) => {
    console.log(`Success: ${success}`)
  })
  .catch((error) => {
    console.log(`Error: ${error}`)
  })
