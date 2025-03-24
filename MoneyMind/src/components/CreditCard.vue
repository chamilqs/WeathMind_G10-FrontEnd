<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button color="danger" @click="goBack">Cancelar</ion-button>
          </ion-buttons>
          <ion-title>Solicitar Tarjeta de Crédito</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Nombre en la tarjeta</ion-label>
            <ion-input v-model="formData.name" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Límite de crédito</ion-label>
            <ion-input v-model="formData.creditLimit" type="number"></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Fecha de expiración</ion-label>
            <ion-datetime v-model="formData.expirationDate" display-format="MM/YYYY"></ion-datetime>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Saldo inicial</ion-label>
            <ion-input v-model="formData.balance" type="number"></ion-input>
          </ion-item>
        </ion-list>
  
        <ion-button expand="block" @click="submitForm">Solicitar Tarjeta</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { 
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons,
    IonDatetime
  } from '@ionic/vue';
  
  const router = useRouter();
  
  const formData = ref({
    name: '',
    creditLimit: null,
    expirationDate: new Date().toISOString(),
    balance: 0,
    productType: 'CreditCard'
  });
  
  const submitForm = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData.value)
      });
      
      if(response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const goBack = () => {
    router.back();
  };
  </script>