<template>
  <div class="transaction-list">
    <!-- Filtros -->
    <div class="time-filter">
      <span
        v-for="filter in filters"
        :key="filter"
        :class="{ 'active': selected === filter }"
        @click="selected = filter"
      >
        {{ filter }}
      </span>
    </div>

    <h3 class="month-title">{{ selected }}</h3>

    <!-- Lista de transacciones -->
    <div
      v-if="filteredTransactions.length > 0"
      v-for="(item, index) in filteredTransactions"
      :key="index"
      class="transaction-card"
    >
      <div class="icon-wrapper">
        <ion-icon :name="getIcon(item)" class="transaction-icon"></ion-icon>
      </div>
      <div class="transaction-details">
        <h4>{{ item.description }}</h4>
        <p>Sin fecha disponible</p>
      </div>
      <div :class="item.type === 'Gasto' ? 'amount-negative' : 'amount-positive'">
        {{ formatAmount(item.amount, item.type) }}
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { IonIcon } from '@ionic/vue';

const selected = ref('Year');
const filters = ['24h', 'Week', 'Month', 'Year'];
const allTransactions = ref([]);
const userId = localStorage.getItem('userId');
const jwt = localStorage.getItem('jwtToken');

// Cargar transacciones
onMounted(async () => {
  if (!jwt || !userId) return;

  try {
    const res = await fetch(`https://dev.genlabs.us/api/transaction?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json',
      },
    });
    const data = await res.json();
    allTransactions.value = data;
  } catch (e) {
    console.error('Error al obtener transacciones', e);
  }
});

// Iconos dinámicos por tipo
const getIcon = (transaction) => {
  const type = transaction.type?.toLowerCase() || '';
  const desc = transaction.description?.toLowerCase() || '';

  if (type.includes('gasto') || desc.includes('expense') || desc.includes('compra')) return 'card-outline';
  if (type.includes('ingreso') || desc.includes('salary') || desc.includes('deposit')) return 'cash-outline';
  if (desc.includes('transfer')) return 'swap-horizontal-outline';
  if (desc.includes('investment') || desc.includes('shares')) return 'trending-up-outline';
  if (desc.includes('loan') || desc.includes('prestamo')) return 'briefcase-outline';

  return 'cash-outline'; // Default
};

// Formato de monto
const formatAmount = (amount, type) => {
  const symbol = type === 'Gasto' || type === 'Expense' ? '-' : '+';
  return `${symbol}$${parseFloat(amount || 0).toFixed(2)}`;
};

// Mostrar todas las transacciones solo si el filtro es "Year"
const filteredTransactions = computed(() => {
  if (!allTransactions.value.length) return [];
  return selected.value === 'Year' ? allTransactions.value : [];
});
</script>

<style scoped>
.transaction-list {
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}

.time-filter {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.time-filter span {
  padding: 12px 20px;
  border-radius: 20px;
  cursor: pointer;
  background-color: #e0e7ff;
  color: #4338ca;
  font-weight: 500;
  transition: 0.3s;
}

.time-filter .active {
  background-color: #4338ca;
  color: white;
}

.month-title {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
  padding-left: 10px;
}

.transaction-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.icon-wrapper {
  background-color: #eef2ff;
  padding: 12px;
  border-radius: 50%;
}

.transaction-icon {
  font-size: 24px;
  color: #4338ca;
}

.transaction-details {
  flex-grow: 1;
  margin-left: 15px;
}

.transaction-details h4 {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #1f2937;
}

.transaction-details p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.amount-negative {
  color: #dc2626;
  font-weight: bold;
}

.amount-positive {
  color: #16a34a;
  font-weight: bold;
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
