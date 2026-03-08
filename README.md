<p align="center">
  <img src="./_icons/logotype1blue.png" width="200" alt="Vue-Electron">
</p>

# Vue-Electron-Template

[![Build Status](https://travis-ci.org/mubaidr/vue-electron-template.svg?branch=master)](https://travis-ci.org/mubaidr/vue-electron-template)
[![License](https://img.shields.io/github/license/mubaidr/vue-electron-template)](LICENSE)
[![Stars](https://img.shields.io/github/stars/mubaidr/vue-electron-template?style=social)](https://github.com/mubaidr/vue-electron-template)

> **🚀 Vue 3 Support**: [See Issue #907](https://github.com/mubaidr/vue-electron-template/issues/907)

Template for building **desktop applications** using [Electron](https://electronjs.org) and [Vue.js](https://vuejs.org) with modern tooling.

## ✨ Features

- **Modern UI**: [Bulma-Fluent](https://mubaidr.github.io/bulma-fluent/) theme
- **Vue Ecosystem**: Vue Router, Vuex, Vue 2 support
- **TypeScript**: Full TypeScript support
- **Build Tools**: Webpack 5, electron-builder
- **Developer Experience**: 
  - Hot Module Replacement
  - VS Code debugging
  - vue-devtools integrated
- **Advanced Features**:
  - Worker scripts for CPU-intensive tasks
  - SCSS/SASS support
  - Production build with `--debug` flag
  - Web/browser build in `dist/web`

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/mubaidr/vue-electron-template.git

# Navigate to project
cd vue-electron-template

# Install dependencies
npm install

# Development mode
npm run dev

# Debug mode (with VS Code)
npm run debug

# Build installer
npm run build
```

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development with HMR |
| `npm run debug` | Debug mode with VS Code |
| `npm run build` | Build production installer |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
src/
├── main/           # Electron main process
│   └── index.js    # Main entry point
├── renderer/       # Vue.js application
│   ├── components/ # Vue components
│   ├── views/      # Page views
│   └── store/      # Vuex store
└── utilities/
    └── workerSample.ts  # Sample worker script
```

## 🛠️ Configuration

### Database

Default: **SQL Server**

To switch databases, update Sequelize configuration:
[Sequelize Installation Guide](http://docs.sequelizejs.com/manual/installation/getting-started.html)

### Theme

Built-in [Bulma-Fluent](https://mubaidr.github.io/bulma-fluent/) theme for desktop applications.

## 🐛 Debugging

- **Renderer Process**: Use VS Code debug config
- **Main Process**: Restart on save
- **Production**: Add `--debug` flag to enable DevTools

## 📄 License

MIT

## 👥 Credits

All credits to authors of packages and tools used in this project.

This template is inspired by [electron-vue](https://github.com/SimulatedGREG/electron-vue).

---

**⭐ If you find this useful, star the repository!**
