import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/blogbase.vue'),
      children: [
        {
          path: '',
          name: 'blogindex',
          component: () => import('../views/blogindex.vue'),
        },
        {
          path: '/blog/content',
          name: 'blogcontent',
          component: () => import('../views/blogcontent.vue'),
        },
        {
          path: '/blog/leavemessage',
          name: 'leavemessage',
          component: () => import('../views/leavemessageView.vue'),
        },
        {
          path: '/blog/treasurechest',
          name: 'treasurechest',
          component: () => import('../views/treasurechestView.vue'),
        },
        {
          path: '/blog/ha-fastbrowsing',
          name: 'fastbrowsing',
          component: () => import('../views/fastbrowsing.vue'),
        },
        {
          path: '/blog/list',
          name: 'bloglist',
          component: () => import('../views/bloglist.vue'),
          props: (route) => ({ key: route.query.key })
        },
        {
          path: '/blog/contactus',
          name: 'contactus',
          component: () => import('../views/contactus.vue'),
        },
        {
          path: '/blog/main',
          name: 'blogmain',
          component: () => import('../views/blogmain.vue'),
        }
      ],
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('../views/MainBaseView.vue'),
      children: [
        {
          path: '/main',
          name: 'main',
          component: () => import('../views/MainView.vue'),
          children: [
            {
              path: '/main/welcome',
              name: 'welcome',
              component: () => import('../views/welcome.vue'),
            },
            {
              path: '/main/plot',
              name: 'plot',
              component: () => import('../views/PlotView.vue'),
            },
          ],
        },
      ]
    },
    {
      path: '/live2d',
      name: 'live2d',
      component: () => import('../components/blog/live2dtest.vue'),
    }
  ],
})

export default router
