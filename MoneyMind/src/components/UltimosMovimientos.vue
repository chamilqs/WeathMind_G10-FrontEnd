<template>
  <div class="ultimos-movimientos">
    <h2 class="modal-title">Últimos Movimientos</h2>

    <div class="transaction" v-for="(item, index) in visibleTransactions" :key="index">
      <ion-icon :name="item.icon" class="icon"></ion-icon>
      <div class="details">
        <strong>{{ item.title }}</strong>
        <p>{{ item.date }}</p>
      </div>
      <div class="amount" :class="{ 'negative': item.amount < 0, 'positive': item.amount > 0 }">
        {{ item.amount < 0 ? '-' : '+' }} ${{ Math.abs(item.amount).toFixed(2) }}
      </div>
    </div>

    <ion-button
      expand="block"
      fill="clear"
      class="see-more"
      @click="loadMore"
      v-if="visibleTransactions.length < transactions.length"
    >
      See more >>
    </ion-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Transaction from "@/models/Transaction"; // Importa el modelo

// Mapeo de categorías a íconos
const categoryIcons = {
  Food: "restaurant-outline",
  Salary: "cash-outline",
  Shopping: "cart-outline",
  Transport: "car-outline",
};

// Obtén los datos de las transacciones
const mockTransactions = Transaction.mockData();

// Mapea y ordena las transacciones
const transactions = mockTransactions
  .map((transaction) => ({
    icon: categoryIcons[transaction.category] || "help-circle-outline", // Ícono dinámico
    title: transaction.description,
    date: transaction.date,
    amount: transaction.type === "Gasto" ? -transaction.amount : transaction.amount, // Monto negativo para gastos
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha descendente

// Lógica de paginación
const visibleTransactions = ref(transactions.slice(0, 3)); // Muestra las primeras 3 transacciones

const loadMore = () => {
  const currentLength = visibleTransactions.value.length;
  const nextTransactions = transactions.slice(currentLength, currentLength + 3); // Carga 3 más
  visibleTransactions.value = [...visibleTransactions.value, ...nextTransactions];
};
</script>

<style scoped>
.ultimos-movimientos {
  padding: 20px;
  background: #ffffff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-title {
  text-align: center;
  font-size: 20px;
  color: #0a2a62;
  margin: 20px 0;
}

.transaction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #f4f4f4;
}

.icon {
  width: 40px;
  height: 40px;
  background-color: #f4f4f4;
  border-radius: 50%;
  padding: 5px;
}

.details {
  flex: 1;
  margin-left: 10px;
  color: black;
}

.amount {
  font-weight: bold;
  font-size: 18px;
}

.negative {
  color: red;
}

.positive {
  color: #0a2a62;
}
</style>