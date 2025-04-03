<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="end">
          <ion-button color="danger" @click="goToHomePage">Cancelar</ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Solicitar Tarjeta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="form-container">
        <div class="form-header">
          <ion-icon name="card-outline" class="form-icon"></ion-icon>
          <h2 class="form-title">Formulario de Tarjeta</h2>
          <p class="form-subtitle">Ingresa los datos para solicitar una nueva tarjeta</p>
        </div>

        <ion-list lines="none">
          <ion-item class="form-item">
            <ion-label position="floating">Nombre del titular</ion-label>
            <ion-input v-model="holderName" class="custom-input"></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-label position="floating">Número de tarjeta</ion-label>
            <ion-input v-model="cardNumber" type="number" class="custom-input"></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-label position="floating">Fecha de expiración</ion-label>
            <ion-input v-model="expirationDate" placeholder="MM/YY" class="custom-input"></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-label position="floating">Saldo inicial</ion-label>
            <ion-input v-model="balance" type="number" class="custom-input"></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-label position="floating">Tipo de tarjeta</ion-label>
            <ion-select v-model="type" class="custom-input">
              <ion-select-option value="VISA">VISA</ion-select-option>
              <ion-select-option value="MasterCard">MasterCard</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <ion-button expand="block" color="primary" @click="solicitarTarjeta" class="submit-button">
          <ion-icon slot="start" name="send-outline"></ion-icon>
          Enviar Solicitud
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/vue';

const router = useRouter();
const holderName = ref('');
const cardNumber = ref('');
const expirationDate = ref('');
const balance = ref('');
const type = ref('');

const goToHomePage = () => {
  router.push({ path: '/' });
};

const solicitarTarjeta = async () => {
  if (!holderName.value || !cardNumber.value || !expirationDate.value || !type.value) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  const nuevaTarjeta = {
    id: `c${Math.floor(Math.random() * 1000)}`,
    userId: "1",
    cardNumber: cardNumber.value,
    holderName: holderName.value,
    expirationDate: expirationDate.value,
    balance: balance.value || 0,
    type: type.value
  };

  try {
    const response = await fetch('http://localhost:3000/tarjetas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaTarjeta)
    });

    if (!response.ok) throw new Error('Error al enviar la solicitud');

    alert('Solicitud de tarjeta enviada correctamente.');
    holderName.value = '';
    cardNumber.value = '';
    expirationDate.value = '';
    balance.value = '';
    type.value = '';
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar la solicitud. Inténtalo de nuevo.');
  }
};
</script>

<style scoped>
.form-container {
  background: white;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  max-width: 420px;
  margin: 40px auto;
}

.form-header {
  text-align: center;
  margin-bottom: 24px;
}

.form-icon {
  font-size: 48px;
  color: #3880ff;
}

.form-title {
  margin: 10px 0 0;
  font-size: 20px;
  font-weight: bold;
  color: #222;
}

.form-subtitle {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.form-item {
  margin-bottom: 18px;
  --highlight-color-focused: #3880ff;
  --border-radius: 12px;
  border: 1px solid #ccc;
  background: #f4f4f4;
  padding-inline-start: 12px;
  padding-inline-end: 12px;
}

.custom-input::part(native) {
  color: #000;
}

.submit-button {
  margin-top: 16px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 12px;
}
</style>
