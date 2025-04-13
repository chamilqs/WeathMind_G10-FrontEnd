<template>
  <ion-page>
    <ion-header class="custom-header">
      <ion-toolbar class="custom-toolbar animate-toolbar">
        <ion-buttons slot="start">
          <ion-button class="back-button" fill="clear" @click="animateAndGoHome">
            <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
            <span>X</span>
          </ion-button>
        </ion-buttons>
        <ion-title>Solicitar Tarjeta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="form-wrapper">
        <ion-list class="styled-form">
          <ion-item class="input-item">
            <ion-label position="stacked">Nombre del titular</ion-label>
            <ion-input v-model="holderName" placeholder="Ej: Juan Pérez"></ion-input>
          </ion-item>

          <ion-item class="input-item">
            <ion-label position="stacked">Número de tarjeta</ion-label>
            <ion-input v-model="cardNumber" type="number" placeholder="•••• •••• •••• ••••"></ion-input>
          </ion-item>

          <ion-item class="input-item">
            <ion-label position="stacked">Fecha de expiración</ion-label>
            <ion-datetime-button datetime="fecha-exp"></ion-datetime-button>
            <span v-if="expirationDate" class="formatted-date">{{ formatDate(expirationDate) }}</span>
          </ion-item>
          <ion-modal keep-contents-mounted>
            <ion-datetime id="fecha-exp" v-model="expirationDate" presentation="month-year"></ion-datetime>
          </ion-modal>

          <ion-item class="input-item">
            <ion-label position="stacked">Saldo inicial</ion-label>
            <ion-input v-model="balance" type="number" placeholder="$0.00"></ion-input>
          </ion-item>

          <ion-item class="input-item">
            <ion-label position="stacked">Tipo de tarjeta</ion-label>
            <ion-select v-model="type" placeholder="Seleccionar tipo de tarjeta">
              <ion-select-option value="VISA">VISA</ion-select-option>
              <ion-select-option value="MasterCard">MasterCard</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-button expand="block" color="primary" @click="solicitarTarjeta" class="submit-button">
            Guardar
          </ion-button>
        </ion-list>
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
  IonIcon,
  IonDatetime,
  IonDatetimeButton,
  IonModal
} from '@ionic/vue';

const router = useRouter();
const holderName = ref('');
const cardNumber = ref('');
const expirationDate = ref('');
const balance = ref('');
const type = ref('');

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
};

const goToHomePage = () => {
  router.push({ path: '/' });
};

const animateAndGoHome = () => {
  const toolbar = document.querySelector('.animate-toolbar');
  if (toolbar) {
    toolbar.classList.add('fade-out');
    setTimeout(() => goToHomePage(), 300);
  } else {
    goToHomePage();
  }
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
    router.push('/');
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar la solicitud. Inténtalo de nuevo.');
  }
};
</script>

<style scoped>
.form-wrapper {
  max-width: 420px;
  margin: 40px auto;
  padding: 0 16px;
}

.styled-form {
  background: white;
  padding: 20px;
  padding-bottom: 32px;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.input-item {
  margin-bottom: 16px;
  --border-color: #e0e0e0;
  --background: #f9f9f9;
  border-radius: 8px;
}

ion-label {
  font-weight: 600;
  color: #222;
  font-size: 14px;
}

ion-input, ion-select {
  font-size: 15px;
  padding: 6px 0;
}

ion-input::part(native) {
  color: #000;
}

.submit-button {
  margin-top: 24px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 10px;
  background-color: #002f87;
  color: white;
}

.formatted-date {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  padding-left: 10px;
  align-self: center;
}

.custom-header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #f1f1f1;
}

.custom-toolbar {
  --background: #ffffff;
  --color: #002f87;
  font-weight: bold;
  font-size: 18px;
  padding: 0 12px;
  transition: opacity 0.3s ease;
}

.custom-toolbar.fade-out {
  opacity: 0;
  transform: translateY(-10px);
}

.back-button {
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  gap: 6px;
  color: #870000;
  padding-left: 0;
  margin-left: -4px;
  background-color: transparent;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background-color: rgba(0, 47, 135, 0.1);
}


</style>