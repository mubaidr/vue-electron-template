import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      meta: {
        title: 'Home',
        icon: 'fa-home',
      },
      component: require('@/renderer/components/Home.vue').default,
    },
    {
      path: '/generate',
      meta: {
        title: 'Generate',
        icon: 'fa-file-alt',
      },
      component: require('@/renderer/components/Generate.vue').default,
    },
    {
      path: '/process',
      meta: {
        title: 'Process',
        icon: 'fa-play',
      },
      component: require('@/renderer/components/Process.vue').default,
    },
    {
      path: '/compile',
      meta: {
        title: 'Compile',
        icon: 'fa-tasks',
      },
      component: require('@/renderer/components/Compile.vue').default,
    },
    {
      path: '/train',
      meta: {
        title: 'Train',
        icon: 'fa-vials',
      },
      component: require('@/renderer/components/Train.vue').default,
    },
    {
      path: '/about',
      meta: {
        title: 'About',
        icon: 'fa-info-circle',
      },
      component: require('@/renderer/components/About.vue').default,
    },
    {
      path: '/help',
      meta: {
        title: 'Help',
        icon: 'fa-info-circle',
      },
      component: require('@/renderer/components/Help.vue').default,
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
})

router.afterEach(to => {
  let title =
    to.path === '/home'
      ? process.env.PRODUCT_NAME
      : `${to.meta.title} - ${process.env.PRODUCT_NAME}`

  if (!title) {
    title = 'Home'
  }

  document.title = title
})

export default router
