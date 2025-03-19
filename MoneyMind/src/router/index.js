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
import Login from '../views/Login.vue';
import SolicitarTarjeta from '../views/SolicitarTarjeta.vue'; // Importación directa
import SolicitarCuenta from '../views/SolicitarCuenta.vue'; // Importación directa

const routes = [
  {
    path: '/',
    redirect: '/login', // Redirige a la pantalla de login
  },
  {
    path: '/login', // Ruta del login
    name: 'Login',
    component: Login, // Usa el componente Login.vue
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      { path: 'homepage', component: HomePage },
      { path: 'statistic', component: Statistic },
      { path: 'mycards', component: MyCards },
      { path: 'mandy', component: Mandy },
    ],
  },
  {
    path: '/registro-finanzas',
    component: RegistroFinanzas,
  },
  {
    path: '/myprofile',
    component: MyProfile,
  },
  {
    path: '/sidenav',
    component: SideNav,
  },
  {
    path: '/historytransaction',
    component: HistoryTransaction,
  },
  {
    path: '/solicitartarjeta',
    component: SolicitarTarjeta, // Usa la importación directa
  },
  {
    path: '/solicitarcuenta',
    component: SolicitarCuenta, // Usa la importación directa
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;