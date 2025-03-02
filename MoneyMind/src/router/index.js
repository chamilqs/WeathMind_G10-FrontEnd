import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../components/Tabs.vue'
import HomePage from '../views/HomePage.vue'
import Statistic from '../views/Statistic.vue'
import MyCards from '../views/MyCards.vue'
import Mandy from '../views/Mandy.vue'
import RegistroFinanzas from '../views/RegistroFinanzas.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/homepage'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      { path: 'homepage', component: HomePage },
      { path: 'statistic', component: Statistic },
      { path: 'mycards', component: MyCards },
      { path: 'mandy', component: Mandy }
    ]
  },
  // Añadir la ruta para RegistroFinanzas
  {
    path: '/registro-finanzas',
    component: RegistroFinanzas
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
