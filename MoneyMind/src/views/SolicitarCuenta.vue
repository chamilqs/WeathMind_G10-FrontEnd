<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Solicitar Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <!-- Campo para el nombre completo -->
        <ion-item>
          <ion-label position="stacked">Nombre completo</ion-label>
          <ion-input v-model="nombreCompleto" placeholder="Ingresa tu nombre completo" class="custom-input"></ion-input>
        </ion-item>

        <!-- Campo para el tipo de cuenta -->
        <ion-item>
          <ion-label position="stacked">Tipo de cuenta</ion-label>
          <ion-select v-model="tipoCuenta" placeholder="Selecciona el tipo de cuenta" class="custom-input">
            <ion-select-option value="ahorros">Ahorros</ion-select-option>
            <ion-select-option value="corriente">Corriente</ion-select-option>
          </ion-select>
        </ion-item>

        <!-- Campo para el saldo inicial -->
        <ion-item>
          <ion-label position="stacked">Saldo inicial</ion-label>
          <ion-input v-model="saldoInicial" type="number" placeholder="Ingresa el saldo inicial" class="custom-input"></ion-input>
        </ion-item>
      </ion-list>

      <!-- Botón para enviar la solicitud -->
      <ion-button expand="full" @click="solicitarCuenta">Enviar Solicitud</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';


// Datos del formulario
const nombreCompleto = ref('');
const tipoCuenta = ref('');
const saldoInicial = ref('');

// Función para enviar la solicitud
const solicitarCuenta = async () => {
  if (!nombreCompleto.value || !tipoCuenta.value) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  const nuevaSolicitud = {
    nombreCompleto: nombreCompleto.value,
    tipoCuenta: tipoCuenta.value,
    saldoInicial: saldoInicial.value || 0, // Si no se ingresa un saldo, se guarda como 0
  };

  try {
    // Envía la solicitud a la API (json-server)
    const response = await fetch('http://localhost:3000/cuentas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaSolicitud),
    });

    if (!response.ok) throw new Error('Error al enviar la solicitud');

    alert('Solicitud de cuenta enviada correctamente.');

    // Limpia el formulario después de enviar la solicitud
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
