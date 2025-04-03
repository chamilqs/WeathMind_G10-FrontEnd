<template>
  <ion-page>
    <ion-header class="header">
      <ion-toolbar class="toolbar">
        <ion-title class="title">💬 Mandy </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="fullscreen">
      <iframe 
        :src="iframeUrl" 
        class="fullscreen-iframe"
        frameborder="0"
      ></iframe>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';

const jwtToken = ref('');
const userId = ref('');

// Leer token y userId desde localStorage
onMounted(() => {
  jwtToken.value = localStorage.getItem('jwtToken') || '';
  userId.value = localStorage.getItem('userId') || '';
});

// Construir la URL del chatbot con parámetros
const iframeUrl = computed(() => {
  const baseUrl = 'https://typebot.co/my-typebot-hh7iay8';
  return `${baseUrl}/?jwt=${jwtToken.value}&uid=${userId.value}`;
});
</script>

<style scoped>
.header {
  --background: #ffffff;
  border-bottom: 1px solid #e0e0e0;

}

.toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #1e3a8a;
  letter-spacing: 0.5px;
}

.fullscreen {
  --background: #f9f9f9;
  padding: 0;
}

.fullscreen-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
