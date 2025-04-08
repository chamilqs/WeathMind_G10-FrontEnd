<template>
    <ion-page>
      <ion-content class="ion-padding">
        <!-- Header personalizado -->
        <div class="custom-header">
          <div class="info">
            <h4>Gastos</h4>
            <h1 class="total-amount">${{ totalGasto.toLocaleString() }}</h1>
          </div>
          <ion-button fill="outline" class="calendar-btn" @click="openDatePicker = true">
            <ion-icon :icon="calendarOutline" slot="start" />
            {{ currentMonth }}
          </ion-button>
        </div>
  
        <!-- Selector de mes oculto -->
        <ion-datetime
          presentation="month"
          :value="selectedMonth"
          @ionChange="onMonthChange"
          v-show="openDatePicker"
          class="hidden-datetime"
        ></ion-datetime>
  
        <!-- Gráfico de pastel -->
        <div class="chart-wrapper">
          <PieChart />
        </div>
  
        <!-- Consumo mensual -->
        <div class="section-title">Consumo del mes</div>
        <ion-list>
          <ion-item v-for="item in consumos" :key="item.name" lines="none">
            <ion-avatar slot="start" class="icon-wrapper" :style="{ backgroundColor: item.color }">
              <ion-icon :icon="item.icon" />
            </ion-avatar>
            <ion-label>
              <h2 class="categoria">{{ item.name }}</h2>
              <ion-progress-bar :value="item.porcentaje / 100" color="light"></ion-progress-bar>
            </ion-label>
            <div class="monto">${{ item.monto.toFixed(2) }}</div>
          </ion-item>
        </ion-list>
  
        <p class="see-more">Ver más >></p>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import {
    IonPage, IonContent, IonIcon, IonItem, IonList,
    IonLabel, IonAvatar, IonProgressBar, IonButton, IonDatetime
  } from '@ionic/vue';
  import { calendarOutline, cartOutline, cashOutline, restaurantOutline } from 'ionicons/icons';
  import PieChart from '@/components/PieChart.vue';
  import { ref } from 'vue';
  
  // Obtener mes actual por defecto
  const today = new Date();
  const selectedMonth = ref(today.toISOString());
  const currentMonth = ref(today.toLocaleString('es-ES', { month: 'long', year: 'numeric' }));
  
  const openDatePicker = ref(false);
  
  const onMonthChange = (event) => {
    selectedMonth.value = event.detail.value;
    const selectedDate = new Date(event.detail.value);
    currentMonth.value = selectedDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    openDatePicker.value = false;
  };
  
  const totalGasto = 125000;
  
  const consumos = [
    {
      name: 'Otros',
      icon: cashOutline,
      porcentaje: 38,
      monto: 2873.21,
      color: '#9DA9B9',
    },
    {
      name: 'Supermercado',
      icon: cartOutline,
      porcentaje: 20,
      monto: 1460,
      color: '#FDCB45',
    },
    {
      name: 'Comida & Bebida',
      icon: restaurantOutline,
      porcentaje: 19,
      monto: 1418,
      color: '#FF8B39',
    },
  ];
  </script>
  
  <style scoped>
  .custom-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }
  
  .custom-header .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .custom-header h4 {
    color: #0a2f73;
    font-weight: 500;
    margin: 0;
    font-size: 16px;
  }
  
  .total-amount {
    font-size: 24px;
    font-weight: bold;
    color: #f26464;
    margin-top: 5px;
  }
  
  .calendar-btn {
    font-weight: bold;
    border: 2px solid #0a2f73;
    color: #0a2f73;
    --border-radius: 10px;
  }
  
  .chart-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0 30px;
  }
  
  .section-title {
    font-weight: bold;
    color: #0a2f73;
    font-size: 16px;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    width: 40px;
    height: 40px;
  }
  
  .monto {
    font-weight: bold;
    color: #333;
  }
  
  .categoria {
    font-weight: 500;
    margin-bottom: 5px;
  }
  
  .see-more {
    text-align: center;
    margin-top: 15px;
    color: #1d4ed8;
    font-weight: bold;
  }
  
  .hidden-datetime {
    display: none;
  }
  </style>
  