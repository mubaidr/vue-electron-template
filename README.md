<p align="center"><img src="./_icons/logotype1blue.png"></p>

# Vue-Electron-Template

[![Build status](https://ci.appveyor.com/api/projects/status/cjua6pdhjp9rqa1o?svg=true)](https://ci.appveyor.com/project/mubaidr/vue-electron-template)
[![Build Status](https://travis-ci.org/mubaidr/vue-electron-template.svg?branch=master)](https://travis-ci.org/mubaidr/vue-electron-template)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

The boilerplate for electron applications using vue.js

## Overview

`vue-electron` takes advantage of `webpack-4` with `vue-loader`, `electron-builder`, and some of the most used plugins like `vue-router`, `vuex` and so much more to provide an easy to use development and building enviroment.

### What does it offer?

- Ready to use Vue plugins \([vue-router](https://github.com/vuejs/vue-router), [vuex](https://github.com/vuejs/vuex), [vue-electron](https://github.com/SimulatedGREG/vue-electron)\)
- Installed [vue-devtools](https://github.com/vuejs/vue-devtools) and [devtron](https://github.com/electron/devtron) tools for development
- [Bulma-Pro](https://mubaidr.github.io/bulma-pro/), a theme suitable for desktop application based on [Bulma](https://bulma.io/)
- [Font-awesomse-5](https://fontawesome.com) installed
- Easily package your electron app using [electron-builder](https://github.com/electron-userland/electron-builder)
- `DEV` & `BUILD` NPM scripts using [webpack-4](https://github.com/webpack/webpack) and [vue-loader](https://github.com/vuejs/vue-loader) with Hot Module Replacement enabled
- Process restarting when working in main process
- CSS/JS pre-processor support with [vue-loader](https://github.com/vuejs/vue-loader/)
- Remove unused css/styles during build
- ES7 with [`env`](https://babeljs.io/docs/en/babel-preset-env/) by default
- ESLint configured
- Babel configured

### Screenshot

<p align="center"><img src="./screenshot.png"></p>

### Getting Started

Clone this repository, install dependencies and run using either `dev` or `build` command.

```bash
# Clone this repository
git clone https://github.com/mubaidr/vue-electron

# change directory to cloned path
cd vue-electron

# Install dependencies
npm install

# Run in `DEV` mode
npm run dev

# Build installer for this app
npm run build
```

### Project structure

`src/main` contains electron main script.

`src/renderer` contains vue-js application.

#### Credits

All credits to authors of packages and tools used in the project.

\* This template is inspired by [electron-vue](https://github.com/SimulatedGREG/electron-vue)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/35353768?v=4" width="100px;" alt="Jibbie R. Eguna"/><br /><sub><b>Jibbie R. Eguna</b></sub>](https://github.com/jbeguna04)<br />[🎨](#design-jbeguna04 "Design") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
