<template>
  <ion-app>
    <RegistroFinanzas />
  </ion-app>
</template>

<script setup>
import { IonApp } from '@ionic/vue';
import RegistroFinanzas from './components/RegistroFinanzas.vue';
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
