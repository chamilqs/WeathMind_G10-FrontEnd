<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Botón para volver a Home -->
        <ion-buttons slot="start">
          <ion-button @click="goToHome">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-title class="title">Mi Perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen="true">
      <!-- Contenedor para la card de perfil -->
      <div class="profile-container">
        <ion-card class="profile-card center">
          <ion-card-header class="text-centered">
              <div class="avatar-container">
                <ion-avatar class="foto-perfil">
                  <img :src="user.avatarUrl" alt="avatar"/>
                </ion-avatar>
              </div>
            </ion-card-header>

          <ion-card-content>
            <ion-list lines="none">
              <ion-item>
                <ion-label>
                  <p class="label">Full Name</p>
                  <h3>{{ user.fullName }}</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <p class="label">Username</p>
                  <h3>{{ user.username }}</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <p class="label">Email</p>
                  <h3>{{ user.email }}</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <p class="label">Phone Number</p>
                  <h3>{{ user.phone }}</h3>
                </ion-label>
              </ion-item>

              <ion-item>
                <ion-label>
                  <p class="label">Address</p>
                  <h3>{{ user.address }}</h3>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
       
        </ion-card>
      </div>
      <ion-button fill="clear" class="edit-button" @click="editProfile">
          <ion-icon name="create-outline"></ion-icon>
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import User from "@/models/User";

const router = useRouter();

const goToHome = () => {
  router.push("/tabs/homepage");
};

// Cargar datos desde el modelo User.js
const user = ref(User.mockData());
</script>

<style scoped>
:root {
  --background-color: #f8f9fa;
  --header-bg: #ffffff;
  --text-color: #212529;
  --list-bg: #ffffff;
  --border-color: #e0e0e0;
  --shadow-light: rgba(0, 0, 0, 0.1);
}

/* Header */
ion-header {
  background-color: var(--header-bg);
  box-shadow: 0px 4px 10px var(--shadow-light);
}

ion-toolbar {
  --background: var(--header-bg);
}

.title {
  color: var(--text-color);
  text-align: center;
  font-size: 18px;
}

/* Contenedor del perfil */
.profile-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

/* Card */
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 10px var(--shadow-light);
  border-radius: 10px;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  margin: 20px;
}

/* Contenido */
ion-content {
  --background: var(--background-color);
  --padding-top: 35px;
  --padding-bottom: 0px;
  --padding-start: 0px;
  --padding-end: 0px;
}

/* Avatar */
.foto-perfil {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

ion-avatar {
  width: 100px;
  height: 100px;
  border: 3px solid var(--border-color);
  justify-content: center;
}
.avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.edit-button {
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--header-bg);
  color: var(--text-color);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 5px var(--shadow-light);
}

/* Lista */
ion-list {
  background-color: var(--list-bg);
  border-radius: 10px;
  padding: 10px;
}

ion-item {
  --background: transparent;
  --border-color: var(--border-color);
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
}

ion-item:last-child {
  border-bottom: none;
}

ion-buttons ion-button {
  --color: var(--text-color) !important;
}

ion-icon {
  color: var(--text-color) !important;
  font-size: 24px;
}

/* Texto */
.label {
  font-size: 14px;
  color: gray;
  margin-bottom: 5px;
}

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: normal;
  color: var(--text-color);
}
</style>
