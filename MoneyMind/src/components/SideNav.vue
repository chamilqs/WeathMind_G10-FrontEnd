<template>
  <ion-menu side="start" content-id="main-content" id="MyProfile" swipe-gesture="true">
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-toggle>
              <ion-button fill="clear" class="close-button">
                <ion-icon slot="icon-only" :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-menu-toggle>
          </ion-buttons>
          <ion-title class="title">Profile</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Perfil -->
      <div class="profile-info">
        <ion-avatar class="profile-avatar">
          <img :src="userProfile.profilePicture" alt="User Avatar" />
        </ion-avatar>
        <h2>{{ userProfile.fullName }}</h2>
        <p>{{ userProfile.email }}</p>
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
        <ion-item button @click="goTo('/HistoryTransaction')">
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
        <ion-item button @click="goTo('/help-support')">
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
import {
  IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonItemDivider, IonLabel, IonIcon, IonAvatar, IonButton, IonButtons, IonToggle, IonMenuToggle, menuController
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import {
  personOutline, timeOutline, fingerPrintOutline,
  lockClosedOutline, lockOpenOutline, notificationsOutline, globeOutline,
  helpCircleOutline, logOutOutline, closeOutline
} from 'ionicons/icons';

const router = useRouter();

const userProfile = ref({
  fullName: 'Usuario',
  email: 'user@email.com',
  profilePicture: 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
});

onMounted(() => {
  const stored = localStorage.getItem('userData');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      userProfile.value.fullName = parsed.fullName || 'Usuario';
      userProfile.value.email = parsed.email || 'user@email.com';
      userProfile.value.profilePicture = parsed.profilePicture || userProfile.value.profilePicture;
    } catch (error) {
      console.error('Error al leer userData:', error);
    }
  }
});

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
ion-toolbar {
  --background: #f4f4f4;
  --color: #333;
}

.title {
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
}

.close-button {
  --padding-start: 0;
  --padding-end: 0;
  --background: transparent;
  color: #007bff;
  font-size: 24px;
  margin-left: -10px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  text-align: center;
  color: black;
  background-color: #f4f4f4;
}

ion-list {
  padding: 0;
}

ion-content {
  --background: #fff;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 50%;
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
