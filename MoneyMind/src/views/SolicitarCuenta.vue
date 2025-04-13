<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button color="danger" @click="goToHomePage">Cancelar</ion-button>
        </ion-buttons>
        <ion-title>Solicitar Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="form-card">
        <ion-list><template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-buttons slot="end">
          <ion-button color="danger" @click="goToHomePage">Cancelar</ion-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Solicitar Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="form-container">
        <div class="form-header">
          <ion-icon name="person-circle-outline" class="form-icon"></ion-icon>
          <h2 class="form-title">Formulario de Solicitud</h2>
          <p class="form-subtitle">Completa los datos para crear tu cuenta</p>
        </div>

        <ion-list lines="none">
          <ion-item class="form-item">
            <ion-label position="floating">Nombre completo</ion-label>
            <ion-input v-model="nombreCompleto" class="custom-input"></ion-input>
          </ion-item>

          <ion-item class="form-item">
            <ion-label position="floating">Tipo de cuenta</ion-label>
            <ion-select v-model="tipoCuenta" class="custom-input">
              <ion-select-option value="ahorros">Ahorros</ion-select-option>
              <ion-select-option value="corriente">Corriente</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item class="form-item">
            <ion-label position="floating">Saldo inicial</ion-label>
            <ion-input v-model="saldoInicial" type="number" class="custom-input"></ion-input>
          </ion-item>
        </ion-list>

        <ion-button expand="block" color="primary" @click="solicitarCuenta" class="submit-button">
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
const nombreCompleto = ref('');
const tipoCuenta = ref('');
const saldoInicial = ref('');

const goToHomePage = () => {
  router.push({ path: '/' });
};

const solicitarCuenta = async () => {
  if (!nombreCompleto.value || !tipoCuenta.value) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  const nuevaSolicitud = {
    nombreCompleto: nombreCompleto.value,
    tipoCuenta: tipoCuenta.value,
    saldoInicial: saldoInicial.value || 0
  };

  try {
    const response = await fetch('http://localhost:3000/cuentas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaSolicitud)
    });

    if (!response.ok) throw new Error('Error al enviar la solicitud');

    alert('Solicitud de cuenta enviada correctamente.');
    nombreCompleto.value = '';
    tipoCuenta.value = '';
    saldoInicial.value = '';
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
          <ion-item lines="none">
            <ion-label position="floating">Nombre completo</ion-label>
            <ion-input v-model="nombreCompleto" class="custom-input"></ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-label position="floating">Tipo de cuenta</ion-label>
            <ion-select v-model="tipoCuenta" class="custom-input">
              <ion-select-option value="ahorros">Ahorros</ion-select-option>
              <ion-select-option value="corriente">Corriente</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none">
            <ion-label position="floating">Saldo inicial</ion-label>
            <ion-input v-model="saldoInicial" type="number" class="custom-input"></ion-input>
          </ion-item>
        </ion-list>

        <ion-button expand="block" color="primary" @click="solicitarCuenta">
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
const nombreCompleto = ref('');
const tipoCuenta = ref('');
saldoInicial = ref('');

const goToHomePage = () => {
  router.push({ path: '/' });
};

const solicitarCuenta = async () => {
  if (!nombreCompleto.value || !tipoCuenta.value) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  const nuevaSolicitud = {
    nombreCompleto: nombreCompleto.value,
    tipoCuenta: tipoCuenta.value,
    saldoInicial: saldoInicial.value || 0
  };

  try {
    const response = await fetch('http://localhost:3000/cuentas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaSolicitud)
    });

    if (!response.ok) throw new Error('Error al enviar la solicitud');

    alert('Solicitud de cuenta enviada correctamente.');
    nombreCompleto.value = '';
    tipoCuenta.value = '';
    saldoInicial.value = '';
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar la solicitud. Inténtalo de nuevo.');
  }
};
</script>

<style scoped>
.form-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

ion-title {
  color: #222;
  font-weight: bold;
}

.custom-input::part(native) {
  color: #000;
}

ion-item {
  margin-bottom: 16px;
  --highlight-color-focused: #3880ff;
  --border-radius: 12px;
  border: 1px solid #ccc;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  background: #f8f8f8;
}

ion-button {
  margin-top: 20px;
  font-weight: bold;
  font-size: 16px;
}
</style>