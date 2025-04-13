<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button color="danger" @click="goBack">Cancelar</ion-button>
          </ion-buttons>
          <ion-title>Solicitar Préstamo</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Nombre del préstamo</ion-label>
            <ion-input v-model="formData.name" required></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Monto solicitado</ion-label>
            <ion-input v-model="formData.limit" type="number"></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Tasa de interés (%)</ion-label>
            <ion-input v-model="formData.interestRate" type="number"></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Plazo (meses)</ion-label>
            <ion-input v-model="formData.termInMonths" type="number"></ion-input>
          </ion-item>
  
          <ion-item>
            <ion-label position="stacked">Fecha de inicio</ion-label>
            <ion-datetime v-model="formData.startDate" display-format="DD/MM/YYYY"></ion-datetime>
          </ion-item>
        </ion-list>
  
        <ion-button expand="block" @click="submitForm">Solicitar Préstamo</ion-button>
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
    limit: 0,
    interestRate: null,
    termInMonths: 12,
    startDate: new Date().toISOString(),
    productType: 'Loan'
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