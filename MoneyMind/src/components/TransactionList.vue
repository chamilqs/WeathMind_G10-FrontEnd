<template>
    <div class="transaction-list">
      <!-- Filtros de tiempo -->
      <div class="time-filter">
        <span :class="{'active': selected === '24h'}" @click="selected = '24h'">24 h</span>
        <span :class="{'active': selected === 'week'}" @click="selected = 'week'">Week</span>
        <span :class="{'active': selected === 'month'}" @click="selected = 'month'">Month</span>
        <span :class="{'active': selected === 'year'}" @click="selected = 'year'">Year</span>
        <ion-button fill="clear" class="filter-button">
          <ion-icon name="options-outline"></ion-icon>
        </ion-button>
      </div>
  
      <!-- Encabezado de Mes -->
      <h3 class="month-title">October</h3>
  
      <!-- Lista de Transacciones -->
      <div class="transaction" v-for="(item, index) in transactions" :key="index">
        <div class="icon-container">
          <ion-icon :name="item.icon" class="icon"></ion-icon>
        </div>
        <div class="details">
          <h4>{{ item.title }}</h4>
          <p>{{ item.date }}, {{ item.time }}</p>
        </div>
        <div :class="{'amount-negative': item.type === 'expense', 'amount-positive': item.type === 'income'}">
          {{ item.amount }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { IonButton, IonIcon } from '@ionic/vue';
  
  const selected = ref('month');
  
  const transactions = ref([
    {
      title: 'Electricity Bill',
      date: '20 October 2024',
      time: '3:15 pm',
      amount: '-$250.00',
      type: 'expense',
      icon: 'bulb-outline'
    },
    {
      title: 'Electricity Bill',
      date: '20 October 2024',
      time: '3:15 pm',
      amount: '-$250.00',
      type: 'expense',
      icon: 'bulb-outline'
    },
    {
      title: 'Freelance Payment',
      date: '20 October 2024',
      time: '3:15 pm',
      amount: '+$250.00',
      type: 'income',
      icon: 'briefcase-outline'
    },
    {
      title: 'Freelance Payment',
      date: '20 October 2024',
      time: '3:15 pm',
      amount: '+$250.00',
      type: 'income',
      icon: 'briefcase-outline'
    },
    {
      title: 'Electricity Bill',
      date: '20 October 2024',
      time: '3:15 pm',
      amount: '-$250.00',
      type: 'expense',
      icon: 'bulb-outline'
    },
  ]);
  </script>
  
  <style scoped>
  .time-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    font-size: 16px;
    color: #000;
  }
  
  .time-filter span {
    margin: 0 10px;
    cursor: pointer;
  }
  
  .time-filter .active {
    color: #1e3a8a;
    font-weight: bold;
  }
  
  .filter-button {
    color: #000;
  }
  
  .month-title {
    color: #6b7280;
    font-weight: bold;
    padding: 10px 20px;
  }
  
  .transaction {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #fff;
    border-radius: 10px;
    margin: 5px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .icon-container {
    background: #e5e7eb;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon {
    font-size: 24px;
    color: #4b5563;
  }
  
  .details {
    flex: 1;
    margin-left: 10px;
  }
  
  .details h4 {
    margin: 0;
    font-weight: bold;
    color: #000;
  }
  
  .details p {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
  }
  
  .amount-negative {
    color: #dc2626;
    font-weight: bold;
  }
  
  .amount-positive {
    color: #1e3a8a;
    font-weight: bold;
  }
  </style>
  