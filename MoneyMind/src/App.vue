<template>
  <ion-app>
    
    <TransactionList />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import TransactionList from './components/TransactionList.vue';
</script>

<style>
body {
  background-color: white !important; /* Asegura que el fondo sea blanco */
  margin: 0;
  padding: 0;
}
.app-container {
  min-height: 100vh; /* Asegura que el fondo cubra toda la pantalla */
  background-color: white;
}
</style>
