import { createRouter, createWebHistory } from 'vue-router'
import ListPage from '@/pages/ListPage.vue'

const routes = [
  { path: '/', redirect: '/stock' },
  {
    path: '/stock',
    name: 'ListPage',
    component: ListPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
