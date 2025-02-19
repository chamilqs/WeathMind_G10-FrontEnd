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

    <ion-content>
      <div class="container-contenido">
        <ion-grid>
          <ion-row>
            <ion-col size="8">
              <p class="label">Balance</p>
              <h2 class="balance">$125,000</h2>
            </ion-col>
            <ion-col size="4" class="text-align">
              <p class="resumen">Resumen del<br>ultimo mes</p>
              <p class="porcentaje">+5.57%</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <ion-card class="card">
        <ion-card-header class="card-header">
          <div class="header-container">
            <h2 class="card-title">X-Card</h2>
            <img src="@/assets/icons/icon-mastercard.png" alt="MasterCard" class="logo">
          </div>
        </ion-card-header> 
        <ion-card-content>
          <div class="card-content">
          <p style="font-size: 15px;">Balance</p>
          <h2 style="font-size: 25px;">$4,664.63</h2>
      </div>
    </ion-card-content>
    <p class="serial-card">**** 2468</p>
  </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonAvatar, IonLabel, IonButton, IonContent } from '@ionic/vue';
import { IonGrid, IonRow, IonCol } from '@ionic/vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';


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
  --color: black;
  
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

.container-contenido {
  padding: 16px;
  display: flex;
}

.label {
  font-size: 14px;
  color: #0A2A62;
  margin: 0;
}

.balance {
  font-size: 24px;
  font-weight: bold;
  color: #0A2A62;
  margin: 5px 0 0;
}

.resumen {
  font-size: 12px;
  color: gray;
  text-align: right;
  margin: 0;
}

.porcentaje {
  font-size: 14px;
  color: #5C9EFF;
  text-align: right;
  margin: 5px 0 0;
}

.text-right {
  text-align: right;
}

.card {
  background: linear-gradient(145deg, #1a237e, #0d47a1);
  border-radius: 16px;
  padding: 24px;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.header-container {
  display: flex;
  justify-content: space-between; /* Separa el título y el logo */
  align-items: center;
  position: relative;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  color: #fdfdfd;
  margin-top: 10px; /* Sube un poco el título */
}

/* Imagen del logo más arriba */
.logo {
  width: 80px; /* Ajusta el tamaño según necesites */
  height: auto;
  position: absolute;
  top: -30px; /* Sube un poco el logo */
  right: 10px;
}

.serial-card {
  padding-left: 20px;
  margin-bottom: -10px;
  font-size: 18px;
}
</style>