<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/homepage">
          <ion-icon :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="statistics" href="/tabs/statistic">
          <ion-icon :icon="barChartOutline" />
          <ion-label>Statistic</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="mycard" href="/tabs/mycards">
          <ion-icon :icon="cardOutline" />
          <ion-label>My Card</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="mandy" href="/tabs/mandy">
          <ion-icon :icon="chatbubbleOutline" />
          <ion-label>Mandy</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage } from '@ionic/vue';
import { homeOutline, barChartOutline, cardOutline, chatbubbleOutline } from 'ionicons/icons';

export default {
  components: {
    IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonPage
  },
  setup() {
    return { homeOutline, barChartOutline, cardOutline, chatbubbleOutline };
  }
};
</script>

<style scoped>
ion-tab-button {
  --color-selected: black;
}

ion-tab-bar {
  --background: #f4f5f8;
}
</style>
