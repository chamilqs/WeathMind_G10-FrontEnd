<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <div class="container">
          <div class="user-info">
            <ion-avatar>
            <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="avatar">
          </ion-avatar>
          <ion-label>
            <p>Welcome back</p>
            <h2 class="name">John Doe</h2>
            </ion-label>
            <div class="notification">
              <ion-button 
                fill="outline"
                color="primary" 
                class="round-button"
                shape="round"
                >
                <img src="@/assets/icons/icon-notification.png" alt="Icono Personalizado" style="width: 40px; height: 40px;">
            </ion-button>
            </div>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>
  </ion-page>

  <ion-content>

  </ion-content>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonAvatar, IonLabel, IonButton, IonContent } from '@ionic/vue';


</script>

<style scoped>
ion-toolbar {
  --background: #f4f4f4;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  color: black
}

.name {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
}

ion-content {
  --background: #f4f4f4;
}

.round-button {
  --border-radius: 50%;
  --background: #f4f4f4;
  --box-shadow: none;
  --border-width: 10;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
}

.notification {
  position: relative;
  left: 70%;
}
</style>