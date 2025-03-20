<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- Botón "Cancelar" en la parte superior izquierda -->
        <ion-buttons slot="end">
          <ion-button color="danger" @click="goToHomePage">Cancelar</ion-button>
        </ion-buttons>
        <ion-title>Solicitar Tarjeta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- Campo para el nombre del titular -->
        <ion-item>
          <ion-label position="stacked">Nombre del titular</ion-label>
          <ion-input v-model="holderName" placeholder="Ingresa el nombre del titular" class="custom-input"></ion-input>
        </ion-item>

        <!-- Campo para el número de tarjeta -->
        <ion-item>
          <ion-label position="stacked">Número de tarjeta</ion-label>
          <ion-input v-model="cardNumber" type="number" placeholder="Ingresa el número de tarjeta" class="custom-input"></ion-input>
        </ion-item>

        <!-- Campo para la fecha de expiración -->
        <ion-item>
          <ion-label position="stacked">Fecha de expiración</ion-label>
          <ion-input v-model="expirationDate" placeholder="MM/YY" class="custom-input"></ion-input>
        </ion-item>

        <!-- Campo para el saldo inicial -->
        <ion-item>
          <ion-label position="stacked">Saldo inicial</ion-label>
          <ion-input v-model="balance" type="number" placeholder="Ingresa el saldo inicial" class="custom-input"></ion-input>
        </ion-item>

        <!-- Campo para el tipo de tarjeta -->
        <ion-item>
          <ion-label position="stacked">Tipo de tarjeta</ion-label>
          <ion-select v-model="type" placeholder="Selecciona el tipo de tarjeta" class="custom-input">
            <ion-select-option value="VISA">VISA</ion-select-option>
            <ion-select-option value="MasterCard">MasterCard</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <!-- Botón para enviar la solicitud -->
      <ion-button expand="full" @click="solicitarTarjeta">Enviar Solicitud</ion-button>
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
} from '@ionic/vue';

const router = useRouter();

// Datos del formulario
const holderName = ref('');
const cardNumber = ref('');
const expirationDate = ref('');
const balance = ref('');
const type = ref('');

// Función para redirigir a la página de inicio
const goToHomePage = () => {
  router.push({ path: '/' }); // Cambia '/' por la ruta de tu página de inicio
};

// Función para enviar la solicitud
const solicitarTarjeta = async () => {
  if (!holderName.value || !cardNumber.value || !expirationDate.value || !type.value) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  // Crear una nueva tarjeta usando el modelo Card
  const nuevaTarjeta = {
    id: `c${Math.floor(Math.random() * 1000)}`, // Generar un ID único
    userId: "1", // userId (puedes cambiarlo según tu lógica)
    cardNumber: cardNumber.value,
    holderName: holderName.value,
    expirationDate: expirationDate.value,
    balance: balance.value || 0, // Si no se ingresa un saldo, se guarda como 0
    type: type.value,
  };

  try {
    // Envía la solicitud a la API (json-server)
    const response = await fetch('http://localhost:3000/tarjetas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaTarjeta),
    });

    if (!response.ok) throw new Error('Error al enviar la solicitud');

    alert('Solicitud de tarjeta enviada correctamente.');

    // Limpia el formulario después de enviar la solicitud
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
ion-title {
  color: black;
}

ion-list {
  padding: 0;
}

.custom-input::part(native) {
  color: black; /* Cambia el color del texto ingresado */
}

.custom-input ::placeholder {
  color: gray; /* Color del placeholder */
}
</style>