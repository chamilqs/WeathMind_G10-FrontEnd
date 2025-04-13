<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="form-container centered">
        <h2 class="text-center">Registrar Transacción</h2>
        <p class="text-center welcome-text font-bold">Ingresa los detalles del gasto</p>

        <ion-list>
          <!-- Tipo (Deshabilitado) -->
          <div class="input-group">
            <label class="input-label">Tipo</label>
            <ion-item class="input-field" lines="none">
              <ion-input placeholder="Gasto" disabled></ion-input>
            </ion-item>
          </div>

          <!-- Monto -->
          <div class="input-group">
            <label class="input-label">Monto</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="amount" type="number" placeholder="$0.00" required></ion-input>
            </ion-item>
          </div>

          <!-- Fecha -->
          <div class="input-group">
            <label class="input-label">Fecha</label>
            <ion-item class="input-field" lines="none">
              <ion-input v-model="date" type="date" required></ion-input>
            </ion-item>
          </div>

          <!-- Categoría -->
          <div class="input-group">
            <label class="input-label">Categoría</label>
            <ion-item class="input-field" lines="none">
              <ion-select v-model="category" placeholder="Seleccionar categoría">
                <ion-select-option value="comida">Comida</ion-select-option>
                <ion-select-option value="transporte">Transporte</ion-select-option>
                <ion-select-option value="salud">Salud</ion-select-option>
              </ion-select>
            </ion-item>
          </div>

          <!-- Tipo de cuenta -->
          <div class="input-group">
            <label class="input-label">Tipo de cuenta</label>
            <ion-item class="input-field" lines="none">
              <ion-select v-model="accountType" placeholder="Seleccionar tipo de cuenta">
                <ion-select-option value="debito">Débito</ion-select-option>
                <ion-select-option value="credito">Crédito</ion-select-option>
              </ion-select>
            </ion-item>
          </div>
        </ion-list>

        <ion-button expand="full" @click="guardarTransaccion">Guardar</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonContent, IonList, IonItem, IonLabel,
  IonInput, IonSelect, IonSelectOption, IonButton
} from '@ionic/vue';
import { ref } from 'vue';

// Referencias reactivas
const amount = ref('');
const date = ref('');
const category = ref('');
const accountType = ref('');

// Función para decodificar JWT
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const guardarTransaccion = async () => {
  const token = localStorage.getItem('jwtToken');
  const decoded = parseJwt(token);

  if (!decoded || !decoded.userId) {
    alert('No se pudo obtener el ID del usuario');
    return;
  }

  const userId = decoded.userId;

  const trx = {
    userId: userId,
    amount: Number(amount.value),
    categoryId: category.value,
    transactionDate: new Date(date.value).toISOString(),
    description: "Compre algo en la tienda",
    type: "Expense",
    fromProductId: "Prod1-1",
    toProductId: "Prod1-2",
    fromProduct: {
      id: "string",
      userId: userId,
      name: category.value,
      balance: Number(amount.value),
      productType: accountType.value,
      additionalData: {
        additionalProp1: "string",
        additionalProp2: "string",
        additionalProp3: "string"
      },
      hasError: true,
      error: "string"
    },
    toProduct: {
      id: "string",
      userId: userId,
      name: category.value,
      balance: Number(amount.value),
      productType: accountType.value,
      additionalData: {
        additionalProp1: "string",
        additionalProp2: "string",
        additionalProp3: "string"
      },
      hasError: true,
      error: "string"
    },
    hasError: true,
    error: "string"
  };

  
  try {
    const res = await fetch('https://dev.genlabs.us/api/transfer/transfer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ trx }) // 👈🏼 ENVÍO CORRECTO
    });

    const data = await res.json();

    if (res.ok) {
      alert('Transacción registrada correctamente');
    } else {
      alert('Error al registrar transacción: ' + (data.error || 'Desconocido'));
    }
  } catch (err) {
    alert('Error de red: ' + err.message);
  }
};

</script>


<style scoped>
.form-container {
  max-width: 400px;
  padding: 25px;
  text-align: center;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 60px;
}

.text-center {
  color: #212529;
  font-size: large;
  font-weight: bold;
}

.input-label {
  font-weight: bold;
  margin: 10px 0 4px;
  text-align: left;
  display: block;
}

.input-field {
  margin-bottom: 12px;
  background: #f1f3f4;
  border-radius: 8px;
  --highlight-color-focused: #0a2f73;
}

ion-button {
  margin-top: 20px;
  --background: #0a2f73;
  --color: white;
}
</style>