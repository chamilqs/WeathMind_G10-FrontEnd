<template>
  <ion-page>
       <!-- Encabezado -->
    <IonHeader>
      <IonToolbar>
        <HeaderHistoryTransaction></HeaderHistoryTransaction>
       </IonToolbar>
    </IonHeader>

    <ion-content class="ion-padding" fullscreen="true">
      <div v-if="displayedTransactions.length">
        <ion-card v-for="transaction in displayedTransactions" :key="transaction.id" class="transaction-card">
          <ion-card-header>
            <div class="transaction-header">
              <ion-icon :icon="getIcon(transaction.category)" class="transaction-icon"></ion-icon>
              <div class="transaction-details">
                <h3 class="transaction-title">{{ transaction.description }}</h3>
                <p class="transaction-date">{{ transaction.date }} - {{ transaction.category }}</p>
              </div>
              <span :class="transaction.type === 'Ingreso' ? 'income' : 'expense'">
                {{ transaction.type === "Ingreso" ? "+" : "-" }}${{ transaction.amount.toFixed(2) }}
              </span>
            </div>
          </ion-card-header>
        </ion-card>
      </div>

      <div v-else class="empty-state">
        <ion-icon name="document-text-outline" class="empty-icon"></ion-icon>
        <p>No transactions found</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Transaction from '@/models/Transaction';
import { IonHeader, IonToolbar } from '@ionic/vue';
import HeaderHistoryTransaction from '../components/HeaderHistoryTransaction.vue';

const route = useRoute();



// Mock data for transactions
// In a real application, you would fetch this data from an API or a store
const transactions = ref(Transaction.mockData());
const cardId = ref(null);

const displayedTransactions = computed(() => {
  return cardId.value ? transactions.value.filter(t => t.cardId === cardId.value) : transactions.value;
});



const getIcon = (category) => {
  switch (category) {
    case "Food": return "fast-food-outline";
    case "Shopping": return "cart-outline";
    case "Salary": return "cash-outline";
    case "Transport": return "bus-outline";
    default: return "document-text-outline";
  }
};

onMounted(() => {
  cardId.value = route.query.cardId || null;
});
</script>

<style scoped>
:root {
  --background-light: #ffffff;
  --card-light: #f5f5f5;
  --text-light: #000000;
  --income-color: #28a745;
  --expense-color: #dc3545;
}

ion-page {
  background-color: var(--background-light);
}

ion-header {
  --background: var(--background-light);
}

ion-toolbar {
  --background: var(--background-light);
  --color: var(--text-light);
}

ion-button {
  --color: var(--text-light);
}

.title {
  color: var(--text-light);
}

p {
  color: var(--text-light);
}

ion-card {
  background-color: var(--card-light);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.transaction-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  width: 100%;
}

.transaction-details {
  flex-grow: 1;
}

.transaction-title {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  font: bold;
}

.transaction-date {
  font-size: 12px;
  color: #6c757d;
  text-align: left;
}

.transaction-card {
  margin-bottom: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.income, .expense {
  font-weight: bold;
  font-size: 16px;
  min-width: 100px;
  text-align: right;
}

.income {
  color: #28a745 !important;
}

.expense {
  color: #dc3545 !important;
}

.transaction-icon {
  font-size: 24px;
  color: var(--text-light);
}

.empty-state {
  text-align: center;
  color: gray;
  margin-top: 20px;
}

.empty-icon {
  font-size: 50px;
  color: gray;
}

</style>
