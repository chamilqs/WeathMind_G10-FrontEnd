<template>
  <div class="pie-chart-container">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = {
  labels: ['Otros', 'Supermercado', 'Comida & Bebida'],
  datasets: [
    {
      data: [2873.21, 1460.0, 1418.0],
      backgroundColor: ['#9ba9b4', '#fcbf49', '#f77f00'],
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#333',
        font: {
          size: 14,
        },
        usePointStyle: true,
        padding: 20,
      },
    },
  },
};
</script>

<style scoped>
.pie-chart-container {
  width: 100%;
  height: 250px;
  position: relative;
  /* Elimina fondo blanco, sombras y bordes */
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
}
</style>
