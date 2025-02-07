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
      path: '/base',
      name: 'base',
      component: () => import('../views/MainBaseView.vue'),
      children:[
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
   
  ],
})

export default router
