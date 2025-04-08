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
import Login from '../views/Login.vue';
import ChangePassword from '../views/ChangePassword.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import NotificationsPage from '../views/NotificationsPage.vue';
import HelpSupport from '../views/HelpSupport.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      { path: 'homepage', component: HomePage },
      { path: 'statistic', component: Statistic },
      { path: 'mycards', component: MyCards },
      { path: 'mandy', component: Mandy },
      
    ]
  },
  {
    path: '/sidenav',
    component: SideNav
  },
  {
    path: '/myprofile',
    component: MyProfile
  },
  {
    path: '/historytransaction',
    component: HistoryTransaction,
    meta: { requiresAuth: true }
  },
  {
    path: '/change-password',
    component: ChangePassword
  },
  {
    path: '/forgot-password',
    component: ForgotPassword
  },
  {
    path: '/notifications',
    component: NotificationsPage
  },
  {
    path: '/help-support',
    component : HelpSupport
  },
  {
    path: '/registro-finanzas',
    component: RegistroFinanzas,
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
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;