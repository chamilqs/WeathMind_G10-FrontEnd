<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom" class="custom-tab-bar">
        <ion-tab-button tab="home" href="/tabs/homepage">
          <ion-icon :icon="homeSharp" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="statistics" href="/tabs/statistic">
          <ion-icon :icon="barChartSharp" />
          <ion-label>Estadísticas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="mycard" href="/tabs/mycards">
          <ion-icon :icon="cardSharp" />
          <ion-label>Mis Tarjetas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="mandy" href="/mandy">
          <ion-icon :icon="chatbubblesSharp" />
          <ion-label>Mandy</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonPage
} from '@ionic/vue';
import {
  homeSharp,
  barChartSharp,
  cardSharp,
  chatbubblesSharp
} from 'ionicons/icons';
</script>

<style scoped>
.custom-tab-bar {
  --background: #ffffff;
  height: 70px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding-bottom: env(safe-area-inset-bottom);
  transition: background-color 0.3s ease-in-out;
}

ion-tab-button {
  --color: #a0a0a0;
  --color-selected: #0056b3;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
}

ion-tab-button.ion-selected {
  transform: scale(1.05);
  color: #0056b3;
}

ion-tab-button ion-icon {
  font-size: 22px;
  transition: transform 0.3s ease;
}

ion-tab-button.ion-selected ion-icon {
  transform: rotate(360deg);
}

ion-tab-button:hover {
  background-color: #f0f4ff;
  border-radius: 10px;
}
</style>

