<template>
    <ion-list>
    <ion-item v-for="transaction in transactions" :key="transaction.id">
      <ion-label>
        <h3>{{ transaction.description }}</h3>
        <p>{{ transaction.date }} - {{ transaction.category }}</p>
      </ion-label>
      <span :class="transaction.type === 'Ingreso' ? 'income' : 'expense'">
        {{ transaction.type === "Ingreso" ? "+" : "-" }}${{ transaction.amount.toFixed(2) }}
      </span>
    </ion-item>
  </ion-list>

</template>

<script setup>
import { ref } from "vue";
import Transaction from "@/models/Transaction";


const transactions = ref(Transaction.mockData());

</script>

<style scoped>
.income {
  color: green;
}
.expense {
  color: red;
}

</style>