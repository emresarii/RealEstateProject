import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'anasayfa',
      component: HomeView
    },
    {
      path: '/randevular',
      name: 'randevular',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AppointView.vue')
    },
    {
      path: '/randevuolustur',
      name: 'randevu oluştur',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateAppointView.vue')
    },
    {
      path :'/randevular/:id',
      name:'',
      component: () => import('../views/ShowAppointmentView.vue')
    }
  ]
})

export default router
