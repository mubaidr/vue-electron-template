<p align="center"><img src="./LogoDesigns/logotype1blue.png"></p>

# Vue-Electron-Template

[![Build status](https://ci.appveyor.com/api/projects/status/cjua6pdhjp9rqa1o?svg=true)](https://ci.appveyor.com/project/mubaidr/vue-electron-template)
[![Build Status](https://travis-ci.org/mubaidr/vue-electron-template.svg?branch=master)](https://travis-ci.org/mubaidr/vue-electron-template)

The boilerplate for electron applications using vue.js

> **Checkout [vue-electron-template](https://github.com/mubaidr/vue-electron-template/tree/rollup) using Rollup.js**

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

# Build directory for this app with executeable
npm run build:dir

# Lint all source files using ESLINT
npm run lint
```

### Project structure

`src` contains all the source files.

`src/main` contains electron main script.

`src/renderer` contains vue-js application.

`vue-electron` contains dev and build scripts

#### Credits

All credits to authors of packages and tools used in the project.

\* This template is inspired by [electron-vue](https://github.com/SimulatedGREG/electron-vue)
