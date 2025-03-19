<template>
  <ion-page id="main-content">
    <SideNav />
    <ion-header>
      <ion-toolbar>
        <div class="container">
          <div class="user-info">
            <ion-avatar>
              <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" @click="openMenu" alt="avatar" />
            </ion-avatar>
            <div>
              <p>Welcome back</p>
              <h2 class="name">John Doe</h2>
            </div>
            <div class="notification">
              <ion-button 
                fill="outline"
                color="primary" 
                class="round-button"
                shape="round">
                <img src="@/assets/icons/icon-notification.png" alt="Icono Personalizado" style="width: 40px; height: 40px;" />
              </ion-button>
            </div>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content @click="handleClickOutside">
    
    </ion-content>
  </ion-page>
</template>

<script setup lang="js">
import { 
  IonPage, IonHeader, IonToolbar, IonAvatar, IonModal, IonButton, IonContent, IonGrid, IonRow, 
  IonCol, } from '@ionic/vue';
import { ref } from 'vue';
import SideNav from '../components/SideNav.vue';
import { menuController } from '@ionic/vue';
import { onMounted, onUnmounted } from 'vue';
import Cards from '../components/Cards.vue';
import UltimosMovimientos from '../components/UltimosMovimientos.vue';

const openMenu = async () => {
  await menuController.open(); // Asegura que el menú se abra
};

const handleClickOutside = async (event) => {
  const menu = await menuController.get('main-menu'); // Usa el ID correcto del menú
  if (menu && menu.isOpen()) {
    const isClickInsideMenu = event.target.closest('ion-menu');
    if (!isClickInsideMenu) {
      await menuController.close('main-menu'); // Cierra el menú usando el ID correcto
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const isOpen = ref(false); // Cambia isModalOpen por isOpen

const openBottomSheet = () => {
  isOpen.value = true;
  console.log("Modal abierto:", isOpen.value); // Depuración
};
</script>

<style>
ion-toolbar {
  --background: #f4f4f4;
  --border-color: transparent;
}

ion-content {
  --background: #f4f4f4;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 0px;
}

.user-info {
  display: flex;
  align-items: center;
  color: black;
}

.name {
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
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


.logo {
  width: 80px;
  height: auto;
  position: absolute;
  top: -30px;
  right: 10px;
}

</style>