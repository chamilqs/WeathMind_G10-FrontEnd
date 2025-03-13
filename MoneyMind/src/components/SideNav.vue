<template>
  <ion-menu side="start" content-id="main-content" id="MyProfile" swipe-gesture="true">
    <ion-content>
      <ion-header class="profile-header">
        <ion-toolbar>
            <ion-menu-toggle>
              <ion-button>
                <ion-icon slot="icon-only" name="close-outline"></ion-icon>
              </ion-button>
            </ion-menu-toggle>
          <ion-title class="title">Profile</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Perfil -->
      <div class="profile-info">
        <ion-avatar class="profile-avatar">
          <img src="https://i.pravatar.cc/150?img=3" alt="User Avatar" />
        </ion-avatar>
        <h2>Tiana Saris</h2>
        <p>@Broklyn</p>
      </div>

      <!-- Lista de opciones -->
      <ion-list>
        <ion-item-divider>
          <ion-label>Personal Info</ion-label>
        </ion-item-divider>
        <ion-item button @click="goTo('/MyProfile')">
          <ion-icon slot="start" :icon="personOutline"></ion-icon>
          <ion-label>Your Profile</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/history-transaction')">
          <ion-icon slot="start" :icon="timeOutline"></ion-icon>
          <ion-label>History Transaction</ion-label>
        </ion-item>

        <ion-item-divider>
          <ion-label>Security</ion-label>
        </ion-item-divider>
        <ion-item>
          <ion-icon slot="start" :icon="fingerPrintOutline"></ion-icon>
          <ion-label>Face ID</ion-label>
          <ion-toggle slot="end" color="primary"></ion-toggle>
        </ion-item>
        <ion-item button @click="goTo('/change-password')">
          <ion-icon slot="start" :icon="lockClosedOutline"></ion-icon>
          <ion-label>Change Password</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/forgot-password')">
          <ion-icon slot="start" :icon="lockOpenOutline"></ion-icon>
          <ion-label>Forgot Password</ion-label>
        </ion-item>

        <ion-item-divider>
          <ion-label>General</ion-label>
        </ion-item-divider>
        <ion-item button @click="goTo('/notifications')">
          <ion-icon slot="start" :icon="notificationsOutline"></ion-icon>
          <ion-label>Notification</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/languages')">
          <ion-icon slot="start" :icon="globeOutline"></ion-icon>
          <ion-label>Languages</ion-label>
        </ion-item>
        <ion-item button @click="goTo('/help')">
          <ion-icon slot="start" :icon="helpCircleOutline"></ion-icon>
          <ion-label>Help and Support</ion-label>
        </ion-item>

        <ion-item button @click="logout" class="logout-item">
          <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
          <ion-label>Logout</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script setup>
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonItemDivider, IonLabel, IonIcon, IonAvatar, IonButton, IonButtons, IonToggle, menuController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { chevronBackOutline, personOutline, timeOutline, fingerPrintOutline, lockClosedOutline, lockOpenOutline, notificationsOutline, globeOutline, helpCircleOutline, logOutOutline } from 'ionicons/icons';

const router = useRouter();


const goTo = async (path) => {
  await menuController.close();
  router.push(path);
};


const logout = async () => {
  await menuController.close();
  router.push('/login');
};
</script>

<style scoped>
.profile-header {
  --background: white;
}

.title {
  color: black;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  text-align: center;
  color: black;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.profile-info h2 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.profile-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

ion-item-divider {
  --background: #f4f4f4;
  --color: #666;
  font-weight: bold;
}

.logout-item {
  --color: red;
}

.logout-item ion-icon {
  color: red;
}
</style>
