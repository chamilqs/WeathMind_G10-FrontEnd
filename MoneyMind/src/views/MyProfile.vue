<template>
  <ion-page>
    <!-- Encabezado -->
    <IonHeader>
      <IonToolbar>
        <HeaderMyProfile></HeaderMyProfile>
      </IonToolbar>
    </IonHeader>



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
// Removed unused useRouter import
import User from "@/models/User";
import { IonHeader, IonToolbar } from "@ionic/vue";
import HeaderMyProfile from "../components/HeaderMyProfile.vue";

// Removed unused router variable


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

.dark {
  --background-color: #121212;
  --header-bg: #1e1e1e;
  --text-color: #ffffff;
  --list-bg: #1e1e1e;
  --border-color: #444;
  --shadow-light: rgba(255, 255, 255, 0.1);
}
.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #f9fafb;
  position: relative;
}

/* Botón a la izquierda */
.header-top .left {
  display: flex;
  justify-content: space-between;
}

/* Textos centrados */


/* Eliminar margen para que suban */
.center h2 {
  margin: 0;
  font-weight: 600;
  color: #1f2937;
}

.center p {
  margin: 2px 0;
  font-size: 14px;
  color: #9ca3af;
}

.center h1 {
  margin: 5px 0 0;
  font-size: 16px;
  font-weight: bold;
  color: #1e3a8a;
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

/* Botón de editar */
.edit-button {
  position: fixed;
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

/* Botón general */
ion-button {
  --background: #0056b3 !important;
  --color: white !important;
  --border-radius: 8px;
  --border: 1px solid #003f7f;
  font-weight: bold;
  text-transform: uppercase;
}


</style>
