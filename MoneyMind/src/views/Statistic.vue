<template>
  <ion-page>
    <ion-content class="ion-padding">
       <!-- Header bonito -->
       <div class="header-bar">
        <h1 class="header-title">Estadísticas</h1>
      </div>

      <!-- Selector de mes -->
      <div class="date-header">
        <button class="arrow-button" @click="retrocederPeriodo">←</button>
        <h3 class="month-title">{{ currentMonth }}</h3>
        <button class="arrow-button" @click="avanzarPeriodo">→</button>
      </div>

      <ion-datetime
        presentation="month"
        :value="selectedMonth"
        @ionChange="onMonthChange"
        v-show="openDatePicker"
        class="hidden-datetime"
      />

     <!-- Mostrar si hay datos -->
<div v-if="transaccionesFiltradas.length > 0">
  <!-- Gráfico -->
  <div class="chart-wrapper">
    <canvas id="doughnutChart" width="300" height="300"></canvas>
    <div class="doughnut-center-text">
      <span class="center-label">Total</span>
      <span class="center-amount">${{ totalGasto.toLocaleString() }}</span>
    </div>
  </div>

  <!-- Título y transacciones -->
  <div class="section-title"><h4>Transacciones del mes</h4></div>
  <div class="scroll-container">
    <ion-list>
      <ion-item
        v-for="item in transaccionesColoreadas"
        :key="item.id"
        lines="full"
      >
        <div class="circle-icon" :style="{ backgroundColor: item.color }">
          <ion-icon :icon="item.icon" class="icon-inside" />
        </div>
        <ion-label>
          <h2 class="categoria">{{ item.description }}</h2>
          <p>{{ formatDate(item.transactionDate || item.trxDate) }}</p>
        </ion-label>
        <div class="monto">${{ item.amount.toFixed(2) }}</div>
      </ion-item>
    </ion-list>
  </div>
</div>

<!-- Imagen si no hay transacciones -->
<div v-else class="no-transactions">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No transacciones"
        class="empty-img"
      />
      <p>No se encontraron transacciones en este período.</p>
    </div>   
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonPage, IonContent, IonDatetime, IonItem, IonLabel, IonList, IonIcon
} from '@ionic/vue';
import {
  restaurantOutline, carOutline, medicalOutline,
  cashOutline, cardOutline, bagOutline
} from 'ionicons/icons';
import { onMounted, ref, computed, watch } from 'vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const transacciones = ref([]);
const transaccionesColoreadas = ref([]);
const today = new Date();
const selectedMonth = ref(today.toISOString());
const currentMonth = ref(today.toLocaleString('es-ES', { month: 'long', year: 'numeric' }));
const openDatePicker = ref(false);
let chart = null;

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('es-DO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const avanzarPeriodo = () => {
  const current = new Date(selectedMonth.value);
  current.setMonth(current.getMonth() + 1);
  selectedMonth.value = current.toISOString();
  currentMonth.value = current.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
};

const retrocederPeriodo = () => {
  const current = new Date(selectedMonth.value);
  current.setMonth(current.getMonth() - 1);
  selectedMonth.value = current.toISOString();
  currentMonth.value = current.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
};

const onMonthChange = (event) => {
  selectedMonth.value = event.detail.value;
  const selectedDate = new Date(event.detail.value);
  currentMonth.value = selectedDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
  openDatePicker.value = false;
};

const transaccionesFiltradas = computed(() => {
  const date = new Date(selectedMonth.value);
  const y = date.getFullYear();
  const m = date.getMonth();

  return transacciones.value.filter(t => {
    const d = new Date(t.transactionDate || t.trxDate);
    return d.getFullYear() === y && d.getMonth() === m;
  });
});

const totalGasto = computed(() =>
  transaccionesFiltradas.value
    .filter(t => t.type === 'Gasto' || t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0)
);

const getIcon = (desc = '') => {
  desc = desc.toLowerCase();
  if (desc.includes('comida')) return restaurantOutline;
  if (desc.includes('transporte') || desc.includes('uber')) return carOutline;
  if (desc.includes('salud')) return medicalOutline;
  if (desc.includes('efectivo')) return cashOutline;
  if (desc.includes('tarjeta')) return cardOutline;
  return bagOutline;
};

const renderChart = () => {
  const ctx = document.getElementById('doughnutChart');
  if (!ctx) return;

  if (chart) chart.destroy();

  const colores = [
    '#FF8B39', '#FDCB45', '#00B894', '#6C5CE7',
    '#A29BFE', '#FFA69E', '#9AE6B4', '#B794F4'
  ];

  const filtered = transaccionesFiltradas.value;
  const labels = filtered.map(t => t.description || 'Transacción');
  const data = filtered.map(t => t.amount);
  const backgroundColor = filtered.map((_, i) => colores[i % colores.length]);

  transaccionesColoreadas.value = filtered.map((t, i) => ({
    ...t,
    color: backgroundColor[i],
    icon: getIcon(t.description)
  }));

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor
      }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const label = labels[tooltipItem.dataIndex];
              const value = data[tooltipItem.dataIndex];
              return `${label}: $${value.toFixed(2)}`;
            }
          }
        }
      }
    }
  });
};

onMounted(() => {
  const jwt = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');
  if (jwt && userId) {
    fetch(`https://dev.genlabs.us/api/transaction?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        transacciones.value = data;
        renderChart();
      })
      .catch(err => console.error('Error al obtener transacciones:', err));
  }
});

watch(transaccionesFiltradas, () => {
  renderChart();
});
</script>

<style scoped>

.header-bar {
  width: 100%;
  background-color: #0a2f73;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.header-title {
  color: white;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}
.page-title {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 25px;
  color: #000;
}

.date-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.arrow-button {
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #4338ca;
  font-weight: bold;
  padding: 4px 10px;
  transition: 0.2s;
}

.arrow-button:hover {
  background-color: #e0e7ff;
  border-radius: 8px;
}

.month-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  width: 100%;
  max-width: 320px;
  height: 240px;
  position: relative;
}

.doughnut-center-text {
  position: absolute;
  text-align: center;
  font-weight: bold;
  color: #0a2f73;
  pointer-events: none;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
}

.center-label {
  font-size: 14px;
  opacity: 0.6;
}

.center-amount {
  font-size: 20px;
}

.section-title h4 {
  margin: 0;
  padding: 15px 0;
  margin-bottom: 15px;
  font-size: 16px;
  color: #042A72;
  font-weight: 600;
  text-align: center; 
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
}

.scroll-container {
  max-height: 260px;
  overflow-y: auto;
  margin-top: 10px;
  padding-right: 8px;
}

.scroll-container::-webkit-scrollbar {
  width: 6px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 3px;
}

.ion-item {
  --inner-padding-end: 10px;
}

.categoria {
  font-weight: 500;
  margin-bottom: 5px;
  
  
}

.monto {
  font-weight: bold;
  font-size: 15px;
  color: #333;
  margin-left: 10px;
}

.circle-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 4px;
}

.icon-inside {
  font-size: 18px;
  color: white;
}

.see-more {
  margin-bottom: 1px;
  color: #1d4ed8;
  font-size: 14px;
  text-align: center;
}

.hidden-datetime {
  display: none;
}

.no-transactions {
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
  color: #9ca3af;
}

.empty-img {
  width: 120px;
  height: auto;
  margin: 0 auto 20px;
  opacity: 0.8;
}


</style>
