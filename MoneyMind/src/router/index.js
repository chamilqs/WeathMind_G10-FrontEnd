import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'
import HomePage from '../views/HomePage.vue'
import Statistic from '../views/Statistic.vue'
import MyCards from '../views/MyCards.vue'
import Mandy from '../views/Mandy.vue'

const routes= [
  {
    path: '/',
    redirect: '/tabs/homepage'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {path: 'homepage', component: HomePage},
      {path: 'statistic', component: Statistic},
      {path: 'mycards', component: MyCards},
      {path: 'mandy', component: Mandy}
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
