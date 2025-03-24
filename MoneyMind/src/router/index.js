import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../components/Tabs.vue';
import HomePage from '../views/HomePage.vue';
import Statistic from '../views/Statistic.vue';
import MyCards from '../views/MyCards.vue';
import Mandy from '../views/Mandy.vue';
import RegistroFinanzas from '../views/RegistroFinanzas.vue';
import MyProfile from '../views/MyProfile.vue';
import SideNav from '../components/SideNav.vue';
import HistoryTransaction from '../views/HistoryTransaction.vue';
import CreditCard from '../components/CreditCard.vue';
import Saving from '../components/Saving.vue';
import Loan from '../components/Loan.vue';
import Investment from '../components/Investment.vue';
import Cash from '../components/Cash.vue';

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

  { path: '/myprofile', 
    component: MyProfile 
  },
  { path: '/sidenav',
    component: SideNav
  },
  {
    path: '/registro-finanzas',
    component: RegistroFinanzas,
    meta: { requiresAuth: true }
  },
  {
    path: '/historytransaction',
    component: HistoryTransaction,
    meta: { requiresAuth: true }
  },
  // Rutas para formularios de productos
  {
    path: '/solicitar/tarjeta',
    name: 'CreditCard',
    component: CreditCard,
    meta: { requiresAuth: true }
  },
  {
    path: '/solicitar/cuenta',
    name: 'Saving',
    component: Saving,
    meta: { requiresAuth: true }
  },
  {
    path: '/solicitar/prestamo',
    name: 'Loan',
    component: Loan,
    meta: { requiresAuth: true }
  },
  {
    path: '/solicitar/inversion',
    name: 'Investment',
    component: Investment,
    meta: { requiresAuth: true }
  },
  {
    path: '/registrar/efectivo',
    name: 'Cash',
    component: Cash,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
/*
// Guard de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});
*/

export default router;