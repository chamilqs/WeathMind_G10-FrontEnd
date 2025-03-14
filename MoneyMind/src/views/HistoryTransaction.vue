<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title class="title">Transaction History</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
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
import { useRoute, useRouter } from 'vue-router';
import Transaction from '@/models/Transaction';

const route = useRoute();
const router = useRouter();
const transactions = ref(Transaction.mockData());
const cardId = ref(null);

// Mostrar todas o solo las de una tarjeta
const displayedTransactions = computed(() => {
  return cardId.value ? transactions.value.filter(t => t.cardId === cardId.value) : transactions.value;
});

const goBack = () => {
  router.push('/tabs/homepage');
};

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
.title {
  color: black;
}

p {
  color: black;
}
</style>
