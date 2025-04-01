<template>
  <ion-page id="main-content">
    <SideNav />
    <ion-header>
      <ion-toolbar class="header-toolbar">
        <div class="header-container">
          <div class="user-info">
            <ion-avatar @click="openMenu" class="user-avatar">
              <img :src="userProfile.profilePicture" alt="avatar" />
            </ion-avatar>
            <div class="welcome-text">
              <p class="welcome-message">Welcome back 👋</p>
              <h2 class="user-name">{{ userProfile.fullName }}</h2>
            </div>
          </div>
          <ion-button fill="clear" class="notification-button">
            <img src="@/assets/icons/icon-notification.png" alt="Notifications" />
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content @click="handleClickOutside">
      <ion-button class="custom-button" @click="openBottomSheet">Últimos Movimientos</ion-button>

      <ion-modal :is-open="isOpen" @didDismiss="isOpen = false" :css-class="['bottom-sheet-modal']">
        <UltimosMovimientos />
      </ion-modal>

      <ButtonSheetOpciones />
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonHeader, IonToolbar, IonAvatar, IonModal, IonButton, IonContent 
} from '@ionic/vue';
import { ref, onMounted, onUnmounted } from 'vue';
import SideNav from '../components/SideNav.vue';
import { menuController } from '@ionic/vue';
import UltimosMovimientos from '../components/UltimosMovimientos.vue';
import ButtonSheetOpciones from '../components/ButtonSheetOpciones.vue';

const openMenu = async () => {
  await menuController.open();
};

const handleClickOutside = async (event) => {
  const menu = await menuController.get('main-menu');
  if (menu && menu.isOpen()) {
    const isClickInsideMenu = event.target.closest('ion-menu');
    if (!isClickInsideMenu) {
      await menuController.close('main-menu');
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const isOpen = ref(false);
const openBottomSheet = () => {
  isOpen.value = true;
};

const userProfile = ref({
  fullName: 'Usuario',
  profilePicture: 'https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'
});

onMounted(() => {
  const stored = localStorage.getItem('userData');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      userProfile.value.fullName = parsed.fullName || 'Usuario';
      userProfile.value.profilePicture = parsed.profilePicture || userProfile.value.profilePicture;
    } catch (error) {
      console.error('Error al leer userData:', error);
    }
  }
});
</script>

<style scoped>
ion-toolbar.header-toolbar {
  --background: white;
  --border-color: transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover;
}

.welcome-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.welcome-message {
  margin: 0;
  font-size: 0.9rem;
  color: #888;
}

.user-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.notification-button {
  --padding-start: 0;
  --padding-end: 0;
  --background: transparent;
  --box-shadow: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-button img {
  width: 24px;
  height: 24px;
}

ion-content {
  --background: #f4f4f4;
}

.custom-button {
  --background: linear-gradient(145deg, #1a237e, #0d47a1);
  --color: #ffffff;
  --border-radius: 12px;
  margin: 1rem;
  font-weight: 600;
  text-transform: none;
}

.bottom-sheet-modal {
  --height: 50%;
  align-items: flex-end;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px 16px 0 0;
}
</style>